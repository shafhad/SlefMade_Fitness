import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  Linking,
} from 'react-native';
import { Card, Header, Icon } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';
import db from '../config';

export default class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: firebase.auth().currentUser.email,
      userName: '',
      exerciseName: this.props.navigation.getParam('details')['name'],
      targetedBodyPart: this.props.navigation.getParam('details')[
        'targetedBodyPart'
      ],
      image: this.props.navigation.getParam('details')['image'],
      videoUrl: this.props.navigation.getParam('details')['videoUrl'],
      description: this.props.navigation.getParam('details')['description'],
      minAmount: this.props.navigation.getParam('details')['minAmount'],
      maxAmount: this.props.navigation.getParam('details')['maxAmount'],
      docID: '',
    };
  }

  componentDidMount() {
    console.log(this.state.image);
    this.getExercise();
  }

  getExercise = () => {
    db.collection('exercises')
      .where('name', '==', this.state.exerciseName)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            docID: doc.id,
          });
        });
      });
  };

  favoriteExercise = () => {
    db.collection('exercises').doc(this.state.docID).update({
      favorite: true,
    });
  };

  render() {
    return (
      <ScrollView style={{ flexGrow: 1 }}>
        <View style={{ flexGrow: 0.1 }}>
          <Header
            leftComponent={
              <Icon
                name="arrow-left"
                type="feather"
                color="#FFFFFF"
                onPress={() => this.props.navigation.goBack()}
              />
            }
            centerComponent={{
              text: 'View Exercise',
              style: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' },
            }}
            backgroundColor="red"
          />
        </View>
        <View style={{ flexGrow: 1 }}>
          <Card title={'Exercise Information'} titleStyle={{ fontSize: 20 }}>
            <Card>
              <Text style={{ fontWeight: 'bold' }}>
                Name: {this.state.exerciseName}
              </Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: 'bold' }}>
                Targeted Body Part: {this.state.targetedBodyPart}
              </Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: 'bold' }}>
                Description: {this.state.description}
              </Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: 'bold' }}>
                Minimum Amount: {this.state.minAmount}
              </Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: 'bold' }}>
                Maximum Amount: {this.state.maxAmount}
              </Text>
            </Card>
            <Card>
              <Image
                source={{ uri: this.state.image }}
                style={{
                  width: RFValue(200),
                  height: RFValue(200),
                  alignSelf: 'center',
                }}
              />
              <Text
                style={styles.hyperlinkStyle}
                onPress={() => {
                  Linking.openURL(this.state.videoUrl);
                }}>
                Watch Video
              </Text>
            </Card>
          </Card>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.favoriteExercise();
            }}>
            <Text> Favorite </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flexGrow: 1 },
  buttonContainer: {
    flexGrow: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '75%',
    height: RFValue(60),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(60),
    backgroundColor: '#ff5722',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    elevation: 16,
  },
  hyperlinkStyle: {
    alignSelf: 'center',
    textDecorationLine: 'underline',
  },
});
