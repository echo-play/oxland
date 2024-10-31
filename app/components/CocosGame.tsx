'use client';

import { useEffect } from 'react';

export default function CocosGame() {
  useEffect(() => {
    // Create a script element for each required script
    const scripts = [
      '/cocos/src/polyfills.bundle.js',
      '/cocos/src/system.bundle.js',
      '/cocos/src/import-map.json',
      '/cocos/index.js'
    ];

    scripts.forEach((src, index) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    });

    return () => {
      // Cleanup scripts when component unmounts
      scripts.forEach(src => {
        const script = document.querySelector(`script[src="${src}"]`);
        if (script) {
          document.body.removeChild(script);
        }
      });
    };
  }, []);

  return (
    <div 
      id="GameDiv" 
      style={{ width: '100%', height: '100%' }} 
      data-cc-exact-fit-screen="true"
    >
      <div id="Cocos3dGameContainer">
        <canvas 
          id="GameCanvas" 
          onContextMenu={(e) => e.preventDefault()} 
          tabIndex={99}
        />
      </div>
    </div>
  );
} 