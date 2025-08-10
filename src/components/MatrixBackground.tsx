import { useEffect, useRef } from 'react';

export const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Chinese characters for matrix effect
    const chars = '田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑';
    const charArray = chars.split('');

    // Column settings
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(0);

    // Get theme-aware colors
    const getColors = () => {
      const isDark = document.documentElement.classList.contains('dark');
      return {
        bg: isDark ? 'rgba(15, 23, 42, 0.58)' : 'rgba(248, 250, 252, 0.67)',
        text: isDark ? 'rgba(34, 197, 94, 0.74)' : 'rgba(34, 197, 94, 0.74)',
        bright: isDark ? 'rgba(0, 91, 33, 0.89)' : 'rgba(12, 192, 78, 0.81)'
      };
    };

    const animate = () => {
      const colors = getColors();
      
      // Clear with semi-transparent background
      ctx.fillStyle = colors.bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        
        // Set color - brighter for the leading character
        if (drops[i] * fontSize > canvas.height - fontSize * 3) {
          ctx.fillStyle = colors.bright;
        } else {
          ctx.fillStyle = colors.text;
        }
        
        // Draw character
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        // Move drop down
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    // Start animation
    const interval = setInterval(animate, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.4 }}
    />
  );
};