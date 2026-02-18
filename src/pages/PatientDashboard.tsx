import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar, Clock, CheckCircle2, XCircle, Plus, LogOut, User,
  Stethoscope, Activity, FileText, Bell, Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { mockPatientAppointments, mockPatientStats, mockDoctors } from "@/data/mockData";
import Tilt3DCard from "@/components/Tilt3DCard";
import AnimatedCounter from "@/components/AnimatedCounter";

const statusColors: Record<string, string> = {
  confirmed: "bg-success/10 text-success border-success/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  completed: "bg-primary/10 text-primary border-primary/20",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const PatientDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const userName = localStorage.getItem("user_name") || "Patient";
  const [appointments, setAppointments] = useState(mockPatientAppointments);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({ doctor_id: "", date: "", time: "", reason: "" });

  const handleLogout = () => { localStorage.clear(); navigate("/"); };

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    const doctor = mockDoctors.find((d) => d.id === Number(bookingForm.doctor_id));
    const newAppt = {
      id: Date.now(), patient_id: 1, doctor_id: Number(bookingForm.doctor_id),
      date: bookingForm.date, time: bookingForm.time, status: "pending" as const,
      reason: bookingForm.reason, doctor,
    };
    setAppointments([newAppt, ...appointments]);
    setBookingOpen(false);
    setBookingForm({ doctor_id: "", date: "", time: "", reason: "" });
    toast({ title: "Appointment booked!", description: `With ${doctor?.name} on ${bookingForm.date}` });
  };

  const handleCancel = (id: number) => {
    setAppointments(appointments.map((a) => (a.id === id ? { ...a, status: "cancelled" as const } : a)));
    toast({ title: "Appointment cancelled", variant: "destructive" });
  };

  const stats = [
    { icon: Calendar, label: "Total", value: mockPatientStats.total_appointments, color: "text-primary", glow: "glow-primary" },
    { icon: Clock, label: "Upcoming", value: mockPatientStats.upcoming_appointments, color: "text-warning", glow: "" },
    { icon: CheckCircle2, label: "Completed", value: mockPatientStats.completed_appointments, color: "text-success", glow: "" },
    { icon: XCircle, label: "Cancelled", value: mockPatientStats.cancelled_appointments, color: "text-destructive", glow: "" },
  ];

  return (
    <div className="min-h-screen bg-background gradient-mesh">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b glass-card">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary glow-primary">
              <Stethoscope className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold">MediCare</span>
          </Link>
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.1 }} className="relative cursor-pointer">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-destructive text-[8px] text-destructive-foreground">3</span>
            </motion.div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20">
                <User className="h-4 w-4 text-primary" />
              </div>
              <span className="hidden text-sm font-medium sm:inline">{userName}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          {/* Welcome */}
          <motion.div variants={fadeUp} className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">
                Welcome, <span className="text-gradient">{userName}</span>
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">Manage your appointments and health records</p>
            </div>
            <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 glow-primary rounded-full px-6">
                  <Plus className="h-4 w-4" /> Book Appointment
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-card">
                <DialogHeader>
                  <DialogTitle className="font-display">Book New Appointment</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleBook} className="space-y-4">
                  <div>
                    <Label>Select Doctor</Label>
                    <select className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={bookingForm.doctor_id} onChange={(e) => setBookingForm({ ...bookingForm, doctor_id: e.target.value })} required>
                      <option value="">Choose a doctor...</option>
                      {mockDoctors.filter((d) => d.available).map((d) => (
                        <option key={d.id} value={d.id}>{d.name} — {d.specialty}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><Label>Date</Label><Input type="date" className="mt-1" value={bookingForm.date} onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })} required /></div>
                    <div><Label>Time</Label><Input type="time" className="mt-1" value={bookingForm.time} onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })} required /></div>
                  </div>
                  <div><Label>Reason</Label><Textarea className="mt-1" placeholder="Describe your symptoms..." value={bookingForm.reason} onChange={(e) => setBookingForm({ ...bookingForm, reason: e.target.value })} required /></div>
                  <Button className="w-full glow-primary">Confirm Booking</Button>
                </form>
              </DialogContent>
            </Dialog>
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeUp} className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Tilt3DCard key={s.label} intensity={6} className="group">
                <Card className={`glass-card border-none shadow-md transition-all hover:shadow-xl ${s.glow}`}>
                  <CardContent className="flex items-center gap-4 p-5">
                    <motion.div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-muted ${s.color}`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <s.icon className="h-5 w-5" />
                    </motion.div>
                    <div>
                      <p className="text-3xl font-bold text-foreground">{s.value}</p>
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                    </div>
                  </CardContent>
                </Card>
              </Tilt3DCard>
            ))}
          </motion.div>

          {/* Quick actions */}
          <motion.div variants={fadeUp} className="mb-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Activity, label: "Health Records", desc: "View your medical history", color: "from-primary/10 to-primary/5" },
              { icon: FileText, label: "Prescriptions", desc: "Access your prescriptions", color: "from-secondary/10 to-secondary/5" },
              { icon: Stethoscope, label: "Find Doctors", desc: "Browse specialists", link: "/doctors", color: "from-accent to-accent/50" },
            ].map((action) => (
              <Link key={action.label} to={action.link || "#"}>
                <Tilt3DCard intensity={8} className="group">
                  <Card className="glass-card cursor-pointer border-none shadow-md transition-all hover:shadow-xl">
                    <CardContent className="flex items-center gap-4 p-5">
                      <motion.div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${action.color}`}
                        whileHover={{ scale: 1.15, rotate: -5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <action.icon className="h-5 w-5 text-primary" />
                      </motion.div>
                      <div>
                        <p className="font-medium text-foreground">{action.label}</p>
                        <p className="text-xs text-muted-foreground">{action.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Tilt3DCard>
              </Link>
            ))}
          </motion.div>

          {/* Appointments Table */}
          <motion.div variants={fadeUp}>
            <Card className="glass-card border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display text-lg">
                  <Sparkles className="h-5 w-5 text-primary" /> My Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Specialty</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map((appt) => (
                      <TableRow key={appt.id} className="transition-colors hover:bg-accent/30">
                        <TableCell className="font-medium">{appt.doctor?.name}</TableCell>
                        <TableCell className="text-muted-foreground">{appt.doctor?.specialty}</TableCell>
                        <TableCell>{appt.date}</TableCell>
                        <TableCell>{appt.time}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={statusColors[appt.status]}>{appt.status}</Badge>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate text-muted-foreground">{appt.reason}</TableCell>
                        <TableCell className="text-right">
                          {(appt.status === "pending" || appt.status === "confirmed") && (
                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => handleCancel(appt.id)}>Cancel</Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default PatientDashboard;
