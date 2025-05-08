
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

  return useQuery<TicketData, Error>({
    queryKey: ["tickets"],
    queryFn: async () => {
      console.log("Fetching all tickets...");
      try {
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
          
          if (error) {
            console.error("Supabase error:", error);
            throw new Error(`Failed to fetch tickets: ${error.message}`);
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
      } catch (error) {
        console.error("Error in ticket data fetching:", error);
        // Re-throw the error to be handled by React Query's error handling
        throw error;
      }
    },
    // Update cache configuration to match React Query v5 API
    staleTime: Infinity, // Data will never become stale automatically
    gcTime: Infinity, // Replaced cacheTime with gcTime in React Query v5
    retry: 2, // Retry failed requests up to 2 times
  });
};
