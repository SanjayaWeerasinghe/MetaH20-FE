import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { api, type ICOStatistics } from "@/services/api";

const TokenSaleProgress = () => {
  const [stats, setStats] = useState<ICOStatistics | null>(null);
  const totalSupply = Number(import.meta.env.VITE_TOTAL_SUPPLY);

  useEffect(() => {
    fetchStatistics();
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStatistics, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchStatistics = async () => {
    try {
      const data = await api.getICOStatistics();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch ICO statistics:", error);
    }
  };

  const tokensSold = stats?.total_tokens_sold || 0;
  const progressPercentage = (tokensSold / totalSupply) * 100;
  const tokensRemaining = totalSupply - tokensSold;
  const totalRaised = (stats?.total_usdt_raised || 0) + ((stats?.total_sol_raised || 0) * 100);
  const tokenPrice = 1 / (Number(import.meta.env.VITE_TOKEN_RATE));
  const hardCap = Number(import.meta.env.VITE_HARD_CAP) ;

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="glass-card p-8 shadow-card">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Token Sale Progress</h2>
              <p className="text-muted-foreground">Secure your tokens before they're gone</p>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold text-primary">{progressPercentage.toFixed(4)}%</span>
                </div>
                <Progress value={progressPercentage} className="h-3 glow-effect" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 rounded-lg text-center">
                  <p className="text-muted-foreground mb-2">Total Supply</p>
                  <p className="text-2xl font-bold gradient-text">
                    {totalSupply.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">MH2O Tokens</p>
                </div>

                <div className="glass-card p-6 rounded-lg text-center">
                  <p className="text-muted-foreground mb-2">Tokens Sold</p>
                  <p className="text-2xl font-bold text-primary">
                    {tokensSold.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">MH2O Tokens</p>
                </div>

                <div className="glass-card p-6 rounded-lg text-center">
                  <p className="text-muted-foreground mb-2">Remaining</p>
                  <p className="text-2xl font-bold text-secondary">
                    {tokensRemaining.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">MH2O Tokens</p>
                </div>
              </div>

              <div className="glass-card p-6 rounded-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-muted-foreground text-sm">Token Price</p>
                    <p className="text-xl font-bold">${tokenPrice.toFixed(4)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Total Raised</p>
                    <p className="text-xl font-bold text-primary">
                      ${totalRaised.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Hard Cap</p>
                    <p className="text-xl font-bold">${(hardCap / 1000).toFixed(0)}K</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Min Purchase</p>
                    <p className="text-xl font-bold">10 USDT</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TokenSaleProgress;
