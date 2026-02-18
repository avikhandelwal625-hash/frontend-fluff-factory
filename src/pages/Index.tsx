import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
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
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mockDoctors } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingShapes from "@/components/FloatingShapes";
import AnimatedCounter from "@/components/AnimatedCounter";
import Tilt3DCard from "@/components/Tilt3DCard";
import { useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const Index = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

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
      <section ref={heroRef} className="relative overflow-hidden">
        <FloatingShapes />
        <div className="absolute inset-0 gradient-mesh" />
        <motion.div
          className="container relative mx-auto px-4 py-24 lg:py-36"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="mx-auto max-w-3xl text-center">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border glass-card px-5 py-2 text-xs font-medium text-primary shadow-sm">
                <Sparkles className="h-3.5 w-3.5" /> Trusted Healthcare Platform
              </span>
            </motion.div>

            <motion.h1
              className="mt-6 font-display text-5xl font-bold leading-tight text-foreground md:text-7xl"
              initial="hidden" animate="visible" variants={fadeUp} custom={1}
            >
              Your Health,{" "}
              <span className="text-gradient">
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
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
              initial="hidden" animate="visible" variants={fadeUp} custom={3}
            >
              <Link to="/login/patient">
                <Button size="lg" className="gap-2 rounded-full px-8 glow-primary transition-shadow hover:shadow-[0_0_60px_hsl(199_89%_48%/0.4)]">
                  Book Appointment <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/doctors">
                <Button size="lg" variant="outline" className="rounded-full px-8 glass-card border-primary/20 hover:border-primary/40">
                  Find Doctors
                </Button>
              </Link>
            </motion.div>

            {/* 3D floating preview cards */}
            <motion.div
              className="mt-16 flex justify-center gap-6"
              initial="hidden" animate="visible" variants={fadeUp} custom={4}
            >
              {[
                { icon: Stethoscope, label: "50+ Specialties", color: "text-primary" },
                { icon: Shield, label: "HIPAA Compliant", color: "text-secondary" },
                { icon: Heart, label: "Trusted Care", color: "text-primary" },
              ].map((item, i) => (
                <Tilt3DCard key={item.label} className="group" intensity={15}>
                  <div className="glass-card rounded-2xl p-4 shadow-lg transition-shadow hover:shadow-xl">
                    <item.icon className={`mx-auto h-8 w-8 ${item.color}`} />
                    <p className="mt-2 text-xs font-medium text-muted-foreground">{item.label}</p>
                  </div>
                </Tilt3DCard>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="relative border-y bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto grid grid-cols-2 gap-6 px-4 py-14 md:grid-cols-4">
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
              <AnimatedCounter
                value={s.value}
                className="font-display text-4xl font-bold text-gradient"
              />
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-50" />
        <div className="container relative mx-auto px-4 py-24">
          <motion.div
            className="mb-14 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="font-display text-4xl font-bold text-foreground">
              Why Choose <span className="text-gradient">MediCare</span>?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              We provide a seamless healthcare experience powered by technology.
            </p>
          </motion.div>
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {features.map((f, i) => (
              <motion.div key={f.title} variants={fadeUp} custom={i}>
                <Tilt3DCard className="group h-full" intensity={8}>
                  <Card className="h-full border-none glass-card shadow-md transition-all hover:shadow-xl hover:glow-primary">
                    <CardContent className="p-7">
                      <motion.div
                        className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <f.icon className="h-7 w-7 text-primary" />
                      </motion.div>
                      <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{f.title}</h3>
                      <p className="text-sm text-muted-foreground">{f.desc}</p>
                    </CardContent>
                  </Card>
                </Tilt3DCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Doctors Preview */}
      <section className="relative bg-muted/20 py-24">
        <FloatingShapes />
        <div className="container relative mx-auto px-4">
          <motion.div
            className="mb-14 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="font-display text-4xl font-bold text-foreground">Our Top <span className="text-gradient">Doctors</span></h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              Meet our experienced medical professionals.
            </p>
          </motion.div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {mockDoctors.slice(0, 3).map((doc, i) => (
              <motion.div
                key={doc.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <Tilt3DCard className="group h-full" intensity={6}>
                  <Card className="overflow-hidden glass-card border-none shadow-md transition-all hover:shadow-xl">
                    <div className="relative flex h-52 items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-accent/20 to-secondary/10">
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                      >
                        <Users className="h-24 w-24 text-primary/20" />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                    </div>
                    <CardContent className="relative -mt-6 p-6">
                      <h3 className="font-display text-lg font-semibold text-foreground">{doc.name}</h3>
                      <p className="text-sm text-primary">{doc.specialty}</p>
                      <p className="mt-2 text-xs text-muted-foreground">{doc.experience_years} years experience</p>
                      <div className="mt-3 flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star key={j} className="h-3.5 w-3.5 fill-warning text-warning" />
                        ))}
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${doc.available ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
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
                </Tilt3DCard>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/doctors">
              <Button variant="outline" className="gap-2 rounded-full px-8 glass-card border-primary/20">
                View All Doctors <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-24">
        <Tilt3DCard intensity={4}>
          <motion.div
            className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-secondary p-12 text-center text-primary-foreground shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(0_0%_100%/0.1),transparent_60%)]" />
            <div className="relative">
              <h2 className="font-display text-4xl font-bold">Ready to Get Started?</h2>
              <p className="mx-auto mt-4 max-w-md text-lg opacity-90">
                Join thousands of patients who trust MediCare for their healthcare needs.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link to="/login/patient">
                  <Button size="lg" variant="secondary" className="rounded-full px-8 font-semibold text-foreground shadow-lg">
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
          </motion.div>
        </Tilt3DCard>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
