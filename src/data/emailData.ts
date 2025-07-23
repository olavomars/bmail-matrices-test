import { Email, EmailThread } from "../types/email";

// Frozen time: March 14th, 2030 @ 3:14 PM
const FROZEN_TIME = new Date("2030-03-14T15:14:00");

const createDate = (daysAgo: number, hoursAgo: number = 0) => {
  const date = new Date(FROZEN_TIME);
  date.setDate(date.getDate() - daysAgo);
  date.setHours(date.getHours() - hoursAgo);
  return date;
};

export const emails: Email[] = [
  {
    id: "1",
    threadId: "thread-1",
    from: {
      name: "Bmail Team",
      email: "noreply@bmail.com",
      avatar: "GT",
    },
    to: {
      name: "Me",
      email: "me@example.com",
    },
    subject: "Welcome to Bmail",
    body: "Welcome to BMail! Your account is all set up and ready to go. Start exploring our features.",
    timestamp: createDate(0, 5),
    isRead: false,
    isStarred: true,
    folder: "inbox",
  },

  {
    id: "2",
    threadId: "thread-2",
    from: {
      name: "Lisa AWang",
      email: "lisa.wang@company.com",
    },
    to: {
      name: "Me",
      email: "me@example.com",
    },
    subject: "Re: Project deadline reminder",
    body: "Hi team, just a reminder that our project deadline is this Friday. Please submit your final reports.",
    timestamp: createDate(1),
    isRead: true,
    isStarred: false,
    folder: "inbox",
  },
  {
    id: "2asduh",
    threadId: "thread-2",
    from: {
      name: "David Kim",
      email: "david.kim@company.com",
    },
    to: {
      name: "Me",
      email: "me@example.com",
    },
    subject: "Re: Project deadline reminder",
    body: "Thanks Lisa! I'll have my section ready by Thursday afternoon.",
    timestamp: createDate(1),
    isRead: true,
    isStarred: false,
    folder: "inbox",
  },

  {
    id: "3",
    threadId: "thread-3",
    from: {
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
    },
    to: {
      name: "Me",
      email: "me@example.com",
    },
    subject: "Re: Team meeting tomorrow",
    body: "Yes, please bring the Q4 reports. Also, let's discuss the new project timeline.",
    timestamp: createDate(1),
    isRead: false,
    isStarred: true,
    folder: "inbox",
  },

  {
    id: "4",
    threadId: "thread-4",
    from: {
      name: "Alex Rivera",
      email: "alex.rivera@bmail.com",
      avatar: "AR",
    },
    to: {
      name: "Me",
      email: "me@example.com",
    },
    subject: "Re: Dinner plans this weekend?",
    body: "Hey! Want to try that new Italian place downtown this Saturday?",
    timestamp: createDate(1, 15),
    isRead: false,
    isStarred: false,
    folder: "inbox",
  },

  {
    id: "5",
    threadId: "thread-4",
    from: {
      name: "You",
      email: "me@example.com",
      avatar: "Y",
    },
    to: {
      name: "Alex Rivera",
      email: "alex.rivera@bmail.com",
    },
    subject: "Re: Dinner plans this weekend?",
    body: "Sounds great! What time works for you?",
    timestamp: createDate(2, 4),
    isRead: true,
    isStarred: false,
    folder: "inbox",
  },

  {
    id: "6",
    threadId: "thread-4",
    from: {
      name: "Alex Rivera",
      email: "alex.rivera@bmail.com",
      avatar: "AR",
    },
    to: {
      name: "Me",
      email: "me@example.com",
    },
    subject: "Re: Dinner plans this weekend?",
    body: "How about 7 PM? I'll make a reservation for us.",
    timestamp: createDate(2, 2),
    isRead: true,
    isStarred: false,
    folder: "inbox",
  },

  {
    id: "7",
    threadId: "thread-5",
    from: {
      name: "Tech News",
      email: "newsletter@technews.com",
    },
    to: {
      name: "Me",
      email: "me@example.com",
    },
    subject: "Newsletter: Weekly updates",
    body: "Here are this week's top tech stories and updates from around the industry.",
    timestamp: createDate(2),
    isRead: false,
    isStarred: false,
    folder: "inbox",
  },

  {
    id: "8",
    threadId: "thread-6",
    from: {
      name: "Suspicious Sender",
      email: "noreply@suspicious.com",
    },
    to: {
      name: "Me",
      email: "me@example.com",
    },
    subject: "Congratulations! You've won!",
    body: "Click here to claim your prize!",
    timestamp: createDate(3),
    isRead: false,
    isStarred: false,
    folder: "spam",
  },
  {
    id: "9",
    threadId: "thread-7",
    from: {
      name: "Local Library",
      email: "newsletter@library.org",
      avatar: "LL",
    },
    to: {
      name: "Me",
      email: "me@example.com",
    },
    subject: "Monthly newsletter",
    body: "Check out our new arrivals and upcoming events this month at your local library.",
    timestamp: createDate(0, 30),
    isRead: true,
    isStarred: false,
    folder: "inbox",
  },
  {
    id: "10",
    threadId: "thread-8",
    from: {
      name: "StreamingService",
      email: "billing@streamingservice.com",
      avatar: "S",
    },
    to: {
      name: "Me",
      email: "me@example.com",
    },
    subject: "Your subscription is expiring",
    body: "Your monthly subscription will expire in 3 days. Renew now to continue enjoying our content.",
    timestamp: createDate(0, 44),
    isRead: true,
    isStarred: true,
    folder: "inbox",
  },
  {
    id: "11",
    threadId: "thread-9",
    from: {
      name: "Outdoor Club",
      email: "info@outdoorclub.org",
      avatar: "OC",
    },
    to: {
      name: "Me",
      email: "me@example.com",
    },
    subject: "Weekend hiking trip",
    body: "Join us this Saturday for a scenic hike at Blue Mountain Trail. All skill levels welcome!",
    timestamp: createDate(0, 46),
    isRead: true,
    isStarred: true,
    folder: "inbox",
  },
];

export const getEmailThreads = (): EmailThread[] => {
  const threadsMap = new Map<string, EmailThread>();

  emails.forEach((email) => {
    if (!threadsMap.has(email.threadId)) {
      threadsMap.set(email.threadId, {
        id: email.threadId,
        subject: email.subject.replace(/^Re:\s*/, ""),
        participants: [],
        emails: [],
        lastActivity: email.timestamp,
        isRead: true,
        isStarred: false,
        folder: email.folder,
        isSpam: email.folder === "spam",
      });
    }

    const thread = threadsMap.get(email.threadId)!;
    thread.emails.push(email);

    if (!thread.participants.includes(email.from.name)) {
      thread.participants.push(email.from.name);
    }

    if (email.timestamp > thread.lastActivity) {
      thread.lastActivity = email.timestamp;
    }

    if (!email.isRead) {
      thread.isRead = false;
    }

    if (email.isStarred) {
      thread.isStarred = true;
    }

    if (email.folder === "spam") {
      thread.isSpam = true;
    }
  });

  threadsMap.forEach((thread) => {
    thread.emails.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  });

  return Array.from(threadsMap.values()).sort(
    (a, b) => b.lastActivity.getTime() - a.lastActivity.getTime()
  );
};

export const getFolderCounts = (threads: EmailThread[]) => {
  return {
    inbox: threads.filter((t) => t.folder === "inbox").length,
    starred: threads.filter((t) => t.isStarred).length,
    all: threads.length,
    spam: threads.filter((t) => t.folder === "spam").length,
    trash: threads.filter((t) => t.folder === "trash").length,
  };
};
