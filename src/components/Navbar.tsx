import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <span className="text-xl font-bold text-primary-foreground">S</span>
            </div>
            <span className="text-xl font-bold gradient-text">SolanaICO</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-foreground/80 hover:text-primary transition-colors">About</a>
            <a href="#tokenomics" className="text-foreground/80 hover:text-primary transition-colors">Tokenomics</a>
            <a href="#investors" className="text-foreground/80 hover:text-primary transition-colors">Investors</a>
            <a href="#roadmap" className="text-foreground/80 hover:text-primary transition-colors">Roadmap</a>
          </div>
          
          <Button className="bg-gradient-primary hover:opacity-90 transition-opacity glow-effect">
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
