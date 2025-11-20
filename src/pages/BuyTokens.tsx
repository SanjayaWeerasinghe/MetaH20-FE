import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Wallet, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@solana/wallet-adapter-react";
import { api } from "@/services/api";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  createTransferInstruction,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  getAccount
} from "@solana/spl-token";

const BuyTokens = () => {
  const [usdtAmount, setUsdtAmount] = useState("10");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const { publicKey, connected, signTransaction } = useWallet();

  // Configuration from environment variables
  const TOKEN_RATE = Number(import.meta.env.VITE_TOKEN_RATE);
  const MIN_PURCHASE = Number(import.meta.env.VITE_MIN_PURCHASE);
  const DEVNET_RPC = import.meta.env.VITE_DEVNET_RPC;
  const USDT_MINT = import.meta.env.VITE_USDT_MINT;
  const TREASURY_ADDRESS = import.meta.env.VITE_TREASURY_ADDRESS;
  const USDT_DECIMALS = Number(import.meta.env.VITE_USDT_DECIMALS);

  const tokenAmount = usdtAmount ? (parseFloat(usdtAmount) * TOKEN_RATE).toFixed(2) : "0";

  const handleBuy = async () => {
    if (!connected || !publicKey || !signTransaction) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to purchase tokens",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(usdtAmount);
    if (!usdtAmount || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid USDT amount",
        variant: "destructive",
      });
      return;
    }

    if (amount < MIN_PURCHASE) {
      toast({
        title: "Amount Too Low",
        description: `Minimum purchase is ${MIN_PURCHASE} USDT`,
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Create connection to devnet
      const connection = new Connection(DEVNET_RPC, 'confirmed');

      // Convert addresses to PublicKey
      const mintPublicKey = new PublicKey(USDT_MINT);
      const treasuryPublicKey = new PublicKey(TREASURY_ADDRESS);

      toast({
        title: "Preparing Transaction",
        description: "Checking token accounts...",
      });

      // Get associated token addresses
      const fromTokenAccount = await getAssociatedTokenAddress(
        mintPublicKey,
        publicKey
      );

      const toTokenAccount = await getAssociatedTokenAddress(
        mintPublicKey,
        treasuryPublicKey
      );

      // Get recent blockhash
      const { blockhash } = await connection.getLatestBlockhash('finalized');

      // Create transaction
      const transaction = new Transaction({
        recentBlockhash: blockhash,
        feePayer: publicKey,
      });

      // Check if sender's token account exists, create if not
      try {
        await getAccount(connection, fromTokenAccount);
      } catch (error) {
        console.log("Creating sender token account...");
        transaction.add(
          createAssociatedTokenAccountInstruction(
            publicKey, // payer
            fromTokenAccount, // associated token account address
            publicKey, // owner
            mintPublicKey // mint
          )
        );
      }

      // Check if treasury's token account exists, create if not
      try {
        await getAccount(connection, toTokenAccount);
      } catch (error) {
        console.log("Creating treasury token account...");
        transaction.add(
          createAssociatedTokenAccountInstruction(
            publicKey, // payer
            toTokenAccount, // associated token account address
            treasuryPublicKey, // owner
            mintPublicKey // mint
          )
        );
      }

      // Calculate transfer amount with decimals
      const transferAmount = BigInt(Math.floor(amount * Math.pow(10, USDT_DECIMALS)));

      // Add transfer instruction
      transaction.add(
        createTransferInstruction(
          fromTokenAccount,
          toTokenAccount,
          publicKey,
          transferAmount,
          [],
          TOKEN_PROGRAM_ID
        )
      );

      toast({
        title: "Awaiting Signature",
        description: "Please approve the transaction in your wallet",
      });

      // Sign transaction with connected wallet
      const signedTransaction = await signTransaction(transaction);

      toast({
        title: "Sending Transaction",
        description: "Broadcasting to Solana devnet...",
      });

      // Send transaction
      const signature = await connection.sendRawTransaction(
        signedTransaction.serialize(),
        {
          skipPreflight: false,
          preflightCommitment: 'confirmed',
          maxRetries: 3,
        }
      );

      toast({
        title: "Confirming Transaction",
        description: "Waiting for blockchain confirmation...",
      });

      // Confirm transaction
      const confirmation = await connection.confirmTransaction(signature, 'confirmed');

      if (confirmation.value.err) {
        throw new Error(`Transaction failed: ${JSON.stringify(confirmation.value.err)}`);
      }

      console.log('Transaction confirmed:', signature);

      // Record the transaction in the backend
      await api.createTransaction({
        publicKey: publicKey.toBase58(),
        transactionHash: signature,
        paymentCurrency: "USDT",
        amountPaid: amount,
        tokensReceived: parseFloat(tokenAmount),
        exchangeRate: TOKEN_RATE,
      });

      toast({
        title: "Purchase Successful! 🎉",
        description: `You purchased ${tokenAmount} MH2O tokens for ${amount} USDT. Transaction: ${signature.slice(0, 8)}...`,
      });

      // Reset form
      setUsdtAmount("");
    } catch (error: any) {
      console.error("Purchase failed:", error);

      let errorMessage = "Failed to process your purchase. Please try again.";

      if (error.message?.includes("User rejected")) {
        errorMessage = "Transaction was rejected";
      } else if (error.message?.includes("insufficient")) {
        errorMessage = "Insufficient USDT balance in your wallet";
      } else if (error.message?.includes("TokenAccountNotFoundError")) {
        errorMessage = "USDT token account not found. Make sure you have USDT in your wallet.";
      }

      toast({
        title: "Purchase Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
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
          <p className="text-muted-foreground">Participate in the MH2OICO token sale</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Purchase Form */}
          <Card className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">Purchase Tokens</CardTitle>
              <CardDescription>Exchange Rate: 1 USDT = {TOKEN_RATE.toLocaleString()} MH2O Tokens</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="usdt-amount">USDT Amount</Label>
                <Input
                  id="usdt-amount"
                  type="number"
                  placeholder="10.00"
                  value={usdtAmount}
                  onChange={(e) => setUsdtAmount(e.target.value)}
                  min={MIN_PURCHASE}
                  step="0.01"
                  className="text-lg h-12"
                  disabled={!connected}
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
                    MH2O
                  </span>
                </div>
              </div>

              <Button
                className="w-full bg-gradient-primary hover:opacity-90 transition-opacity glow-effect h-12 text-lg"
                onClick={handleBuy}
                disabled={!connected || isProcessing}
              >
                <Wallet className="mr-2 h-5 w-5" />
                {isProcessing ? "Processing..." : connected ? "Buy Tokens" : "Connect Wallet First"}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                {connected
                  ? `Minimum purchase: ${MIN_PURCHASE} USDT`
                  : "Please connect your wallet to purchase tokens"}
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
                  <span className="font-semibold">$0.01</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border/50">
                  <span className="text-muted-foreground">Exchange Rate</span>
                  <span className="font-semibold">1 USDT = {TOKEN_RATE.toLocaleString()} MH2O</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border/50">
                  <span className="text-muted-foreground">Minimum Purchase</span>
                  <span className="font-semibold">{MIN_PURCHASE} USDT</span>
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
                  <p className="text-sm">Connect your Solana wallet (Phantom or Solflare)</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    2
                  </div>
                  <p className="text-sm">Enter the amount of USDT you want to spend (min {MIN_PURCHASE} USDT)</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    3
                  </div>
                  <p className="text-sm">Click "Buy Tokens" and confirm the transaction</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    4
                  </div>
                  <p className="text-sm">MH2O tokens will be credited to your account</p>
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
