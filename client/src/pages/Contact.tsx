import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Send,
} from "lucide-react";

// Simple toast hook (local only)
function useToast() {
  const [toast, setToast] = useState<{ title: string; description?: string } | null>(null);
  const showToast = (data: { title: string; description?: string }) => {
    setToast(data);
    setTimeout(() => setToast(null), 3000);
  };
  return { toast, showToast };
}

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  courseInterest: string;
  message: string;
};

export default function Contact() {
  const { toast, showToast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactFormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      courseInterest: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormData) => {
    console.log("Form Submitted:", data);
    setIsSubmitted(true);
    showToast({
      title: "Message Sent!",
      description: "We will get back to you within 24 hours.",
    });
    form.reset();
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      content: "+91 9876543210",
      link: "tel:+919876543210",
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@kgpath.com",
      link: "mailto:info@kgpath.com",
    },
    {
      icon: MapPin,
      title: "Address",
      content: "Koramangala, Bangalore, Karnataka 560034, India",
    },
    {
      icon: Clock,
      title: "Business Hours",
      content: "Mon - Sat: 9:00 AM - 7:00 PM",
    },
  ];

  const courses = [
    "AI in Digital Marketing",
    "AI in Full Stack Development",
    "AI in Data Analytics",
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-purple-600 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            Have questions? We're here to help. Reach out to us and our team will
            respond within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8 md:gap-12">
            {/* Left - Form */}
            <div className="lg:col-span-3">
              <Card>
                <CardContent className="p-6 md:p-8">
                  <div className="mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                      Send us a Message
                    </h2>
                    <p className="text-muted-foreground">
                      Fill out the form below and we'll get back to you shortly.
                    </p>
                  </div>

                  {isSubmitted && (
                    <div className="mb-6 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md">
                      <p className="text-green-800 dark:text-green-200 font-medium">
                        Thank you for contacting us! We'll reach out to you soon.
                      </p>
                    </div>
                  )}

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address *</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="john@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number *</FormLabel>
                              <FormControl>
                                <Input placeholder="+91 9876543210" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="courseInterest"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Course Interest *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a course" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {courses.map((course) => (
                                  <SelectItem key={course} value={course}>
                                    {course}
                                  </SelectItem>
                                ))}
                                <SelectItem value="General Inquiry">
                                  General Inquiry
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about your goals and how we can help..."
                                className="min-h-[150px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" size="lg" className="w-full md:w-auto">
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* Right - Info Cards */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                  <div className="space-y-6">
                    {contactInfo.map((info, idx) => {
                      const Icon = info.icon;
                      return (
                        <div key={idx} className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">{info.title}</h4>
                            {info.link ? (
                              <a
                                href={info.link}
                                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                              >
                                {info.content}
                              </a>
                            ) : (
                              <p className="text-sm text-muted-foreground">
                                {info.content}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Browse Courses
                    </Button>

                    <Button variant="outline" className="w-full justify-start">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Us Now
                    </Button>

                    <Button variant="outline" className="w-full justify-start">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      WhatsApp Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary to-purple-600 text-white border-0">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Need Immediate Help?</h3>
                  <p className="text-sm opacity-90 mb-4">
                    Our counselors are available to answer your questions and guide
                    you to the right course.
                  </p>
                  <Button variant="secondary" className="w-full">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Now: +91 9876543210
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map Section */}
      <section className="py-16 md:py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Visit Our Campus
            </h2>
            <p className="text-lg text-muted-foreground">
              Located in the heart of Bangalore's tech hub
            </p>
          </div>

          <div className="aspect-video w-full rounded-md overflow-hidden border shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.6193107184734!2d77.6270939!3d12.9352818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae144ed898fc47%3A0x1681f38e8c00ae56!2sKoramangala%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="KGPath Location"
            />
          </div>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              <strong>Address:</strong> Koramangala, Bangalore, Karnataka 560034,
              India
            </p>
            <p className="text-sm text-muted-foreground">
              Easily accessible via metro (Koramangala Metro Station - 5 min walk)
              and well-connected by bus routes
            </p>
          </div>
        </div>
      </section>

      {/* Toast Popup */}
      {toast && (
        <div className="fixed bottom-5 right-5 bg-green-600 text-white px-4 py-3 rounded-md shadow-md animate-in fade-in duration-300">
          <strong>{toast.title}</strong>
          {toast.description && (
            <div className="text-sm opacity-90">{toast.description}</div>
          )}
        </div>
      )}
    </div>
  );
}
