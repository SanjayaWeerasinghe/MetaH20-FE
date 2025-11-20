import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Wallet, TrendingUp, Clock, ArrowDownRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";
import { api, type UserStats, type Transaction } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const MyInvestments = () => {
  const { publicKey, connected } = useWallet();
  const { toast } = useToast();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (connected && publicKey) {
      fetchData();
    }
  }, [connected, publicKey]);

  const fetchData = async () => {
    if (!publicKey) return;

    setLoading(true);
    try {
      const publicKeyString = publicKey.toBase58();
      const [userStats, userTransactions] = await Promise.all([
        api.getUserStats(publicKeyString),
        api.getUserTransactions(publicKeyString)
      ]);

      setStats(userStats);
      setTransactions(userTransactions);
    } catch (error: any) {
      // If user doesn't exist yet, that's okay - they just haven't made any purchases
      if (error.message.includes('404')) {
        setStats(null);
        setTransactions([]);
      } else {
        toast({
          title: "Error",
          description: "Failed to load investment data",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  if (!connected) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="mb-8">
            <Link to="/">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2">My Investments</h1>
            <p className="text-muted-foreground">Track your MH2OICO token holdings and transaction history</p>
          </div>

          <Card className="glass-card border-primary/20 max-w-2xl mx-auto">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Wallet className="h-24 w-24 text-muted-foreground/30 mb-6" />
              <h3 className="text-2xl font-bold mb-2">Wallet Not Connected</h3>
              <p className="text-muted-foreground text-center mb-6">
                Please connect your wallet to view your investments
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const totalTokens = stats?.total_tokens || 0;
  const totalInvested = (stats?.total_usdt_invested || 0) + ((stats?.total_sol_invested || 0) * 100);
  const averagePrice = totalTokens > 0 ? totalInvested / totalTokens : 0;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
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
          <p className="text-muted-foreground">Track your MH2OICO token holdings and transaction history</p>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Loading your investments...</p>
          </div>
        ) : (
          <>
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
                  <p className="text-xs text-muted-foreground mt-1">MH2O Tokens</p>
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
                  <div className="text-3xl font-bold gradient-text">${totalInvested.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground mt-1">USD value</p>
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
                  <div className="text-3xl font-bold gradient-text">${averagePrice.toFixed(4)}</div>
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
                              +{tx.tokens_received.toLocaleString()} MH2O
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {new Date(tx.created_at).toLocaleString()}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              TX: {tx.transaction_hash.slice(0, 16)}...
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <div className="text-lg font-semibold">
                            {tx.amount_paid} {tx.payment_currency}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              tx.status === 'completed' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                              tx.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                              'bg-red-500/20 text-red-400 border border-red-500/30'
                            }`}>
                              {tx.status}
                            </span>
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
          </>
        )}
      </div>
    </div>
  );
};

export default MyInvestments;
