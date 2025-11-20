import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const Navbar = () => {
  const { connecting, disconnect } = useWallet();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <span className="text-xl font-bold text-primary-foreground">H</span>
            </div>
            <span className="text-xl font-bold gradient-text">H2OICO</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-foreground/80 hover:text-primary transition-colors">About</a>
            <a href="#tokenomics" className="text-foreground/80 hover:text-primary transition-colors">Tokenomics</a>
            <a href="#investors" className="text-foreground/80 hover:text-primary transition-colors">Investors</a>
            <a href="#roadmap" className="text-foreground/80 hover:text-primary transition-colors">Roadmap</a>
            <Link to="/my-investments" className="text-foreground/80 hover:text-primary transition-colors">My Investment</Link>
            <Link to="/buy" className="text-foreground/80 hover:text-primary transition-colors">Buy Tokens</Link>
          </div>

          <div className="flex items-center gap-2">
            <WalletMultiButton className="!bg-gradient-primary hover:!opacity-90 !transition-opacity !glow-effect !rounded-lg !px-4 !py-2 !h-auto" />
            {connecting && (
              <Button
                onClick={() => disconnect()}
                variant="destructive"
                size="sm"
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
