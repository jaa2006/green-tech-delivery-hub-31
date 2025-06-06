
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { User, LogIn, ArrowRight, Loader2 } from "lucide-react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser } = useAuth();

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // If user is already logged in, redirect to home
  if (currentUser) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Basic validation
      if (!email || !password) {
        toast({
          title: "Error",
          description: "Email and password are required",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      if (!isLogin && (!fullName || !acceptTerms)) {
        toast({
          title: "Error",
          description: "Full name and terms acceptance are required",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      if (isLogin) {
        // Login
        await signInWithEmailAndPassword(auth, email, password);
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
      } else {
        // Signup
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save user data with role
        await setDoc(doc(db, "users", user.uid), {
          name: fullName,
          email,
          role: "user",
          createdAt: new Date(),
        });

        toast({
          title: "Account created successfully",
          description: "Welcome to Habisin!",
        });
      }

      // Redirect to home page after successful auth
      navigate("/");
    } catch (error: any) {
      let errorMessage = "Authentication failed";
      
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = "Invalid email or password";
      } else if (error.code === 'auth/email-already-in-use') {
        errorMessage = "Email already in use";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "Password is too weak";
      }
      
      toast({
        title: "Authentication Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsGoogleLoading(true);
    
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user exists in Firestore
      const roleDoc = await getDoc(doc(db, "users", user.uid));
      
      if (!roleDoc.exists()) {
        // Create user profile if doesn't exist
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          role: "user",
          createdAt: new Date(),
        });
      }

      toast({
        title: isLogin ? "Login successful" : "Account created successfully",
        description: isLogin ? "Welcome back!" : "Welcome to Habisin!",
      });

      navigate("/");
    } catch (error: any) {
      toast({
        title: "Authentication Error",
        description: "Google authentication failed",
        variant: "destructive",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#07595A] to-black flex flex-col">
      {/* Top section with curved bottom */}
      <div className="bg-[#07595A] rounded-b-3xl h-32 flex items-center justify-center">
        <h1 className="text-white text-3xl font-bold">habisin</h1>
      </div>

      {/* Auth container */}
      <div className="max-w-md w-full mx-auto mt-[-2rem] px-6">
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl shadow-lg p-6 mb-6 border border-gray-700">
          {/* Auth toggle */}
          <div className="flex mb-6 border-b border-gray-600">
            <button
              onClick={() => setIsLogin(true)}
              className={`w-1/2 pb-3 text-center font-medium text-lg ${
                isLogin
                  ? "text-white border-b-2 border-[#07595A]"
                  : "text-gray-400"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`w-1/2 pb-3 text-center font-medium text-lg ${
                !isLogin
                  ? "text-white border-b-2 border-[#07595A]"
                  : "text-gray-400"
              }`}
            >
              Sign up
            </button>
          </div>

          {/* Auth form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-white">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    disabled={isLoading || isGoogleLoading}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  disabled={isLoading || isGoogleLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password" className="text-white">Password</Label>
              </div>
              <div className="relative">
                <LogIn className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  disabled={isLoading || isGoogleLoading}
                />
              </div>
            </div>

            {!isLogin && (
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="w-4 h-4"
                  style={{ accentColor: '#07595A' }}
                  disabled={isLoading || isGoogleLoading}
                />
                <Label htmlFor="terms" className="text-sm cursor-pointer text-gray-300">
                  I accept all terms & conditions
                </Label>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-[#07595A] hover:bg-[#065658] text-white"
              disabled={isLoading || isGoogleLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isLogin ? "Logging in..." : "Signing up..."}
                </>
              ) : (
                <>
                  {isLogin ? "Login" : "Sign Up"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>

          {/* Google Auth Button */}
          <div className="mt-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800 text-gray-400">atau</span>
              </div>
            </div>
            
            <Button
              type="button"
              onClick={handleGoogleAuth}
              disabled={isLoading || isGoogleLoading}
              variant="outline"
              className="w-full mt-4 bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
            >
              {isGoogleLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isLogin ? "Signing in with Google..." : "Signing up with Google..."}
                </>
              ) : (
                <>
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  {isLogin ? "Sign in with Google" : "Sign up with Google"}
                </>
              )}
            </Button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-400">
            {isLogin ? (
              <>
                Don't have an account?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-[#07595A] font-medium hover:underline"
                  disabled={isLoading || isGoogleLoading}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-[#07595A] font-medium hover:underline"
                  disabled={isLoading || isGoogleLoading}
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
