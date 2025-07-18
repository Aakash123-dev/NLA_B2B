'use client';

import { useState } from 'react';
import { Message, ChatSession } from '../types';
import { SAMPLE_CHAT_SESSIONS, DEMO_RESPONSES } from '../data';

export function useChatWithAI() {
  // State for chat functionality
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m Gazelle AI, your advanced analytics and optimization assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  // State for chat history
  const [chatSessions, setChatSessions] = useState<ChatSession[]>(SAMPLE_CHAT_SESSIONS);
  
  // Handle sending a new message
  const sendMessage = (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      let responseContent = '';
      
      if (content.toLowerCase().includes('pricing') || content.toLowerCase().includes('price')) {
        responseContent = DEMO_RESPONSES.pricing;
      } else if (content.toLowerCase().includes('metric') || content.toLowerCase().includes('performance')) {
        responseContent = DEMO_RESPONSES.metrics;
      } else if (content.toLowerCase().includes('forecast') || content.toLowerCase().includes('prediction')) {
        responseContent = DEMO_RESPONSES.forecast;
      } else {
        responseContent = `Thank you for your question. As Gazelle AI, I'm specialized in retail analytics and price optimization. Based on your query, I would recommend looking at how your current pricing strategies align with market trends. Would you like me to analyze a specific aspect of your business?`;
      }
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };
  
  // Handle creating a new chat
  const startNewChat = () => {
    // Clear current messages except for the welcome message
    setMessages([{
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m Gazelle AI, your advanced analytics and optimization assistant. How can I help you today?',
      timestamp: new Date()
    }]);
  };
  
  // Handle selecting an existing chat session
  const selectChatSession = (id: string) => {
    // This would typically load the selected chat from the server
    // For demo purposes, we'll just create a new chat
    startNewChat();
  };
  
  // Handle clearing chat history
  const clearChatHistory = () => {
    // This would typically call an API to clear history
    // For demo purposes, we'll just reset to a default state
    setChatSessions([
      {
        id: '1',
        title: 'New Conversation',
        timestamp: new Date(),
        messages: []
      }
    ]);
    startNewChat();
  };
  
  return {
    messages,
    isLoading,
    chatSessions,
    sendMessage,
    startNewChat,
    selectChatSession,
    clearChatHistory
  };
}
