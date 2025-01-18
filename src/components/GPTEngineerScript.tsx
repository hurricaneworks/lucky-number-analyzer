import { useEffect } from 'react';

export const GPTEngineerScript = () => {
  useEffect(() => {
    const isDev = import.meta.env.DEV;
    if (!isDev) return;

    const script = document.createElement('script');
    script.src = 'https://cdn.gpteng.co/gptengineer.js';
    script.type = 'module';
    document.body.appendChild(script);
    
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return null;
};
