import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PeriodFilterProps {
  selectedPeriod: string;
  setSelectedPeriod: (period: string) => void;
  reportPeriods: string[];
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export const PeriodFilter = ({
  selectedPeriod,
  setSelectedPeriod,
  reportPeriods,
}: PeriodFilterProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium block text-gray-700">Month</label>
      <Select 
        value={selectedPeriod} 
        onValueChange={setSelectedPeriod}
      >
        <SelectTrigger className="w-full bg-white border-gray-200 hover:border-purple-200 transition-colors">
          <SelectValue placeholder="Select month" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="_all" className="hover:bg-purple-50">
            All months
          </SelectItem>
          {MONTHS.map(month => (
            <SelectItem key={month} value={month} className="hover:bg-purple-50">
              {month}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};