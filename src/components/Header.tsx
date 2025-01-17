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
      // Try Web Share API first if available
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
      
      // Fall back to clipboard API if available
      if (!navigator.clipboard) {
        throw new Error('Clipboard API not available');
      }

      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "The URL has been copied to your clipboard.",
      });
    } catch (error) {
      console.error("Error sharing:", error);
      
      // Provide more specific error messages
      if (error instanceof Error) {
        if (error.message === 'Clipboard API not available') {
          toast({
            title: "Sharing not available",
            description: "Your browser doesn't support sharing or clipboard access.",
            variant: "destructive",
          });
          return;
        }
      }
      
      // Check for AbortError (user cancelled sharing)
      // Note: AbortError might not be an instance of Error in some browsers
      if (error && typeof error === 'object' && 'name' in error && error.name === 'AbortError') {
        // User cancelled the share operation
        return;
      }
      
      // Generic error message as fallback
      toast({
        title: "Sharing failed",
        description: "There was an error sharing the link. Please try copying the URL manually.",
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
