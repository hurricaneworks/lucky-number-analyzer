import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";

const MonthView = () => {
  const { year, month } = useParams();
  
  const { data: draws } = useQuery({
    queryKey: ['monthDraws', year, month],
    queryFn: async () => {
      const startDate = new Date(parseInt(year!), new Date(Date.parse(month + " 1")).getMonth(), 1);
      const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
      
      const { data, error } = await supabase
        .from('lottery_draws')
        .select('*')
        .gte('draw_date', startDate.toISOString())
        .lte('draw_date', endDate.toISOString())
        .order('draw_date', { ascending: true });
        
      if (error) throw error;
      return data;
    },
    enabled: !!year && !!month
  });

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <Header />
        <h1 className="text-3xl font-bold text-blue-600">{month} {year} Draws</h1>
      </div>
      <div className="grid gap-4">
        {draws?.map((draw) => (
          <Card key={draw.id}>
            <CardHeader>
              <CardTitle className="text-blue-600">
                {new Date(draw.draw_date).toLocaleDateString('en-GB', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                {[draw.ball_1, draw.ball_2, draw.ball_3, draw.ball_4, draw.ball_5, draw.ball_6].map((number, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 rounded-full border-2 border-red-500 flex items-center justify-center text-blue-600 font-bold"
                  >
                    {number}
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-red-500 flex items-center justify-center text-blue-600 font-bold bg-gray-50">
                  {draw.bonus_ball}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MonthView;
