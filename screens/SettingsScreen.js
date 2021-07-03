import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import MyHeader from '../components/MyHeader';
import firebase from 'firebase';
import db from '../config';

export default class SettingsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailID: firebase.auth().currentUser.email,
      firstName: '',
      lastName: '',
      primaryMuscle: '',
      secondaryMuscle: '',
      docID: '',
    };
  }

  componentDidMount() {
    this.getUserDetails();
  }

  getUserDetails = () => {
    db.collection('users')
      .where('email', '==', this.state.emailID)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            firstName: data.first_name,
            lastName: data.last_name,
            primaryMuscle: data.primary_muscle,
            secondaryMuscle: data.secondary_muscle,
            docID: doc.id,
          });
        });
      });
  };

  updateUserDetails = () => {
    db.collection("users").doc(this.state.docID).update({
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      primary_muscle: this.state.primaryMuscle,
      secondaryMuscle: this.state.secondaryMuscle
    })
    Alert.alert("Details Successfully Updated");
    console.log("Details Updated")
  }

  render() {
    return (
      <View>
      <MyHeader title = "Fitness App" navigation={this.props.navigation}/>
        <Text style={styles.label}> First Name </Text>
        <TextInput
          style={styles.formTextInput}
          placeholder="First Name"
          onChangeText={(text) => {
            this.setState({ firstName: text });
          }}
          value={this.state.firstName}
          maxLength={15}
        />
        <Text style={styles.label}> Last Name </Text>
        <TextInput
          style={styles.formTextInput}
          placeholder="Last Name"
          onChangeText={(text) => {
            this.setState({ lastName: text });
          }}
          value={this.state.lastName}
          maxLength={15}
        />
        <Text style={styles.label}> Primary Muscle </Text>
            <TextInput
              style={styles.formTextInput}
              placeholder="Primary Muscle"
              onChangeText={(text) => {
                this.setState({ primaryMuscle: text });
              }}
              value={this.state.primaryMuscle}
            />
            <Text style={styles.label}> Secondary Muscle </Text>
            <TextInput
              placeholder="Secondary Muscle"
              style={styles.formTextInput}
              onChangeText={(text) => {
                this.setState({ secondaryMuscle: text });
              }}
              value={this.state.secondaryMuscle}
            />
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button}
          onPress = {() => this.updateUserDetails()}>
            <Text style={styles.buttonText}> Update </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6fc0b8',
  },
  formContainer: { flex: 0.88, justifyContent: 'center' },
  label: {
    fontSize: RFValue(18),
    color: '#717D7E',
    fontWeight: 'bold',
    padding: RFValue(10),
    marginLeft: RFValue(20),
  },
  formTextInput: {
    width: '90%',
    height: RFValue(50),
    padding: RFValue(10),
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'grey',
    marginBottom: RFValue(20),
    marginLeft: RFValue(20),
  },
  button: {
    width: '75%',
    height: RFValue(60),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(50),
    backgroundColor: 'green',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: RFValue(20),
  },
  buttonView: { flex: 0.22, alignItems: 'center', marginTop: RFValue(100) },
  buttonText: { fontSize: RFValue(23), fontWeight: 'bold', color: '#fff' },
});
