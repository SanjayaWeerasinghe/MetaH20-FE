import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Wallet, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const BuyTokens = () => {
  const [solAmount, setSolAmount] = useState("");
  const { toast } = useToast();
  const TOKEN_RATE = 1000; // 1 SOL = 1000 tokens

  const tokenAmount = solAmount ? (parseFloat(solAmount) * TOKEN_RATE).toFixed(2) : "0";

  const handleBuy = () => {
    if (!solAmount || parseFloat(solAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid SOL amount",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Purchase Initiated",
      description: `Buying ${tokenAmount} tokens for ${solAmount} SOL`,
    });
  };

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
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2">Buy Tokens</h1>
          <p className="text-muted-foreground">Participate in the HydraICO token sale</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Purchase Form */}
          <Card className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">Purchase Tokens</CardTitle>
              <CardDescription>Exchange Rate: 1 SOL = {TOKEN_RATE.toLocaleString()} Tokens</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="sol-amount">SOL Amount</Label>
                <Input
                  id="sol-amount"
                  type="number"
                  placeholder="0.00"
                  value={solAmount}
                  onChange={(e) => setSolAmount(e.target.value)}
                  min="0"
                  step="0.01"
                  className="text-lg h-12"
                />
              </div>

              <div className="flex items-center justify-center py-4">
                <ArrowRight className="h-6 w-6 text-primary animate-pulse" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="token-amount">You Will Receive</Label>
                <div className="relative">
                  <Input
                    id="token-amount"
                    type="text"
                    value={tokenAmount}
                    readOnly
                    className="text-lg h-12 font-semibold bg-muted"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    TOKENS
                  </span>
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-primary hover:opacity-90 transition-opacity glow-effect h-12 text-lg"
                onClick={handleBuy}
              >
                <Wallet className="mr-2 h-5 w-5" />
                Buy Tokens
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Please ensure your wallet is connected before purchasing
              </p>
            </CardContent>
          </Card>

          {/* Information Card */}
          <div className="space-y-6">
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle>Sale Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-border/50">
                  <span className="text-muted-foreground">Token Price</span>
                  <span className="font-semibold">0.001 SOL</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border/50">
                  <span className="text-muted-foreground">Exchange Rate</span>
                  <span className="font-semibold">1 SOL = {TOKEN_RATE.toLocaleString()} Tokens</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border/50">
                  <span className="text-muted-foreground">Minimum Purchase</span>
                  <span className="font-semibold">0.01 SOL</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Token Standard</span>
                  <span className="font-semibold">SPL Token</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-accent/20 bg-accent/5">
              <CardHeader>
                <CardTitle className="text-accent">How to Buy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    1
                  </div>
                  <p className="text-sm">Connect your Solana wallet</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    2
                  </div>
                  <p className="text-sm">Enter the amount of SOL you want to spend</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    3
                  </div>
                  <p className="text-sm">Confirm the transaction in your wallet</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    4
                  </div>
                  <p className="text-sm">Tokens will be sent to your wallet instantly</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyTokens;
