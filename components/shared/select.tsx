import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Option {
  value: string;
  label: string;
}

// Define the props for the Select component
interface SelectProps {
  options: Option[];
  placeholder?: string;
  width?: string;
  label?: string;
  onSelect?: (value: string) => void;
}

export default function SelectMenu({
  options,
  placeholder = "Select an option",
  width = "w-[180px]",
  label = "Options",
  onSelect,
}: SelectProps) {
  return (
    <Select>
      <SelectTrigger className={width}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              onClick={() => onSelect && onSelect(option.value)}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
