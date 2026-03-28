import React, { useCallback } from 'react';
import { 
  StyleSheet, 
  View, 
  FlatList, 
  TextInput, 
  RefreshControl,
  Text,
  ActivityIndicator
} from 'react-native';
import { Search } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { AlertCard } from '@/components/AlertCard';
import { CategoryFilter } from '@/components/CategoryFilter';
import { useAlerts } from '@/hooks/alerts-context';
import { theme } from '@/constants/theme';
import { Alert } from '@/types/alert';

export default function AlertsScreen() {
  const router = useRouter();
  const { 
    alerts, 
    isLoading, 
    selectedCategory, 
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    markAsRead,
    refetch
  } = useAlerts();

  const [refreshing, setRefreshing] = React.useState(false);

  const handleAlertPress = useCallback((alert: Alert) => {
    if (!alert.read) {
      markAsRead(alert.id);
    }
    router.push({
      pathname: '/alert-details',
      params: { 
        alertId: alert.id,
        alertData: JSON.stringify(alert)
      }
    });
  }, [markAsRead, router]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const renderAlert = useCallback(({ item }: { item: Alert }) => (
    <AlertCard alert={item} onPress={() => handleAlertPress(item)} />
  ), [handleAlertPress]);

  const keyExtractor = useCallback((item: Alert) => item.id, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color={theme.colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search alerts..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={theme.colors.textSecondary}
            testID="search-input"
          />
        </View>
      </View>

      <CategoryFilter 
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <FlatList
        data={alerts}
        renderItem={renderAlert}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No alerts from Geronimo</Text>
            <Text style={styles.emptySubtext}>
              {searchQuery ? 'Try adjusting your search' : 'Pull to refresh for city updates'}
            </Text>
          </View>
        }
        testID="alerts-list"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  searchContainer: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.card,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    height: 44,
  },
  searchInput: {
    flex: 1,
    marginLeft: theme.spacing.sm,
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
  },
  listContent: {
    paddingVertical: theme.spacing.sm,
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
});