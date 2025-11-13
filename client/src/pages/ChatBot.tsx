import React, { useState, useRef, useEffect } from 'react';
import logo from '/favicon.png';
import { LuSend, LuMessageSquare, LuX } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import { HiOutlineBookOpen, HiOutlineCurrencyDollar, HiOutlineAcademicCap, HiOutlineCalendar } from "react-icons/hi";

// Use the environment variable for the base URL
const API_BASE_URL = import.meta.env.VITE_API_URL;
// Construct the full endpoint URL
const CHAT_API_ENDPOINT = `${API_BASE_URL}chat-api.php`;

// --- TYPES, DATA, and LOGIC (with modifications) ---
interface Message {
  id?: number; // Optional ID from the database for live chat messages
  role: 'user' | 'model' | 'system';
  parts: { text: string }[];
}
interface QAPair {
  keywords: string[];
  response: string;
}
const initialMessage: Message = {
  role: 'model',
  parts: [{ text: "Hello! I'm your KGPath AI assistant. Ask me anything about our courses, admissions, placements, or general education queries!" }],
};
const qaPairs: QAPair[] = [
    { keywords: ['course', 'program', 'offer', 'learn'], response: "We offer cutting-edge courses where AI transforms careers:\n\n• AI in Digital Marketing\n• AI in Full Stack Development\n• AI in Data Analytics\n• AI in DevOps\n\nWhich one are you interested in?" },
    { keywords: ['fee', 'cost', 'price', 'tuition'], response: "For detailed information on course fees and payment plans, please contact our admissions team at 7397788915, 7397788917, or 7397788918. They will provide you with a complete breakdown." },
    { keywords: ['placement', 'job', 'career'], response: "We have a dedicated placement cell that works with top companies to ensure our students get excellent job opportunities. For placement statistics and partner companies, please connect with our advisors." },
    { keywords: ['batch', 'schedule', 'timing', 'start'], response: "New batches start every month! To get the exact schedule for the upcoming batch, please contact our team at 7397788915 / 917 / 918. They'll help you with enrollment." },
    { keywords: ['location', 'address', 'where'], response: "We are located at Vedapatti, Coimbatore. You can find us on Google Maps here: https://maps.app.goo.gl/i9SxPL4KHSZwuNWy9" },
    { keywords: ['contact', 'phone', 'number', 'call'], response: "You can reach our student advisors at 7397788915, 7397788917, or 7397788918 for any questions. We're here to help!" },
    { keywords: ['hello', 'hi', 'hey', 'greeting'], response: "Hello there! How can I assist you today? You can ask me about our courses, fees, location, or placements." },
];
// This is now the trigger for live chat
const fallbackResponse = "That's a great question! Let me connect you with a human agent for more specific details. Please wait a moment...";

const getBotResponse = (userInput: string): string => {
  const lowerCaseInput = userInput.toLowerCase();
  const matchedPair = qaPairs.find(pair => pair.keywords.some(keyword => lowerCaseInput.includes(keyword)));
  return matchedPair ? matchedPair.response : fallbackResponse;
};

// --- UI COMPONENTS (with minor adjustments for system messages) ---
const QuickAction = ({ icon, text, onClick }: { icon: React.ReactNode, text: string, onClick: (text: string) => void }) => (
    <button onClick={() => onClick(text)} className="flex items-center gap-3 p-3 text-sm text-left bg-white hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors duration-200">
        {icon}
        <span>{text}</span>
    </button>
);
const ChatWindow: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [messages, setMessages] = useState<Message[]>([initialMessage]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chatMode, setChatMode] = useState<'bot' | 'live'>('bot');
    const [sessionId] = useState<string>(`web_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`);
    const [lastMessageId, setLastMessageId] = useState<number>(0);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

    // Polling for new messages in live chat mode
    useEffect(() => {
        if (chatMode === 'live') {
            const interval = setInterval(() => {
                fetchLiveChatMessages();
            }, 3000); // Poll every 3 seconds

            return () => clearInterval(interval); // Cleanup on component unmount or mode change
        }
    }, [chatMode, lastMessageId]); // Rerun if mode or lastMessageId changes

    const addMessage = (message: Message) => {
        setMessages(prev => [...prev, message]);
        if (message.id) {
            setLastMessageId(prevId => Math.max(prevId, message.id!));
        }
    };

    const initiateLiveChat = async (userMessage: string) => {
        addMessage({ role: 'system', parts: [{ text: "Connecting to a live agent..." }] });
        try {
            const response = await fetch(CHAT_API_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'initiate_live_chat', sessionId: sessionId, message: userMessage })
            });
            const data = await response.json();

            if (data.status === 'success' && data.initial_response) {
                setChatMode('live');
                addMessage(data.initial_response);
            } else {
                 addMessage({ role: 'system', parts: [{ text: "Sorry, we couldn't connect you to an agent right now. Please try again later." }] });
            }
        } catch (error) {
            console.error("Error initiating live chat:", error);
            addMessage({ role: 'system', parts: [{ text: "A connection error occurred. Please check your internet and try again." }] });
        } finally {
            setIsLoading(false);
        }
    };
    
    const sendLiveChatMessage = async (messageText: string) => {
        try {
            await fetch(CHAT_API_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'send_message', sessionId: sessionId, message: messageText })
            });
        } catch (error) {
            console.error("Error sending live chat message:", error);
        }
    };

    const fetchLiveChatMessages = async () => {
        try {
            const response = await fetch(CHAT_API_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'get_messages', sessionId: sessionId, lastMessageId: lastMessageId })
            });
            const data = await response.json();
            if (data.status === 'success' && data.messages.length > 0) {
                data.messages.forEach(addMessage);
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const sendMessage = async (messageText: string) => {
        const trimmedText = messageText.trim();
        if (!trimmedText) return;

        addMessage({ role: 'user', parts: [{ text: trimmedText }] });
        setInput('');
        setIsLoading(true);

        if (chatMode === 'bot') {
            setTimeout(() => {
                const botResponseText = getBotResponse(trimmedText);
                addMessage({ role: 'model', parts: [{ text: botResponseText }] });

                if (botResponseText === fallbackResponse) {
                    initiateLiveChat(trimmedText);
                } else {
                    setIsLoading(false);
                }
            }, 1000);
        } else {
            await sendLiveChatMessage(trimmedText);
            setIsLoading(false);
        }
    };

    const handleSend = () => sendMessage(input);
    const handleQuickAction = (text: string) => sendMessage(text);

    return (
        <div className="flex flex-col h-full bg-gray-50 rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
            <header className="flex items-center justify-between p-4 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-xl flex-shrink-0">
                 <div className="flex items-center gap-3">
                    <div className="relative">
                        <img src={logo} alt="KG Path Logo" className="h-8 w-auto rounded-md bg-white p-1" />
                        {chatMode === 'live' && <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white"></span>}
                    </div>
                    <div>
                        <h1 className="text-md font-bold">KGPath AI Assistant</h1>
                        <p className="text-xs opacity-80">{chatMode === 'bot' ? 'Online & ready to help' : 'Live Chat Active'}</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors"><LuX size={20} /></button>
            </header>
            <main className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => {
                    if (msg.role === 'system') {
                        return (
                            <div key={index} className="text-center text-xs text-gray-500 py-2">
                                <span className="bg-gray-200 rounded-full px-3 py-1">{msg.parts[0].text}</span>
                            </div>
                        )
                    }
                    return (
                        <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                            {msg.role === 'model' && <img src={logo} alt="KG Path Logo" className="h-8 w-8 rounded-full bg-white shadow-md p-1 flex-shrink-0" />}
                            <div className={`max-w-[85%] p-3 rounded-xl whitespace-pre-wrap ${msg.role === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-100'}`}><p>{msg.parts[0].text}</p></div>
                            {msg.role === 'user' && <div className="p-2.5 bg-blue-500 text-white rounded-full flex-shrink-0"><FaUser /></div>}
                        </div>
                    )
                })}
                {isLoading && (
                    <div className="flex items-start gap-3">
                        <img src={logo} alt="KG Path Logo" className="h-8 w-8 rounded-full bg-white shadow-md p-1 flex-shrink-0" />
                        <div className="max-w-md p-3 rounded-xl bg-white text-gray-800 rounded-bl-none shadow-sm">
                            <div className="flex items-center gap-2"><span className="w-2 h-2 bg-purple-300 rounded-full animate-pulse delay-75"></span><span className="w-2 h-2 bg-purple-300 rounded-full animate-pulse delay-150"></span><span className="w-2 h-2 bg-purple-300 rounded-full animate-pulse delay-300"></span></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </main>
            <footer className="p-4 bg-white border-t border-gray-200 rounded-b-xl flex-shrink-0">
                {chatMode === 'bot' && (
                  <div className="mb-3">
                      <h3 className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1.5">⚡ Quick actions:</h3>
                      <div className="grid grid-cols-2 gap-2">
                          <QuickAction icon={<HiOutlineBookOpen className="text-green-500"/>} text="View Courses" onClick={handleQuickAction} />
                          <QuickAction icon={<HiOutlineCurrencyDollar className="text-yellow-500"/>} text="Course Fees" onClick={handleQuickAction} />
                          <QuickAction icon={<HiOutlineAcademicCap className="text-red-500"/>} text="Placements" onClick={handleQuickAction} />
                          <QuickAction icon={<HiOutlineCalendar className="text-blue-500"/>} text="Batch Info" onClick={handleQuickAction} />
                      </div>
                  </div>
                )}
                <div className="flex items-center gap-2">
                    <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder={chatMode === 'bot' ? "Ask me anything..." : "Type your message to the agent..."} className="w-full p-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all" disabled={isLoading}/>
                    <button onClick={handleSend} disabled={isLoading || !input.trim()} className="p-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 disabled:bg-purple-300 transition-all flex-shrink-0"><LuSend size={20} /></button>
                </div>
            </footer>
        </div>
    );
};


// --- MAIN EXPORTED COMPONENT (No changes needed here) ---
const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div
        className={`absolute bottom-20 left-4 sm:bottom-24 sm:left-5 transition-all duration-300 ease-in-out ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="h-[75vh] w-[calc(100vw-2rem)] sm:h-[70vh] sm:w-[400px]">
          <ChatWindow onClose={() => setIsOpen(false)} />
        </div>
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-110 pointer-events-auto"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        <div className="relative flex h-8 w-8 items-center justify-center">
          <LuMessageSquare
            className={`absolute transition-all duration-300 ${
              isOpen ? 'opacity-0 -rotate-12 scale-50' : 'opacity-100 rotate-0 scale-100'
            }`}
            size={28}
          />
          <LuX
            className={`absolute transition-all duration-300 ${
              isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-12 scale-50'
            }`}
            size={28}
          />
        </div>
      </button>
    </div>
  );
};

export default ChatBot;