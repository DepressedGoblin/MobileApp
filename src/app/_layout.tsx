import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import React from 'react';
import { useColorScheme } from 'react-native';
import { Tabs } from 'expo-router';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  // Force dark theme as per the requested web design
  const colorScheme = 'dark';
  const colors = Colors.dark;

  return (
    <ThemeProvider value={DarkTheme}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.muted,
          tabBarStyle: {
            backgroundColor: colors.bgElevated,
            borderTopColor: colors.border,
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="browse"
          options={{
            title: 'Browse',
            tabBarIcon: ({ color }) => <Ionicons name="search" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="submit"
          options={{
            title: 'Submit',
            tabBarIcon: ({ color }) => <Ionicons name="add-circle" size={24} color={color} />,
          }}
        />
      </Tabs>
    </ThemeProvider>
  );
}
