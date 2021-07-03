import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import {Header, Icon, Badge} from "react-native-elements";
import firebase from "firebase";
import db from "../config";

export default class MyHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userID: firebase.auth().currentUser.email,
      value: ""
    }
  }

  render() {
  return(
    <Header
    leftComponent = {<Icon name = "bars" type = "font-awesome" onPress = {() => this.props.navigation.toggleDrawer()}/>}
    centerComponent = {{text: this.props.title, style: {color: "#FFFFFF", fontSize: 20, fontWeight: "bold"}}}
    backgroundColor = "red"/>
  )
  }
}