import { Tabs } from "expo-router";
import { Bell, MessageSquare, Settings, PawPrint } from "lucide-react-native";
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { theme } from "@/constants/theme";
import { AlertsProvider, MessagesProvider, useAlerts } from "@/hooks/alerts-context";

function TabBarIcon({ icon: Icon, color, focused }: { icon: any; color: string; focused: boolean }) {
  return <Icon size={24} color={color} />;
}

function AlertsTabIcon({ color, focused }: { color: string; focused: boolean }) {
  const { unreadCount } = useAlerts();
  
  return (
    <View>
      <Bell size={24} color={color} />
      {unreadCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {unreadCount > 99 ? '99+' : unreadCount}
          </Text>
        </View>
      )}
    </View>
  );
}

function TabLayoutContent() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.tabBar,
          borderTopColor: theme.colors.border,
        },
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.card,
        headerTitleStyle: {
          fontWeight: '600' as const,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Geronimo Alerts",
          tabBarIcon: AlertsTabIcon,
          headerLeft: () => (
            <View style={styles.headerLogo}>
              <Image 
                source={{ uri: 'https://r2-pub.rork.com/generated-images/de9514fb-dd0d-4b93-99fe-99195524e646.png' }}
                style={styles.cityLogo}
                resizeMode="contain"
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Contact Officials",
          tabBarIcon: (props) => <TabBarIcon icon={MessageSquare} {...props} />,
        }}
      />
      <Tabs.Screen
        name="animal-control"
        options={{
          title: "Animal Control",
          tabBarIcon: (props) => <TabBarIcon icon={PawPrint} {...props} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: (props) => <TabBarIcon icon={Settings} {...props} />,
        }}
      />
    </Tabs>
  );
}

export default function TabLayout() {
  return (
    <AlertsProvider>
      <MessagesProvider>
        <TabLayoutContent />
      </MessagesProvider>
    </AlertsProvider>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: theme.colors.emergency,
    borderRadius: theme.borderRadius.full,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: theme.colors.card,
    fontSize: 10,
    fontWeight: '700' as const,
  },
  headerLogo: {
    marginLeft: 16,
  },
  cityLogo: {
    width: 32,
    height: 32,
  },
});