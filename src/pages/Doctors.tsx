import { motion } from "framer-motion";
import { Users, Star, CheckCircle2, Search, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockDoctors } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingShapes from "@/components/FloatingShapes";
import Tilt3DCard from "@/components/Tilt3DCard";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const Doctors = () => {
  const [search, setSearch] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState("");

  const specialties = [...new Set(mockDoctors.map((d) => d.specialty))];

  const filtered = mockDoctors.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase());
    const matchesSpecialty = !filterSpecialty || d.specialty === filterSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="relative">
        <FloatingShapes />
        <div className="container relative mx-auto px-4 py-16">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border glass-card px-4 py-1.5 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Expert Medical Team
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold text-foreground">
              Our <span className="text-gradient">Doctors</span>
            </h1>
            <p className="mt-3 text-muted-foreground">Find the right specialist for your needs</p>
          </motion.div>

          {/* Filters */}
          <motion.div
            className="mx-auto mb-10 flex max-w-2xl flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search by name or specialty..." className="pl-10 glass-card border-none shadow-md" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <select
              className="h-10 rounded-md border border-input bg-background px-3 text-sm glass-card"
              value={filterSpecialty}
              onChange={(e) => setFilterSpecialty(e.target.value)}
            >
              <option value="">All Specialties</option>
              {specialties.map((s) => <option key={s}>{s}</option>)}
            </select>
          </motion.div>

          {/* Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((doc, i) => (
              <motion.div key={doc.id} initial="hidden" animate="visible" variants={fadeUp} custom={i}>
                <Tilt3DCard intensity={6} className="group h-full">
                  <Card className="overflow-hidden glass-card border-none shadow-md transition-all hover:shadow-xl">
                    <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-accent/20 to-secondary/10">
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                      >
                        <Users className="h-20 w-20 text-primary/20" />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                    </div>
                    <CardContent className="relative -mt-4 p-6">
                      <h3 className="font-display text-lg font-semibold text-foreground">{doc.name}</h3>
                      <p className="text-sm text-primary">{doc.specialty}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{doc.experience_years} years experience</p>
                      <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{doc.bio}</p>
                      <div className="mt-3 flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star key={j} className="h-3.5 w-3.5 fill-warning text-warning" />
                        ))}
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <Badge variant="outline" className={doc.available ? "border-success/20 bg-success/10 text-success" : "border-destructive/20 bg-destructive/10 text-destructive"}>
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          {doc.available ? "Available" : "Unavailable"}
                        </Badge>
                        <Link to="/login/patient">
                          <Button size="sm" disabled={!doc.available} className="glow-primary">Book Now</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </Tilt3DCard>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mt-12 text-center text-muted-foreground">No doctors found matching your criteria.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Doctors;
