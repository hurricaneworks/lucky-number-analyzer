import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface StatisticsProps {
  selectedNumbers: number[];
}

// Mock historical winning combinations
const MOCK_WINNING_COMBINATIONS = [
  [1, 7, 13, 24, 35, 46],
  [3, 12, 15, 28, 37, 42],
  [5, 11, 23, 31, 44, 59],
  // Add more mock combinations as needed
];

const Statistics = ({ selectedNumbers }: StatisticsProps) => {
  const getCompleteMatches = () => {
    if (selectedNumbers.length !== 6) return 0;
    
    // Sort both arrays to ensure order doesn't matter
    const sortedSelected = [...selectedNumbers].sort((a, b) => a - b);
    
    return MOCK_WINNING_COMBINATIONS.filter(combination => {
      const sortedCombination = [...combination].sort((a, b) => a - b);
      return JSON.stringify(sortedSelected) === JSON.stringify(sortedCombination);
    }).length;
  };

  if (selectedNumbers.length === 0) {
    return null;
  }

  const matches = getCompleteMatches();

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-lottery-secondary">
            Historical Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            {selectedNumbers.length === 6 ? (
              <>
                <p className="text-xl mb-4">
                  Your numbers: {selectedNumbers.join(", ")}
                </p>
                <p className="text-2xl font-bold">
                  This exact combination has appeared {matches} time{matches !== 1 ? 's' : ''} in past draws
                </p>
                {matches === 0 && (
                  <p className="text-gray-600 mt-2">
                    Don't worry - every combination has an equal chance in the next draw!
                  </p>
                )}
              </>
            ) : (
              <p className="text-gray-600">
                Please select all 6 numbers to see how often this combination has appeared.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Statistics;