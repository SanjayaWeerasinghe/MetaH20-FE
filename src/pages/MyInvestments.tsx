import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Wallet, TrendingUp, Clock, ArrowDownRight } from "lucide-react";
import { Link } from "react-router-dom";

const MyInvestments = () => {
  // Mock data - will be replaced with actual wallet data
  const totalTokens = 15000;
  const totalInvested = 15; // SOL
  const averagePrice = 0.001;

  const transactions = [
    {
      id: "tx1",
      date: "2024-11-15",
      time: "14:32:15",
      solAmount: 5,
      tokensReceived: 5000,
      txHash: "5KJp8F3vK2h9...",
      status: "completed",
    },
    {
      id: "tx2",
      date: "2024-11-10",
      time: "09:21:42",
      solAmount: 10,
      tokensReceived: 10000,
      txHash: "8mNq2D7xL4j1...",
      status: "completed",
    },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2">My Investments</h1>
          <p className="text-muted-foreground">Track your H2OICO token holdings and transaction history</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card border-primary/20">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                Total Tokens
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold gradient-text">{totalTokens.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">H2O Tokens</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary/20">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Total Invested
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold gradient-text">{totalInvested} SOL</div>
              <p className="text-xs text-muted-foreground mt-1">${(totalInvested * 100).toFixed(2)} USD</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary/20">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <ArrowDownRight className="h-4 w-4" />
                Average Price
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold gradient-text">{averagePrice} SOL</div>
              <p className="text-xs text-muted-foreground mt-1">per token</p>
            </CardContent>
          </Card>
        </div>

        {/* Transaction History */}
        <Card className="glass-card border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl">Transaction History</CardTitle>
            <CardDescription>All your token purchase transactions</CardDescription>
          </CardHeader>
          <CardContent>
            {transactions.length === 0 ? (
              <div className="text-center py-12">
                <Wallet className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground mb-4">No transactions yet</p>
                <Link to="/buy">
                  <Button className="bg-gradient-primary hover:opacity-90">
                    Buy Your First Tokens
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg glass-card border border-border/50 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-start gap-4 mb-3 md:mb-0">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <ArrowDownRight className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-lg mb-1">
                          +{tx.tokensReceived.toLocaleString()} H2O
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {tx.date} at {tx.time}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          TX: {tx.txHash}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <div className="text-lg font-semibold">
                        {tx.solAmount} SOL
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                          {tx.status}
                        </span>
                        <a
                          href={`https://solscan.io/tx/${tx.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline"
                        >
                          View on Explorer
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Link to="/buy">
            <Button size="lg" className="bg-gradient-primary hover:opacity-90 transition-opacity glow-effect">
              <Wallet className="mr-2 h-5 w-5" />
              Buy More Tokens
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyInvestments;
