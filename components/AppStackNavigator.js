import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {createStackNavigator} from "react-navigation-stack";
import ExerciseScreen from "../screens/ExerciseScreen";
import DetailsScreen from "../screens/DetailsScreen";

export const AppStackNavigator = createStackNavigator({
  Exercise: {screen: ExerciseScreen, navigationOptions: {headerShown: false}},
  Details: {screen: DetailsScreen, navigationOptions: {headerShown: false}},
},
{
  initialRouteName: "Exercise"
})