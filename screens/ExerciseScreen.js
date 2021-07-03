import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
  Image,
  Animated,
  ScrollView
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { ListItem } from 'react-native-elements';
import db from "../config";
import firebase from "firebase";
import MyHeader from "../components/MyHeader";

export default class Exercise extends React.Component {

  constructor() {
    super();
    this.state = {
      exercises: []
    }
  }

  componentDidMount() {
    this.getExercises();
  }

  getExercises = () => {
    this.requestRef = db
      .collection('exercises')
      .onSnapshot((snapshot) => {
        var exercises = snapshot.docs.map((doc) => doc.data())
        this.setState({
          exercises: exercises
        });
        //console.log(this.state.exercises)
      });
  };

  keyExtractor = (item, index) => {
    //console.log(item);
    //console.log(index);
    return(
    index.toString()
    )
    };

  renderItem = ({ item, i }) => {
    //console.log(item);
    //console.log("hello");
    return (
      <Animated.View>
      <ListItem
        key={i} 
        title={item.name}
        subtitle = {item.targetedBodyPart} 
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        rightElement={
          <TouchableOpacity style={styles.button}
          onPress = {() => {
            console.log("Navigated");
            this.props.navigation.navigate("Details", {"details": item})
            }}>
            <Text style={{ color: 'white' }}> Exercise </Text>
          </TouchableOpacity>
        }
        bottomDivider
      />
      </Animated.View> 
    );
  };

  render() {
    return(
      <ScrollView style = {styles.view}>
      <View style = {{flexGrow: 0.5}}>
      <MyHeader title = "Fitness App" navigation={this.props.navigation}/>
      </View>
        <View style={{ flexGrow: 0.5}}>
          {this.state.exercises === 0 ? (
            <View style={styles.subContainer}>
              <Text style={{ fontSize: 20 }}>List of all Exercises</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.exercises}
              renderItem={this.renderItem}
            />
          )
          }
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
  },
  view: { flexGrow: 1, backgroundColor: '#fff' },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});