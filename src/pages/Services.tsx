import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Brain, Bone, Eye, Baby, Smile, Stethoscope, Activity } from "lucide-react";

const services = [
  { icon: Heart, name: "Cardiology", desc: "Heart disease diagnosis, treatment, and preventive care." },
  { icon: Brain, name: "Neurology", desc: "Treatment of nervous system disorders including brain and spine." },
  { icon: Bone, name: "Orthopedics", desc: "Bone, joint, and muscle care including surgery and rehabilitation." },
  { icon: Eye, name: "Ophthalmology", desc: "Eye examinations, vision correction, and surgical procedures." },
  { icon: Baby, name: "Pediatrics", desc: "Complete healthcare for infants, children, and adolescents." },
  { icon: Smile, name: "Dermatology", desc: "Skin health, cosmetic procedures, and allergy treatments." },
  { icon: Stethoscope, name: "General Medicine", desc: "Comprehensive primary care and health screenings." },
  { icon: Activity, name: "Psychiatry", desc: "Mental health support, therapy, and medication management." },
];

const Services = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="font-display text-3xl font-bold text-foreground">Our Services</h1>
        <p className="mt-2 text-muted-foreground">Comprehensive healthcare across multiple specialties</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => (
          <Card key={s.name} className="text-center transition-shadow hover:shadow-lg">
            <CardContent className="p-6">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <s.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">{s.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    <Footer />
  </div>
);

export default Services;
