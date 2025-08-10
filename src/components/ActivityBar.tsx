import { Files, Search, Github, Linkedin, Settings, MessageCircle, Code, Music, Download } from 'lucide-react';
import { useState } from 'react';
import { SettingsModal } from './SettingsModal';
import { MessageModal } from './MessageModal';

interface ActivityBarProps {
  onToggleSidebar: () => void;
  enhancedView: boolean;
  onEnhancedViewChange: (enabled: boolean) => void;
}

export const ActivityBar = ({ onToggleSidebar, enhancedView, onEnhancedViewChange }: ActivityBarProps) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const links = {
    github: 'https://github.com/agar-ikshit',
    linkedin: 'https://www.linkedin.com/in/ikshit12',
    leetcode: 'https://leetcode.com/u/dullescence/',
    mail: 'mailto:ikshitagarwa@gmail.com',
    spotify: 'https://open.spotify.com/user/31o6rkjxuaa32toa3yqv3tcbgsnm',
    resume: 'https://drive.google.com/uc?export=download&id=1vizRM3HoWyjius88ZflWOs5SnBAtiP6z',
  };

  const activityItems = [
    { icon: Files, label: 'Explorer', active: true, onClick: onToggleSidebar },
    {
      icon: Github,
      label: 'Github',
      active: false,
      onClick: () => window.open(links.github, '_blank'),
    },
    {
      icon: Code,
      label: 'Leetcode',
      active: false,
      onClick: () => window.open(links.leetcode, '_blank'),
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      active: false,
      onClick: () => window.open(links.linkedin, '_blank'),
    },
    {
      icon: MessageCircle,
      label: 'Mail',
      active: false,
      onClick: () => setShowMessageModal(true),
      
    },
    {
      icon: Download,
      label: 'Download Resume',
      active: false,
      onClick: () => window.open(links.resume, '_blank'),
    },
    {
      icon: Music,
      label: 'Music',
      active: false,
      onClick: () => window.open(links.spotify, '_blank'),
    },
  ];

  return (
    <div className="w-12 bg-vscode-activityBar border-r border-border flex flex-col items-center py-2 relative">
      {activityItems.map((item) => {
        return (
          <button
            key={item.label}
            onClick={item.onClick}
            className={`
              w-10 h-10 flex items-center justify-center rounded-lg mb-1
              transition-all duration-300 ease-out relative group
              ${item.active
                ? 'text-primary bg-primary/20 neon-glow'
                : 'text-muted-foreground neon-glow-muted'}
            `}
            title={item.label}
            aria-label={item.label}
            type="button"
          >
            <item.icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-125 group-hover:translate-z-4" />
            {item.active && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-primary rounded-r"></div>
            )}
            {/* Tooltip */}
            <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
              {item.label}
            </div>
          </button>
        );
      })}

      {/* Bottom section */}
      <div className="mt-auto">
        <button
          onClick={() => setShowSettings(true)}
          className="w-10 h-10 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-muted/50 transition-colors group relative"
          title="Settings"
          aria-label="Settings"
          type="button"
        >
          <Settings className="w-5 h-5" />
          {/* Tooltip */}
          <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
            Settings
          </div>
        </button>
      </div>

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        enhancedView={enhancedView}
        onEnhancedViewChange={onEnhancedViewChange}
      />
       {showMessageModal && <MessageModal isOpen={showMessageModal} onClose={() => setShowMessageModal(false)} />}
    </div>
  );
};
