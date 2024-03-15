import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { Modal, DataTable, Portal, Provider } from 'react-native-paper';
import { Searchbar } from 'react-native-paper';
import colors from '../constants/colors'
import DropDownPicker from 'react-native-dropdown-picker';
import { useState, useEffect } from 'react';
import { normalize } from '../services/ResizeFonts';
import  { Placas } from '../services/ItemService';
import AsyncStorage from '@react-native-async-storage/async-storage';


//var dataSort = "descending"
var dataSortAscendent = false
var reverse = false
var rowColor = ''
var start = true
const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window')

const Table = (props) => {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([{ label: 'Motorista', value: 'motorista' }, { label: 'Data', value: 'data' }, { label: 'Placa', value: 'placa' }, { label: 'Responsável', value: 'responsavel' }]);
  const [searchField, setSearchField] = useState('motorista')
  const [inputColor, setInputColor] = useState('#fff')
  const [visible, setVisible] = React.useState(false);
  const [rowItem, setRowItem] = React.useState([]);
  const [placasArrayObj, setPlacasArrayObj] = React.useState([]);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {  backgroundColor: '#000', alignSelf: 'center', padding: 10 };

  const getData = async () => {
    //
    try {
      var js
      const jsonValue = await AsyncStorage.getItem('placas')
      js = JSON.parse(jsonValue)
      setPlacasArrayObj(js)
      console.log(placasArrayObj)
    } catch(e) {
      console.log(e)
    }
  }

  var lista = props.lista
  var listaExternal = props.listaExternal
  var obj2 = listaExternal[0]
  var count = 0

  function FormataStringData(data) {
    var dia = data.split(".")[0];
    var mes = data.split(".")[1];
    var ano = data.split(".")[2];
    //console.log(data)
    return ano + '-' + ("0" + mes).slice(-2) + '-' + ("0" + dia).slice(-2);
  }
  React.useEffect(() => {
    getData()
  }, [])

  if (obj2 != [] && obj2 != null && obj2 != undefined) {
    if (!lista.includes(obj2)) {
      lista.push(obj2)
      lista.sort((b, a) => FormataStringData(a.data).localeCompare(FormataStringData(b.data)) || a.hora.localeCompare(b.hora));
    }
  } else {
    lista.sort((b, a) => FormataStringData(a.data).localeCompare(FormataStringData(b.data)) || a.hora.localeCompare(b.hora));
    if (start) {
      console.log(start)
      lista.sort((b, a) => FormataStringData(a.data).localeCompare(FormataStringData(b.data)) || a.hora.localeCompare(b.hora));
    }
  }
  const numberOfItemsPerPageList = [8, 10, 12];
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);
  const [dataSort, setDataSort] = React.useState('descending')

  const Rev = () => {
    //console.log(dataSortAscendent)
    start = false

    if (dataSortAscendent) {
      setDataSort('descending')
      lista.sort((a, b) => FormataStringData(b.data).localeCompare(FormataStringData(a.data)) || b.hora.localeCompare(a.hora));
    } else {
      setDataSort('ascending')
      lista.sort((a, b) => FormataStringData(a.data).localeCompare(FormataStringData(b.data)) || a.hora.localeCompare(b.hora));
    }
    dataSortAscendent = !dataSortAscendent
  }

  const searchFilter = () => {
    let filteredList = ''
    switch (searchField) {
      case "motorista":
        filteredList = lista.filter(filtro => {
          return filtro.motorista.toLowerCase().includes(searchQuery.toLowerCase());
        });
        lista = filteredList;
        break;
      case "placa":
        filteredList = lista.filter(filtro => {
          return filtro.placa.toLowerCase().includes(searchQuery.toLowerCase());
        });
        lista = filteredList
        break;
      case "responsavel":
        filteredList = lista.filter(filtro => {
          return filtro.responsavel.toLowerCase().includes(searchQuery.toLowerCase());
        });
        lista = filteredList
        break;
      case "data":
        filteredList = lista.filter(filtro => {
          return filtro.data.includes(searchQuery);
        });
        lista = filteredList
        break;
    }
  }


const placasArray = placasArrayObj
var newArray = []
var newObj = {}
var kmInicial
var kmFinal
var lts = 0
var consumo = 0
var ltsTotal = 0
if (placasArray.length > 0 ) {
  const filterPlacas = placasArray.map((item, index) => {
    var placaAtual = lista.filter(filtro => {
      return filtro.placa.includes(item.value.toLowerCase())

    });
    placaAtual.map((item, index) => {

      lts = Number(item.lts_abst) + Number(lts)
      ltsTotal = Number(item.lts_abst) + ltsTotal
      if (index == 0) {
        kmInicial = item.km_atual
      }
      if (index == placaAtual.length - 1) {
        kmFinal = item.km_atual
        let kmPer =  kmInicial - kmFinal
        let consumo  = parseFloat(kmPer / lts).toFixed(2)
        //console.log('Placa: ' + item.placa + ' - Qtd: ' + placaAtual.length + ' - Litros: ' + lts + ' - Km. Percorridos: ' + kmPer )
        newObj = {placa: item.placa, qtd: placaAtual.length, lts: lts, km: kmPer, consumo: consumo }
        lts = 0
        newArray.push(newObj)
        //console.log(newObj)
      }
    })
  })
  lista = newArray
  lista.sort((a, b) => b.lts - a.lts);
}

  if (searchQuery.length > 0) {
    searchFilter()
    /*if (searchField == 'motorista') {
     const filteredList = lista.filter(filtro => {
       return filtro.motorista.toLowerCase().includes(searchQuery.toLowerCase());
     });
 lista = filteredList
   }

   if (searchField == 'placa') {
     const filteredList = lista.filter(filtro => {
       return filtro.placa.toLowerCase().includes(searchQuery.toLowerCase());
     });
 lista = filteredList
   }

   if (searchField == 'responsavel') {
     const filteredList = lista.filter(filtro => {
       return filtro.responsavel.toLowerCase().includes(searchQuery.toLowerCase());
     });
 lista = filteredList
   }

   if (searchField == 'data') {
     const filteredList = lista.filter(filtro => {
       return filtro.data.includes(searchQuery);

     });
     lista = filteredList
   }*/

  }

  if (reverse) {
    lista.reverse()
  }

  React.useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, lista.length);

  const tableRow = (item, id) => (

    <DataTable.Row onPress={() => /*(showModal(), setRowItem([item]))*/{}} key={id} style={{ alignItems: 'center', justifyContent: 'center', borderBottomColor: colors.BLUE_GREY }}>
      {rowColorTable(id)}
      <DataTable.Cell style={{ justifyContent: 'center' }} textStyle={{ color: rowColor }}>{item.placa.toUpperCase()}</DataTable.Cell>
      <DataTable.Cell style={{ justifyContent: 'center' }} textStyle={{ color: rowColor }}>{item.km}</DataTable.Cell>
      <DataTable.Cell style={{ justifyContent: 'center' }} textStyle={{ color: rowColor }}>{item.qtd}</DataTable.Cell>
      <DataTable.Cell style={{ justifyContent: 'center' }} textStyle={{ color: rowColor }}>{item.lts}</DataTable.Cell>
      <DataTable.Cell style={{ justifyContent: 'center' }} textStyle={{ color: rowColor }}>{item.consumo}</DataTable.Cell>
    </DataTable.Row>


  );

  const modalFunction = (item, id) => (
    <View key={id}>
      <Text><Text style={styles.modalKeyText}>Motorista: </Text><Text style={styles.modalValueText}>{item.motorista.toUpperCase()}</Text></Text>
      <Text><Text style={styles.modalKeyText}>Placa: </Text> <Text style={styles.modalValueText}>{item.placa.toUpperCase()}</Text></Text>
      <Text><Text style={styles.modalKeyText}>Km: </Text> <Text style={styles.modalValueText}>{item.km_atual}</Text></Text>
      <Text><Text style={styles.modalKeyText}>Qtd: </Text> <Text style={styles.modalValueText}>{item.lts_abst}</Text></Text>
      <Text><Text style={styles.modalKeyText}>Data: </Text> <Text style={styles.modalValueText}>{item.data}</Text></Text>
      <Text><Text style={styles.modalKeyText}>Hora: </Text> <Text style={styles.modalValueText}>{item.hora}</Text></Text>
      <Text><Text style={styles.modalKeyText}>Responsável: </Text> <Text style={styles.modalValueText}>{item.responsavel.toUpperCase()}</Text></Text>
    </View>

  )

  const rowColorTable = (index) => {
    //console.log(rowColor)
    if (index % 2 == 0) {
      rowColor = '#eee'
    }
    // if the number is odd
    else {
      rowColor = '#bbb'
    }
  }

  const theme = {
    colors: {
      text: 'red',
      iconColor: colors.CANOPY,
      onSurface: colors.OREGANO,
      placeholderTextColor: colors.OREGANO,
      onSurfaceVariant: colors.SHORE_WATER, //placeholder
      primary: colors.OREGANO,  //bordas
      accent: 'blue',
      surface: 'red',
      disabled: 'red',
      backdrop: 'red',
      onSurface: colors.OREGANO, //texto
      notification: 'red',
      underlineColor: 'blue',
      textColor: 'red'

    },
  };

  //const modalArray = [{motorista}]

  return (
    <View style={{ flex: 1, width: '100%', height: '100%'}}>
      {/*<View style={{ width: '100%', flexDirection: 'row', }}>
        <Searchbar
          placeholder="Pesquisar"
          placeholderTextColor={'#fff'}
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={{ backgroundColor: colors.IMPERIAL_PRIMER, width: '80%' }}
          inputStyle={{ color: inputColor, fontFamily: 'Lato-Regular' }}
          iconColor='#fff'
          onFocus={() => setInputColor('#000')}
          onBlur={() => setInputColor('#fff')}
        />

        <DropDownPicker
          open={open}
          value={value}
          teste={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          language={'PT'}
          listMode='SCROLLVIEW'
          zIndex={1000}
          placeholder={"Motorista"}
          onChangeValue={(value) => {
            setSearchField(value)
          }}


          style={{
            backgroundColor: colors.IMPERIAL_PRIMER,
            borderColor: '#444',
            borderRadius: 0,
            marginBottom: 0,
            marginTop: -5,
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderWidth: 0.5,
            width: '20%'
          }}

          theme="DARK"
          containerStyle={{
            //width: '70%',

            marginTop: 6,
          }}
          textStyle={{
            fontSize: normalize(15),
            color: '#fff',
            fontFamily: 'Lato-Regular'
          }}

          scrollViewProps={{
            decelerationRate: "fast"
          }}
        />
      </View>*/}

      <DataTable style={styles.container}>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title textStyle={styles.headerTitle}>Placa</DataTable.Title>
          <DataTable.Title textStyle={styles.headerTitle}>Km</DataTable.Title>
          <DataTable.Title textStyle={styles.headerTitle}>Qtd.</DataTable.Title>
          <DataTable.Title textStyle={styles.headerTitle}>Qtd{'(L)'}</DataTable.Title>
          <DataTable.Title textStyle={styles.headerTitle}>Km/L</DataTable.Title>
        </DataTable.Header>
        {lista
          .slice(
            page * numberOfItemsPerPage,
            page * numberOfItemsPerPage + numberOfItemsPerPage
          )
          .map((row, index) => tableRow(row, index))}
          <DataTable.Row>
            <DataTable.Cell textStyle = {{color: colors.OREGANO, fontWeight: 'bold', fontSize: normalize(15) }}>Total: </DataTable.Cell>
            <DataTable.Cell numeric textStyle = {{color: 'white', fontWeight: 'bold', fontFamily: 'Lato-Regular', fontSize: normalize(18)}}>{ltsTotal.toLocaleString()} Litros</DataTable.Cell>
          </DataTable.Row>

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(lista.length / numberOfItemsPerPage)}
          onPageChange={page => setPage(page)}
          label={`${from + 1}-${to} de ${lista.length}`}
          showFastPaginationControls
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={numberOfItemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          selectPageDropdownLabel={'Linhas por página'}
          theme={theme}
        />

      </DataTable>
      <Provider>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            {
            /*<Text>Motorista: {Object.}</Text>
            <Text>Placa: </Text>
            <Text>Km: </Text>
            <Text>Qtd: </Text>
            <Text>Data: </Text>
            <Text>Hora: </Text>
          <Text>Responsável: </Text>*/}
            {rowItem
              .map((row, index) => modalFunction(row, index))}
          </Modal>
        </Portal>
      </Provider>
    </View>
  );
};

export default Table;

const styles = StyleSheet.create({
  container: {

    //width: SCREEN_WIDTH
    //alignItems: 'center', justifyContent: 'flex-end'
  },
  tableHeader: {
    //flex: 1,
    backgroundColor: colors.BLUE_GREY,
    //paddingLeft: 20,
    //justifyContent: 'flex-end',
    //alignItems: 'center'
    borderBottomColor: colors.OREGANO

  },
  headerTitle: {
    flex: 1,
    color: colors.OREGANO,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Lato-Regular',
  },
  rowText: {
    color: rowColor,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Lato-Regular'
  },
  modalKeyText: {
    fontSize: 18,
    color: colors.CANOPY,
    fontFamily: 'bold'
  },
  modalValueText: {
    fontSize: 18,
    color: '#fff'
  }
});