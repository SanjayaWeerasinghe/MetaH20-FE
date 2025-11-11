import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";

const TokenSaleProgress = () => {
  const totalSupply = 100000000;
  const tokensSold = 65000000;
  const progressPercentage = (tokensSold / totalSupply) * 100;
  const tokensRemaining = totalSupply - tokensSold;

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
                  <span className="font-semibold text-primary">{progressPercentage.toFixed(1)}%</span>
                </div>
                <Progress value={progressPercentage} className="h-3 glow-effect" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 rounded-lg text-center">
                  <p className="text-muted-foreground mb-2">Total Supply</p>
                  <p className="text-2xl font-bold gradient-text">
                    {totalSupply.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">SICO Tokens</p>
                </div>
                
                <div className="glass-card p-6 rounded-lg text-center">
                  <p className="text-muted-foreground mb-2">Tokens Sold</p>
                  <p className="text-2xl font-bold text-primary">
                    {tokensSold.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">SICO Tokens</p>
                </div>
                
                <div className="glass-card p-6 rounded-lg text-center">
                  <p className="text-muted-foreground mb-2">Remaining</p>
                  <p className="text-2xl font-bold text-secondary">
                    {tokensRemaining.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">SICO Tokens</p>
                </div>
              </div>
              
              <div className="glass-card p-6 rounded-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-muted-foreground text-sm">Token Price</p>
                    <p className="text-xl font-bold">$0.05</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Total Raised</p>
                    <p className="text-xl font-bold text-primary">$3.25M</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Hard Cap</p>
                    <p className="text-xl font-bold">$5M</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Min Purchase</p>
                    <p className="text-xl font-bold">100 SICO</p>
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
