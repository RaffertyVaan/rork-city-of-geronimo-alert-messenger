import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AlertsProvider, MessagesProvider } from '@/hooks/alerts-context';
import { theme } from '@/constants/theme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ 
      headerBackTitle: "Back",
      headerStyle: { backgroundColor: theme.colors.primary },
      headerTintColor: theme.colors.card,
      headerTitleStyle: { fontWeight: '600' }
    }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="alert-details" 
        options={{ 
          title: 'Alert Details',
          headerShown: true 
        }} 
      />
      <Stack.Screen 
        name="chat" 
        options={{ 
          title: 'Message',
          headerShown: true 
        }} 
      />
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AlertsProvider>
        <MessagesProvider>
          <GestureHandlerRootView>
            <RootLayoutNav />
          </GestureHandlerRootView>
        </MessagesProvider>
      </AlertsProvider>
    </QueryClientProvider>
  );
}
