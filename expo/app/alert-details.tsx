import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView,
  Image,
  TouchableOpacity,
  Share,
} from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { 
  Clock, 
  User, 
  Building2,
  Share2,
  AlertCircle,
  Calendar,
  Megaphone,
  Wrench,
  Info
} from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { Alert, AlertCategory } from '@/types/alert';

const getCategoryIcon = (category: AlertCategory) => {
  const iconProps = { size: 24, color: theme.colors.card };
  switch (category) {
    case 'emergency':
      return <AlertCircle {...iconProps} />;
    case 'events':
      return <Calendar {...iconProps} />;
    case 'news':
      return <Megaphone {...iconProps} />;
    case 'maintenance':
      return <Wrench {...iconProps} />;
    default:
      return <Info {...iconProps} />;
  }
};

const getCategoryColor = (category: AlertCategory) => {
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

export default function AlertDetailsScreen() {
  const params = useLocalSearchParams();
  
  const alert: Alert = params.alertData 
    ? JSON.parse(params.alertData as string)
    : null;

  if (!alert) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Alert not found</Text>
      </View>
    );
  }

  const handleShare = async () => {
    try {
      await Share.share({
        title: alert.title,
        message: `${alert.title}\n\n${alert.message}\n\nFrom: ${alert.author}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const categoryColor = getCategoryColor(alert.category);
  const formattedDate = new Date(alert.timestamp).toLocaleString();

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Alert Details',
          headerStyle: {
            backgroundColor: categoryColor,
          },
          headerTintColor: theme.colors.card,
          headerBackTitle: 'Back',
          headerRight: () => (
            <TouchableOpacity 
              onPress={handleShare}
              style={styles.headerButton}
            >
              <Share2 size={20} color={theme.colors.card} />
            </TouchableOpacity>
          ),
        }}
      />
      
      <ScrollView style={styles.container}>
        <View style={[styles.header, { backgroundColor: categoryColor }]}>
          <View style={styles.categoryBadge}>
            {getCategoryIcon(alert.category)}
            <Text style={styles.categoryText}>
              {alert.category.toUpperCase()}
            </Text>
          </View>
          
          {alert.priority === 'high' && (
            <View style={styles.priorityBadge}>
              <AlertCircle size={16} color={theme.colors.card} />
              <Text style={styles.priorityText}>HIGH PRIORITY</Text>
            </View>
          )}
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{alert.title}</Text>
          
          <View style={styles.metaContainer}>
            <View style={styles.metaRow}>
              <User size={16} color={theme.colors.textSecondary} />
              <Text style={styles.metaText}>{alert.author}</Text>
            </View>
            <View style={styles.metaRow}>
              <Building2 size={16} color={theme.colors.textSecondary} />
              <Text style={styles.metaText}>{alert.authorRole}</Text>
            </View>
            <View style={styles.metaRow}>
              <Clock size={16} color={theme.colors.textSecondary} />
              <Text style={styles.metaText}>{formattedDate}</Text>
            </View>
          </View>

          {alert.imageUrl && (
            <Image 
              source={{ uri: alert.imageUrl }} 
              style={styles.image}
              resizeMode="cover"
            />
          )}

          <Text style={styles.message}>{alert.message}</Text>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              This is an official alert from your city government
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  errorText: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.textSecondary,
  },
  headerButton: {
    padding: theme.spacing.sm,
  },
  header: {
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
    alignItems: 'center',
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  categoryText: {
    color: theme.colors.card,
    fontSize: theme.fontSize.sm,
    fontWeight: '700' as const,
    letterSpacing: 1,
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.emergency,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
    gap: theme.spacing.xs,
  },
  priorityText: {
    color: theme.colors.card,
    fontSize: theme.fontSize.xs,
    fontWeight: '700' as const,
  },
  content: {
    padding: theme.spacing.md,
  },
  title: {
    fontSize: theme.fontSize.xxl,
    fontWeight: '700' as const,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    lineHeight: 32,
  },
  metaContainer: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  metaText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.lg,
  },
  message: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    lineHeight: 24,
    marginBottom: theme.spacing.xl,
  },
  footer: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.primary,
  },
  footerText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    fontStyle: 'italic' as const,
  },
});