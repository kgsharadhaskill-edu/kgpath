// src/App.tsx

import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { queryClient } from "./lib/queryClient";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import ScrollToTop from "@/ScrollToTop";

// Import Pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import Courses from "@/pages/Courses";
import CourseDetail from "@/pages/CourseDetail";
import PlacementPage from "@/pages/Placement";
import ContactPage from "./pages/Contact";
import BlogPage from "@/pages/Blog/BlogPage";
import BlogDetailsPage from "@/pages/Blog/BlogDetailsPage";
import NotFound from "@/pages/not-found";

// Import the ChatBot component to be used as a floating widget
import ChatBot from "./pages/ChatBot";

function Router(): JSX.Element {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/courses" component={Courses} />
      <Route path="/courses/:slug" component={CourseDetail} />
      <Route path="/placement" component={PlacementPage} />
      <Route path="/contact" component={ContactPage} />
      
      {/* Blog routes */}
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/:slug" component={BlogDetailsPage} />
      
      {/* This should always be the last route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <ScrollToTop>
              <Router />
            </ScrollToTop>
          </main>
          <Footer />
        </div>
        <Toaster />

        {/* 
          This is the correct placement for a persistent, floating component.
          It will now work without blocking clicks on the page because the
          fix is applied inside the ChatBot component's styling.
        */}
        <ChatBot />

      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;