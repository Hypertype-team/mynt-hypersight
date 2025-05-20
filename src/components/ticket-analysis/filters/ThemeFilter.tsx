
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

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
  const [resetKey, setResetKey] = useState<string>(Date.now().toString());
  
  const clearSelection = () => {
    setResetKey(Date.now().toString());
    setSelectedTheme("");
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium block text-gray-700">Theme</label>
      <div className="relative">
        <Select 
          key={resetKey}
          value={selectedTheme} 
          onValueChange={setSelectedTheme}
          disabled={!selectedCategory || selectedCategory === "all"}
        >
          <SelectTrigger className={`w-full bg-white border-gray-200 transition-colors ${
            !selectedCategory || selectedCategory === "all" ? 'opacity-50 cursor-not-allowed' : 'hover:border-purple-200'
          }`}>
            <SelectValue placeholder={!selectedCategory || selectedCategory === "all" ? "Select a category first" : "Select theme"} />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {themes.map(({ name, display }) => (
              <SelectItem key={name} value={name} className="hover:bg-purple-50">
                {display}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedTheme && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-8 top-1/2 -translate-y-1/2 h-6 w-6"
            onClick={clearSelection}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
