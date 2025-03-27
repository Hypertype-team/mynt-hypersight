export interface Ticket {
  id: number;
  created_at?: string;
  priority?: string;
  summary?: string;
  category?: string;
  subcategory?: string;
  issue?: string;
  common_issue?: string;
  responsible_department?: string;
  issue_summary?: string;
  link?: string;
  report_period?: string;
}

export interface GroupedTickets {
  tickets: Ticket[];
  count: number;
  summary: string;
  department: string;
}

export interface TicketGroups {
  [key: string]: GroupedTickets;
}