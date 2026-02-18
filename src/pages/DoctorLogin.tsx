import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Stethoscope, Mail, Lock, Phone, Eye, EyeOff, User, Briefcase, TrendingUp, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import FloatingShapes from "@/components/FloatingShapes";
import Tilt3DCard from "@/components/Tilt3DCard";

const DoctorLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({ name: "", email: "", phone: "", password: "", specialty: "" });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("access_token", "mock-doctor-token");
      localStorage.setItem("user_type", "doctor");
      localStorage.setItem("user_name", "Dr. Sarah Johnson");
      toast({ title: "Welcome back, Doctor!", description: "Logged in successfully." });
      navigate("/dashboard/doctor");
      setLoading(false);
    }, 800);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("access_token", "mock-doctor-token");
      localStorage.setItem("user_type", "doctor");
      localStorage.setItem("user_name", signupForm.name);
      toast({ title: "Account created!", description: "Welcome to MediCare." });
      navigate("/dashboard/doctor");
      setLoading(false);
    }, 800);
  };

  const specialties = [
    "Cardiologist", "Dermatologist", "Neurologist", "Orthopedic Surgeon",
    "Pediatrician", "Psychiatrist", "General Physician", "ENT Specialist",
    "Ophthalmologist", "Dentist",
  ];

  const features = [
    { icon: TrendingUp, label: "Practice Analytics", desc: "Track your performance" },
    { icon: Users, label: "Patient Management", desc: "Streamline your workflow" },
    { icon: Award, label: "Build Reputation", desc: "Grow your practice" },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="relative hidden w-1/2 overflow-hidden lg:flex lg:flex-col lg:items-center lg:justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/90 to-primary" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsl(0_0%_100%/0.1),transparent_50%)]" />
        <FloatingShapes />

        <motion.div
          className="relative z-10 max-w-md px-10 text-primary-foreground"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary-foreground/15 backdrop-blur-sm"
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Stethoscope className="h-10 w-10" />
          </motion.div>
          <h1 className="font-display text-5xl font-bold leading-tight">Doctor Portal</h1>
          <p className="mt-5 text-lg opacity-90">
            Manage your practice, view patient appointments, and streamline your workflow.
          </p>

          <div className="mt-10 space-y-4">
            {features.map((f, i) => (
              <motion.div
                key={f.label}
                className="flex items-center gap-4 rounded-2xl bg-primary-foreground/10 p-4 backdrop-blur-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground/15">
                  <f.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold">{f.label}</p>
                  <p className="text-sm opacity-75">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right panel */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="absolute inset-0 gradient-mesh opacity-30" />
        <Link to="/" className="relative z-10 mb-8 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary glow-secondary">
            <Stethoscope className="h-5 w-5 text-secondary-foreground" />
          </div>
          <span className="font-display text-xl font-bold">Medi<span className="text-primary">Care</span></span>
        </Link>

        <motion.div
          className="relative z-10 w-full max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Tilt3DCard intensity={4} glare>
            <Card className="border-none glass-card shadow-2xl">
              <CardHeader className="text-center pb-2">
                <CardTitle className="font-display text-2xl">Doctor Access</CardTitle>
                <CardDescription>Login or register as a healthcare provider</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="login">
                  <TabsList className="mb-6 w-full">
                    <TabsTrigger value="login" className="flex-1">Login</TabsTrigger>
                    <TabsTrigger value="signup" className="flex-1">Register</TabsTrigger>
                  </TabsList>

                  <TabsContent value="login">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                        <Label>Email</Label>
                        <div className="relative mt-1">
                          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input type="email" placeholder="doctor@medicare.com" className="pl-10" value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} required />
                        </div>
                      </div>
                      <div>
                        <Label>Password</Label>
                        <div className="relative mt-1">
                          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input type={showPassword ? "text" : "password"} placeholder="••••••••" className="pl-10 pr-10" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} required />
                          <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      <Button className="w-full glow-secondary" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="signup">
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div>
                        <Label>Full Name</Label>
                        <div className="relative mt-1">
                          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input placeholder="Dr. Jane Doe" className="pl-10" value={signupForm.name} onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })} required />
                        </div>
                      </div>
                      <div>
                        <Label>Email</Label>
                        <div className="relative mt-1">
                          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input type="email" placeholder="doctor@medicare.com" className="pl-10" value={signupForm.email} onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })} required />
                        </div>
                      </div>
                      <div>
                        <Label>Specialty</Label>
                        <div className="relative mt-1">
                          <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <select className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background" value={signupForm.specialty} onChange={(e) => setSignupForm({ ...signupForm, specialty: e.target.value })} required>
                            <option value="">Select specialty</option>
                            {specialties.map((s) => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>
                      </div>
                      <div>
                        <Label>Phone</Label>
                        <div className="relative mt-1">
                          <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input type="tel" placeholder="+1 555-0000" className="pl-10" value={signupForm.phone} onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })} required />
                        </div>
                      </div>
                      <div>
                        <Label>Password</Label>
                        <div className="relative mt-1">
                          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input type="password" placeholder="••••••••" className="pl-10" value={signupForm.password} onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })} required />
                        </div>
                      </div>
                      <Button className="w-full glow-secondary" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                  Are you a patient?{" "}
                  <Link to="/login/patient" className="font-medium text-primary hover:underline">
                    Login here
                  </Link>
                </p>
              </CardContent>
            </Card>
          </Tilt3DCard>
        </motion.div>
      </div>
    </div>
  );
};

export default DoctorLogin;
