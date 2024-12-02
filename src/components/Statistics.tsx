import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

interface StatisticsProps {
  selectedNumbers: number[];
}

// Mock historical winning dates for the sequence 1,2,3,4,5,6
const MOCK_WINNING_HISTORY = [
  { date: "2023-12-15", numbers: [1, 2, 3, 4, 5, 6] },
  { date: "2022-08-03", numbers: [1, 2, 3, 4, 5, 6] },
  { date: "2021-05-19", numbers: [1, 2, 3, 4, 5, 6] },
  { date: "2020-11-27", numbers: [1, 2, 3, 4, 5, 6] },
];

const Statistics = ({ selectedNumbers }: StatisticsProps) => {
  const isSequence123456 = () => {
    if (selectedNumbers.length !== 6) return false;
    const sortedNumbers = [...selectedNumbers].sort((a, b) => a - b);
    return JSON.stringify(sortedNumbers) === JSON.stringify([1, 2, 3, 4, 5, 6]);
  };

  if (selectedNumbers.length === 0) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 p-4">
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-lottery-secondary flex items-center gap-2">
            <CalendarDays className="h-6 w-6" />
            Historical Appearances
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            {selectedNumbers.length === 6 ? (
              <>
                <p className="text-xl mb-4">
                  Your numbers: {selectedNumbers.sort((a, b) => a - b).join(", ")}
                </p>
                {isSequence123456() ? (
                  <div className="space-y-4">
                    <p className="text-2xl font-bold text-lottery-primary mb-6">
                      This combination has appeared {MOCK_WINNING_HISTORY.length} times!
                    </p>
                    <div className="grid gap-4">
                      {MOCK_WINNING_HISTORY.map((win, index) => (
                        <div
                          key={win.date}
                          className="bg-lottery-background p-4 rounded-lg border border-lottery-primary/20 transform hover:scale-105 transition-transform duration-200"
                        >
                          <p className="text-lg font-semibold text-lottery-primary">
                            {formatDate(win.date)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-600">
                    <p>This exact combination hasn't appeared in our records.</p>
                    <p className="mt-2 text-sm">
                      Remember: Every combination has an equal chance in the next draw!
                    </p>
                  </div>
                )}
              </>
            ) : (
              <p className="text-gray-600">
                Please select all 6 numbers to see historical appearances.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Statistics;