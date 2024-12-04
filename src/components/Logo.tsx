import { Atom } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 text-blue-600">
        <Atom className="h-8 w-8 animate-pulse" />
        <span className="text-xl font-bold">LuckyAnalyzer</span>
      </div>
      <a 
        href="https://hurricane.works" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-sm text-blue-600/70 hover:text-blue-600 transition-colors"
      >
        by Hurricane Works
      </a>
    </div>
  );
};

export default Logo;