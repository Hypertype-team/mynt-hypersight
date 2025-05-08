
import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is already authenticated
  const token = localStorage.getItem("authToken");
  if (token) {
    return <Navigate to="/" replace />;
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError("");

    try {
      // Only allow specific credentials for sign in
      if (
        (email === "mathilda@mynt.se" &&
        password === "YIWxPlyjzBqoQUKFGFJ") ||
        (email === "linnea.samuelsson@mynt.se" &&
        password === "lisnneaSa12m")
      ) {
        // Set token and also create Supabase session for proper authentication
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) {
          throw new Error("Supabase authentication failed. Please try again.");
        }
        
        localStorage.setItem("authToken", "test-token");
        toast({
          title: "Welcome back!",
          description: "You have been successfully logged in.",
        });
        navigate("/");
      } else {
        throw new Error("Invalid credentials. Please use one of the provided test accounts.");
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      setAuthError(error.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1F0FB]">
      <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-2xl shadow-lg border border-[#E5DEFF]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#2D2D2D]">Welcome Back</h2>
          <p className="text-[#6B7280] mt-2">Sign in to your account</p>
        </div>

        {authError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Authentication Error</AlertTitle>
            <AlertDescription>{authError}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleAuth} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#4A4A4A]">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="bg-[#F8F7FF] border-[#E5DEFF] text-[#2D2D2D] placeholder:text-[#9CA3AF] focus-visible:ring-[#9b87f5]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-[#4A4A4A]">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="bg-[#F8F7FF] border-[#E5DEFF] text-[#2D2D2D] placeholder:text-[#9CA3AF] focus-visible:ring-[#9b87f5]"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#9b87f5] hover:bg-[#8875e0] text-white transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-4 text-sm text-center text-gray-600">
          <p>Test accounts:</p>
          <p>mathilda@mynt.se / YIWxPlyjzBqoQUKFGFJ</p>
          <p>linnea.samuelsson@mynt.se / lisnneaSa12m</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
