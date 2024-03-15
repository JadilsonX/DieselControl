// Home.js

import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet, Image } from 'react-native';
import { normalize } from '../services/ResizeFonts';
import colors from '../constants/colors';
import { GetUser, UserState } from '../services/getUsersInfos';
import { firebase } from "@react-native-firebase/auth"
import database from '@react-native-firebase/database';
var users = ''

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ''
    }

  }

  componentDidMount() {

    firebase.auth().onAuthStateChanged((user) => {

      if (user) {
        var that = this;
        var uid = user.uid;
        console.log(uid)
        var ref = database().ref("users/" + uid + "/name");
        //console.log(ref)

        ref.once("value")
          .then(function (snapshot) {
            users = snapshot.val() // {first:"Ada",last:"Lovelace"}
            that.setState({ user: users })
            console.log(that.state.user)
          });



      } else {
        console.log('Usuario OFF')
      }
    });

  }



  render(props) {
    return (
      <View style={styles.container}>
       {/* <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-end', padding: 10, paddingRight: 10, marginBottom: '10%' }}>
          <View style={{ padding: 7, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0B1526', borderRadius: 14, marginBottom: 20, borderColor: '#050112', borderWidth: 1, alignSelf: 'center' }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>Olá, {this.state.user}</Text>
          </View>
        </View>*/
       }


        <TouchableHighlight
          style={styles.btnTouch}
          onPress={this.props.navRec}
          underlayColor={'#466584'}
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('../assets/images/tanker.png')} style={{ width: '50%', height: '50%', marginBottom: 0, resizeMode: 'cover', aspectRatio: 1.1 }} />
            <Text style={styles.btnText}>Registro de Recebimento</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.btnTouch}
          onPress={this.props.navAbs}
          underlayColor={'#466584'}
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('../assets/images/gas-station.png')} style={{ width: '50%', height: '50%', marginBottom: 10, resizeMode: 'cover', aspectRatio: 1.1 }} />
            <Text style={styles.btnText}>Registro de Abastecimento</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.btnTouch}
          onPress={this.props.navCons}
          underlayColor={'#466584'}
        >

          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('../assets/images/archive.png')} style={{ width: '50%', height: '50%', marginBottom: 10, resizeMode: 'cover', aspectRatio: 1.1 }} />
            <Text style={styles.btnText}>Lançamentos</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.INFINITY,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 10
  },
  btnTouch: {
    width: '40%',
    height: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.BLUE_GREY,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    hadowRadius: 1,
    elevation: 2,
    marginBottom: 10
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: normalize(15)
  }
})