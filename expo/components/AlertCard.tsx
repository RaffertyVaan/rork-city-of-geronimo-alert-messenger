import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AlertCircle, Calendar, Megaphone, Wrench, Info, Clock, ChevronRight } from 'lucide-react-native';
import { Alert, AlertCategory } from '@/types/alert';
import { theme } from '@/constants/theme';

interface AlertCardProps {
  alert: Alert;
  onPress: () => void;
}

const getCategoryIcon = (category: AlertCategory) => {
  const iconProps = { size: 20 };
  switch (category) {
    case 'emergency':
      return <AlertCircle {...iconProps} color={theme.colors.emergency} />;
    case 'events':
      return <Calendar {...iconProps} color={theme.colors.secondary} />;
    case 'news':
      return <Megaphone {...iconProps} color={theme.colors.primary} />;
    case 'maintenance':
      return <Wrench {...iconProps} color={theme.colors.warning} />;
    default:
      return <Info {...iconProps} color={theme.colors.textSecondary} />;
  }
};

const getCategoryColor = (category: AlertCategory, priority: string) => {
  if (priority === 'high') return theme.colors.emergency;
  
  switch (category) {
    case 'emergency':
      return theme.colors.emergency;
    case 'events':
      return theme.colors.secondary;
    case 'maintenance':
      return theme.colors.warning;
    default:
      return theme.colors.primary;
  }
};

const formatTime = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
};

export const AlertCard: React.FC<AlertCardProps> = ({ alert, onPress }) => {
  const categoryColor = getCategoryColor(alert.category, alert.priority);

  return (
    <TouchableOpacity 
      style={[styles.container, !alert.read && styles.unread]}
      onPress={onPress}
      activeOpacity={0.7}
      testID={`alert-card-${alert.id}`}
    >
      {alert.priority === 'high' && (
        <View style={[styles.priorityIndicator, { backgroundColor: theme.colors.emergency }]} />
      )}
      
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          {getCategoryIcon(alert.category)}
        </View>
        <View style={styles.headerText}>
          <Text style={styles.author}>{alert.author}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.role}>{alert.authorRole}</Text>
            <View style={styles.timeContainer}>
              <Clock size={12} color={theme.colors.textSecondary} />
              <Text style={styles.time}>{formatTime(alert.timestamp)}</Text>
            </View>
          </View>
        </View>
        <ChevronRight size={20} color={theme.colors.textSecondary} />
      </View>

      <Text style={[styles.title, { color: categoryColor }]} numberOfLines={2}>
        {alert.title}
      </Text>
      
      <Text style={styles.message} numberOfLines={3}>
        {alert.message}
      </Text>

      {alert.imageUrl && (
        <Image source={{ uri: alert.imageUrl }} style={styles.image} />
      )}

      {!alert.read && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadText}>NEW</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  unread: {
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.secondary,
  },
  priorityIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    borderTopLeftRadius: theme.borderRadius.lg,
    borderTopRightRadius: theme.borderRadius.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
  },
  headerText: {
    flex: 1,
  },
  author: {
    fontSize: theme.fontSize.sm,
    fontWeight: '600' as const,
    color: theme.colors.text,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  role: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    marginRight: theme.spacing.sm,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  time: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
  },
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: '600' as const,
    marginBottom: theme.spacing.xs,
  },
  message: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    lineHeight: 22,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: theme.borderRadius.md,
    marginTop: theme.spacing.sm,
  },
  unreadBadge: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
  },
  unreadText: {
    color: theme.colors.card,
    fontSize: theme.fontSize.xs,
    fontWeight: '700' as const,
  },
});