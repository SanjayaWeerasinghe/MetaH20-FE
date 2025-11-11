import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, Medal, Award } from "lucide-react";

const investors = [
  { address: "7xKX...9mPq", amount: 2500000, percentage: 2.5, rank: 1 },
  { address: "9jKL...4nRs", amount: 1800000, percentage: 1.8, rank: 2 },
  { address: "5mNP...7kTv", amount: 1500000, percentage: 1.5, rank: 3 },
  { address: "3aBC...2wXy", amount: 1200000, percentage: 1.2, rank: 4 },
  { address: "8dEF...5zQr", amount: 950000, percentage: 0.95, rank: 5 },
  { address: "2pGH...8vUw", amount: 820000, percentage: 0.82, rank: 6 },
  { address: "6tIJ...1yPs", amount: 750000, percentage: 0.75, rank: 7 },
  { address: "4kKL...3xOm", amount: 680000, percentage: 0.68, rank: 8 },
];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="h-5 w-5 text-primary" />;
    case 2:
      return <Medal className="h-5 w-5 text-secondary" />;
    case 3:
      return <Award className="h-5 w-5 text-accent" />;
    default:
      return null;
  }
};

const TopInvestors = () => {
  return (
    <section id="investors" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Top Investors</h2>
          <p className="text-muted-foreground text-lg">Leading stakeholders in our ecosystem</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="glass-card p-6 shadow-card">
            <div className="space-y-4">
              {investors.map((investor) => (
                <div
                  key={investor.address}
                  className="flex items-center gap-4 p-4 rounded-lg glass-card hover:bg-primary/5 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex items-center justify-center w-8 h-8 font-bold text-sm">
                      {getRankIcon(investor.rank) || `#${investor.rank}`}
                    </div>
                    
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                        {investor.address.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <p className="font-mono font-semibold">{investor.address}</p>
                      <p className="text-sm text-muted-foreground">
                        {investor.amount.toLocaleString()} SICO
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-primary"
                          style={{ width: `${Math.min(investor.percentage * 40, 100)}%` }}
                        />
                      </div>
                      <span className="font-bold text-primary min-w-[60px]">
                        {investor.percentage}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Investors</span>
                <span className="text-xl font-bold gradient-text">1,247</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TopInvestors;
