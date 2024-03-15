import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight, Image} from 'react-native';
import ExibirRecebimento from './ExibirRecebimento';
import Table from '../components/Table';
import { FletchRecebimento } from '../services/ItemService';
import colors from '../constants/colors'


import database from '@react-native-firebase/database';
import { normalize } from '../services/ResizeFonts';

const itemsRef = database().ref('/recebimento');


export default function List(props) {

 /* const [itemsArray, setItemsArray] = React.useState([]);

  database()
  .ref('/abastecimento')
  .once('value')
  .then(snapshot => {
   
      const items = Object.values(snapshot.val());
      setItemsArray(items);
      let data = snapshot.val();
      let keys = Object.keys(data);
      //keys.forEach((key) => { setItemsArray(data[key]); });      
  });*/  


 //console.log(FletchRecebimento())
 
  

  return (
    <View style = {styles.container}>
      
      <TouchableHighlight 
          style = {styles.btnTouch}
          onPress = {props.navExibReceb}
          underlayColor = {'#466584'}
          >
            <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            {/*<Image source = {require('../assets/images/archive.png')} style={{ width: '17%', height: '17%', marginBottom: 0, resizeMode: 'cover', aspectRatio: 1, zIndex: 0, marginLeft: '-75%', marginTop: -10 }}/>*/}
            <Image source = {require('../assets/images/tanker.png')} style={{ width: '55%', height: '55%', marginBottom: -8, resizeMode: 'cover', aspectRatio: 1 }}/>   
          <Text style = {styles.btnText}>Recebimentos</Text>
          </View>
  </TouchableHighlight>
  <TouchableHighlight
   style = {styles.btnTouch}
   onPress = {props.navExibAbast}
   underlayColor ={'#466584'}
   >
     <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      
     {/*<Image source = {require('../assets/images/archive.png')} style={{ width: '17%', height: '17%', marginBottom: 0, resizeMode: 'cover', aspectRatio: 1, zIndex: 0, marginLeft: '-75%', marginTop: -10 }}/>*/}
          <Image source = {require('../assets/images/gas-station.png')} style={{ width: '38%', height: '38%', marginBottom: 10, resizeMode: 'cover', aspectRatio: 1, zIndex: 0 }}/>
          <Text style = {styles.btnText}>Abastecimentos</Text>
     </View>
    
  
  </TouchableHighlight>
  <TouchableHighlight
   style = {styles.btnTouch}
   onPress = {props.navExibirEstat}
   underlayColor ={'#466584'}
   >
     <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image source = {require('../assets/images/estatisticas.png')} style={{ width: '40%', height: '40%', marginBottom: 10, resizeMode: 'cover', aspectRatio: 1 }}/>
          <Text style = {styles.btnText}>Estatísticas</Text>
     </View>
    
  
  </TouchableHighlight>
     {  /*{itemsArray.length > 0 ? (
         /*<ItemComponent lista = {itemsArray}/>
         <View style={styles.itemsList}>       
        <Table lista = {itemsArray}/>
      </View>
      ) : (
        <Text>Carregando...</Text>
      )}*/ }

    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',   
    backgroundColor: colors.INFINITY,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10
  },
  itemsList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  itemtext: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btnTouch: {
    width: '35%',
    height:'20%',
    alignItems: 'center',
    justifyContent: 'center', 
    backgroundColor:colors.BLUE_GREY_, 
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
    fontSize: normalize(12),
    fontFamily: 'Lato-Regular'
    
  }
});

