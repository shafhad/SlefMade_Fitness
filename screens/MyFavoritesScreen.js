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
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { ListItem, Icon } from 'react-native-elements';
import db from "../config";
import MyHeader from "../components/MyHeader";
import firebase from "firebase";

export default class MyFavorites extends React.Component {

  constructor() {
    super();
    this.state = {
      exercises: [],
      docID: ""
    }
  }

  componentDidMount() {
    this.getExercises();
    console.log(this.state.docID);
  }

  getExercises = () => {
    db.collection('exercises').where("favorite", "==", true).onSnapshot((snapshot) => {
      var exercises = snapshot.docs.map((doc) => doc.data())
          this.setState({
            exercises: exercises,
          });
      })
    db.collection("exercises").where("favorite", "==", true).get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            docID: doc.id,
          });
        });
      });
  }

  unfavorite = () => {
    db.collection('exercises').doc(this.state.docID).update({
      favorite: false
    })
  }

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
          <TouchableOpacity
          onPress = {() => {
            this.unfavorite()
            }}>
            <Icon name = "heart" type = "font-awesome" color = "red"/>
          </TouchableOpacity>
        }
        bottomDivider
      />
      </Animated.View> 
    );
  };

  render() {
    return(
      <View style={styles.view}>
      <MyHeader title = "Fitness App" navigation={this.props.navigation}/>
        <View style={{ flex: 1 }}>
          {this.state.exercises === 0 ? (
            <View style={styles.subContainer}>
              <Text style={{ fontSize: 20 }}>List of all Favorite Exercises</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.exercises}
              renderItem={this.renderItem}
            />
          )}
        </View>
      </View>
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
    backgroundColor: '#32867d',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
  },
  view: { flex: 1, backgroundColor: '#fff' },
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