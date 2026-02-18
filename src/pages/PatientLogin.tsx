import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, Phone, Eye, EyeOff, Stethoscope, Heart, Shield, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import FloatingShapes from "@/components/FloatingShapes";
import Tilt3DCard from "@/components/Tilt3DCard";

const PatientLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    name: "", email: "", phone: "", password: "", date_of_birth: "", gender: "Male",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("access_token", "mock-patient-token");
      localStorage.setItem("user_type", "patient");
      localStorage.setItem("user_name", "John Smith");
      toast({ title: "Welcome back!", description: "Logged in successfully." });
      navigate("/dashboard/patient");
      setLoading(false);
    }, 800);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("access_token", "mock-patient-token");
      localStorage.setItem("user_type", "patient");
      localStorage.setItem("user_name", signupForm.name);
      toast({ title: "Account created!", description: "Welcome to MediCare." });
      navigate("/dashboard/patient");
      setLoading(false);
    }, 800);
  };

  const features = [
    { icon: Calendar, label: "Easy Booking", desc: "Schedule in seconds" },
    { icon: Shield, label: "Secure Data", desc: "HIPAA compliant" },
    { icon: Heart, label: "Quality Care", desc: "Top-rated doctors" },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Left panel — immersive 3D visual */}
      <div className="relative hidden w-1/2 overflow-hidden lg:flex lg:flex-col lg:items-center lg:justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-secondary" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,hsl(0_0%_100%/0.1),transparent_50%)]" />
        <FloatingShapes />

        <motion.div
          className="relative z-10 max-w-md px-10 text-primary-foreground"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary-foreground/15 backdrop-blur-sm"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <User className="h-10 w-10" />
          </motion.div>
          <h1 className="font-display text-5xl font-bold leading-tight">Patient Portal</h1>
          <p className="mt-5 text-lg opacity-90">
            Book appointments, view your medical history, and connect with top doctors.
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
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary glow-primary">
            <Stethoscope className="h-5 w-5 text-primary-foreground" />
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
                <CardTitle className="font-display text-2xl">Patient Access</CardTitle>
                <CardDescription>Login or create your patient account</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="login">
                  <TabsList className="mb-6 w-full">
                    <TabsTrigger value="login" className="flex-1">Login</TabsTrigger>
                    <TabsTrigger value="signup" className="flex-1">Sign Up</TabsTrigger>
                  </TabsList>

                  <TabsContent value="login">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                        <Label htmlFor="login-email">Email</Label>
                        <div className="relative mt-1">
                          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input id="login-email" type="email" placeholder="patient@example.com" className="pl-10" value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} required />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="login-password">Password</Label>
                        <div className="relative mt-1">
                          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input id="login-password" type={showPassword ? "text" : "password"} placeholder="••••••••" className="pl-10 pr-10" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} required />
                          <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      <Button className="w-full glow-primary" disabled={loading}>
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
                          <Input placeholder="John Smith" className="pl-10" value={signupForm.name} onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })} required />
                        </div>
                      </div>
                      <div>
                        <Label>Email</Label>
                        <div className="relative mt-1">
                          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input type="email" placeholder="patient@example.com" className="pl-10" value={signupForm.email} onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })} required />
                        </div>
                      </div>
                      <div>
                        <Label>Phone</Label>
                        <div className="relative mt-1">
                          <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input type="tel" placeholder="+1 555-0000" className="pl-10" value={signupForm.phone} onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })} required />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label>Date of Birth</Label>
                          <Input type="date" className="mt-1" value={signupForm.date_of_birth} onChange={(e) => setSignupForm({ ...signupForm, date_of_birth: e.target.value })} required />
                        </div>
                        <div>
                          <Label>Gender</Label>
                          <select className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background" value={signupForm.gender} onChange={(e) => setSignupForm({ ...signupForm, gender: e.target.value })}>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <Label>Password</Label>
                        <div className="relative mt-1">
                          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input type="password" placeholder="••••••••" className="pl-10" value={signupForm.password} onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })} required />
                        </div>
                      </div>
                      <Button className="w-full glow-primary" disabled={loading}>
                        {loading ? "Creating account..." : "Create Account"}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                  Are you a doctor?{" "}
                  <Link to="/login/doctor" className="font-medium text-primary hover:underline">
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

export default PatientLogin;
