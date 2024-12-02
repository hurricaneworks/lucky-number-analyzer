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
      
      // Get all draws and check matches in JS since we need to find partial matches
      const { data, error } = await supabase
        .from('lottery_draws')
        .select('*')
        .order('draw_date', { ascending: false });
        
      if (error) throw error;
      
      // Process the draws to find matches
      return (data || []).map(draw => {
        const drawNumbers = [draw.ball_1, draw.ball_2, draw.ball_3, draw.ball_4, draw.ball_5, draw.ball_6];
        const matchCount = selectedNumbers.filter(num => drawNumbers.includes(num)).length;
        return {
          ...draw,
          matchCount
        };
      }).filter(draw => draw.matchCount >= 4); // Only keep draws with 4 or more matches
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

  const getMatchStats = () => {
    if (!drawHistory) return { matches4: 0, matches5: 0, matches6: 0 };
    return {
      matches4: drawHistory.filter(draw => draw.matchCount === 4).length,
      matches5: drawHistory.filter(draw => draw.matchCount === 5).length,
      matches6: drawHistory.filter(draw => draw.matchCount === 6).length
    };
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 p-4">
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-lottery-secondary flex items-center gap-2">
            <CalendarDays className="h-6 w-6" />
            Historical Matches
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
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {Object.entries(getMatchStats()).map(([key, value]) => (
                        <div key={key} className="bg-lottery-background p-4 rounded-lg">
                          <p className="text-2xl font-bold text-lottery-primary">{value}</p>
                          <p className="text-sm text-gray-600">
                            {key.replace('matches', '')} number matches
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="grid gap-4">
                      {drawHistory.map((draw, index) => (
                        <div
                          key={`${draw.draw_date}-${index}`}
                          className={`bg-lottery-background p-4 rounded-lg border transform hover:scale-105 transition-transform duration-200 ${
                            draw.matchCount === 6 
                              ? 'border-lottery-primary' 
                              : draw.matchCount === 5 
                              ? 'border-yellow-400' 
                              : 'border-gray-300'
                          }`}
                        >
                          <p className="text-lg font-semibold text-lottery-primary">
                            {formatDate(draw.draw_date)}
                          </p>
                          <p className="text-sm font-medium mt-1">
                            Matched {draw.matchCount} numbers
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Winning numbers: {[draw.ball_1, draw.ball_2, draw.ball_3, draw.ball_4, draw.ball_5, draw.ball_6].join(', ')}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-600">
                    <p>No matches found with 4 or more numbers.</p>
                    <p className="mt-2 text-sm">
                      Keep trying! Every combination has an equal chance in the next draw.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <p className="text-gray-600">
                Please select all 6 numbers to see historical matches.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Statistics;