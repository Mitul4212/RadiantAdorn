import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();
  
  const form = useForm<ContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactForm) => {
    toast({
      title: "Message sent!",
      description: "We'll get back to you soon.",
    });
    form.reset();
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "support@aureliajewels.com",
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+91 98765 43210",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "Mumbai, Maharashtra, India",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      content: "+91 98765 43210",
    },
  ];

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-ivory mb-4">
            Get In Touch
          </h1>
          <p className="text-xl text-warm-grey max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 bg-card border-card-border rounded-2xl">
              <h2 className="text-2xl font-heading font-bold text-card-foreground mb-6">
                Send Us a Message
              </h2>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-card-foreground">
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    {...form.register("name")}
                    className="bg-background border-border text-foreground mt-1"
                    data-testid="input-contact-name"
                  />
                  {form.formState.errors.name && (
                    <p className="text-destructive text-sm mt-1">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email" className="text-card-foreground">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    className="bg-background border-border text-foreground mt-1"
                    data-testid="input-contact-email"
                  />
                  {form.formState.errors.email && (
                    <p className="text-destructive text-sm mt-1">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="message" className="text-card-foreground">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    rows={5}
                    {...form.register("message")}
                    className="bg-background border-border text-foreground mt-1"
                    data-testid="textarea-contact-message"
                  />
                  {form.formState.errors.message && (
                    <p className="text-destructive text-sm mt-1">
                      {form.formState.errors.message.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-gold to-gold-light text-charcoal font-accent font-medium py-6 rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-gold/50"
                  data-testid="button-send-message"
                >
                  Send Message
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-heading font-bold text-ivory mb-6">
              Contact Information
            </h2>
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 bg-card border-card-border rounded-2xl hover-elevate">
                  <div className="flex items-start gap-4">
                    <div className="bg-gold/20 rounded-full p-3">
                      <info.icon className="h-6 w-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-card-foreground mb-1">
                        {info.title}
                      </h3>
                      <p className="text-warm-grey">{info.content}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}

            {/* Additional Info */}
            <Card className="p-6 bg-onyx border-border rounded-2xl mt-8">
              <h3 className="font-heading font-semibold text-ivory mb-3">
                Business Hours
              </h3>
              <div className="space-y-2 text-warm-grey">
                <p>Monday - Saturday: 10:00 AM - 8:00 PM</p>
                <p>Sunday: 11:00 AM - 6:00 PM</p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
