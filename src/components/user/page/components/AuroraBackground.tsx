'use client';

import Aurora from '@/components/ui/aurora';

export const AuroraBackground = () => {
  return (
    <div className="fixed inset-0 z-0 opacity-30">
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />
    </div>
  );
};

export default AuroraBackground;
