import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, Medal, Award } from "lucide-react";
import { useEffect, useState } from "react";
import { api, type TopInvestor, type ICOStatistics } from "@/services/api";

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

const formatAddress = (address: string) => {
  if (address.length <= 8) return address;
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

const TopInvestors = () => {
  const [investors, setInvestors] = useState<TopInvestor[]>([]);
  const [stats, setStats] = useState<ICOStatistics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [topInvestors, icoStats] = await Promise.all([
          api.getTopInvestors(10),
          api.getICOStatistics()
        ]);
        setInvestors(topInvestors);
        setStats(icoStats);
      } catch (error) {
        console.error("Failed to fetch top investors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section id="investors" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Top Investors</h2>
            <p className="text-muted-foreground text-lg">Leading stakeholders in our ecosystem</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="glass-card p-6 shadow-card">
              <p className="text-center text-muted-foreground">Loading...</p>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="investors" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Top Investors</h2>
          <p className="text-muted-foreground text-lg">Leading stakeholders in our ecosystem</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="glass-card p-6 shadow-card">
            {investors.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No investors yet. Be the first!</p>
            ) : (
              <>
                <div className="space-y-4">
                  {investors.map((investor, index) => {
                    const rank = index + 1;
                    const totalSupply = Number(import.meta.env.VITE_TOTAL_SUPPLY);
                    const percentage = (investor.total_tokens / totalSupply) * 100;

                    return (
                      <div
                        key={investor.public_key}
                        className="flex items-center gap-4 p-4 rounded-lg glass-card hover:bg-primary/5 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className="flex items-center justify-center w-8 h-8 font-bold text-sm">
                            {getRankIcon(rank) || `#${rank}`}
                          </div>

                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                              {investor.public_key.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1">
                            <p className="font-mono font-semibold">{formatAddress(investor.public_key)}</p>
                            <p className="text-sm text-muted-foreground">
                              {investor.total_tokens.toLocaleString()} MH2O • ${investor.total_invested.toLocaleString()} invested
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-muted rounded-full h-2 overflow-hidden">
                              <div
                                className="h-full bg-gradient-primary"
                                style={{ width: `${Math.min(percentage * 40, 100)}%` }}
                              />
                            </div>
                            <span className="font-bold text-primary min-w-[60px]">
                              {percentage.toFixed(2)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Investors</span>
                    <span className="text-xl font-bold gradient-text">
                      {stats?.unique_investors.toLocaleString() || '0'}
                    </span>
                  </div>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TopInvestors;
