<?php
// --- START: BACKEND API LOGIC FOR ADMIN DASHBOARD ---

// Adjust the path if your db.php is elsewhere
require_once 'config/database.php'; 

// This block handles AJAX requests from the JavaScript on this page.
if (isset($_REQUEST['action'])) {
    
    // Set a common header for all API responses
    header("Content-Type: application/json; charset=UTF-8");

    // We'll hardcode agent_id=1 for simplicity. In a real app, this would come from a login session.
    $agent_id = 1; 
    $action = $_REQUEST['action'];

    switch ($action) {
        case 'get_sessions':
            // Fetches all non-closed sessions, with the newest ones first.
            // Includes the last message for a preview.
            $stmt = $pdo->prepare("
                SELECT cs.*, (
                    SELECT cm.message 
                    FROM chat_messages cm 
                    WHERE cm.session_table_id = cs.id 
                    ORDER BY cm.timestamp DESC 
                    LIMIT 1
                ) AS last_message
                FROM chat_sessions cs
                WHERE cs.status != 'closed'
                ORDER BY cs.created_at DESC
            ");
            $stmt->execute();
            $sessions = $stmt->fetchAll();
            echo json_encode(['status' => 'success', 'sessions' => $sessions]);
            break;

        case 'get_chat_history':
            $session_table_id = filter_input(INPUT_GET, 'session_table_id', FILTER_SANITIZE_NUMBER_INT);
            if (!$session_table_id) {
                http_response_code(400);
                echo json_encode(['status' => 'error', 'message' => 'Session ID is required.']);
                break;
            }
            $stmt = $pdo->prepare("
                SELECT id, sender, message, timestamp 
                FROM chat_messages 
                WHERE session_table_id = ? 
                ORDER BY timestamp ASC
            ");
            $stmt->execute([$session_table_id]);
            $messages = $stmt->fetchAll();
            echo json_encode(['status' => 'success', 'messages' => $messages]);
            break;

        case 'send_agent_message':
            // Reads JSON payload from the request body
            $rawPayload = file_get_contents("php://input");
            $data = json_decode($rawPayload);

            if (!$data || !isset($data->session_table_id) || !isset($data->message)) {
                http_response_code(400);
                echo json_encode(['status' => 'error', 'message' => 'Missing session_table_id or message.']);
                break;
            }

            $session_table_id = (int)$data->session_table_id;
            $message = htmlspecialchars(strip_tags($data->message));

            $pdo->beginTransaction();
            try {
                // Insert the agent's message
                $stmt = $pdo->prepare("INSERT INTO chat_messages (session_table_id, sender, message) VALUES (?, 'agent', ?)");
                $stmt->execute([$session_table_id, $message]);

                // When an agent sends the first message, update the session to 'active' and assign the agent.
                $stmt = $pdo->prepare("UPDATE chat_sessions SET status = 'active', agent_id = ? WHERE id = ? AND status = 'pending'");
                $stmt->execute([$agent_id, $session_table_id]);
                
                $pdo->commit();
                echo json_encode(['status' => 'success', 'message' => 'Message sent.']);

            } catch (Exception $e) {
                $pdo->rollBack();
                http_response_code(500);
                echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
            }
            break;
            
        case 'set_agent_status':
            $rawPayload = file_get_contents("php://input");
            $data = json_decode($rawPayload);

            if (!$data || !isset($data->status) || !in_array($data->status, ['online', 'offline'])) {
                 http_response_code(400);
                 echo json_encode(['status' => 'error', 'message' => 'Invalid status provided.']);
                 break;
            }
            
            $stmt = $pdo->prepare("UPDATE agents SET status = ? WHERE id = ?");
            if($stmt->execute([$data->status, $agent_id])) {
                echo json_encode(['status' => 'success', 'message' => 'Status updated to ' . $data->status]);
            } else {
                http_response_code(500);
                echo json_encode(['status' => 'error', 'message' => 'Failed to update status.']);
            }
            break;

        default:
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Invalid action.']);
            break;
    }

    // IMPORTANT: Stop the script here so it doesn't output the HTML below for AJAX calls.
    exit; 
}
// --- END: BACKEND API LOGIC ---
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Admin | Live Chat</title>
    <!-- Google Font: Source Sans Pro -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/admin-lte/3.2.0/css/adminlte.min.css">
    <style>
        .session-item { cursor: pointer; }
        .session-item.active { background-color: #007bff; color: white; }
        #chat-box { height: 60vh; overflow-y: auto; }
        .direct-chat-messages { display: flex; flex-direction: column; }
        /* Add a subtle glow for pending chats */
        .session-item .badge-warning {
            animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(255, 193, 7, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(255, 193, 7, 0); }
            100% { box-shadow: 0 0 0 0 rgba(255, 193, 7, 0); }
        }
    </style>
</head>
<body class="hold-transition sidebar-mini">
<div class="wrapper">
    <!-- Navbar -->
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
            </li>
            <li class="nav-item">
                <h5 class="m-0 pt-1">Live Chat Dashboard</h5>
            </li>
        </ul>
    </nav>
    
    <!-- Main Sidebar Container -->
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <div class="text-center my-3">
            <a href="index.php" class="brand-link">
                <span class="brand-text font-weight-light">Admin Panel</span>
            </a>
        </div>
        <div class="sidebar">
            <nav class="mt-2">
                <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                    <li class="nav-item">
                        <a href="index.php" class="nav-link active">
                            <i class="nav-icon fas fa-tachometer-alt"></i>
                            <p>Dashboard</p>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="chatbot.php" class="nav-link active">
                            <i class="nav-icon fas fa-comments"></i>
                            <p>Live Chat</p>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </aside>

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <section class="content-header">
            <div class="container-fluid">
                <div class="d-flex justify-content-between align-items-center">
                    <h1>Chat Sessions</h1>
                    <div>
                        <span>Your Status (Agent ID: 1): </span>
                        <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn btn-outline-secondary">
                                <input type="radio" name="status" id="status_offline" value="offline" autocomplete="off"> Offline
                            </label>
                            <label class="btn btn-outline-secondary">
                                <input type="radio" name="status" id="status_online" value="online" autocomplete="off"> Online
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Main content -->
        <section class="content">
            <div class="container-fluid">
                <div class="row">
                    <!-- Sessions List -->
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">Open Conversations</h3>
                            </div>
                            <div class="card-body p-0">
                                <ul class="nav nav-pills flex-column" id="session-list">
                                    <!-- Sessions will be loaded here by jQuery -->
                                    <li class="p-3 text-center">Loading chats...</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Chat Window -->
                    <div class="col-md-8">
                        <div class="card card-primary card-outline direct-chat direct-chat-primary" id="chat-container" style="display: none;">
                            <div class="card-header">
                                <h3 class="card-title" id="chat-header">Select a chat</h3>
                            </div>
                            <div class="card-body">
                                <div class="direct-chat-messages" id="chat-box">
                                    <!-- Messages will be loaded here -->
                                </div>
                            </div>
                            <div class="card-footer">
                                <form id="reply-form">
                                    <div class="input-group">
                                        <input type="text" id="reply-message" placeholder="Type Message ..." class="form-control" autocomplete="off" required>
                                        <span class="input-group-append">
                                            <button type="submit" class="btn btn-primary">Send</button>
                                        </span>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div id="no-chat-selected" class="text-center mt-5">
                            <i class="fas fa-comments fa-5x text-gray-light"></i>
                            <p class="text-muted mt-3">Please select a conversation from the left panel.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <footer class="main-footer">
        <strong>Copyright &copy; 2025 KGPATH.</strong> All rights reserved.
    </footer>
</div>
<!-- ./wrapper -->

<!-- REQUIRED SCRIPTS -->
<!-- jQuery -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<!-- Bootstrap 4 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/4.6.1/js/bootstrap.bundle.min.js"></script>
<!-- AdminLTE App -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/admin-lte/3.2.0/js/adminlte.min.js"></script>
<!-- Moment.js for date formatting -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>

<script>
$(function() {
    let currentSessionTableId = null;
    let messagePollingInterval = null;

    // --- INITIAL LOAD ---
    loadSessions();
    // Poll for new sessions every 7 seconds
    setInterval(loadSessions, 7000); 
    
    // Set initial status to offline on page load
    setAgentStatus('offline');
    $('#status_offline').parent().addClass('active');


    // --- FUNCTIONS ---
    function loadSessions() {
        $.get('chatbot.php?action=get_sessions', function(response) {
            if (response.status === 'success') {
                const sessionList = $('#session-list');
                const currentActiveId = sessionList.find('.session-item.active').data('sessionId');
                sessionList.empty();
                
                if (response.sessions.length === 0) {
                    sessionList.html('<li class="p-3 text-center text-muted">No active conversations.</li>');
                    return;
                }

                response.sessions.forEach(session => {
                    const statusBadge = session.status === 'pending' 
                        ? '<span class="badge badge-warning float-right">New</span>' 
                        : '';
                    
                    const lastMessage = session.last_message ? (session.last_message.substring(0, 30) + (session.last_message.length > 30 ? '...' : '')) : 'No messages yet.';
                    const activeClass = session.id === currentActiveId ? 'active' : '';

                    const sessionHtml = `
                        <li class="nav-item session-item ${activeClass}" data-session-id="${session.id}" data-session-name="${session.session_id}">
                            <a href="#" class="nav-link">
                                <i class="fas fa-comment-dots text-gray"></i> 
                                <strong class="ml-2">${session.session_id.substring(4, 15)}...</strong>
                                ${statusBadge}
                                <small class="d-block text-muted ml-4">${lastMessage}</small>
                            </a>
                        </li>`;
                    sessionList.append(sessionHtml);
                });
            }
        });
    }

    function loadChatHistory(sessionId, showLoading = true) {
        if (showLoading) {
            $('#chat-box').html('<div class="text-center p-5"><i class="fas fa-spinner fa-spin fa-2x"></i></div>');
        }
        $.get(`chatbot.php?action=get_chat_history&session_table_id=${sessionId}`, function(response) {
            if (response.status === 'success') {
                const chatBox = $('#chat-box');
                const shouldScroll = (chatBox[0].scrollHeight - chatBox.scrollTop() <= chatBox.outerHeight() + 50);

                chatBox.empty(); // Always do a full refresh to ensure sync

                response.messages.forEach(msg => {
                    const messageTime = moment(msg.timestamp).format('MMM D, h:mm A');
                    const isAgent = msg.sender === 'agent';
                    const messageHtml = `
                        <div class="direct-chat-msg ${isAgent ? 'right' : ''}" data-message-id="${msg.id}">
                            <div class="direct-chat-infos clearfix">
                                <span class="direct-chat-name float-${isAgent ? 'right' : 'left'}">${isAgent ? 'You (Agent)' : 'User'}</span>
                                <span class="direct-chat-timestamp float-${isAgent ? 'left' : 'right'}">${messageTime}</span>
                            </div>
                            <img class="direct-chat-img" src="https://adminlte.io/themes/v3/dist/img/${isAgent ? 'user1-128x128.jpg' : 'user3-128x128.jpg'}" alt="message user image">
                            <div class="direct-chat-text">${msg.message}</div>
                        </div>`;
                    chatBox.append(messageHtml);
                });
                
                if (shouldScroll || showLoading) {
                    chatBox.scrollTop(chatBox[0].scrollHeight);
                }
            }
        });
    }

    function setAgentStatus(status) {
         $.ajax({
            url: 'chatbot.php?action=set_agent_status',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ status: status }),
            success: function(response) {
                if(response.status === 'success') {
                    console.log("Agent status updated successfully to " + status);
                    // Manually control active state as data-toggle can be tricky
                    if (status === 'online') {
                        $('#status_online').parent().addClass('active');
                        $('#status_offline').parent().removeClass('active');
                    } else {
                        $('#status_offline').parent().addClass('active');
                        $('#status_online').parent().removeClass('active');
                    }
                } else {
                    alert('Failed to update status.');
                }
            }
        });
    }

    // --- EVENT HANDLERS ---
    $('#session-list').on('click', '.session-item', function() {
        const sessionId = $(this).data('sessionId');
        const sessionName = $(this).data('session-name');
        
        if (sessionId === currentSessionTableId) return; // Don't reload if already active

        currentSessionTableId = sessionId;
        
        $('.session-item').removeClass('active');
        $(this).addClass('active');
        $(this).find('.badge-warning').remove(); // Remove 'New' badge on click

        $('#chat-container').show();
        $('#no-chat-selected').hide();
        $('#chat-header').text(`Chat with: ${sessionName}`);
        
        // Clear any existing polling and start a new one for this chat
        if (messagePollingInterval) {
            clearInterval(messagePollingInterval);
        }
        
        loadChatHistory(sessionId, true); // Initial load with spinner
        
        messagePollingInterval = setInterval(() => {
            if (currentSessionTableId) {
                loadChatHistory(currentSessionTableId, false); // Subsequent loads without spinner
            }
        }, 3000);
    });

    $('#reply-form').on('submit', function(e) {
        e.preventDefault();
        const message = $('#reply-message').val();
        if (!message || !currentSessionTableId) return;

        const originalButtonHtml = $(this).find('button').html();
        $(this).find('button').html('<i class="fas fa-spinner fa-spin"></i>').prop('disabled', true);

        $.ajax({
            url: 'chatbot.php?action=send_agent_message',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                session_table_id: currentSessionTableId,
                message: message
            }),
            success: function(response) {
                if (response.status === 'success') {
                    $('#reply-message').val('');
                    loadChatHistory(currentSessionTableId, false); // Reload chat to show the new message
                } else {
                    alert('Failed to send message: ' + response.message);
                }
            },
            error: function() {
                alert('An error occurred while sending the message.');
            },
            complete: function() {
                 $('#reply-form').find('button').html(originalButtonHtml).prop('disabled', false);
            }
        });
    });

    $('input[name="status"]').on('change', function() {
        setAgentStatus($(this).val());
    });
    
});
</script>
</body>
</html>