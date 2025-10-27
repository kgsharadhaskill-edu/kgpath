import { 
  type ContactInquiry, 
  type InsertContactInquiry,
  type NewsletterSubscription,
  type InsertNewsletterSubscription
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry>;
  getContactInquiries(): Promise<ContactInquiry[]>;
  
  createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
  getNewsletterSubscriptions(): Promise<NewsletterSubscription[]>;
  checkNewsletterExists(email: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private contactInquiries: Map<string, ContactInquiry>;
  private newsletterSubscriptions: Map<string, NewsletterSubscription>;

  constructor() {
    this.contactInquiries = new Map();
    this.newsletterSubscriptions = new Map();
  }

  async createContactInquiry(insertInquiry: InsertContactInquiry): Promise<ContactInquiry> {
    const id = randomUUID();
    const inquiry: ContactInquiry = { 
      ...insertInquiry, 
      id,
      createdAt: new Date()
    };
    this.contactInquiries.set(id, inquiry);
    return inquiry;
  }

  async getContactInquiries(): Promise<ContactInquiry[]> {
    return Array.from(this.contactInquiries.values());
  }

  async createNewsletterSubscription(insertSubscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    const id = randomUUID();
    const subscription: NewsletterSubscription = { 
      ...insertSubscription, 
      id,
      createdAt: new Date()
    };
    this.newsletterSubscriptions.set(id, subscription);
    return subscription;
  }

  async getNewsletterSubscriptions(): Promise<NewsletterSubscription[]> {
    return Array.from(this.newsletterSubscriptions.values());
  }

  async checkNewsletterExists(email: string): Promise<boolean> {
    return Array.from(this.newsletterSubscriptions.values()).some(
      sub => sub.email.toLowerCase() === email.toLowerCase()
    );
  }
}

export const storage = new MemStorage();
