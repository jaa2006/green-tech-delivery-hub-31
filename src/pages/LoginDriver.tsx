
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, LogIn, ArrowRight, Loader2, ArrowLeft } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const LoginDriver = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!email || !password) {
        toast({
          title: "Error",
          description: "Email dan password harus diisi",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check user role
      const roleDoc = await getDoc(doc(db, "users", user.uid));
      const userData = roleDoc.data();

      if (!userData || userData.role !== "driver") {
        toast({
          title: "Error",
          description: "Akun ini bukan akun driver",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      toast({
        title: "Login berhasil",
        description: "Selamat datang kembali, Driver!",
      });

      navigate("/driver-dashboard");
    } catch (error: any) {
      let errorMessage = "Login gagal";
      
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = "Email atau password salah";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Format email tidak valid";
      }
      
      toast({
        title: "Login Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-habisin-dark rounded-b-3xl h-32 flex items-center justify-center relative">
        <Link to="/" className="absolute left-6 top-1/2 -translate-y-1/2">
          <ArrowLeft className="h-6 w-6 text-white" />
        </Link>
        <h1 className="text-white text-3xl font-bold">Login Driver</h1>
      </div>

      {/* Login container */}
      <div className="max-w-md w-full mx-auto mt-[-2rem] px-6">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Masukkan email Anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <LogIn className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Masukkan password Anda"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Masuk...
                </>
              ) : (
                <>
                  Masuk
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Belum punya akun?{" "}
            <Link
              to="/register-driver"
              className="text-green-600 font-medium hover:underline"
            >
              Daftar sebagai Driver
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginDriver;
