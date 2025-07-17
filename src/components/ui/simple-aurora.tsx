import React from 'react';

interface SimpleAuroraProps {
  className?: string;
}

export default function SimpleAurora({ className = "" }: SimpleAuroraProps) {
  return (
    <div className={`w-full h-full relative overflow-hidden ${className}`}>
      {/* Animated Aurora Background */}
      <div className="absolute inset-0">
        {/* Primary Aurora Wave */}
        <div 
          className="absolute inset-0 opacity-60"
          style={{
            background: `
              radial-gradient(ellipse 800px 300px at 50% 80%, 
                rgba(58, 41, 255, 0.3) 0%, 
                rgba(255, 148, 180, 0.2) 35%, 
                rgba(255, 50, 50, 0.1) 70%, 
                transparent 100%
              )
            `,
            animation: 'aurora1 8s ease-in-out infinite alternate'
          }}
        />
        
        {/* Secondary Aurora Wave */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(ellipse 600px 200px at 30% 70%, 
                rgba(255, 50, 50, 0.3) 0%, 
                rgba(58, 41, 255, 0.2) 40%, 
                rgba(255, 148, 180, 0.1) 80%, 
                transparent 100%
              )
            `,
            animation: 'aurora2 12s ease-in-out infinite alternate-reverse'
          }}
        />
        
        {/* Tertiary Aurora Wave */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(ellipse 700px 250px at 70% 60%, 
                rgba(255, 148, 180, 0.4) 0%, 
                rgba(255, 50, 50, 0.2) 50%, 
                rgba(58, 41, 255, 0.1) 100%
              )
            `,
            animation: 'aurora3 10s ease-in-out infinite alternate'
          }}
        />
      </div>
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes aurora1 {
          0% {
            transform: translateX(-100px) translateY(-50px) rotate(-5deg);
            opacity: 0.6;
          }
          50% {
            transform: translateX(50px) translateY(0px) rotate(0deg);
            opacity: 0.8;
          }
          100% {
            transform: translateX(100px) translateY(50px) rotate(5deg);
            opacity: 0.6;
          }
        }
        
        @keyframes aurora2 {
          0% {
            transform: translateX(100px) translateY(30px) rotate(3deg);
            opacity: 0.4;
          }
          50% {
            transform: translateX(-30px) translateY(-20px) rotate(-2deg);
            opacity: 0.7;
          }
          100% {
            transform: translateX(-100px) translateY(40px) rotate(4deg);
            opacity: 0.4;
          }
        }
        
        @keyframes aurora3 {
          0% {
            transform: translateX(50px) translateY(-30px) rotate(-2deg);
            opacity: 0.3;
          }
          50% {
            transform: translateX(-50px) translateY(20px) rotate(1deg);
            opacity: 0.6;
          }
          100% {
            transform: translateX(80px) translateY(-40px) rotate(-3deg);
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
}
