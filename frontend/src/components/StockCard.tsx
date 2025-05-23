
import { Card, CardContent } from "@/components/ui/card";

interface Stock {
  symbol: string;
  invested: number;
  current_value: number;
  gain_loss: number;
  gain_loss_percentage: number;
  insight: string;
}

interface StockCardProps {
  stock: Stock;
}

const StockCard = ({ stock }: StockCardProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (percentage: number | undefined) => {
    if (percentage === undefined || percentage === null) {
      return "0.00%";
    }
    return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  };

  const isGain = (stock.gain_loss || 0) >= 0;

  return (
    <Card className="shadow-md border-0 bg-white hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="text-lg font-bold text-gray-900 mb-2">{stock.symbol}</h4>
            
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Invested</p>
                <p className="text-sm font-semibold text-gray-900">{formatCurrency(stock.invested)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Current Value</p>
                <p className="text-sm font-semibold text-gray-900">{formatCurrency(stock.current_value)}</p>
              </div>
            </div>

            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
              isGain 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              <span>{formatCurrency(stock.gain_loss)}</span>
              <span>({formatPercentage(stock.gain_loss_percentage)})</span>
            </div>

            {stock.insight && (
              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800 leading-relaxed">{stock.insight}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockCard;
