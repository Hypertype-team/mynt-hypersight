import { Ticket, TicketGroups } from "@/types/ticket";

const getMonthFromPeriod = (period: string | undefined): string => {
  if (!period) return '';
  // Extract month from "Jan 01 - Jan 31"
  return period.split(' ')[0];
};

export const getFilteredTickets = (
  tickets: Ticket[],
  selectedPeriod: string,
  selectedCategory: string,
  selectedTheme: string,
  selectedDepartment: string
): Ticket[] => {
  return tickets?.filter(ticket => {
    if (selectedPeriod && selectedPeriod !== "_all") {
      if (ticket.report_period !== selectedPeriod) return false;
    }
    if (selectedCategory && ticket.category !== selectedCategory) return false;
    if (selectedTheme && ticket.subcategory !== selectedTheme) return false;
    if (selectedDepartment !== "All" && ticket.responsible_department !== selectedDepartment) return false;
    return true;
  });
};

export const getCategoriesWithCounts = (filteredTickets: Ticket[]) => {
  // Get all unique categories and their counts from the full dataset
  const categoryMap = filteredTickets.reduce((acc, ticket) => {
    const category = ticket.category || "Uncategorized";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(categoryMap)
    .map(([category, count]) => ({
      name: category,
      count: count,
      display: `${category} (${count} tickets)`
    }))
    .sort((a, b) => {
      if (a.name === "Batterier") return -1;
      if (b.name === "Batterier") return 1;
      if (a.name === "Andra") return 1;
      if (b.name === "Andra") return -1;
      return a.name.localeCompare(b.name);
    });
};

export const getThemesWithCounts = (
  filteredTickets: Ticket[],
  selectedCategory: string,
  sortAscending: boolean
) => {
  if (!selectedCategory) return [];
  
  return [...new Set(filteredTickets?.filter(t => t.category === selectedCategory)
    .map(ticket => ticket.subcategory))]
    .map(theme => ({
      name: theme || "",
      count: filteredTickets?.filter(t => t.subcategory === theme).length || 0,
      display: `${theme} (${filteredTickets?.filter(t => t.subcategory === theme).length || 0} tickets)`
    }))
    .sort((a, b) => sortAscending ? a.count - b.count : b.count - a.count);
};

export const groupTicketsByIssue = (filteredTickets: Ticket[]): TicketGroups => {
  return filteredTickets?.reduce((acc, ticket) => {
    const issue = ticket.common_issue || "Uncategorized";
    if (!acc[issue]) {
      acc[issue] = {
        tickets: [],
        count: 0,
        summary: ticket.issue_summary || "",
        department: ticket.responsible_department || ""
      };
    }
    acc[issue].tickets.push(ticket);
    acc[issue].count += 1;
    return acc;
  }, {} as TicketGroups);
};