import { motion } from "framer-motion";
import { Users, Star, CheckCircle2, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockDoctors } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
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
      <div className="container mx-auto px-4 py-12">
        <div className="mb-10 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground">Our Doctors</h1>
          <p className="mt-2 text-muted-foreground">Find the right specialist for your needs</p>
        </div>

        {/* Filters */}
        <div className="mx-auto mb-8 flex max-w-2xl flex-wrap items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search by name or specialty..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <select
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
            value={filterSpecialty}
            onChange={(e) => setFilterSpecialty(e.target.value)}
          >
            <option value="">All Specialties</option>
            {specialties.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((doc, i) => (
            <motion.div key={doc.id} initial="hidden" animate="visible" variants={fadeUp} custom={i}>
              <Card className="overflow-hidden transition-shadow hover:shadow-lg">
                <div className="flex h-44 items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                  <Users className="h-16 w-16 text-primary/30" />
                </div>
                <CardContent className="p-5">
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
                      <Button size="sm" disabled={!doc.available}>Book Now</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-muted-foreground">No doctors found matching your criteria.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Doctors;
