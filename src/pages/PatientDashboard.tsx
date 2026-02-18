import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  Plus,
  LogOut,
  User,
  Stethoscope,
  Activity,
  FileText,
  Bell,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { mockPatientAppointments, mockPatientStats, mockDoctors } from "@/data/mockData";

const statusColors: Record<string, string> = {
  confirmed: "bg-success/10 text-success border-success/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  completed: "bg-primary/10 text-primary border-primary/20",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

const PatientDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const userName = localStorage.getItem("user_name") || "Patient";
  const [appointments, setAppointments] = useState(mockPatientAppointments);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    doctor_id: "",
    date: "",
    time: "",
    reason: "",
  });

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    const doctor = mockDoctors.find((d) => d.id === Number(bookingForm.doctor_id));
    const newAppt = {
      id: Date.now(),
      patient_id: 1,
      doctor_id: Number(bookingForm.doctor_id),
      date: bookingForm.date,
      time: bookingForm.time,
      status: "pending" as const,
      reason: bookingForm.reason,
      doctor,
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
    { icon: Calendar, label: "Total", value: mockPatientStats.total_appointments, color: "text-primary" },
    { icon: Clock, label: "Upcoming", value: mockPatientStats.upcoming_appointments, color: "text-warning" },
    { icon: CheckCircle2, label: "Completed", value: mockPatientStats.completed_appointments, color: "text-success" },
    { icon: XCircle, label: "Cancelled", value: mockPatientStats.cancelled_appointments, color: "text-destructive" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b bg-card/90 backdrop-blur-md">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Stethoscope className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold">MediCare</span>
          </Link>
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Welcome */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">Welcome, {userName}</h1>
              <p className="text-sm text-muted-foreground">Manage your appointments and health records</p>
            </div>
            <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" /> Book Appointment
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="font-display">Book New Appointment</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleBook} className="space-y-4">
                  <div>
                    <Label>Select Doctor</Label>
                    <select
                      className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={bookingForm.doctor_id}
                      onChange={(e) => setBookingForm({ ...bookingForm, doctor_id: e.target.value })}
                      required
                    >
                      <option value="">Choose a doctor...</option>
                      {mockDoctors.filter((d) => d.available).map((d) => (
                        <option key={d.id} value={d.id}>{d.name} — {d.specialty}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Date</Label>
                      <Input type="date" className="mt-1" value={bookingForm.date} onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })} required />
                    </div>
                    <div>
                      <Label>Time</Label>
                      <Input type="time" className="mt-1" value={bookingForm.time} onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })} required />
                    </div>
                  </div>
                  <div>
                    <Label>Reason</Label>
                    <Textarea className="mt-1" placeholder="Describe your symptoms or reason..." value={bookingForm.reason} onChange={(e) => setBookingForm({ ...bookingForm, reason: e.target.value })} required />
                  </div>
                  <Button className="w-full">Confirm Booking</Button>
                </form>
              </DialogContent>
            </Dialog>
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

          {/* Quick actions */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Activity, label: "Health Records", desc: "View your medical history" },
              { icon: FileText, label: "Prescriptions", desc: "Access your prescriptions" },
              { icon: Stethoscope, label: "Find Doctors", desc: "Browse specialists", link: "/doctors" },
            ].map((action) => (
              <Link key={action.label} to={action.link || "#"}>
                <Card className="cursor-pointer transition-shadow hover:shadow-md">
                  <CardContent className="flex items-center gap-4 p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                      <action.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{action.label}</p>
                      <p className="text-xs text-muted-foreground">{action.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Appointments Table */}
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg">My Appointments</CardTitle>
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
                    <TableRow key={appt.id}>
                      <TableCell className="font-medium">{appt.doctor?.name}</TableCell>
                      <TableCell className="text-muted-foreground">{appt.doctor?.specialty}</TableCell>
                      <TableCell>{appt.date}</TableCell>
                      <TableCell>{appt.time}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusColors[appt.status]}>
                          {appt.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate text-muted-foreground">{appt.reason}</TableCell>
                      <TableCell className="text-right">
                        {(appt.status === "pending" || appt.status === "confirmed") && (
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => handleCancel(appt.id)}>
                            Cancel
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default PatientDashboard;
