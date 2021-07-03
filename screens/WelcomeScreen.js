import * as React from 'react';
import {
  Image,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';
import db from '../config';

export default class WelcomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailID: '',
      password: '',
      firstName: '',
      lastName: '',
      primaryMuscle: '',
      secondaryMuscle: '',
      confirmPassword: '',
      isModalVisible: false,
    };
  }

 /* userLogin = async (emailID, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailID, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log('Logged In');
        this.props.navigation.navigate("Exercise");
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  };*/


  userLogin = (email, password)=>{
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(()=>{
      this.props.navigation.navigate('Exercise')
    })
    .catch((error)=> {
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    })
  }

  userSignUp = (emailID, password,confirmPassword) =>{
    if(password !== confirmPassword){
        return Alert.alert("password doesn't match\nCheck your password.")
    }else{
      firebase.auth().createUserWithEmailAndPassword(emailID, password)
      .then(()=>{
        db.collection('users').add({
          name:this.state.firstName,
          lastName:this.state.lastName,
          phoneNumber:this.state.contact,
          email:this.state.emailID,
          address:this.state.address
        })
        return  Alert.alert(
             'User Added Successfully',
             '',
             [
               {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
             ]
         );
      })
      .catch((error)=> {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage)
      });
    }
  }

  showModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.isModalVisible}>
        <ScrollView style={styles.scrollview}>
          <View style={styles.signupView}>
            <Text style={styles.signupText}> Sign Up! </Text>
          </View>
          <View style={{ flex: 0.95 }}>
            <Text style={styles.label}> First Name </Text>
            <TextInput
              style={styles.formInput}
              placeholder="First Name"
              onChangeText={(text) => {
                this.setState({ firstName: text });
              }}
              value={this.state.firstName}
              maxLength={15}
            />
            <Text style={styles.label}> Last Name </Text>
            <TextInput
              style={styles.formInput}
              placeholder="Last Name"
              onChangeText={(text) => {
                this.setState({ lastName: text });
              }}
              value={this.state.lastName}
              maxLength={15}
            />
            <Text style={styles.label}> Primary Muscle </Text>
            <TextInput
              style={styles.formInput}
              placeholder="Primary Muscle"
              onChangeText={(text) => {
                this.setState({ primaryMuscle: text });
              }}
              value={this.state.primaryMuscle}
            />
            <Text style={styles.label}> Secondary Muscle </Text>
            <TextInput
              placeholder="Secondary Muscle"
              style={styles.formInput}
              onChangeText={(text) => {
                this.setState({ secondaryMuscle: text });
              }}
              value={this.state.secondaryMuscle}
            />
            <Text style={styles.label}> Email </Text>
            <TextInput
              style={styles.formInput}
              placeholder="abc@example.com"
              onChangeText={(text) => {
                this.setState({ emailID: text });
              }}
              value={this.state.emailID}
              keyboardType={'email-address'}
            />
            <Text style={styles.label}> Password </Text>
            <TextInput
              style={styles.formInput}
              placeholder="Password"
              onChangeText={(text) => {
                this.setState({ password: text });
              }}
              value={this.state.password}
              secureTextEntry={true}
            />
            <Text style={styles.label}> Confirm Password </Text>
            <TextInput
              style={styles.formInput}
              placeholder="Confirm Password"
              onChangeText={(text) => {
                this.setState({ confirmPassword: text });
              }}
              value={this.state.confirmPassword}
              secureTextEntry={true}
            />
          </View>
          <View style={{ flex: 0.2, alignItems: 'center' }}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => {
                this.userSignUp(
                  this.state.emailID,
                  this.state.password,
                  this.state.confirmPassword
                );
              }}>
              <Text style={styles.registerButtonText}> Register! </Text>
            </TouchableOpacity>
            <Text
              style={styles.cancelButtonText}
              onPress={() => {
                this.setState({
                  isModalVisible: false,
                });
              }}>
              Cancel
            </Text>
          </View>
        </ScrollView>
      </Modal>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.showModal()}
        <View style={{ flex: 0.25 }}>
          <View style={{ flex: 0.15 }} />
          <View style={styles.santaView}>
          <Text style={{ fontFamily: 'sans-serif', fontSize: RFValue(30) }}>
              Fitness App
            </Text>
            <Text style={{ fontFamily: 'sans-serif', fontSize: RFValue(20) }}>
              An Exercise System
            </Text>
          </View>
        </View>
        <View style={{ flex: 0.5 }}>
        
            <Text> Test </Text>
        </View>
        <View style={{ flex: 0.45 }}>
          <View style={styles.TextInput}>
            <TextInput
              style={styles.loginBox}
              placeholder="Email ID"
              onChangeText={(text) => {
                this.setState({ emailID: text });
              }}
              keyboardType="email-address"
              placeholderTextColor="black"
              value={this.state.emailID}
            />
            <TextInput
              style={[styles.loginBox, { marginTop: RFValue(25) }]}
              placeholder="Password"
              onChangeText={(text) => {
                this.setState({ password: text });
              }}
              secureTextEntry={true}
              placeholderTextColor="black"
              value={this.state.password}
            />
          </View>
          <View style={{ flex: 0.5, alignItems: 'center', marginTop: RFValue(25) }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.userLogin(this.state.emailID, this.state.password)
              }>
              <Text style={styles.buttonText}> Login </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({ isModalVisible: true });
                console.log(this.state.isModalVisible);
              }}
              style={styles.button}>
              <Text style={styles.buttonText}> Sign Up </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
  },
  loginBox: {
    width: '80%',
    height: RFValue(50),
    borderWidth: 1.5,
    borderColor: '#ffffff',
    fontSize: RFValue(20),
    paddingLeft: RFValue(10),
  },
  button: {
    width: '80%',
    height: RFValue(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(25),
    backgroundColor: '#ffff',
    shadowColor: '#000',
    marginBottom: RFValue(10),
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttonText: {
    color: 'orange',
    fontWeight: '200',
    fontSize: RFValue(20),
  },
  label: {
    fontSize: RFValue(13),
    color: '#717D7E',
    fontWeight: 'bold',
    paddingLeft: RFValue(10),
    marginLeft: RFValue(20),
  },
  formInput: {
    width: '90%',
    height: RFValue(45),
    padding: RFValue(10),
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'grey',
    paddingBottom: RFValue(10),
    marginLeft: RFValue(20),
    marginBottom: RFValue(14),
  },
  registerButton: {
    width: '75%',
    height: RFValue(50),
    marginTop: RFValue(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(3),
    backgroundColor: 'green',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: RFValue(10),
  },
  registerButtonText: {
    fontSize: RFValue(23),
    fontWeight: 'bold',
    color: '#fff',
  },
  cancelButtonText: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    color: 'black',
    marginTop: RFValue(10),
  },
  scrollview: {
    flex: 1,
    backgroundColor: '#fff',
  },
  signupView: {
    flex: 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    color: 'green',
  },
  santaView: {
    flex: 0.85,
    justifyContent: 'center',
    alignItems: 'center',
    padding: RFValue(10),
  },
  santaImage: {
    width: '70%',
    height: '100%',
    resizeMode: 'stretch',
  },
  TextInput: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookImage: {
    width: '100%',
    height: RFValue(220),
  },
});
