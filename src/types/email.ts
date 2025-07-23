export interface Email {
  id: string;
  threadId: string;
  from: {
    name: string;
    email: string;
    avatar?: string;
  };
  to: {
    name: string;
    email: string;
  };
  subject: string;
  body: string;
  timestamp: Date;
  isRead: boolean;
  isStarred: boolean;
  folder: "inbox" | "starred" | "all" | "spam" | "trash";
  labels?: string[];
  hasAttachments?: boolean;
}

export interface EmailThread {
  id: string;
  subject: string;
  isSpam?: boolean;
  emails: Email[];
  lastActivity: Date;
  isRead: boolean;
  isStarred: boolean;
  folder: "inbox" | "starred" | "all" | "spam" | "trash";
}

export interface Folder {
  id: string;
  name: string;
  count: number;
  icon: string;
}
