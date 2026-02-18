import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  LogOut,
  User,
  Stethoscope,
  Bell,
  Users,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { mockDoctorAppointments, mockDoctorStats } from "@/data/mockData";

const statusColors: Record<string, string> = {
  confirmed: "bg-success/10 text-success border-success/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  completed: "bg-primary/10 text-primary border-primary/20",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const userName = localStorage.getItem("user_name") || "Doctor";
  const [appointments, setAppointments] = useState(mockDoctorAppointments);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleStatusChange = (id: number, newStatus: "confirmed" | "completed" | "cancelled") => {
    setAppointments(appointments.map((a) => (a.id === id ? { ...a, status: newStatus } : a)));
    toast({
      title: `Appointment ${newStatus}`,
      variant: newStatus === "cancelled" ? "destructive" : "default",
    });
  };

  const stats = [
    { icon: Calendar, label: "Total Appointments", value: mockDoctorStats.total_appointments, color: "text-primary" },
    { icon: Clock, label: "Upcoming", value: mockDoctorStats.upcoming_appointments, color: "text-warning" },
    { icon: CheckCircle2, label: "Completed", value: mockDoctorStats.completed_appointments, color: "text-success" },
    { icon: Users, label: "Patients Today", value: 3, color: "text-secondary" },
  ];

  const todayAppts = appointments.filter((a) => a.date === "2026-02-20");
  const upcomingAppts = appointments.filter((a) => a.status === "pending" || a.status === "confirmed");

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b bg-card/90 backdrop-blur-md">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
              <Stethoscope className="h-4 w-4 text-secondary-foreground" />
            </div>
            <span className="font-display text-lg font-bold">MediCare <span className="text-xs font-normal text-muted-foreground">Doctor</span></span>
          </Link>
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/10">
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="font-display text-2xl font-bold text-foreground">Good Morning, {userName}</h1>
            <p className="text-sm text-muted-foreground">Here's your schedule for today</p>
          </div>

          {/* Stats */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <Card key={s.label}>
                <CardContent className="flex items-center gap-4 p-5">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-muted ${s.color}`}>
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Today's Schedule */}
            <div className="lg:col-span-1">
              <Card>
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
                      <div key={appt.id} className="flex items-center gap-3 rounded-lg border p-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{appt.patient?.name}</p>
                          <p className="text-xs text-muted-foreground">{appt.time} — {appt.reason}</p>
                        </div>
                        <Badge variant="outline" className={statusColors[appt.status]}>
                          {appt.status}
                        </Badge>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>

              {/* Quick Stats Card */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-display text-lg">
                    <TrendingUp className="h-5 w-5 text-secondary" /> Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Completion Rate</span>
                    <span className="font-semibold text-success">95%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-2 w-[95%] rounded-full bg-success" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Patient Satisfaction</span>
                    <span className="font-semibold text-primary">4.8/5</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-2 w-[96%] rounded-full bg-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* All Appointments */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="font-display text-lg">All Appointments</CardTitle>
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
                        <TableRow key={appt.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
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
                            <Badge variant="outline" className={statusColors[appt.status]}>
                              {appt.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              {appt.status === "pending" && (
                                <Button size="sm" variant="outline" className="text-xs text-success" onClick={() => handleStatusChange(appt.id, "confirmed")}>
                                  Confirm
                                </Button>
                              )}
                              {(appt.status === "confirmed") && (
                                <Button size="sm" variant="outline" className="text-xs text-primary" onClick={() => handleStatusChange(appt.id, "completed")}>
                                  Complete
                                </Button>
                              )}
                              {(appt.status === "pending" || appt.status === "confirmed") && (
                                <Button size="sm" variant="ghost" className="text-xs text-destructive" onClick={() => handleStatusChange(appt.id, "cancelled")}>
                                  Cancel
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
