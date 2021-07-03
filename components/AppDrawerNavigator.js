import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import ExerciseScreen from "../screens/ExerciseScreen";
import SettingsScreen from '../screens/SettingsScreen';
import {AppStackNavigator} from "../components/AppStackNavigator";
import MyFavoritesScreen from '../screens/MyFavoritesScreen';
import RecommendationsScreen from "../screens/RecommendationsScreen";
import CustomSideBarMenu from './CustomSidebarMenu';
import { Icon } from 'react-native-elements';

export const AppDrawerNavigator = createDrawerNavigator(
  {
    Exercise: {
      screen: AppStackNavigator,
      navigationOptions: {
        drawerIcon: <Icon name="home" type="fontawesome5" />,
      },
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        drawerIcon: <Icon name="settings" type="fontawesome5" />,
      },
    },
    MyFavorites: {
      screen: MyFavoritesScreen,
      navigationOptions: {
        drawerIcon: <Icon name="heart" type="font-awesome" />,
        drawerLabel: 'My Favorites',
      },
    },
    Recommendations: {
      screen: RecommendationsScreen,
      navigationOptions: {
        drawerIcon: <Icon name="gift" type="font-awesome" />,
      },
    }
  },
  {
    contentComponent: CustomSideBarMenu,
  },
  {
    initialRouteName: "Exercise",
  }
);
