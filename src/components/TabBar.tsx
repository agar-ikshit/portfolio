import { X } from 'lucide-react';
import { FileItem } from './VSCodeLayout';

interface TabBarProps {
  tabs: FileItem[];
  activeTab: FileItem | null;
  onTabSelect: (tab: FileItem) => void;
  onTabClose: (tab: FileItem) => void;
}

export const TabBar = ({ tabs, activeTab, onTabSelect, onTabClose }: TabBarProps) => {
  const getFileIcon = (file: FileItem) => {
    const ext = file.name.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'md':
        return '📝';
      case 'js':
        return <img src="icons/javascript.svg" alt="JavaScript" className="inline w-5 h-5" />;
      case 'ts':
        return '🔷';
      case 'tsx':
        return '⚛️';
      case 'css':
        return '🎨';
      case 'json':
        return '📋';
      default:
        return '📄';
    }
  };

  if (tabs.length === 0) {
    return (
      <div className="h-10 bg-tab-bg border-b border-tab-border flex items-center justify-center">
        <span className="text-sm text-muted-foreground">No files open</span>
      </div>
    );
  }

  return (
    <div className="h-10 bg-tab-bg border-b border-tab-border retro-border-blue flex items-center overflow-x-auto">
      {tabs.map((tab) => (
        <div
          key={tab.path}
          className={`
            flex items-center px-3 py-2 border-r border-tab-border cursor-pointer
            text-sm min-w-0 flex-shrink-0 group hover:bg-tab-active-bg/50
            ${activeTab?.path === tab.path 
              ? 'bg-tab-active-bg text-foreground border-b-2 border-primary' 
              : 'bg-tab-bg text-muted-foreground hover:text-foreground'
            }
          `}
          onClick={() => onTabSelect(tab)}
        >
          <span className="mr-2">{getFileIcon(tab)}</span>
          <span className="truncate max-w-32">{tab.name}</span>
          
          <button
            className="ml-2 opacity-0 group-hover:opacity-100 hover:bg-muted rounded p-0.5 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              onTabClose(tab);
            }}
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
    </div>
  );
};