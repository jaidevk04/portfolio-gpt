
import { useState } from "react";
import PortfolioOverview from "@/components/PortfolioOverview";
import AskGPTChat from "@/components/AskGPTChat";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const Index = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-inter">
      {/* Hero Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Portfolio GPT 💼</h1>
            <Button
              onClick={handleRefresh}
              variant="outline"
              className="flex items-center gap-2 hover:bg-gray-50"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
          <p className="text-gray-600 mt-2">Your intelligent stock portfolio assistant</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Portfolio Overview - Left Side */}
          <div className="order-2 lg:order-1">
            <PortfolioOverview refreshTrigger={refreshTrigger} />
          </div>

          {/* AskGPT Chat - Right Side */}
          <div className="order-1 lg:order-2">
            <AskGPTChat />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
