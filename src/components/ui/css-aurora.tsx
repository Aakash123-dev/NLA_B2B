"use client"
import React from 'react';

interface CSSAuroraProps {
  className?: string;
}

export default function CSSAurora({ className = "" }: CSSAuroraProps) {
  return (
    <div className={`w-full h-full relative overflow-hidden ${className}`}>
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0C0E22] via-[#1a1b3a] to-[#0C0E22]" />
      
      {/* Aurora effect layers */}
      <div className="absolute inset-0">
        {/* Aurora wave 1 */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute top-1/2 left-1/2 w-[800px] h-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(ellipse, rgba(58, 41, 255, 0.8) 0%, rgba(255, 148, 180, 0.4) 50%, transparent 100%)',
              animation: 'float 8s ease-in-out infinite'
            }}
          />
        </div>
        
        {/* Aurora wave 2 */}
        <div className="absolute inset-0 opacity-15">
          <div 
            className="absolute top-1/3 left-1/3 w-[600px] h-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
            style={{
              background: 'radial-gradient(ellipse, rgba(255, 50, 50, 0.7) 0%, rgba(58, 41, 255, 0.3) 70%, transparent 100%)',
              animation: 'float 12s ease-in-out infinite reverse'
            }}
          />
        </div>
        
        {/* Aurora wave 3 */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute top-2/3 left-2/3 w-[700px] h-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(ellipse, rgba(255, 148, 180, 0.9) 0%, rgba(255, 50, 50, 0.4) 60%, transparent 100%)',
              animation: 'float 10s ease-in-out infinite 2s'
            }}
          />
        </div>
        
        {/* Subtle particle effects */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
          <div className="absolute top-3/4 left-3/4 w-1 h-1 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-purple-300 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/6 left-5/6 w-1 h-1 bg-pink-300 rounded-full animate-pulse" style={{ animationDelay: '3s' }} />
        </div>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translate(-50%, -50%) rotate(0deg) scale(1);
          }
          25% {
            transform: translate(-45%, -55%) rotate(1deg) scale(1.05);
          }
          50% {
            transform: translate(-55%, -50%) rotate(0deg) scale(0.95);
          }
          75% {
            transform: translate(-50%, -45%) rotate(-1deg) scale(1.02);
          }
        }
      `}</style>
    </div>
  );
}
