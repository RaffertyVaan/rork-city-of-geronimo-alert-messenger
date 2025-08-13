export type AlertCategory = 'emergency' | 'news' | 'events' | 'maintenance' | 'general' | 'animal-control';
export type AlertPriority = 'high' | 'medium' | 'low';

export interface Alert {
  id: string;
  title: string;
  message: string;
  category: AlertCategory;
  priority: AlertPriority;
  author: string;
  authorRole: string;
  timestamp: Date;
  read: boolean;
  imageUrl?: string;
}

export interface DirectMessage {
  id: string;
  fromUserId: string;
  toAdminId: string;
  message: string;
  timestamp: Date;
  isFromUser: boolean;
}

export interface Admin {
  id: string;
  name: string;
  role: string;
  department: string;
  avatarUrl?: string;
}

export interface AnimalControlReport {
  id: string;
  type: 'stray' | 'aggressive' | 'injured' | 'noise' | 'other';
  description: string;
  location: string;
  contactName: string;
  contactPhone: string;
  timestamp: Date;
  status: 'pending' | 'investigating' | 'resolved';
  imageUrl?: string;
}