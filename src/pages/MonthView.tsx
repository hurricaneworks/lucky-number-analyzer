import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import SEO from "@/components/SEO";

const MonthView = () => {
  const { year, month } = useParams();
  
  const { data: draws, isLoading, error } = useQuery({
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

  const monthYear = `${month} ${year}`;
  const title = `UK Lottery Draws for ${monthYear} - Historical Results`;
  const description = `View all UK National Lottery draw results and winning numbers for ${monthYear}. Complete historical data and statistics for lottery draws.`;

  return (
    <main className="container mx-auto py-8">
      <SEO 
        title={title}
        description={description}
        path={`/month/${year}/${month}`}
      />
      <h1 className="text-3xl font-bold text-blue-600 mb-8">{monthYear} Lottery Draws</h1>
      
      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-blue-600">Loading lottery draws...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
          <p>Error loading lottery draws. Please try again later.</p>
        </div>
      )}

      {!isLoading && !error && draws?.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-600">
          <p>No lottery draws found for {monthYear}.</p>
        </div>
      )}

      {!isLoading && !error && draws && draws.length > 0 && (
        <section className="grid gap-4" aria-label={`Lottery draws for ${monthYear}`}>
        {draws.map((draw) => (
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
                    aria-label={`Ball ${index + 1}: number ${number}`}
                  >
                    {number}
                  </div>
                ))}
                <div 
                  className="w-10 h-10 rounded-full border-2 border-red-500 flex items-center justify-center text-blue-600 font-bold bg-gray-50"
                  aria-label={`Bonus ball: number ${draw.bonus_ball}`}
                >
                  {draw.bonus_ball}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
};

export default MonthView;
