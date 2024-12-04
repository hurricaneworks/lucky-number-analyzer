import { Link } from "react-router-dom";

interface MonthLinkProps {
  month: string;
  year: string;
  hasData: boolean;
}

const MonthLink = ({ month, year, hasData }: MonthLinkProps) => {
  if (!hasData) return null;
  
  return (
    <Link
      to={`/month/${year}/${month}`}
      className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
    >
      {month} {year}
    </Link>
  );
};

export default MonthLink;