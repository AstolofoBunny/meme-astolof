import { Link } from "wouter";
import { ArrowLeft, Mail, MessageSquare, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/header";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

export default function Contact() {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof contactFormSchema>) => {
    // Simulate form submission
    console.log("Contact form submitted:", values);
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });
    form.reset();
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help via email",
      contact: "support@contenthub.com",
      detail: "Response within 24 hours"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Chat with our team",
      contact: "Available 9 AM - 6 PM EST",
      detail: "Monday to Friday"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Call us directly",
      contact: "+1 (555) 123-4567",
      detail: "Business hours only"
    },
    {
      icon: MapPin,
      title: "Office Location",
      description: "Visit our headquarters",
      contact: "123 Content Street, Tech City, TC 12345",
      detail: "By appointment only"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Contact Us</h1>
          <p className="text-xl text-slate-600">Get in touch with our team. We're here to help!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input placeholder="your.email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a subject" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="general">General Inquiry</SelectItem>
                              <SelectItem value="technical">Technical Support</SelectItem>
                              <SelectItem value="billing">Billing Question</SelectItem>
                              <SelectItem value="partnership">Partnership</SelectItem>
                              <SelectItem value="feedback">Feedback</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
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
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us how we can help you..."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Methods */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Other Ways to Reach Us</h2>
              <p className="text-slate-600 mb-6">
                Choose the contact method that works best for you. Our team is ready to assist with any questions or concerns.
              </p>
            </div>

            <div className="space-y-4">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900 mb-1">{method.title}</h3>
                          <p className="text-slate-600 text-sm mb-2">{method.description}</p>
                          <p className="font-medium text-slate-900">{method.contact}</p>
                          <p className="text-sm text-slate-500">{method.detail}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* FAQ Link */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <h3 className="font-semibold text-slate-900 mb-2">Frequently Asked Questions</h3>
                <p className="text-slate-600 text-sm mb-4">
                  Find quick answers to common questions in our FAQ section.
                </p>
                <Link href="/faq">
                  <Button variant="outline" size="sm">
                    Visit FAQ
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}