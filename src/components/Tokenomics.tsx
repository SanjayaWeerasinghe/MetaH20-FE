import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
  { name: "Public Sale", value: 40, color: "hsl(var(--chart-1))" },
  { name: "Team & Advisors", value: 20, color: "hsl(var(--chart-2))" },
  { name: "Development", value: 15, color: "hsl(var(--chart-3))" },
  { name: "Marketing", value: 10, color: "hsl(var(--chart-4))" },
  { name: "Liquidity", value: 10, color: "hsl(var(--chart-5))" },
  { name: "Reserve", value: 5, color: "hsl(195 100% 40%)" },
];

const Tokenomics = () => {
  return (
    <section id="tokenomics" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Tokenomics</h2>
          <p className="text-muted-foreground text-lg">Fair distribution for sustainable growth</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="glass-card p-8 shadow-card">
            <h3 className="text-2xl font-bold mb-6">Token Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
          
          <Card className="glass-card p-8 shadow-card">
            <h3 className="text-2xl font-bold mb-6">Token Details</h3>
            <div className="space-y-6">
              {data.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-foreground">{item.name}</span>
                  </div>
                  <span className="font-bold">{item.value}%</span>
                </div>
              ))}
              
              <div className="pt-6 border-t border-border space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Token Symbol</span>
                  <span className="font-bold">SICO</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Supply</span>
                  <span className="font-bold">100,000,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Blockchain</span>
                  <span className="font-bold text-primary">Solana</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Token Standard</span>
                  <span className="font-bold">SPL</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;
