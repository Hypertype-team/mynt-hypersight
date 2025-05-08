
import { Layout } from "@/components/Layout";
import { TicketAnalysisTable } from "@/components/TicketAnalysisTable";
import { CategoryBreakdownChart } from "@/components/CategoryBreakdownChart";
import { Button } from "@/components/ui/button";
import { LogOut, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [subcategoryFilter, setSubcategoryFilter] = useState("");
  const [commonIssueFilter, setCommonIssueFilter] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      // Clean up auth state
      localStorage.removeItem("authToken");
      // Sign out from Supabase
      await supabase.auth.signOut();
      
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      
      navigate("/auth");
    } catch (error) {
      console.error("Sign out error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign out. Please try again.",
      });
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex w-full items-center justify-between mb-4">
            <div className="flex-1"></div>
            <h1 className="text-2xl font-bold flex-1">HyperSight Dashboard</h1>
            <div className="flex-1 flex justify-end">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSignOut}
                className="flex items-center gap-1"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
          <p className="text-gray-600 mt-2">
            Welcome Mathilda, hope you're having a lovely day! Here is your HyperSight ticket analysis, tailored for you by Hypertype's AI tech 😊
          </p>
        </div>

        <TicketAnalysisTable />

        {showAnalysis && (
          <>
            <div 
              className="fixed inset-0 bg-black/20 z-40"
              onClick={() => setShowAnalysis(false)}
            />
            <div className="fixed top-0 right-0 w-full md:w-1/2 h-full bg-background p-6 shadow-lg animate-slideIn z-50">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4"
                onClick={() => setShowAnalysis(false)}
              >
                <X className="h-4 w-4" />
              </Button>
              <CategoryBreakdownChart showAnalysisPanel={true} />
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Index;
