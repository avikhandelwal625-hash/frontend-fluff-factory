import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Award, Users, Heart } from "lucide-react";

const About = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-display text-3xl font-bold text-foreground">About MediCare</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          MediCare is a modern healthcare platform connecting patients with experienced doctors. Our mission is to make quality healthcare accessible, convenient, and transparent for everyone.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl gap-8 sm:grid-cols-2">
        {[
          { icon: Shield, title: "Trusted Platform", desc: "HIPAA compliant with enterprise-grade security for all medical records." },
          { icon: Award, title: "Top Doctors", desc: "Verified, board-certified doctors across 20+ specialties." },
          { icon: Users, title: "50,000+ Patients", desc: "Trusted by thousands of patients for their healthcare needs." },
          { icon: Heart, title: "Patient-First", desc: "Built with a patient-centric approach for the best experience." },
        ].map((item) => (
          <div key={item.title} className="flex gap-4 rounded-xl border bg-card p-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <item.icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer />
  </div>
);

export default About;
