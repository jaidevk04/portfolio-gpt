
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AskGPTChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      console.log("Sending question to API:", inputValue);
      
      const response = await fetch('http://127.0.0.1:8000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: inputValue.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API response:", data);

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: data.answer || data.response || "I received your question but couldn't generate a response.",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error asking question:', error);
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "Sorry, I couldn't process your question right now. Please make sure the API server is running and try again.",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Connection Error",
        description: "Could not connect to the AI service. Please check if the API is running on port 8000.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-white h-[600px] flex flex-col overflow-hidden">
      <CardHeader className="pb-4 border-b">
        <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Bot className="h-5 w-5 text-blue-600" />
          Ask GPT
        </CardTitle>
        <p className="text-sm text-gray-600">Ask me about any stock in your portfolio</p>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages Area - Using ScrollArea for better scrolling behavior */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <Bot className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium mb-2">Ready to help!</p>
                <p className="text-sm">Ask me questions like:</p>
                <div className="mt-4 space-y-2 text-sm text-left max-w-sm mx-auto">
                  <div className="bg-gray-50 p-2 rounded-lg">"Why is TATAMOTORS down?"</div>
                  <div className="bg-gray-50 p-2 rounded-lg">"Should I buy more RELIANCE?"</div>
                  <div className="bg-gray-50 p-2 rounded-lg">"What's happening with my portfolio?"</div>
                </div>
              </div>
            )}
            
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
              >
                <div className="flex max-w-[80%] gap-2">
                  {message.type === 'assistant' && (
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-blue-600" />
                      </div>
                    </div>
                  )}
                  
                  <div
                    className={`rounded-lg px-4 py-3 shadow-sm break-words ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  
                  {message.type === 'user' && (
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="flex max-w-[80%] gap-2">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                  <div className="bg-gray-100 rounded-lg px-4 py-3 shadow-sm">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        {/* Input Area - Fixed at bottom */}
        <div className="border-t p-4 bg-white">
          <form onSubmit={handleSubmit} className="flex gap-2 items-center">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about your stocks..."
              disabled={isLoading}
              className="flex-1 rounded-full border-gray-200"
            />
            <Button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="bg-blue-600 hover:bg-blue-700 rounded-full h-10 w-10 p-0 flex items-center justify-center"
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default AskGPTChat;
