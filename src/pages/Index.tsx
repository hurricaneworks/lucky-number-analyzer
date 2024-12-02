import React, { useState } from "react";
import NumberPicker from "@/components/NumberPicker";
import Statistics from "@/components/Statistics";
import { useToast } from "@/components/ui/use-toast";

// Simulated past winning numbers data
const MOCK_APPEARANCES = {
  1: 15, 2: 20, 3: 18, 4: 25, 5: 22, 6: 19, 7: 21, 8: 17, 9: 23, 10: 16,
  11: 24, 12: 18, 13: 20, 14: 19, 15: 21, 16: 22, 17: 25, 18: 23, 19: 17, 20: 16,
  // ... add more numbers as needed
};

const Index = () => {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const { toast } = useToast();

  const handleNumberSelect = (number: number) => {
    setSelectedNumbers((prev) => {
      if (prev.includes(number)) {
        return prev.filter((n) => n !== number);
      }
      if (prev.length >= 6) {
        return prev;
      }
      const newNumbers = [...prev, number];
      if (newNumbers.length === 6) {
        toast({
          title: "Numbers Selected!",
          description: "You've selected all 6 numbers. Check the statistics below.",
        });
      }
      return newNumbers;
    });
  };

  return (
    <div className="min-h-screen bg-lottery-background">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-lottery-secondary mb-4">
            UK Lottery Number Analyzer
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select 6 numbers to see how frequently they've appeared in past UK lottery draws.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-lottery-secondary mb-4">
            Pick Your Numbers (1-59)
          </h2>
          <div className="mb-4">
            <p className="text-gray-600">
              Selected Numbers: {selectedNumbers.length}/6
            </p>
          </div>
          <NumberPicker
            selectedNumbers={selectedNumbers}
            onNumberSelect={handleNumberSelect}
          />
        </div>

        {selectedNumbers.length > 0 && (
          <Statistics
            selectedNumbers={selectedNumbers}
            appearances={MOCK_APPEARANCES}
          />
        )}
      </div>
    </div>
  );
};

export default Index;