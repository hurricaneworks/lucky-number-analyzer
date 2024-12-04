import React, { useState } from "react";
import NumberPicker from "@/components/NumberPicker";
import Statistics from "@/components/Statistics";
import { useToast } from "@/components/ui/use-toast";
import Logo from "@/components/Logo";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const { toast } = useToast();

  const handleNumberSelect = (number: number) => {
    setSelectedNumbers((prev) => {
      if (prev.includes(number)) {
        return prev.filter((n) => n !== number);
      }
      if (prev.length >= 6) {
        return prev;
      }
      const newNumbers = [...prev, number];
      if (newNumbers.length === 6) {
        toast({
          title: "Numbers Selected!",
          description: "You've selected all 6 numbers. Check the statistics below.",
        });
      }
      return newNumbers;
    });
  };

  return (
    <div className="min-h-screen bg-lottery-background">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Logo />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
            UK Lottery Number Analyzer
          </h1>
          <p className="text-blue-600/80 max-w-2xl mx-auto">
            Select 6 numbers to see how frequently they've appeared in past UK lottery draws.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            Pick Your Numbers (1-59)
          </h2>
          <div className="mb-4">
            <p className="text-blue-600/80">
              Selected Numbers: {selectedNumbers.length}/6
            </p>
          </div>
          <NumberPicker
            selectedNumbers={selectedNumbers}
            onNumberSelect={handleNumberSelect}
          />
        </div>

        {selectedNumbers.length > 0 && (
          <Statistics selectedNumbers={selectedNumbers} />
        )}

        <Card className="mt-8 bg-white">
          <CardContent className="prose prose-blue max-w-none p-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">UK National Lottery Information</h2>
            
            <p className="text-blue-600/90">
              The UK National Lottery offers a variety of games, but the most popular are Lotto and EuroMillions. Here's a look at the statistical odds and insights into winning these games:
            </p>

            <h3 className="text-xl font-semibold text-blue-600 mt-6">Lotto</h3>
            <p className="text-blue-600/90">
              The UK Lotto requires players to pick six numbers from 1 to 59. The odds of winning the Lotto jackpot by matching all six numbers are 1 in 45,057,474. This makes it a long shot, but it's still one of the most popular forms of gambling in the UK due to its simplicity and the sizeable jackpots on offer.
            </p>

            <h3 className="text-xl font-semibold text-blue-600 mt-6">EuroMillions</h3>
            <p className="text-blue-600/90">
              EuroMillions is a transnational lottery requiring seven numbers to win the jackpot: five numbers from 1 to 50, and two additional 'Lucky Stars' from 1 to 12. The odds of winning the EuroMillions jackpot are even steeper at 1 in 139,838,160. Despite these odds, the larger prize pools, often reaching into the hundreds of millions, attract many players.
            </p>

            <h3 className="text-xl font-semibold text-blue-600 mt-6">Winning Statistics</h3>
            <ul className="list-disc pl-6 text-blue-600/90">
              <li>Chance of Winning Any Prize: In Lotto, the chance of winning any prize is about 1 in 9.3. For EuroMillions, it's slightly better at about 1 in 13.</li>
              <li>Most Common Numbers: Analysis over the years shows some numbers appear more frequently. However, every number has an equal chance of being drawn.</li>
              <li>Lucky Locations: Certain areas in the UK seem luckier, often attributed to the higher sales volumes in those regions.</li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-600 mt-6">Strategies</h3>
            <p className="text-blue-600/90">While there's no way to predict the numbers, some players use strategies like:</p>
            <ul className="list-disc pl-6 text-blue-600/90">
              <li>Frequent Numbers: Playing numbers that appear often.</li>
              <li>Due Numbers: Choosing numbers that haven't been drawn in a while.</li>
              <li>Random Picks: Using quick picks, where the computer chooses random numbers, which is how many jackpot winners select their numbers.</li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-600 mt-6">Conclusion</h3>
            <p className="text-blue-600/90">
              The statistical chance of winning big on the UK lottery is very low, but it doesn't deter millions of hopeful players. Whether it's the thrill of the draw or the dream of a life-changing win, the lottery remains a staple of UK gambling. It's important to play responsibly, knowing the odds are against you, and treat it as just another form of entertainment.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;