
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

interface CategoryFilterProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  setSelectedTheme: (theme: string) => void;
  categories: { name: string; count: number; display: string }[];
}

export const CategoryFilter = ({
  selectedCategory,
  setSelectedCategory,
  setSelectedTheme,
  categories,
}: CategoryFilterProps) => {
  const [resetKey, setResetKey] = useState<string>(Date.now().toString());
  
  const clearSelection = () => {
    setResetKey(Date.now().toString());
    setSelectedCategory("all");
    setSelectedTheme("");
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium block text-gray-700">Category</label>
      <div className="relative">
        <Select 
          key={resetKey}
          value={selectedCategory}
          onValueChange={(value) => {
            setSelectedCategory(value);
            setSelectedTheme("");
          }}
        >
          <SelectTrigger className="w-full bg-white border-gray-200 hover:border-purple-200 transition-colors">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem 
              key="all" 
              value="all" 
              className="hover:bg-purple-50 cursor-pointer"
            >
              All Categories
            </SelectItem>
            {categories.map(({ name, display }) => (
              <SelectItem 
                key={name} 
                value={name} 
                className="hover:bg-purple-50 cursor-pointer"
              >
                {display}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedCategory !== "all" && (
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
