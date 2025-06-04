
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, LogIn, ArrowRight, Loader2, ArrowLeft } from "lucide-react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const RegisterUser = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!name || !email || !password) {
        toast({
          title: "Error",
          description: "Semua field harus diisi",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      if (!acceptTerms) {
        toast({
          title: "Error",
          description: "Anda harus menerima syarat dan ketentuan",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user data with role
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        role: "user",
        createdAt: new Date(),
      });

      toast({
        title: "Akun berhasil dibuat",
        description: "Selamat datang di Habisin!",
      });

      navigate("/user-dashboard");
    } catch (error: any) {
      let errorMessage = "Pendaftaran gagal";
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "Email sudah digunakan";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "Password terlalu lemah";
      }
      
      toast({
        title: "Pendaftaran Error",
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
        <Link to="/login-user" className="absolute left-6 top-1/2 -translate-y-1/2">
          <ArrowLeft className="h-6 w-6 text-white" />
        </Link>
        <h1 className="text-white text-3xl font-bold">Daftar User</h1>
      </div>

      {/* Register container */}
      <div className="max-w-md w-full mx-auto mt-[-2rem] px-6">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Masukkan nama lengkap Anda"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>

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

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="terms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="w-4 h-4 accent-blue-600"
                disabled={isLoading}
              />
              <Label htmlFor="terms" className="text-sm cursor-pointer">
                Saya menerima semua syarat & ketentuan
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mendaftar...
                </>
              ) : (
                <>
                  Daftar
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Sudah punya akun?{" "}
            <Link
              to="/login-user"
              className="text-blue-600 font-medium hover:underline"
            >
              Masuk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
