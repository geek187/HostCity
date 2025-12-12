import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { TabParamList } from './types';

// Screen imports
import { HomeMapScreen } from '../screens/HomeMapScreen';
import { OffersScreen } from '../screens/OffersScreen';
import { MatchScheduleScreen } from '../screens/MatchScheduleScreen';
import { SafetyCenterScreen } from '../screens/SafetyCenterScreen';
import { CopilotScreen } from '../screens/CopilotScreen';

const Tab = createBottomTabNavigator<TabParamList>();

export function TabNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: [
          styles.tabBar,
          { 
            paddingBottom: Math.max(insets.bottom, 8),
            height: 60 + Math.max(insets.bottom, 8),
          },
        ],
        tabBarActiveTintColor: '#F97316',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarShowLabel: false,
        tabBarBackground: () => (
          <View style={styles.tabBarBackground} />
        ),
      }}
    >
      <Tab.Screen
        name="Map"
        component={HomeMapScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="flash" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Deals"
        component={OffersScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="eye" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Matches"
        component={MatchScheduleScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="bookmark" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Safety"
        component={SafetyCenterScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="shield-checkmark" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Copilot"
        component={CopilotScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={26} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    backgroundColor: 'transparent',
    elevation: 0,
  },
  tabBarBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
  },
});
