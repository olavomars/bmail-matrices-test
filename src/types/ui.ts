/**
 * UI-specific types for the email application
 */

export type FolderType = "inbox" | "starred" | "all" | "spam" | "trash";

export type AvatarSize = "sm" | "md" | "lg";

export interface FolderCounts {
  inbox: number;
  starred: number;
  all: number;
  spam: number;
  trash: number;
}

export interface EmailActions {
  onToggleStar: (threadId: string, emailId?: string) => void;
  onDelete: (threadId: string) => void;
  onMarkAsSpam: (threadId: string) => void;
  onMarkAsNotSpam: (threadId: string) => void;
  onMoveToInbox: (threadId: string) => void;
}

export interface EmailListActions {
  onThreadSelect: (threadId: string) => void;
  onToggleStar: (threadId: string) => void;
}

export interface FolderSelectAction {
  onFolderSelect: (folder: FolderType) => void;
}
