// Sample data for demo chat with AI

import { ChatSession } from './types';

export const SAMPLE_CHAT_SESSIONS: ChatSession[] = [
  {
    id: '1',
    title: 'Price Optimization Strategy',
    timestamp: new Date(Date.now() - 86400000), // Yesterday
    messages: []
  },
  {
    id: '2',
    title: 'Market Analysis Report',
    timestamp: new Date(Date.now() - 86400000 * 2), // 2 days ago
    messages: []
  },
  {
    id: '3',
    title: 'Competitor Pricing Analysis',
    timestamp: new Date(Date.now() - 86400000 * 5), // 5 days ago
    messages: []
  }
];

export const DEMO_RESPONSES = {
  pricing: "Based on my analysis of your current pricing strategy and market conditions, I recommend a dynamic pricing model that adjusts based on demand patterns. Your current fixed pricing is leaving approximately 12-15% potential revenue on the table. Here's a breakdown:\n\n• Weekday vs Weekend: Increase prices by 8% during peak weekend hours\n• Competitor Monitoring: Stay within 5% of competitors while maintaining your premium position\n• Volume Discounts: Implement tiered pricing with 3%, 5%, and 8% discounts at different volume thresholds\n\nWould you like me to generate a detailed implementation plan?",
  metrics: "I've analyzed your key performance metrics for Q2 2025 compared to Q1. Here are the highlights:\n\n📈 Revenue: $2.45M (+12% QoQ)\n🛒 Average Order Value: $175 (+5% QoQ)\n⏱️ Customer Acquisition Cost: $28 (-10% QoQ)\n🔄 Retention Rate: 76% (+4% QoQ)\n\nYour promotional campaigns are performing exceptionally well, particularly the multi-buy discount strategy which has increased cart size by approximately 15%. I recommend expanding this approach to your mid-tier product categories.",
  forecast: "Based on historical data and current market trends, here's your 6-month sales forecast:\n\nJuly 2025: $820K-$890K (8% YoY growth)\nAugust 2025: $760K-$840K (6% YoY growth)\nSeptember 2025: $890K-$950K (11% YoY growth)\nOctober 2025: $920K-$1.1M (15% YoY growth)\nNovember 2025: $1.2M-$1.4M (18% YoY growth)\nDecember 2025: $1.5M-$1.7M (12% YoY growth)\n\nFactors influencing this forecast include your planned product launches in September and seasonal trends. Would you like to see a detailed breakdown by product category?",
  competition: "I've completed the competitor analysis for your top 3 competitors in the electronics sector:\n\n**CompTech Inc.**\n- Pricing: 5-8% lower than yours on average\n- Promotion Strategy: Frequent flash sales (2-3x per month)\n- Market Share: 23% (up 2% from last quarter)\n\n**ElectroGiant**\n- Pricing: Premium positioning (12% higher than yours)\n- Promotion Strategy: Loyalty program and bundling\n- Market Share: 31% (stable)\n\n**TechValue**\n- Pricing: Budget positioning (15% lower than yours)\n- Promotion Strategy: Volume discounts and cashback\n- Market Share: 18% (down 1% from last quarter)\n\nBased on this analysis, there's an opportunity to strengthen your mid-market position with more targeted bundle offers similar to ElectroGiant but at your more competitive price point.",
  inventory: "Here's my inventory optimization recommendation based on your current stock levels and sales velocity:\n\n🔴 **Overstock Items (Reduce):**\n- HD Monitors: 142 days of inventory (reduce by 40%)\n- Wireless Keyboards: 95 days (reduce by 25%)\n\n🟡 **Optimal Stock:**\n- Laptop Accessories: 45 days of inventory\n- Gaming Peripherals: 38 days of inventory\n\n🔵 **Understock Items (Increase):**\n- USB-C Cables: 12 days of inventory (increase by 50%)\n- Wireless Earbuds: 8 days (critical - increase by 75%)\n\nI recommend implementing automated reorder points for the understocked items to prevent lost sales opportunities."
};
