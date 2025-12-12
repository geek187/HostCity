/**
 * Navigation type definitions for HostCity
 */

import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

// Tab Navigator param list
export type TabParamList = {
  Map: undefined;
  Deals: undefined;
  Matches: undefined;
  Safety: undefined;
  Copilot: undefined;
};

// Root Stack param list
export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList>;
  PlaceDetails: { placeId: string };
};

// Screen props types
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type TabScreenProps<T extends keyof TabParamList> = BottomTabScreenProps<
  TabParamList,
  T
>;

// Declare global types for useNavigation hook
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

