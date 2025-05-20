
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { User, LogIn, ArrowRight, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser, signup, login } = useAuth();

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
        await login(email, password);
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
      } else {
        // Signup
        await signup(email, password, fullName);
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top section with curved bottom */}
      <div className="bg-habisin-dark rounded-b-3xl h-32 flex items-center justify-center">
        <h1 className="text-white text-3xl font-bold">habisin</h1>
      </div>

      {/* Auth container */}
      <div className="max-w-md w-full mx-auto mt-[-2rem] px-6">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          {/* Auth toggle */}
          <div className="flex mb-6 border-b">
            <button
              onClick={() => setIsLogin(true)}
              className={`w-1/2 pb-3 text-center font-medium text-lg ${
                isLogin
                  ? "text-habisin-dark border-b-2 border-habisin-dark"
                  : "text-gray-500"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`w-1/2 pb-3 text-center font-medium text-lg ${
                !isLogin
                  ? "text-habisin-dark border-b-2 border-habisin-dark"
                  : "text-gray-500"
              }`}
            >
              Sign up
            </button>
          </div>

          {/* Auth form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="relative">
                <LogIn className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
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
                  className="w-4 h-4 accent-habisin-dark"
                  disabled={isLoading}
                />
                <Label htmlFor="terms" className="text-sm cursor-pointer">
                  I accept all terms & conditions
                </Label>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-habisin-dark hover:bg-habisin-dark/90 text-white"
              disabled={isLoading}
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

          <div className="mt-6 text-center text-sm text-gray-500">
            {isLogin ? (
              <>
                Don't have an account?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-habisin-dark font-medium hover:underline"
                  disabled={isLoading}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-habisin-dark font-medium hover:underline"
                  disabled={isLoading}
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
