import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent!", description: "We'll get back to you shortly." });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-10 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground">Contact Us</h1>
          <p className="mt-2 text-muted-foreground">We'd love to hear from you</p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
          {/* Info */}
          <div className="space-y-6">
            {[
              { icon: Phone, label: "Phone", value: "+1 (555) 000-0000" },
              { icon: Mail, label: "Email", value: "info@medicare.com" },
              { icon: MapPin, label: "Address", value: "123 Health St, Medical City, MC 10001" },
            ].map((item) => (
              <Card key={item.label}>
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Form */}
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <Input className="mt-1" placeholder="Your name" required />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" className="mt-1" placeholder="your@email.com" required />
                </div>
                <div>
                  <Label>Subject</Label>
                  <Input className="mt-1" placeholder="How can we help?" required />
                </div>
                <div>
                  <Label>Message</Label>
                  <Textarea className="mt-1" rows={4} placeholder="Your message..." required />
                </div>
                <Button className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
