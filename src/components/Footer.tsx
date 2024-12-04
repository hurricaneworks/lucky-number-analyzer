import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import MonthLink from "./MonthLink";

const Footer = () => {
  const { data: availableMonths } = useQuery({
    queryKey: ['availableMonths'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('lottery_draws')
        .select('draw_date')
        .order('draw_date', { ascending: true });
      
      if (error) throw error;
      
      const months = new Set();
      data?.forEach(draw => {
        const date = new Date(draw.draw_date);
        months.add(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`);
      });
      
      return Array.from(months).map(month => {
        const [year, monthNum] = month.split('-');
        return {
          year,
          month: new Date(parseInt(year), parseInt(monthNum) - 1).toLocaleString('default', { month: 'long' }),
          hasData: true
        };
      });
    }
  });

  return (
    <footer className="mt-12 border-t border-gray-200 py-8">
      <div className="container mx-auto">
        <h3 className="text-lg font-semibold text-blue-600 mb-4">Available Draw Months</h3>
        <div className="flex flex-wrap gap-2">
          {availableMonths?.map(({ month, year, hasData }) => (
            <MonthLink
              key={`${month}-${year}`}
              month={month}
              year={year}
              hasData={hasData}
            />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;