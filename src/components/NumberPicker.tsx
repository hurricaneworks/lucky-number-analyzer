import React from "react";
import { cn } from "@/lib/utils";

interface NumberPickerProps {
  selectedNumbers: number[];
  onNumberSelect: (number: number) => void;
}

const NumberPicker = ({ selectedNumbers, onNumberSelect }: NumberPickerProps) => {
  const numbers = Array.from({ length: 59 }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-10 gap-2 md:gap-3 max-w-3xl mx-auto p-4">
      {numbers.map((number) => {
        const isSelected = selectedNumbers.includes(number);
        return (
          <button
            key={number}
            onClick={() => onNumberSelect(number)}
            disabled={selectedNumbers.length >= 6 && !isSelected}
            className={cn(
              "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm md:text-base font-semibold transition-all",
              "hover:scale-110 active:scale-95",
              isSelected
                ? "bg-lottery-primary text-white animate-number-pop"
                : "bg-white border-2 border-gray-200 hover:border-lottery-secondary",
              selectedNumbers.length >= 6 && !isSelected && "opacity-50 cursor-not-allowed hover:scale-100"
            )}
          >
            {number}
          </button>
        );
      })}
    </div>
  );
};

export default NumberPicker;