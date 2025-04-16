import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { TicketFilters } from "./ticket-analysis/TicketFilters";
import { LoadingState } from "./ticket-analysis/LoadingState";
import { TicketList } from "./ticket-analysis/TicketList";
import { useTicketData } from "@/hooks/useTicketData";
import { 
  getFilteredTickets, 
  getCategoriesWithCounts, 
  getThemesWithCounts,
  groupTicketsByIssue 
} from "./ticket-analysis/TicketFilterLogic";

export const TicketAnalysisTable = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedTheme, setSelectedTheme] = useState<string>("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All");
  const [sortAscending, setSortAscending] = useState(false);
  const [expandedTickets, setExpandedTickets] = useState<string[]>([]);
  const { toast } = useToast();

  const { data, isLoading, refetch } = useTicketData();

  const handleRefresh = async () => {
    toast({
      title: "Refreshing tickets",
      description: "Fetching latest ticket data...",
    });
    await refetch();
    toast({
      title: "Tickets refreshed",
      description: "Latest ticket data has been loaded",
    });
  };

  if (isLoading || !data) return <LoadingState />;

  const allTickets = data.tickets;
  const totalTickets = allTickets.length;

  // Get unique report periods and sort them chronologically
  const reportPeriods = [...new Set(allTickets
    .map(ticket => ticket.report_period)
    .filter(period => period !== undefined && period !== null)
  )].sort((a, b) => {
    // Extract month and dates from period strings (e.g., "Jan 01 - Jan 31")
    const [aStart] = a.split(' - ');
    const [bStart] = b.split(' - ');
    
    // Create Date objects for comparison
    const months = {
      'Dec': 0, 'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5,
      'Jun': 6, 'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11
    };
    
    const [aMonth, aDay] = aStart.split(' ');
    const [bMonth, bDay] = bStart.split(' ');
    
    // Compare months first
    const monthDiff = months[aMonth] - months[bMonth];
    if (monthDiff !== 0) return monthDiff;
    
    // If months are the same, compare days
    return parseInt(aDay) - parseInt(bDay);
  });

  // Set the most recent period if none is selected
  if (!selectedPeriod && reportPeriods.length > 0) {
    setSelectedPeriod(reportPeriods[reportPeriods.length - 1]);
  }

  // Filter by report period
  const periodFilteredTickets = allTickets.filter(ticket => 
    ticket.report_period === selectedPeriod
  );

  // Then get categories from period-filtered tickets
  const categories = getCategoriesWithCounts(periodFilteredTickets);

  // Then get themes from period-filtered tickets for the selected category
  const themes = getThemesWithCounts(periodFilteredTickets, selectedCategory, sortAscending);

  // Finally apply all filters for the final list
  const filteredTickets = getFilteredTickets(
    allTickets,
    selectedPeriod,
    selectedCategory,
    selectedTheme,
    selectedDepartment
  );
  
  const departments = ["All", ...new Set(filteredTickets.map(ticket => 
    ticket.responsible_department || ''
  ).filter(dept => dept !== ''))];
  
  const groupedByIssue = groupTicketsByIssue(filteredTickets);
  const sortedIssues = Object.entries(groupedByIssue || {})
    .sort(([, a], [, b]) => sortAscending ? a.count - b.count : b.count - a.count);

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto">
      <Card className="overflow-hidden">
        <TicketFilters
          totalTickets={totalTickets}
          filteredCount={filteredTickets.length}
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedTheme={selectedTheme}
          setSelectedTheme={setSelectedTheme}
          selectedDepartment={selectedDepartment}
          setSelectedDepartment={setSelectedDepartment}
          sortAscending={sortAscending}
          setSortAscending={setSortAscending}
          reportPeriods={reportPeriods}
          categories={categories}
          themes={themes}
          departments={departments}
          onRefresh={handleRefresh}
        />
      </Card>

      <TicketList
        selectedTheme={selectedTheme}
        filteredTickets={filteredTickets}
        groupedByIssue={groupedByIssue}
        sortedIssues={sortedIssues}
        expandedTickets={expandedTickets}
        setExpandedTickets={setExpandedTickets}
      />
    </div>
  );
};
