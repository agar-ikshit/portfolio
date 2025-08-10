import { useState } from 'react';
import { ChevronRight, ChevronDown, File, Folder, FolderOpen } from 'lucide-react';
import { FileItem } from './VSCodeLayout';

interface FileExplorerProps {
  files: FileItem[];
  onFileSelect: (file: FileItem) => void;
  activeFile: FileItem | null;
  level?: number;
}

export const FileExplorer = ({ files, onFileSelect, activeFile, level = 0 }: FileExplorerProps) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['src']));

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const getFileIcon = (file: FileItem) => {
    if (file.type === 'folder') {
      return expandedFolders.has(file.path) ? 
        <FolderOpen className="folder-icon text-primary" /> : 
        <Folder className="folder-icon text-primary" />;
    }

    // File type icons based on extension
    const ext = file.name.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'md':
        return <span className="file-icon">📝</span>;
      case 'js':
        return <span className="file-icon">🟨</span>;
      case 'ts':
        return <span className="file-icon">🔷</span>;
      case 'tsx':
        return <span className="file-icon">⚛️</span>;
      case 'css':
        return <span className="file-icon">🎨</span>;
      case 'json':
        return <span className="file-icon">📋</span>;
      default:
        return <File className="file-icon" />;
    }
  };

  return (
    <div className="p-2 flex-1">
      {level === 0 && (
        <div className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
          Explorer
        </div>
      )}
      
      <div className="space-y-1">
        {files.map((file) => (
          <div key={file.path}>
            <div
              className={`flex items-center py-1 px-2 rounded cursor-pointer text-sm hover:bg-muted/50 transition-colors ${
                activeFile?.path === file.path ? 'bg-primary/20 text-primary' : 'text-sidebar-foreground'
              }`}
              style={{ paddingLeft: `${level * 12 + 8}px` }}
              onClick={() => {
                if (file.type === 'folder') {
                  toggleFolder(file.path);
                } else {
                  onFileSelect(file);
                }
              }}
            >
              {file.type === 'folder' && (
                <ChevronRight 
                  className={`w-3 h-3 mr-1 transition-transform ${
                    expandedFolders.has(file.path) ? 'rotate-90' : ''
                  }`} 
                />
              )}
              
              {getFileIcon(file)}
              
              <span className="truncate">
                {file.name}
              </span>
            </div>

            {file.type === 'folder' && expandedFolders.has(file.path) && file.children && (
              <FileExplorer
                files={file.children}
                onFileSelect={onFileSelect}
                activeFile={activeFile}
                level={level + 1}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};