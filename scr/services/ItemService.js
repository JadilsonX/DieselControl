import database from '@react-native-firebase/database';
import { getCurrentDate, getCurrentTime, Time } from './time';
import { Alert } from 'react-native';
import React from 'react';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Globais from './Globais'


const recebimento = database().ref('/recebimento/');
const abastecimento = database().ref('/abastecimento/');
const abastecimento_ext = database().ref('/abastecimento_externo/');
const newPostRef = abastecimento.push();
const postId = newPostRef.key;
var itemAbastecimento


export const addItem =  (motor, pl, regF, lts, temp, dens, nf) => {
 recebimento.push({
    motorista: motor.toLowerCase(),
    placa: pl.toLowerCase(),
   // reg_ini: regI,
    reg_fin: regF,
    lts_abst: lts,
    temperatura: temp,
    densidade: dens,
    nota_fiscal: nf,
    data: getCurrentDate(),
    hora: getCurrentTime(),
    responsavel: Globais.user,
    id: database().ref().child('posts').push().key,
  })
  .then(() => database().ref('/tanque/').push({valor: regF}))
};

export const sendAbastecimento =  (mtr, pl, km, lts) => {
console.log(global.user)
 if (Globais.isAdmin) {
  abastecimento.push({
     motorista: mtr.toLowerCase(),
     placa: pl.toLowerCase(),
     km_atual: km,
     lts_abst: lts,
     data: getCurrentDate(),
     hora: getCurrentTime(),
     responsavel: Globais.user,
     id: abastecimento.child('posts').push().key,
   })
   .then(() => console.log('Data set.'));

  } else {
    abastecimento_ext.push({
      motorista: mtr.toLowerCase(),
      placa: pl.toLowerCase(),
      km_atual: km,
      lts_abst: lts,
      data: getCurrentDate(),
      hora: getCurrentTime(),
      responsavel: Globais.user,
      //id: abastecimento.child('posts').push().key,
    })
    .then(() => console.log('Data set.'));
  }
 };

 export const Placas = () => {
  console.log('pl')
  const [showPlacas, setShowPlacas] = React.useState([])
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
    //const placaString = JSON.stringify([{label: "PLH-8634",value: "PLH-8634"}])
    //AsyncStorage.setItem('placas', placaString);

    storeData(readPlacas)
    setShowPlacas(getData())
  });
  //console.log(showPlacas)
 return readPlacas

 };

 /*export const FletchRecebimento = () => {
  const [itemRecebimento, setItemRecebimento] = React.useState([]);


  database()
  .ref('/recebimento')
  .once('value')
  .then(snapshot => {


      setItemRecebimento(Object.values(snapshot.val()));
      let data = snapshot.val();
      let keys = Object.keys(data);

      //keys.forEach((key) => { setItemsArray(data[key]); });

  });




  return itemRecebimento
 };

 export const FletchAbastecimento = () => {
  const [itemAbastecimento, setItemAbastecimento] = React.useState([]);


  database()
  .ref('/abastecimento')
  .once('value')
  .then(snapshot => {


      setItemAbastecimento(Object.values(snapshot.val()));
      //Globais.listaInternal = Object.values(snapshot.val())
      let data = snapshot.val();
      let keys = Object.keys(data);
      //var obj =  itemAbastecimento[0]
      //console.log(obj)

      //keys.forEach((key) => { setItemsArray(data[key]); });

  });

  return itemAbastecimento
 };

 export const FletchAbastecimentoExterno = () => {
  const [itemAbastecimento, setItemAbastecimento] = React.useState([]);
  //var itemAbastecimento

  database()
  .ref('/abastecimento_externo')
  .once('value')
  .then(snapshot => {


      setItemAbastecimento(Object.values(snapshot.val()));
      itemAbastecimento = Object.values(snapshot.val())
      //Globais.listaExternal = Object.values(snapshot.val())
     // let data = snapshot.val();
     // let keys = Object.keys(data);
     // var obj =  itemAbastecimento[0]


      //keys.forEach((key) => { setItemsArray(data[key]); });

  });
  //console.log(Globais.listaExternal)
  return itemAbastecimento
 }

/*export const CheckInternetConnection = () =>{
  const [connection, setConnection] = React.useState(false);

  NetInfo.addEventListener(networkState => {

    setConnection(networkState.isConnected)
    if(!networkState.isConnected){
    Alert.alert("Erro de conexão", "Não foi possível estabelecer conexão com o servidor. Verifique a sua conexão com a internet.")
    }
  });

 // return connection
}
*/
const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('placas', jsonValue)
    //getData()
  } catch (e) {
    //saving error
  }
}

export const getData = async () => {
  var teste
  const jsonValue = await AsyncStorage.getItem('placas')
  try {

    //console.log(jsonValue)
    teste = jsonValue !== null ? JSON.parse(jsonValue) : null
  } catch(e) {
    //error reading value
  }
  return teste
}
