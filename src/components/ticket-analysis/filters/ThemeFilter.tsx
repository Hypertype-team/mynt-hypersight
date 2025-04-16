import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ThemeFilterProps {
  selectedCategory: string;
  selectedTheme: string;
  setSelectedTheme: (theme: string) => void;
  themes: { name: string; count: number; display: string }[];
}

export const ThemeFilter = ({
  selectedCategory,
  selectedTheme,
  setSelectedTheme,
  themes,
}: ThemeFilterProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium block text-gray-700">Theme</label>
      <Select 
        value={selectedTheme} 
        onValueChange={setSelectedTheme}
        disabled={!selectedCategory}
      >
        <SelectTrigger className={`w-full bg-white border-gray-200 transition-colors ${
          !selectedCategory ? 'opacity-50 cursor-not-allowed' : 'hover:border-purple-200'
        }`}>
          <SelectValue placeholder={!selectedCategory ? "Select a category first" : "Select theme"} />
        </SelectTrigger>
        <SelectContent>
          {themes.map(({ name, display }) => (
            <SelectItem key={name} value={name} className="hover:bg-purple-50">
              {display}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};