// Home.js

import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet, Image} from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { normalize } from '../services/ResizeFonts';
import colors from '../constants/colors';
import { firebase } from "@react-native-firebase/auth"
import database from '@react-native-firebase/database';
import Globais from '../services/Globais'
import Inactivity from '../services/InactivityDetection';
import CircularProgress from '../components/CircularProgress'


function FetchUserData() {
  useFocusEffect(
    React.useCallback(() => {

      var refTanque = database().ref("tanque/valor");

      refTanque.on("value", snapshot => {
           Globais.tanque = snapshot.val()

            });

    }, [Globais.tanque])
  );

  return null;
}

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      isAdmin: false,
      tanque: 0,
    }

  }
//usuario = Globais.user

  componentDidMount() {


/*console.log('inicio de Home')
    firebase.auth().onAuthStateChanged((user)  => {

      if (user) {
        var that = this;


        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        //console.log(uid)
        var ref = database().ref("users/" + uid + "/name");

        var refAdmins = database().ref("admins/");
        //console.log(ref)

       ref.once("value")
          .then(function (snapshot) {
          let users = snapshot.val()
            that.setState({ user: users })
             Globais.user = users;
             console.log('user =' + Globais.user)
            //console.log('internet: ' + Globais.user)
          //props.update.setOptions({ title: 'Updated!' })
          //console.log(this.props)
           //this.props.update
           console.log('user')





          });

          refAdmins.once("value")
          .then(function (snapshot) {
          let admins = snapshot.val()
          //console.log(admins)

         if (Object.keys(admins).includes(uid)) {

            that.setState({isAdmin: true})
            Globais.isAdmin = true
            console.log('Admin? ' + Globais.isAdmin)


         }


          });




        // ...
      } else {
        // User is signed out
        // ...

        console.log('Usuario OFF')
      }
    });
    var refTanque = database().ref("tanque/valor");
    var that = this;
    refTanque.once("value")
          .then(function (snapshot) {
         that.setState({tanque: snapshot.val()    })
         Globais.tanque = snapshot.val()
          });

console.log('DidMount')
*/
console.log(Globais.user)
  }

  render(props) {
    console.log('montado')
    return (
      <View style = {styles.container}>
        <FetchUserData/>

{/*<View style={{  flexDirection: 'row', marginTop: -65, marginBottom: 0, width: '100%', justifyContent: 'space-between', alignItems: 'center', padding: 0, paddingRight: 10, marginBottom: 0,  }}>
          <View style={{ padding: 7, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0B1526', borderRadius: 10, marginBottom: 0, borderColor: '#050112', borderWidth: 1, alignSelf: 'center' }}>
            <Text  style={{ color: 'white', fontWeight: '', fontSize: 12, fontFamily: 'Lato-Regular' }}>Olá, {this.state.user}</Text>
          </View>
          <View style={{ padding: 7, alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginBottom: 0, borderColor: '#050112', borderWidth: 1, alignSelf: 'center' }}>
          <CircularProgress
        valorTanque = {Globais.tanque}
        />
          </View>
        </View>*/}

        <TouchableHighlight
          style = {[styles.btnTouch, {marginTop: 0}]}
          onPress = {this.props.navRec}
          underlayColor = {'#466584'}
          >
             <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}} >

            <Image source = {require('../assets/images/tanker.png')} style={{ width: '50%', height: '50%', marginBottom: -8, resizeMode: 'cover', aspectRatio: 1 }}/>
          <Text style = {styles.btnText}>Registro de Recebimento</Text>
          </View>
  </TouchableHighlight>
  <TouchableHighlight
   style = {styles.btnTouch}
   onPress = {this.props.navAbs}
   underlayColor = {'#466584'}
   >
     <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image source = {require('../assets/images/gas-station.png')} style={{ width: '35%', height: '35%', marginBottom: 10, resizeMode: 'cover', aspectRatio: 1 }}/>
          <Text style = {styles.btnText}>Registro de Abastecimento</Text>
     </View>


  </TouchableHighlight>

  <TouchableHighlight
   style = {styles.btnTouch}
   onPress = {this.props.navCons}
   underlayColor = {'#466584'}
   >

    <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image source = {require('../assets/images/archive.png')} style={{ width: '33%', height: '33%', marginBottom: 10, resizeMode: 'cover', aspectRatio: 1, marginLeft: 7 }}/>
          <Text style = {styles.btnText}>Lançamentos</Text>
     </View>


  </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    width: '100%',
    backgroundColor: colors.DARK_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10



  },
  btnTouch: {
    width: '38%',
    height:'23%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:colors.BLUE_GREY_,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    hadowRadius: 1,
    elevation: 2,
    marginBottom: 10,
    marginTop: 0,

  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: normalize(13),
    fontFamily: 'Lato-Regular'

  }
  })