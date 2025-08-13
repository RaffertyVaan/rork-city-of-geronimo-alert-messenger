import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Send, Shield, Building2 } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { useMessages } from '@/hooks/alerts-context';
import { DirectMessage } from '@/types/alert';

export default function ChatScreen() {
  const params = useLocalSearchParams();
  const { getMessagesForAdmin, sendMessage, isSending } = useMessages();
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const adminId = params.adminId as string;
  const adminName = params.adminName as string;
  const adminRole = params.adminRole as string;
  const adminAvatar = params.adminAvatar as string;

  const messages = getMessagesForAdmin(adminId);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (flatListRef.current && messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    sendMessage({
      fromUserId: 'user',
      toAdminId: adminId,
      message: inputText.trim(),
      isFromUser: true,
    });

    setInputText('');

    // Simulate admin response
    setTimeout(() => {
      const responses = [
        "Thank you for your message. We'll look into this matter.",
        "Your concern has been noted. Our team will review it shortly.",
        "We appreciate you reaching out. Someone will get back to you soon.",
        "Thank you for contacting us. This has been forwarded to the appropriate department.",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      sendMessage({
        fromUserId: adminId,
        toAdminId: adminId,
        message: randomResponse,
        isFromUser: false,
      });
    }, 2000);
  };

  const renderMessage = ({ item }: { item: DirectMessage }) => {
    const isUser = item.isFromUser;
    
    return (
      <View style={[
        styles.messageContainer,
        isUser ? styles.userMessage : styles.adminMessage
      ]}>
        {!isUser && (
          <View style={styles.adminAvatar}>
            {adminAvatar ? (
              <Image source={{ uri: adminAvatar }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                {adminRole === 'Mayor' ? (
                  <Shield size={16} color={theme.colors.primary} />
                ) : (
                  <Building2 size={16} color={theme.colors.primary} />
                )}
              </View>
            )}
          </View>
        )}
        <View style={[
          styles.messageBubble,
          isUser ? styles.userBubble : styles.adminBubble
        ]}>
          <Text style={[
            styles.messageText,
            isUser ? styles.userText : styles.adminText
          ]}>
            {item.message}
          </Text>
          <Text style={[
            styles.messageTime,
            isUser ? styles.userTime : styles.adminTime
          ]}>
            {new Date(item.timestamp).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: adminName,
        }}
      />
      
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.adminInfo}>
          <Text style={styles.adminRole}>{adminRole}</Text>
          <Text style={styles.infoText}>
            Messages are private and will be reviewed by city staff
          </Text>
        </View>

        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                Send a message to {adminName}
              </Text>
              <Text style={styles.emptySubtext}>
                Your message will be private and secure
              </Text>
            </View>
          }
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
            placeholderTextColor={theme.colors.textSecondary}
          />
          <TouchableOpacity 
            style={[
              styles.sendButton,
              (!inputText.trim() || isSending) && styles.sendButtonDisabled
            ]}
            onPress={handleSend}
            disabled={!inputText.trim() || isSending}
          >
            <Send size={20} color={
              inputText.trim() && !isSending 
                ? theme.colors.card 
                : theme.colors.textSecondary
            } />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerButton: {
    padding: theme.spacing.sm,
  },
  adminInfo: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  adminRole: {
    fontSize: theme.fontSize.sm,
    fontWeight: '600' as const,
    color: theme.colors.primary,
    marginBottom: 4,
  },
  infoText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
  },
  messagesList: {
    padding: theme.spacing.md,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  emptySubtext: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
    alignItems: 'flex-end',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  adminMessage: {
    justifyContent: 'flex-start',
  },
  adminAvatar: {
    marginRight: theme.spacing.sm,
  },
  avatarImage: {
    width: 32,
    height: 32,
    borderRadius: theme.borderRadius.full,
  },
  avatarPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageBubble: {
    maxWidth: '75%',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
  },
  userBubble: {
    backgroundColor: theme.colors.primary,
    borderBottomRightRadius: 4,
  },
  adminBubble: {
    backgroundColor: theme.colors.card,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: theme.fontSize.md,
    lineHeight: 20,
  },
  userText: {
    color: theme.colors.card,
  },
  adminText: {
    color: theme.colors.text,
  },
  messageTime: {
    fontSize: theme.fontSize.xs,
    marginTop: 4,
  },
  userTime: {
    color: theme.colors.card,
    opacity: 0.8,
  },
  adminTime: {
    color: theme.colors.textSecondary,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.card,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    maxHeight: 100,
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: theme.colors.border,
  },
});