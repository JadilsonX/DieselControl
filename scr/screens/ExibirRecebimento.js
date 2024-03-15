import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import { FletchRecebimento } from '../services/ItemService';
import TableReceb from '../components/TableReceb';
import { ActivityIndicator, } from 'react-native-paper';
import colors from '../constants/colors';
import database from '@react-native-firebase/database';


export default function ExibirRecebimento() {
   const [itemRecebimento, setItemRecebimento] = React.useState([]);
 //const fletchLista = FletchRecebimento()

 React.useEffect(() => {

  database()
  .ref('/recebimento')
  .once('value')
  .then(snapshot => {


 setItemRecebimento(Object.values(snapshot.val()));

   }).catch(error => {
      console.log(error)
     });

 }, []);

   return(
<View style = {styles.container}>
{itemRecebimento.length > 0 ?
      <View style = {{flex : 1, backgroundColor: '#1f3541', width: '100%'}}>
         <Table
            lista = {itemRecebimento}
         />
      </View>
      :
      <View  style = {styles.container}>
     <ActivityIndicator animating={true} color={'white'} size = "large"/>
     </View>
}
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
     flex: 1,
     width : '100%',
     backgroundColor: '#1f3541',
     alignItems: 'center',
     justifyContent: 'center',
   },
   itemsList: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-around',
    },
 }
)