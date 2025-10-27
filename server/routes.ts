import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactInquirySchema, insertNewsletterSubscriptionSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactInquirySchema.parse(req.body);
      const inquiry = await storage.createContactInquiry(validatedData);
      
      console.log('Contact inquiry received:', {
        name: inquiry.name,
        email: inquiry.email,
        course: inquiry.courseInterest
      });

      res.json({ 
        success: true, 
        message: "Contact inquiry submitted successfully",
        id: inquiry.id 
      });
    } catch (error) {
      console.error('Contact form error:', error);
      if (error instanceof Error && 'errors' in error) {
        res.status(400).json({ 
          success: false, 
          error: "Validation failed", 
          details: error 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          error: "Failed to submit contact inquiry" 
        });
      }
    }
  });

  app.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = insertNewsletterSubscriptionSchema.parse(req.body);
      
      const exists = await storage.checkNewsletterExists(validatedData.email);
      if (exists) {
        return res.status(400).json({ 
          success: false, 
          error: "Email already subscribed" 
        });
      }

      const subscription = await storage.createNewsletterSubscription(validatedData);
      
      console.log('Newsletter subscription:', subscription.email);

      res.json({ 
        success: true, 
        message: "Successfully subscribed to newsletter",
        id: subscription.id 
      });
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      if (error instanceof Error && 'errors' in error) {
        res.status(400).json({ 
          success: false, 
          error: "Validation failed", 
          details: error 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          error: "Failed to subscribe to newsletter" 
        });
      }
    }
  });

  app.get("/api/contact-inquiries", async (req, res) => {
    try {
      const inquiries = await storage.getContactInquiries();
      res.json({ success: true, data: inquiries });
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to fetch inquiries" 
      });
    }
  });

  app.get("/api/newsletter-subscriptions", async (req, res) => {
    try {
      const subscriptions = await storage.getNewsletterSubscriptions();
      res.json({ success: true, data: subscriptions });
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to fetch subscriptions" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
