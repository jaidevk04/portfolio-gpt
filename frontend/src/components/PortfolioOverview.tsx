import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import StockCard from "@/components/StockCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

interface Stock {
  symbol: string;
  invested: number;
  current_value: number;
  gain_loss: number;
  gain_loss_percentage: number;
  insight: string;
}

// Updated interface to match actual API response
interface PortfolioData {
  total_invested: number;
  total_current: number; // Changed from current_value to match API
  net_gain: number;      // Changed from net_gain_loss to match API
  stocks: Stock[];
}

interface PortfolioOverviewProps {
  refreshTrigger: number;
}

const PortfolioOverview = ({ refreshTrigger }: PortfolioOverviewProps) => {
  const { toast } = useToast();

  const fetchPortfolio = async (): Promise<PortfolioData> => {
    console.log("Fetching portfolio data...");
    const response = await fetch("http://127.0.0.1:8000/portfolio");
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Portfolio data received:", data);
    return data;
  };

  const { data: portfolio, isLoading, error, refetch } = useQuery({
    queryKey: ['portfolio', refreshTrigger],
    queryFn: fetchPortfolio,
    retry: 1,
  });

  useEffect(() => {
    if (error) {
      console.error("Portfolio fetch error:", error);
      toast({
        title: "Error loading portfolio",
        description: "Could not connect to portfolio service. Please check if the API is running.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Updated to safely handle undefined values
  const formatPercentage = (percentage: number | undefined) => {
    if (percentage === undefined || percentage === null) {
      return "0.00%";
    }
    return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  };

  // Calculate percentage for net gain/loss
  const calculateNetPercentage = (total: number, gain: number): number => {
    if (!total || total === 0) return 0;
    return (gain / total) * 100;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Portfolio Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </CardContent>
        </Card>
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="space-y-6">
        <Card className="shadow-lg border-red-200">
          <CardContent className="pt-6">
            <div className="text-center text-red-600">
              <h3 className="text-lg font-semibold mb-2">Unable to load portfolio</h3>
              <p className="text-sm text-gray-600">Please ensure the API server is running on port 8000</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calculate percentage since the API doesn't provide it
  const netGainLossPercentage = portfolio ? 
    calculateNetPercentage(portfolio.total_invested, portfolio.net_gain) : 0;

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-gray-900">Portfolio Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 font-medium">Total Invested</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(portfolio?.total_invested || 0)}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 font-medium">Current Value</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(portfolio?.total_current || 0)}</p>
            </div>
          </div>
          
          <div className={`rounded-lg p-4 ${(portfolio?.net_gain || 0) >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
            <p className="text-sm font-medium text-gray-600">Net Gain/Loss</p>
            <div className="flex items-center gap-2">
              <p className={`text-2xl font-bold ${(portfolio?.net_gain || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(portfolio?.net_gain || 0)}
              </p>
              <span className={`text-sm font-medium ${(portfolio?.net_gain || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ({formatPercentage(netGainLossPercentage)})
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Stocks */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Your Stocks</h3>
        <div className="grid gap-4">
          {portfolio?.stocks.map((stock) => (
            <StockCard key={stock.symbol} stock={stock} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioOverview;
