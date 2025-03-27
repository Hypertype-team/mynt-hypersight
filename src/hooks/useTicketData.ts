import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Ticket } from "@/types/ticket";

interface TicketData {
  tickets: Ticket[];
  totalCount: number;
}

export const useTicketData = () => {
  const { toast } = useToast();

  return useQuery<TicketData>({
    queryKey: ["tickets"],
    queryFn: async () => {
      console.log("Fetching all tickets...");
      const tickets: Ticket[] = [];
      const pageSize = 1000;
      let start = 0;

      while (true) {
        console.log(`Fetching tickets from ${start} to ${start + pageSize - 1}`);
        const { data, error, count } = await supabase
          .from("Mynt_Hypersight")
          .select("*", { count: 'exact' })
          .range(start, start + pageSize - 1)
          .order("created_at", { ascending: false });
        
        console.log("How many tickets did we get", data);

        if (error) {
          toast({
            title: "Error fetching tickets",
            description: error.message,
            variant: "destructive",
          });
          throw error;
        }

        if (!data || data.length === 0) {
          break;
        }

        tickets.push(...data);
        console.log(`Fetched ${tickets.length} tickets so far`);

        if (data.length < pageSize) {
          break;
        }

        start += pageSize;
      }

      console.log(`Total tickets fetched: ${tickets.length}`);
      return { tickets, totalCount: tickets.length };
    },
    // Configure caching to keep data in memory until explicitly invalidated
    staleTime: Infinity, // Data will never become stale automatically
    cacheTime: Infinity, // Data will remain in cache indefinitely
  });
};