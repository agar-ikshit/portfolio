import { useState, useEffect } from 'react';
import { X, Moon, Sun, Palette, Monitor, Eye, Code } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  enhancedView: boolean;
  onEnhancedViewChange: (enabled: boolean) => void;
}

export const SettingsModal = ({ isOpen, onClose, enhancedView, onEnhancedViewChange }: SettingsModalProps) => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'system'
  );

  const applyTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (newTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // System preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background border border-border rounded-lg w-96 retro-border">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-neon-cyan">Settings</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 space-y-6">
          <div>
            <h3 className="text-sm font-medium text-neon-purple mb-3">Theme</h3>
            <div className="space-y-2">
              {[
                { value: 'light', label: 'Light', icon: Sun },
                { value: 'dark', label: 'Dark', icon: Moon },
                { value: 'system', label: 'System', icon: Monitor }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => applyTheme(option.value)}
                  className={`
                    flex items-center w-full px-3 py-2 rounded-md text-sm transition-colors
                    ${theme === option.value 
                      ? 'bg-primary/20 text-primary retro-border' 
                      : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                    }
                  `}
                >
                  <option.icon className="w-4 h-4 mr-2" />
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-neon-purple mb-3">Display Mode</h3>
            <div className="space-y-2">
              <button
                onClick={() => onEnhancedViewChange(true)}
                className={`
                  flex items-center w-full px-3 py-2 rounded-md text-sm transition-colors
                  ${enhancedView 
                    ? 'bg-primary/20 text-primary retro-border' 
                    : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                <Eye className="w-4 h-4 mr-2" />
                Enhanced View (Visual Cards)
              </button>
              <button
                onClick={() => onEnhancedViewChange(false)}
                className={`
                  flex items-center w-full px-3 py-2 rounded-md text-sm transition-colors
                  ${!enhancedView 
                    ? 'bg-primary/20 text-primary retro-border' 
                    : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                <Code className="w-4 h-4 mr-2" />
                Raw Code View (JSON/JS)
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-neon-purple mb-3">About</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Retro VS Code Portfolio</p>
              <p>Built with React & TypeScript</p>
              <p className="text-xs text-neon-pink">Made by Ikshit Agarwal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};