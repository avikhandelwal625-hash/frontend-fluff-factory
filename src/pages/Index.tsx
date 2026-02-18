import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Stethoscope,
  Calendar,
  Shield,
  Clock,
  Heart,
  Users,
  Star,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mockDoctors } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const Index = () => {
  const features = [
    { icon: Calendar, title: "Easy Scheduling", desc: "Book appointments online in seconds with your preferred doctor." },
    { icon: Shield, title: "Secure Records", desc: "Your medical records are encrypted and safely stored in our system." },
    { icon: Clock, title: "24/7 Support", desc: "Round-the-clock customer support for all your healthcare queries." },
    { icon: Heart, title: "Quality Care", desc: "Access to top-rated doctors across multiple specialties." },
  ];

  const stats = [
    { value: "500+", label: "Doctors" },
    { value: "50K+", label: "Patients" },
    { value: "100K+", label: "Appointments" },
    { value: "98%", label: "Satisfaction" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="container relative mx-auto px-4 py-20 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-xs font-medium text-primary">
                <Stethoscope className="h-3.5 w-3.5" /> Trusted Healthcare Platform
              </span>
            </motion.div>

            <motion.h1
              className="mt-4 font-display text-4xl font-bold leading-tight text-foreground md:text-6xl"
              initial="hidden" animate="visible" variants={fadeUp} custom={1}
            >
              Your Health,{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Our Priority
              </span>
            </motion.h1>

            <motion.p
              className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground"
              initial="hidden" animate="visible" variants={fadeUp} custom={2}
            >
              Connect with experienced doctors, book appointments instantly, and manage your healthcare journey — all in one place.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
              initial="hidden" animate="visible" variants={fadeUp} custom={3}
            >
              <Link to="/login/patient">
                <Button size="lg" className="gap-2 rounded-full px-8">
                  Book Appointment <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/doctors">
                <Button size="lg" variant="outline" className="rounded-full px-8">
                  Find Doctors
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-card">
        <div className="container mx-auto grid grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
            >
              <p className="font-display text-3xl font-bold text-primary">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground">Why Choose MediCare?</h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            We provide a seamless healthcare experience powered by technology.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
            >
              <Card className="h-full border-none bg-gradient-to-b from-card to-muted/30 shadow-md transition-shadow hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <f.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Doctors Preview */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold text-foreground">Our Top Doctors</h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              Meet our experienced medical professionals.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mockDoctors.slice(0, 3).map((doc, i) => (
              <motion.div
                key={doc.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <Card className="overflow-hidden transition-shadow hover:shadow-lg">
                  <div className="flex h-48 items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                    <Users className="h-20 w-20 text-primary/30" />
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-display text-lg font-semibold text-foreground">{doc.name}</h3>
                    <p className="text-sm text-primary">{doc.specialty}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{doc.experience_years} years experience</p>
                    <div className="mt-3 flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className="h-3.5 w-3.5 fill-warning text-warning" />
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${doc.available ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                        <CheckCircle2 className="h-3 w-3" />
                        {doc.available ? "Available" : "Unavailable"}
                      </span>
                      <Link to="/login/patient">
                        <Button size="sm" variant="outline" className="text-xs">
                          Book Now
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/doctors">
              <Button variant="outline" className="gap-2 rounded-full px-8">
                View All Doctors <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-2xl rounded-2xl bg-gradient-to-r from-primary to-secondary p-10 text-center text-primary-foreground shadow-xl">
          <h2 className="font-display text-3xl font-bold">Ready to Get Started?</h2>
          <p className="mx-auto mt-3 max-w-md opacity-90">
            Join thousands of patients who trust MediCare for their healthcare needs.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/login/patient">
              <Button size="lg" variant="secondary" className="rounded-full px-8 font-semibold text-foreground">
                Patient Sign Up
              </Button>
            </Link>
            <Link to="/login/doctor">
              <Button size="lg" variant="outline" className="rounded-full border-primary-foreground/30 px-8 text-primary-foreground hover:bg-primary-foreground/10">
                Doctor Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
