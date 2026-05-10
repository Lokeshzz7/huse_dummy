import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from 'sonner';

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  read: boolean;
  type: 'text' | 'image' | 'file';
  attachmentUrl?: string;
}

export interface Conversation {
  id: string;
  participantIds: string[];
  participants: ConversationParticipant[];
  lastMessage: Message | null;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
  type: 'direct' | 'group';
  title?: string; // For group chats
  avatar?: string; // For group chats
}

export interface ConversationParticipant {
  id: string;
  name: string;
  avatar: string;
  userType: 'student' | 'startup' | 'contributor' | 'recruiter';
  platform: 'huse' | 'dofracto' | 'quotify';
  online?: boolean;
  lastSeen?: string;
}

interface MessagingContextType {
  conversations: Conversation[];
  messages: Record<string, Message[]>; // conversationId -> messages
  getConversation: (id: string) => Conversation | undefined;
  getMessages: (conversationId: string) => Message[];
  sendMessage: (conversationId: string, content: string, type?: Message['type']) => void;
  createConversation: (participants: ConversationParticipant[]) => Conversation;
  markAsRead: (conversationId: string) => void;
  getUnreadCount: () => number;
  searchConversations: (query: string) => Conversation[];
  deleteConversation: (conversationId: string) => void;
}

const MessagingContext = createContext<MessagingContextType | undefined>(undefined);

// Mock data for demo
const MOCK_PARTICIPANTS: ConversationParticipant[] = [
  {
    id: 'user-1',
    name: 'Priya Sharma',
    avatar: '👩‍💻',
    userType: 'student',
    platform: 'huse',
    online: true
  },
  {
    id: 'user-2',
    name: 'Sarah Johnson',
    avatar: '👩‍💼',
    userType: 'startup',
    platform: 'dofracto',
    online: true
  },
  {
    id: 'user-3',
    name: 'Tech Recruiter',
    avatar: '👔',
    userType: 'recruiter',
    platform: 'huse',
    online: false,
    lastSeen: '2 hours ago'
  },
  {
    id: 'user-4',
    name: 'Alex Chen',
    avatar: '👨‍💻',
    userType: 'contributor',
    platform: 'dofracto',
    online: true
  }
];

const MOCK_MESSAGES: Message[] = [
  {
    id: 'msg-1',
    conversationId: 'conv-1',
    senderId: 'user-1',
    senderName: 'Priya Sharma',
    senderAvatar: '👩‍💻',
    content: 'Hey! I saw your project on the platform. Really impressive work!',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    read: true,
    type: 'text'
  },
  {
    id: 'msg-2',
    conversationId: 'conv-1',
    senderId: 'current-user',
    senderName: 'You',
    senderAvatar: '🎯',
    content: 'Thanks! I appreciate it. Have you worked on something similar?',
    timestamp: new Date(Date.now() - 3000000).toISOString(),
    read: true,
    type: 'text'
  },
  {
    id: 'msg-3',
    conversationId: 'conv-1',
    senderId: 'user-1',
    senderName: 'Priya Sharma',
    senderAvatar: '👩‍💻',
    content: 'Yes! I built a similar MVP last semester. Would love to collaborate sometime.',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    read: true,
    type: 'text'
  },
  {
    id: 'msg-4',
    conversationId: 'conv-2',
    senderId: 'user-2',
    senderName: 'Sarah Johnson',
    senderAvatar: '👩‍💼',
    content: 'Hi! We have an exciting opportunity at TechVision. Are you interested in a freelance project?',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    read: false,
    type: 'text'
  },
  {
    id: 'msg-5',
    conversationId: 'conv-3',
    senderId: 'user-3',
    senderName: 'Tech Recruiter',
    senderAvatar: '👔',
    content: 'Your profile matches one of our open positions. Can we schedule a call?',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    read: false,
    type: 'text'
  }
];

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    participantIds: ['current-user', 'user-1'],
    participants: [MOCK_PARTICIPANTS[0]],
    lastMessage: MOCK_MESSAGES[2],
    unreadCount: 0,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 1800000).toISOString(),
    type: 'direct'
  },
  {
    id: 'conv-2',
    participantIds: ['current-user', 'user-2'],
    participants: [MOCK_PARTICIPANTS[1]],
    lastMessage: MOCK_MESSAGES[3],
    unreadCount: 1,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 7200000).toISOString(),
    type: 'direct'
  },
  {
    id: 'conv-3',
    participantIds: ['current-user', 'user-3'],
    participants: [MOCK_PARTICIPANTS[2]],
    lastMessage: MOCK_MESSAGES[4],
    unreadCount: 1,
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    type: 'direct'
  }
];

export function MessagingProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});

  // Load from localStorage on mount
  useEffect(() => {
    const storedConversations = localStorage.getItem('huse_conversations');
    const storedMessages = localStorage.getItem('huse_messages');
    
    if (storedConversations && storedMessages) {
      try {
        setConversations(JSON.parse(storedConversations));
        setMessages(JSON.parse(storedMessages));
      } catch (error) {
        console.error('Failed to load messages:', error);
        initializeMockData();
      }
    } else {
      initializeMockData();
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem('huse_conversations', JSON.stringify(conversations));
      localStorage.setItem('huse_messages', JSON.stringify(messages));
    }
  }, [conversations, messages]);

  const initializeMockData = () => {
    setConversations(MOCK_CONVERSATIONS);
    
    const messagesByConversation: Record<string, Message[]> = {};
    MOCK_MESSAGES.forEach(msg => {
      if (!messagesByConversation[msg.conversationId]) {
        messagesByConversation[msg.conversationId] = [];
      }
      messagesByConversation[msg.conversationId].push(msg);
    });
    setMessages(messagesByConversation);
  };

  const getConversation = (id: string) => {
    return conversations.find(conv => conv.id === id);
  };

  const getMessages = (conversationId: string) => {
    return messages[conversationId] || [];
  };

  const sendMessage = (conversationId: string, content: string, type: Message['type'] = 'text') => {
    const conversation = getConversation(conversationId);
    if (!conversation) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId: 'current-user',
      senderName: 'You',
      senderAvatar: '🎯',
      content,
      timestamp: new Date().toISOString(),
      read: true,
      type
    };

    // Add message to messages
    setMessages(prev => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMessage]
    }));

    // Update conversation
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          lastMessage: newMessage,
          updatedAt: new Date().toISOString()
        };
      }
      return conv;
    }));

    // Sort conversations by last update
    setConversations(prev => [...prev].sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    ));

    toast.success('Message sent!');
  };

  const createConversation = (participants: ConversationParticipant[]): Conversation => {
    // Check if conversation already exists
    const existingConv = conversations.find(conv => 
      conv.participantIds.length === participants.length + 1 &&
      participants.every(p => conv.participantIds.includes(p.id))
    );

    if (existingConv) {
      return existingConv;
    }

    const newConversation: Conversation = {
      id: `conv-${Date.now()}`,
      participantIds: ['current-user', ...participants.map(p => p.id)],
      participants,
      lastMessage: null,
      unreadCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      type: participants.length > 1 ? 'group' : 'direct',
      title: participants.length > 1 ? participants.map(p => p.name).join(', ') : undefined
    };

    setConversations(prev => [newConversation, ...prev]);
    setMessages(prev => ({ ...prev, [newConversation.id]: [] }));

    toast.success('Conversation created!');
    return newConversation;
  };

  const markAsRead = (conversationId: string) => {
    // Mark all messages as read
    setMessages(prev => ({
      ...prev,
      [conversationId]: (prev[conversationId] || []).map(msg => ({
        ...msg,
        read: true
      }))
    }));

    // Update conversation unread count
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        return { ...conv, unreadCount: 0 };
      }
      return conv;
    }));
  };

  const getUnreadCount = () => {
    return conversations.reduce((total, conv) => total + conv.unreadCount, 0);
  };

  const searchConversations = (query: string) => {
    const lowerQuery = query.toLowerCase();
    return conversations.filter(conv => {
      // Search in participant names
      const participantMatch = conv.participants.some(p => 
        p.name.toLowerCase().includes(lowerQuery)
      );
      
      // Search in last message
      const messageMatch = conv.lastMessage?.content.toLowerCase().includes(lowerQuery);
      
      return participantMatch || messageMatch;
    });
  };

  const deleteConversation = (conversationId: string) => {
    setConversations(prev => prev.filter(conv => conv.id !== conversationId));
    setMessages(prev => {
      const { [conversationId]: _, ...rest } = prev;
      return rest;
    });
    toast.success('Conversation deleted');
  };

  // Simulate receiving messages (for demo) - DISABLED
  // This was causing random toast notifications every 30 seconds
  /*
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly receive a message from a participant
      if (Math.random() > 0.7 && conversations.length > 0) {
        const randomConv = conversations[Math.floor(Math.random() * conversations.length)];
        const randomParticipant = randomConv.participants[0];
        
        const responses = [
          'That sounds great!',
          'When are you available for a call?',
          'I\'d love to discuss this further.',
          'Can you send me more details?',
          'Thanks for reaching out!',
          'Let me check and get back to you.'
        ];

        const newMessage: Message = {
          id: `msg-${Date.now()}`,
          conversationId: randomConv.id,
          senderId: randomParticipant.id,
          senderName: randomParticipant.name,
          senderAvatar: randomParticipant.avatar,
          content: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date().toISOString(),
          read: false,
          type: 'text'
        };

        setMessages(prev => ({
          ...prev,
          [randomConv.id]: [...(prev[randomConv.id] || []), newMessage]
        }));

        setConversations(prev => prev.map(conv => {
          if (conv.id === randomConv.id) {
            return {
              ...conv,
              lastMessage: newMessage,
              unreadCount: conv.unreadCount + 1,
              updatedAt: new Date().toISOString()
            };
          }
          return conv;
        }).sort((a, b) => 
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        ));

        toast.success(`New message from ${randomParticipant.name}`, {
          icon: randomParticipant.avatar
        });
      }
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [conversations]);
  */

  const value: MessagingContextType = {
    conversations,
    messages,
    getConversation,
    getMessages,
    sendMessage,
    createConversation,
    markAsRead,
    getUnreadCount,
    searchConversations,
    deleteConversation
  };

  return (
    <MessagingContext.Provider value={value}>
      {children}
    </MessagingContext.Provider>
  );
}

export function useMessaging() {
  const context = useContext(MessagingContext);
  if (!context) {
    throw new Error('useMessaging must be used within a MessagingProvider');
  }
  return context;
}