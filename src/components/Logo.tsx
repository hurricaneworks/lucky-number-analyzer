import { Atom } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center gap-2 text-blue-600">
      <Atom className="h-8 w-8 animate-pulse" />
      <span className="text-xl font-bold">LuckyAnalyzer</span>
    </div>
  );
};

export default Logo;