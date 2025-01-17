import { Share2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { useToast } from "@/components/ui/use-toast";

const Header = () => {
  const { toast } = useToast();

  const handleShare = async () => {
    const shareData = {
      title: document.title,
      url: window.location.href,
      text: "Check out this UK Lottery Number Analyzer!"
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copied!",
          description: "The URL has been copied to your clipboard.",
        });
      }
    } catch (error) {
      console.error("Error sharing:", error);
      toast({
        title: "Sharing failed",
        description: "There was an error sharing the link.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <Logo />
      <Button
        variant="ghost"
        size="icon"
        onClick={handleShare}
        className="text-blue-800 hover:text-blue-900 hover:bg-blue-100"
        aria-label="Share"
      >
        <Share2 className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Header;