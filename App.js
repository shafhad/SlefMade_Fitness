import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import WelcomeScreen from "./screens/WelcomeScreen";
import ExerciseScreen from "./screens/ExerciseScreen";
import {AppDrawerNavigator} from "./components/AppDrawerNavigator";
import {createSwitchNavigator, createAppContainer, } from "react-navigation";

export default class App extends React.Component {
  render() {
    return (
      <AppContainer/>
    );
  }
}

const SwitchNavigator = createSwitchNavigator({
  WelcomeScreen: {screen: WelcomeScreen},
  Drawer: {screen: AppDrawerNavigator},
})
const AppContainer = createAppContainer(SwitchNavigator);