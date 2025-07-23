import React from "react";
import { cn } from "@/lib/utils";
import { Inbox, Star, Mail, AlertTriangle, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FolderType, FolderCounts } from "@/types/ui";

interface EmailSidebarProps {
  selectedFolder: string;
  onFolderSelect: (folder: FolderType) => void;
  folderCounts: FolderCounts;
}

interface FolderConfig {
  id: FolderType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  countKey: keyof FolderCounts;
}

const FOLDERS: FolderConfig[] = [
  { id: "inbox", label: "Inbox", icon: Inbox, countKey: "inbox" },
  { id: "starred", label: "Starred", icon: Star, countKey: "starred" },
  { id: "all", label: "All Mail", icon: Mail, countKey: "all" },
  { id: "spam", label: "Spam", icon: AlertTriangle, countKey: "spam" },
  { id: "trash", label: "Trash", icon: Trash2, countKey: "trash" },
];

const FOLDER_TOOLTIPS: Record<FolderType, string> = {
  inbox: "View your inbox messages",
  starred: "View starred messages",
  all: "View all mail messages",
  spam: "View spam messages",
  trash: "View deleted messages",
};

function EmailSidebarComponent({
  selectedFolder,
  onFolderSelect,
  folderCounts,
}: EmailSidebarProps) {
  return (
    <div className="min-w-64">
      {/* Navigation */}
      <nav className="px-2 flex flex-col gap-1">
        <div className="mb-4 h-[56px] w-[138px] rounded-2xl bg-[rgb(194,231,255)] opacity-50" />
        {FOLDERS.map((folder) => {
          const count = folderCounts[folder.countKey];
          const isSelected = selectedFolder === folder.id;
          const showCount =
            count > 0 && (folder.id === "inbox" || folder.id === "spam");

          return (
            <Tooltip key={folder.id}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onFolderSelect(folder.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-2 text-xs rounded-full text-left transition-colors",
                    isSelected
                      ? "bg-bmail-blue font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                  aria-current={isSelected ? "page" : undefined}
                >
                  <folder.icon className="w-4 h-4" />
                  <span className="flex-1">{folder.label}</span>
                  {showCount && (
                    <span className="text-xs font-medium">{count}</span>
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{FOLDER_TOOLTIPS[folder.id]}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </nav>
    </div>
  );
}

export const EmailSidebar = React.memo(EmailSidebarComponent);
