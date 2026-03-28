import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity,
  Image
} from 'react-native';
import { ChevronRight, Shield, Building2 } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { mockAdmins } from '@/mocks/alerts';
import { theme } from '@/constants/theme';
import { Admin } from '@/types/alert';
import { useMessages } from '@/hooks/alerts-context';

export default function MessagesScreen() {
  const router = useRouter();
  const { getMessagesForAdmin } = useMessages();

  const handleAdminPress = (admin: Admin) => {
    router.push({
      pathname: '/chat',
      params: {
        adminId: admin.id,
        adminName: admin.name,
        adminRole: admin.role,
        adminAvatar: admin.avatarUrl || ''
      }
    });
  };

  const renderAdmin = ({ item }: { item: Admin }) => {
    const messages = getMessagesForAdmin(item.id);
    const lastMessage = messages[messages.length - 1];
    
    return (
      <TouchableOpacity 
        style={styles.adminCard}
        onPress={() => handleAdminPress(item)}
        activeOpacity={0.7}
        testID={`admin-${item.id}`}
      >
        <View style={styles.avatarContainer}>
          {item.avatarUrl ? (
            <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              {item.role === 'Mayor' ? (
                <Shield size={24} color={theme.colors.primary} />
              ) : (
                <Building2 size={24} color={theme.colors.primary} />
              )}
            </View>
          )}
        </View>
        
        <View style={styles.adminInfo}>
          <Text style={styles.adminName}>{item.name}</Text>
          <Text style={styles.adminRole}>{item.role} • {item.department}</Text>
          {lastMessage && (
            <Text style={styles.lastMessage} numberOfLines={1}>
              {lastMessage.isFromUser ? 'You: ' : ''}{lastMessage.message}
            </Text>
          )}
        </View>
        
        <ChevronRight size={20} color={theme.colors.textSecondary} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Direct Message City Officials</Text>
        <Text style={styles.headerSubtitle}>
          Send private messages to your elected officials and city departments
        </Text>
      </View>

      <FlatList
        data={mockAdmins}
        renderItem={renderAdmin}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        testID="admins-list"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: '600' as const,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  headerSubtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  listContent: {
    paddingVertical: theme.spacing.sm,
  },
  adminCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
  },
  avatarContainer: {
    marginRight: theme.spacing.md,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: theme.borderRadius.full,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  adminInfo: {
    flex: 1,
  },
  adminName: {
    fontSize: theme.fontSize.md,
    fontWeight: '600' as const,
    color: theme.colors.text,
    marginBottom: 2,
  },
  adminRole: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    fontStyle: 'italic' as const,
  },
  separator: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginLeft: 82,
  },
});