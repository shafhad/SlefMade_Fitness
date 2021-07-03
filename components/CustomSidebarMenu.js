import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import { DrawerItems } from 'react-navigation-drawer';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';
import db from '../config';
import * as ImagePicker from 'expo-image-picker';

export default class CustomSidebarMenu extends React.Component {
  state = {
    userID: firebase.auth().currentUser.email,
    image: '#',
    name: '',
    docID: '',
  };

  getUserProfile = () => {
    this.requestRef = db
      .collection('users')
      .where('email', '==', this.state.userID)
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            name: doc.data().first_name + ' ' + doc.data().last_name,
            docID: doc.id,
            image: doc.data().image_url,
          });
          console.log(this.state.image);
        });
      });
  };

  selectPicture = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!cancelled) {
      this.uploadImage(uri, this.state.userID);
    }
  };

  uploadImage = async (uri, imageName) => {
    var response = await fetch(uri);
    var blob = await response.blob();
    var ref = firebase
      .storage()
      .ref()
      .child('user_profiles/' + imageName);
    return ref.put(blob).then((response) => {
      this.fetchImage(imageName);
    });
  };

  fetchImage = (imageName) => {
    var ref = firebase
      .storage()
      .ref()
      .child('user_profiles/' + imageName);
    ref
      .getDownloadURL()
      .then((url) => {
        db.collection("users").doc(this.state.docID).update({
        image_url: url
      })
        this.setState({
          image: url,
        });
      })
      .catch((error) => {
        this.setState({
          image: '#',
        });
      });
  };

  componentDidMount() {
    this.fetchImage(this.state.userID);
    this.getUserProfile(this.state.userID);
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 0.3,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'red',
          }}>
          <Avatar
            rounded
            source={{ uri: this.state.image }}
            size="large"
            onPress={() => this.selectPicture()}
            showEditButton
          />
          <Text style = {{fontWeight: "300", fontSize: RFValue(20), color: "white", padding: RFValue(10)}}> {this.state.name} </Text>
        </View>
        <View style={styles.drawerItemsContainer}>
          <DrawerItems {...this.props} />
        </View>
        <View style={styles.logOutContainer}>
          <TouchableOpacity
            style={styles.logOutButton}
            onPress={() => {
              this.props.navigation.navigate('WelcomeScreen');
              firebase.auth().signOut();
            }}>
            <Icon
              name="logout"
              type="antdesign"
              size={RFValue(20)}
              iconStyle={{ paddingLeft: RFValue(10) }}
            />
            <Text style={styles.logOutText}> Log Out </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: { flex: 1 },
  drawerItemsContainer: { flex: 0.8 },
  logOutContainer: {
    flex: 0.2,
    justifyContent: 'flex-end',
    paddingBottom: 30,
    flexDirection: 'row',
  },
  logOutButton: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    flex: 0.75,
    width: '40%',
    height: '20%',
    marginLeft: 20,
    marginTop: 30,
    borderRadius: 40,
  },
  logOutText: {
    fontSize: RFValue(15),
    fontWeight: 'bold',
    marginLeft: RFValue(30),
  },
});
