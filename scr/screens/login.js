import React, { useState, useEffect, useReducer } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,

} from 'react-native';
import { TextInput, Checkbox, } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import auth, { firebase } from "@react-native-firebase/auth"
import { normalize } from "../services/ResizeFonts";
import colors from '../constants/colors'
import { getData, storeData } from "../services/ItemService";
import { UserState } from "../services/getUsersInfos";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions, Platform, PixelRatio } from 'react-native';
import { CheckInternetConnection } from "../../App";
//import { firebase } from "@react-native-firebase/auth"
import database from '@react-native-firebase/database';
import Globais from '../services/Globais'

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window')

var timer
var lembrar = true;
export default function Login() {

  const navigation = useNavigation();
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [passIcon, setPassIcon] = useState('eye-outline')
  const [passVisibility, setPassVisibility] = useState(true)
  const [checked, setChecked] = React.useState(false);
  const [userss, setUser] = React.useState()
  const [isAdmin, setIsAdmin] = React.useState()
  const [tanque, setTanque] = React.useState()


  const getuserHomeData = () => {
    firebase.auth().onAuthStateChanged((user) => {

      if (user) {

        var uid = user.uid;
        var ref = database().ref("users/" + uid + "/name");

        var refAdmins = database().ref("admins/");

        ref.once("value")
          .then(function (snapshot) {
            let users = snapshot.val()
            setUser(users)
            Globais.user = snapshot.val();
          });

        refAdmins.once("value")
          .then(function (snapshot) {
            let admins = snapshot.val()


            if (Object.keys(admins).includes(uid)) {

              setIsAdmin(true)
              Globais.isAdmin = true
              console.log('Admin? ' + Globais.isAdmin)
              navigation.navigate('Home')
            } else {
              navigation.navigate('Registro de Abastecimento')
              Globais.isAdmin = false
            }

          });

      } else {

        console.log('Usuario OFF')
      }
    });
    var refTanque = database().ref("tanque/valor");

    refTanque.once("value")
      .then(function (snapshot) {
        setTanque(snapshot.val())
        Globais.tanque = snapshot.val()

      });
  }

  const onSubmit = () => {
    CheckInternetConnection(true)
    if (email != '' && senha != '') {

      auth()
        .signInWithEmailAndPassword(email, senha)
        .then(() => {
          if (checked != lembrar) {
            storeLembrar()
            if (checked) {
              storeData()
            } else {
              removeData()
            }

          }

          getuserHomeData()
          getDataPlacas()

        })
        .catch(error => {
          if (error.code === 'auth/wrong-password') {
            console.log(error.code)
            callErrorMsg('Senha inválida')
          }

          else if (error.code === 'auth/user-not-found') {
            console.log(error.code)

            callErrorMsg('Usuário não encontrado')
          }

          else if (error.code === 'auth/invalid-email') {
            console.log(error.code)

            callErrorMsg('Email inválido')
          } else {
            callErrorMsg(error.code)
          }



        });

    } else {
      clearTimeout()

      if (email === '' && senha === '') {
        callErrorMsg('Informe o email e a senha')
      } else {

        if (senha === '') {
          callErrorMsg('Informe a senha')


        } else {
          callErrorMsg('Informe o email')

        }

      }


    }

  }

  const getDataPlacas = () => {
  var placas = []
  var readPlacas = []
  var query = database().ref("placas").orderByKey();
  query.once("value")
    .then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {

        let key = childSnapshot.key;

        let childData = childSnapshot.val();
        let lb
        let itemStateObj
        lb =  childData
        itemStateObj = {label: lb, value:lb.toLowerCase()}
        readPlacas.push(itemStateObj)
    });

    storePlacas(readPlacas)

  });

  }

  const storePlacas = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('placas', jsonValue)

    } catch (e) {
      console.log(e)
    }
  }

  const storeData = async (value) => {
    try {
      //const jsonEmailValue = JSON.stringify(value)
      await AsyncStorage.setItem('email', email)
      await AsyncStorage.setItem('senha', senha)

    } catch (e) {
      //saving error
    }
  }

  const removeData = async () => {
    await AsyncStorage.removeItem('email')
    await AsyncStorage.removeItem('senha')
  }

  const getData = async () => {
    //
    try {

      const email = await AsyncStorage.getItem('email')
      const senha = await AsyncStorage.getItem('senha')
      //let email = JSON.parse(jsonEmailValue)
      //let senha = JSON.parse(jsonSenhaValue)
      setEmail(email)
      setSenha(senha)

    } catch (e) {
      console.log(e)
    }

  }

  const getLembrar = async () => {
    try {
      var valor
      const value = await AsyncStorage.getItem('lembrar')
      if (value !== null) {
        valor = value
        lembrar = value
        if (valor == 'false') {
          setChecked(false)
        } else if (valor == 'true') {
          setChecked(true)

        }

        //console.log('valor dentro do if ' + valor)
      }
    } catch (e) {
      // error reading value
    }
    //console.log('valor fora do if ' + valor)

  }
  const storeLembrar = async () => {
    try {
      //const jsonEmailValue = JSON.stringify(value)
      await AsyncStorage.setItem('lembrar', checked.toString())
      console.log('Lembrar guardado: ' + checked)

    } catch (e) {
      //saving error
    }
  }

  React.useEffect(() => {
    getLembrar()
    getData()

  }, []);

  theme = {
    colors: {

      onSurfaceVariant: colors.BLUE_DARK, //placeholder
      primary: colors.OREGANO,  //bordas SELEÇÃO
      onSurface: colors.OREGANO, //texto
    },
  };

  const callErrorMsg = (msg) => {
    setErrorMsg(msg)
    clearTimeout(timer);
    timer = setTimeout(() => setErrorMsg(''), 3000);
  }

  const handlePass = () => {
    //console.log('vis')
    setPassVisibility(!passVisibility)
    if (passVisibility) {
      setPassIcon('eye-off-outline')
    } else {
      setPassIcon('eye-outline')
    }

  }

  return (

    <View style={styles.mainContainer}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        label={'Login'}
        mode='flat'
        onChangeText={(text) => { setEmail(text) }}
        style={styles.itemInput}
        theme={theme}
        keyboardType='email-address'
        autoComplete="email"
        autoCapitalize="none"
        value={email}
        right={<TextInput.Icon icon='at' iconColor='#08021B' />}
        caretHidden={false}
      />

      <TextInput
        label={'Senha'}
        mode='flat'
        onChangeText={(text) => { setSenha(text) }}
        style={styles.itemInput}
        theme={theme}
        keyboardType='invisible-password'
        value={senha}
        secureTextEntry={passVisibility}
        right={<TextInput.Icon icon={passIcon} onPress={() => handlePass()} iconColor='#08021B' />}

        autoCapitalize="none"

      />

      <View style={{ flexDirection: 'row', width: '90%', paddingLeft: 0, alignItems: 'center' }}>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          color={colors.BLUE_GREY}
          onPress={() => {
            setChecked(!checked);
          }}
        />
        <Text style={{ color: '#888', fontSize: normalize(10), fontFamily: 'Lato-Regular' }}>Lembrar</Text>
      </View>

      <Text style={{ color: 'red' }}>{errorMsg}</Text>

      <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <TouchableHighlight
          style={styles.button}
          underlayColor={'#466584'}
          onPress={() => onSubmit()}
        >
          <Text
            style={styles.buttonText}>
            Entrar
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  )

}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    //justifyContent: 'center'
    backgroundColor: colors.DARK_BLUE

  },
  container: {
    flex: 1,
    width: '90%',
    alignItems: 'center',
    // marginTop: '40%',
    backgroundColor: '#F7F8FA',
    justifyContent: 'center',
    //borderTopLeftRadius: 30,
    //borderTopRightRadius: 30,
    borderRadius: 30

  },
  itemInput: {
    backgroundColor: '#F6F6F6',
    width: '90%',
    height: 55,
    marginBottom: 15,
    //justifyContent: 'center',
    //borderColor: 'red',
    //justifyContent: 'center',

  },
  buttonText: {
    fontSize: 18,
    color: '#ddd',
    alignSelf: 'center'
  },
  button: {
    height: 50,
    width: '90%',
    flexDirection: 'row',
    backgroundColor: colors.BLUE_GREY,
    borderColor: '#383E44',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 20,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  title: {
    color: colors.BLUE_GREY,
    fontSize: normalize(32),
    marginBottom: '30%',
    marginTop: '20%',
    fontFamily: 'Monoton-Regular',
    textShadowColor: 'white',
    textShadowRadius: 1,
    textShadowOffset: {
      height: 1,
      width: 1
    },
    textAlign: 'center'
  },
  footer: {
    width: '100%',
    height: '80%',
    flex: 2,
    backgroundColor: colors.DARK_BLUE,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
    alignItems: 'center'
  },
})
