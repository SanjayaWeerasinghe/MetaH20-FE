import { Twitter, Github, MessageCircle, Send } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-xl font-bold text-primary-foreground">H</span>
              </div>
            <span className="text-xl font-bold gradient-text">H2OICO</span>
          </div>
          <p className="text-muted-foreground text-sm">
            Building the future of decentralized finance with H2O blockchain technology.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#tokenomics" className="hover:text-primary transition-colors">Tokenomics</a></li>
              <li><a href="#investors" className="hover:text-primary transition-colors">Investors</a></li>
              <li><a href="#roadmap" className="hover:text-primary transition-colors">Roadmap</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Whitepaper</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-lg glass-card flex items-center justify-center hover:bg-primary/10 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg glass-card flex items-center justify-center hover:bg-primary/10 transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg glass-card flex items-center justify-center hover:bg-primary/10 transition-colors">
                <Send className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg glass-card flex items-center justify-center hover:bg-primary/10 transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>© 2024 H2OICO. All rights reserved. Built on Solana blockchain.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
