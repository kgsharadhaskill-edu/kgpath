// src/App.tsx

import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Courses from "@/pages/Courses";
import CourseDetail from "@/pages/CourseDetail";
import NotFound from "@/pages/not-found";
import ScrollToTop from "@/ScrollToTop";

// --- Step 1: Import the new blog pages ---
import BlogPage from "@/pages/Blog/BlogPage"; // Assuming you place them in the pages directory
import BlogDetailsPage from "@/pages/Blog/BlogDetailsPage";
import PlacementPage from "@/pages/Placement";
import ContactPage from "./pages/Contact";

function Router(): JSX.Element {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/courses" component={Courses} />
      <Route path="/courses/:slug" component={CourseDetail} />
      <Route path="/placement" component={PlacementPage} />
      <Route path="/contact" component={ContactPage} />

      {/* --- Step 2: Add the routes for the blog --- */}
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
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;