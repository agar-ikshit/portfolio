import { GitBranch, AlertCircle, CheckCircle } from 'lucide-react';
import { FileItem } from './VSCodeLayout';

interface StatusBarProps {
  activeFile: FileItem | null;
}

export const StatusBar = ({ activeFile }: StatusBarProps) => {
  const getLanguageName = (language?: string) => {
    switch (language) {
      case 'javascript':
        return 'JavaScript';
      case 'typescript':
        return 'TypeScript';
      case 'markdown':
        return 'Markdown';
      default:
        return 'Plain Text';
    }
  };

  const getLineCount = (content?: string) => {
    if (!content) return 0;
    return content.split('\n').length;
  };

  return (
    <div className="h-6 bg-primary text-primary-foreground text-xs flex items-center justify-between px-2 retro-border-green">
      <div className="flex items-center space-x-4">
        {/* Git branch */}
        <div className="flex items-center space-x-1">
          <GitBranch className="w-3 h-3" />
          <span>main</span>
        </div>
        
        {/* Errors/Warnings */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <AlertCircle className="w-3 h-3" />
            <span>0</span>
          </div>
          <div className="flex items-center space-x-1">
            <CheckCircle className="w-3 h-3" />
            <span>0</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* File info */}
        {activeFile && (
          <>
            <span>Ln {getLineCount(activeFile.content)}, Col 1</span>
            <span>Spaces: 2</span>
            <span>UTF-8</span>
            <span className="px-2 py-0.5 bg-primary-foreground/20 rounded">
              {getLanguageName(activeFile.language)}
            </span>
          </>
        )}
        
        {/* Live Share / Remote */}
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>Portfolio Live</span>
        </div>
      </div>
    </div>
  );
};