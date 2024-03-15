import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight, ScrollView} from 'react-native';
import { FletchAbastecimento, FletchAbastecimentoExterno } from '../services/ItemService';
import { ActivityIndicator,} from 'react-native-paper';
import Globais from '../services/Globais'
import database from '@react-native-firebase/database';
import TableAbs from '../components/TableAbs';

export default ExibirRecebimento = () => {

   const [itemAbastecimento, setItemAbastecimento] = React.useState([]);
   const [itemAbastecimentoExt, setItemAbastecimentoExt] = React.useState([]);

   React.useEffect(() => {
   console.log('effect')
   database()
   .ref('/abastecimento')
   .once('value')
   .then(snapshot => {
       setItemAbastecimento(Object.values(snapshot.val()));
       let data = snapshot.val();
       let keys = Object.keys(data);
      }).catch(error => {
         console.log(error)
        });
  database()
  .ref('/abastecimento_externo')
  .once('value')
  .then(snapshot => {
      setItemAbastecimentoExt(Object.values(snapshot.val()));
  }).catch(error => {
   console.log(error)
  });
    }, []);

   return(
      <View style = {styles.container}>
      {itemAbastecimento.length > 0  || itemAbastecimentoExt > 0?
    <ScrollView  style = {{flex : 1, backgroundColor: '#1f3541', }}>
    <TableAbs
     lista = {itemAbastecimento}
     listaExternal = {itemAbastecimentoExt}
     />
     </ScrollView>
     :
     <View style = {styles.container2}>
     <ActivityIndicator animating={true} color={'white'} size = "large" />
     </View>
      }
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      width: '100%',
      height: '100%',
     backgroundColor: '#1f3541',
     alignItems: 'flex-start',
     justifyContent: 'center',
     flexDirection: 'row',
   },
   container2: {
      flex: 1,
      width: '100%',
      height: '100%',
     backgroundColor: '#1f3541',
     alignItems: 'center',
     justifyContent: 'center',
     flexDirection: 'row',
   },
   itemsList: {
      //flex: 1,
      //flexDirection: 'column',
      //justifyContent: 'space-around',
    },
}
)