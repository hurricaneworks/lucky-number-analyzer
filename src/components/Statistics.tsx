import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface StatisticsProps {
  selectedNumbers: number[];
}

const Statistics = ({ selectedNumbers }: StatisticsProps) => {
  const { data: drawHistory, isLoading } = useQuery({
    queryKey: ['lotteryDraws', selectedNumbers],
    queryFn: async () => {
      if (selectedNumbers.length !== 6) return [];
      
      const sortedNumbers = [...selectedNumbers].sort((a, b) => a - b);
      const [n1, n2, n3, n4, n5, n6] = sortedNumbers;
      
      const { data, error } = await supabase
        .from('lottery_draws')
        .select('*')
        .eq('ball_1', n1)
        .eq('ball_2', n2)
        .eq('ball_3', n3)
        .eq('ball_4', n4)
        .eq('ball_5', n5)
        .eq('ball_6', n6)
        .order('draw_date', { ascending: false });
        
      if (error) throw error;
      return data || [];
    },
    enabled: selectedNumbers.length === 6
  });

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
                {isLoading ? (
                  <p>Loading historical data...</p>
                ) : drawHistory && drawHistory.length > 0 ? (
                  <div className="space-y-4">
                    <p className="text-2xl font-bold text-lottery-primary mb-6">
                      This combination has appeared {drawHistory.length} times!
                    </p>
                    <div className="grid gap-4">
                      {drawHistory.map((draw) => (
                        <div
                          key={draw.draw_number}
                          className="bg-lottery-background p-4 rounded-lg border border-lottery-primary/20 transform hover:scale-105 transition-transform duration-200"
                        >
                          <p className="text-lg font-semibold text-lottery-primary">
                            {formatDate(draw.draw_date)}
                          </p>
                          <p className="text-sm text-gray-600">
                            Draw #{draw.draw_number}
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