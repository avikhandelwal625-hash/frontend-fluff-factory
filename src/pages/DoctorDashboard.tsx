import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar, Clock, CheckCircle2, XCircle, LogOut, User,
  Stethoscope, Bell, Users, TrendingUp, Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { mockDoctorAppointments, mockDoctorStats } from "@/data/mockData";
import Tilt3DCard from "@/components/Tilt3DCard";

const statusColors: Record<string, string> = {
  confirmed: "bg-success/10 text-success border-success/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  completed: "bg-primary/10 text-primary border-primary/20",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const userName = localStorage.getItem("user_name") || "Doctor";
  const [appointments, setAppointments] = useState(mockDoctorAppointments);

  const handleLogout = () => { localStorage.clear(); navigate("/"); };

  const handleStatusChange = (id: number, newStatus: "confirmed" | "completed" | "cancelled") => {
    setAppointments(appointments.map((a) => (a.id === id ? { ...a, status: newStatus } : a)));
    toast({ title: `Appointment ${newStatus}`, variant: newStatus === "cancelled" ? "destructive" : "default" });
  };

  const stats = [
    { icon: Calendar, label: "Total Appointments", value: mockDoctorStats.total_appointments, color: "text-primary", glow: "glow-primary" },
    { icon: Clock, label: "Upcoming", value: mockDoctorStats.upcoming_appointments, color: "text-warning", glow: "" },
    { icon: CheckCircle2, label: "Completed", value: mockDoctorStats.completed_appointments, color: "text-success", glow: "" },
    { icon: Users, label: "Patients Today", value: 3, color: "text-secondary", glow: "glow-secondary" },
  ];

  const todayAppts = appointments.filter((a) => a.date === "2026-02-20");

  return (
    <div className="min-h-screen bg-background gradient-mesh">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b glass-card">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary glow-secondary">
              <Stethoscope className="h-4 w-4 text-secondary-foreground" />
            </div>
            <span className="font-display text-lg font-bold">MediCare <span className="text-xs font-normal text-muted-foreground">Doctor</span></span>
          </Link>
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.1 }} className="relative cursor-pointer">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-destructive text-[8px] text-destructive-foreground">5</span>
            </motion.div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-secondary/20 to-primary/20">
                <Stethoscope className="h-4 w-4 text-secondary" />
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
          <motion.div variants={fadeUp} className="mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground">
              Good Morning, <span className="text-gradient">{userName}</span>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">Here's your schedule for today</p>
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeUp} className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
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

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Today's Schedule */}
            <motion.div variants={fadeUp} className="lg:col-span-1 space-y-6">
              <Tilt3DCard intensity={4}>
                <Card className="glass-card border-none shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-display text-lg">
                      <Calendar className="h-5 w-5 text-primary" /> Today's Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {todayAppts.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No appointments today.</p>
                    ) : (
                      todayAppts.map((appt) => (
                        <motion.div
                          key={appt.id}
                          className="flex items-center gap-3 rounded-xl border p-3 transition-colors hover:bg-accent/30"
                          whileHover={{ x: 4 }}
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{appt.patient?.name}</p>
                            <p className="text-xs text-muted-foreground">{appt.time} — {appt.reason}</p>
                          </div>
                          <Badge variant="outline" className={statusColors[appt.status]}>{appt.status}</Badge>
                        </motion.div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </Tilt3DCard>

              <Tilt3DCard intensity={4}>
                <Card className="glass-card border-none shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-display text-lg">
                      <TrendingUp className="h-5 w-5 text-secondary" /> Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Completion Rate</span>
                        <span className="font-bold text-success">95%</span>
                      </div>
                      <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-success to-secondary"
                          initial={{ width: 0 }}
                          animate={{ width: "95%" }}
                          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Patient Satisfaction</span>
                        <span className="font-bold text-primary">4.8/5</span>
                      </div>
                      <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                          initial={{ width: 0 }}
                          animate={{ width: "96%" }}
                          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Tilt3DCard>
            </motion.div>

            {/* All Appointments */}
            <motion.div variants={fadeUp} className="lg:col-span-2">
              <Card className="glass-card border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-display text-lg">
                    <Sparkles className="h-5 w-5 text-primary" /> All Appointments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {appointments.map((appt) => (
                        <TableRow key={appt.id} className="transition-colors hover:bg-accent/30">
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary/15 to-secondary/15">
                                <User className="h-4 w-4 text-muted-foreground" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">{appt.patient?.name}</p>
                                <p className="text-xs text-muted-foreground">{appt.patient?.gender}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{appt.date}</TableCell>
                          <TableCell>{appt.time}</TableCell>
                          <TableCell className="max-w-[150px] truncate text-muted-foreground">{appt.reason}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={statusColors[appt.status]}>{appt.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              {appt.status === "pending" && (
                                <Button size="sm" variant="outline" className="text-xs text-success" onClick={() => handleStatusChange(appt.id, "confirmed")}>Confirm</Button>
                              )}
                              {appt.status === "confirmed" && (
                                <Button size="sm" variant="outline" className="text-xs text-primary" onClick={() => handleStatusChange(appt.id, "completed")}>Complete</Button>
                              )}
                              {(appt.status === "pending" || appt.status === "confirmed") && (
                                <Button size="sm" variant="ghost" className="text-xs text-destructive" onClick={() => handleStatusChange(appt.id, "cancelled")}>Cancel</Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
