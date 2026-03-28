import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { AlertCategory, DirectMessage } from '@/types/alert';
import { mockAlerts } from '@/mocks/alerts';

const ALERTS_STORAGE_KEY = 'city_alerts';
const READ_ALERTS_KEY = 'read_alerts';
const MESSAGES_STORAGE_KEY = 'direct_messages';

export const [AlertsProvider, useAlerts] = createContextHook(() => {
  const queryClient = useQueryClient();
  const [selectedCategory, setSelectedCategory] = useState<AlertCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [readAlertIds, setReadAlertIds] = useState<Set<string>>(new Set());

  // Load alerts
  const alertsQuery = useQuery({
    queryKey: ['alerts'],
    queryFn: async () => {
      const stored = await AsyncStorage.getItem(ALERTS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.map((alert: any) => ({
          ...alert,
          timestamp: new Date(alert.timestamp),
        }));
      }
      // Initialize with mock data
      await AsyncStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify(mockAlerts));
      return mockAlerts;
    },
  });

  // Load read status
  const readStatusQuery = useQuery({
    queryKey: ['readStatus'],
    queryFn: async () => {
      const stored = await AsyncStorage.getItem(READ_ALERTS_KEY);
      if (stored) {
        return new Set<string>(JSON.parse(stored));
      }
      return new Set<string>();
    },
  });

  useEffect(() => {
    if (readStatusQuery.data) {
      setReadAlertIds(readStatusQuery.data);
    }
  }, [readStatusQuery.data]);

  // Mark alert as read
  const markAsReadMutation = useMutation({
    mutationFn: async (alertId: string) => {
      const newReadIds = new Set(readAlertIds);
      newReadIds.add(alertId);
      await AsyncStorage.setItem(READ_ALERTS_KEY, JSON.stringify(Array.from(newReadIds)));
      return newReadIds;
    },
    onSuccess: (newReadIds) => {
      setReadAlertIds(newReadIds);
      queryClient.invalidateQueries({ queryKey: ['readStatus'] });
    },
  });

  // Filter alerts
  const filteredAlerts = useMemo(() => {
    if (!alertsQuery.data) return [];
    
    let filtered = alertsQuery.data;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((alert: any) => alert.category === selectedCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((alert: any) => 
        alert.title.toLowerCase().includes(query) ||
        alert.message.toLowerCase().includes(query) ||
        alert.author.toLowerCase().includes(query)
      );
    }
    
    return filtered.map((alert: any) => ({
      ...alert,
      read: readAlertIds.has(alert.id),
    }));
  }, [alertsQuery.data, selectedCategory, searchQuery, readAlertIds]);

  const unreadCount = useMemo(() => {
    if (!alertsQuery.data) return 0;
    return alertsQuery.data.filter((alert: any) => !readAlertIds.has(alert.id)).length;
  }, [alertsQuery.data, readAlertIds]);

  return {
    alerts: filteredAlerts,
    isLoading: alertsQuery.isLoading || readStatusQuery.isLoading,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    markAsRead: markAsReadMutation.mutate,
    unreadCount,
    refetch: alertsQuery.refetch,
  };
});

export const [MessagesProvider, useMessages] = createContextHook(() => {
  const [messages, setMessages] = useState<DirectMessage[]>([]);

  // Load messages
  const messagesQuery = useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      const stored = await AsyncStorage.getItem(MESSAGES_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
      }
      return [];
    },
  });

  useEffect(() => {
    if (messagesQuery.data) {
      setMessages(messagesQuery.data);
    }
  }, [messagesQuery.data]);

  // Send message
  const sendMessageMutation = useMutation({
    mutationFn: async (newMessage: Omit<DirectMessage, 'id' | 'timestamp'>) => {
      const message: DirectMessage = {
        ...newMessage,
        id: Date.now().toString(),
        timestamp: new Date(),
      };
      
      const updatedMessages = [...messages, message];
      await AsyncStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(updatedMessages));
      return updatedMessages;
    },
    onSuccess: (updatedMessages) => {
      setMessages(updatedMessages);
    },
  });

  const getMessagesForAdmin = useCallback((adminId: string) => {
    return messages.filter(msg => msg.toAdminId === adminId);
  }, [messages]);

  return {
    messages,
    sendMessage: sendMessageMutation.mutate,
    getMessagesForAdmin,
    isLoading: messagesQuery.isLoading,
    isSending: sendMessageMutation.isPending,
  };
});