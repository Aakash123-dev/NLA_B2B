'use client';

import { Plus, Zap, Sparkles } from 'lucide-react';

// Import components and hooks
import { ChatMessage, ChatInput, ChatThinking, ChatHeader } from './components';
import { useChatWithAI } from './hooks';
import { Message } from './types';

export default function ChatWithAIPage() {
  // Use the chat hook
  const {
    messages,
    isLoading,
    sendMessage,
    startNewChat,
    clearChatHistory
  } = useChatWithAI();

  // Example queries/predefined questions
  const predefinedQuestions = [
    { 
      number: 1,
      text: "Top 6 unique products by retailer based on latest 52 weeks revenue and show which one is elastic or inelastic",
      query: "Show me top 6 unique products by retailer based on latest 52 weeks revenue and identify which ones are elastic or inelastic"
    },
    { 
      number: 2,
      text: "Which are the top 10 products within my portfolio that are the most responsive to merchandising (TPR, Feature, Display, F&D)",
      query: "Which are the top 10 products within my portfolio that are the most responsive to merchandising (TPR, Feature, Display, F&D)"
    },
    { 
      number: 3,
      text: "If I had $500,000 to invest, which products and which events would I spend them on to get the highest event ROI?",
      query: "If I had $500,000 to invest, which products and which events would I spend them on to get the highest event ROI?"
    },
    { 
      number: 4,
      text: "If I were to take a price increase or decrease by 10%. How would the units, volume, dollars change at each retailer by brand?",
      query: "If I were to take a price increase or decrease by 10%. How would the units, volume, dollars change at each retailer by brand?"
    },
    { 
      number: 5,
      text: "Given data on how unit volume and dollar sales change at different retailers by brand with a 10% price increase or decrease, what insights can you provide?",
      query: "Given data on how unit volume and dollar sales change at different retailers by brand with a 10% price increase or decrease, what insights can you provide?"
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header with brand and actions */}
      <ChatHeader onNewChat={startNewChat} onClearHistory={clearChatHistory} />
      
      {/* Main content area */}
      <div className="container mx-auto px-4 lg:px-12 py-6 flex-1 flex">
        {/* Single column layout for the chat interface */}
        <div className="flex flex-col w-full bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
          {/* Left sidebar with predefined questions */}
          <div className="flex h-[calc(100vh-180px)]">
            <div className="w-1/4 border-r border-slate-200">
              <div className="p-5 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800">Predefined Questions</h2>
                <p className="text-sm text-slate-500 mt-1">Ask me anything about your data</p>
              </div>
              
              <div className="overflow-y-auto p-3 space-y-3 h-[calc(100%-80px)]">
                {predefinedQuestions.map((question) => (
                  <button
                    key={question.number}
                    onClick={() => sendMessage(question.query)}
                    className="w-full p-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-left transition-all group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 text-purple-600 font-semibold text-sm">
                        {question.number}
                      </div>
                      <p className="text-sm text-slate-700 leading-normal">
                        {question.text}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Right area for chat messages */}
            <div className="w-3/4 flex flex-col">
              {/* Chat messages display area - scrolling not automatic */}
              <div className="flex-1 overflow-y-auto">
                {/* Welcome/Empty state */}
                {messages.length <= 1 && (
                  <div className="flex flex-col items-center justify-center text-center py-10 px-6 h-full">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 mb-6">
                      <Zap className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome to AI Assistant</h2>
                    <p className="text-slate-500 max-w-lg mb-8">Ask me about anything related to your data, or select a predefined question from the left panel.</p>
                  </div>
                )}
                
                {/* Messages area */}
                {messages.length > 1 && (
                  <div className="flex flex-col h-full">
                    <div className="p-6 space-y-6">
                      {messages.map((message: Message) => (
                        <ChatMessage 
                          key={message.id} 
                          role={message.role} 
                          content={message.content} 
                          timestamp={message.timestamp} 
                        />
                      ))}
                      
                      {isLoading && <ChatThinking />}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Input area with border - fixed at bottom */}
              <div className="border-t border-slate-200 p-4 bg-slate-50/80">
                <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
                
                <div className="flex items-center justify-center text-xs text-slate-400 mt-3 space-x-2">
                  <Sparkles className="h-3 w-3" />
                  <span>AI Assistant - Type your message here...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
