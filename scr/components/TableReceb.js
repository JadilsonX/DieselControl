import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Theme, DataTable, IconButton } from 'react-native-paper';
import { Searchbar } from 'react-native-paper';
import { normalize } from '../services/ResizeFonts';
import { Dimensions, Platform, PixelRatio } from 'react-native';
import colors from '../constants/colors'


const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window')

  var dataSortAscendent = true
  var rowColor = ''
  var tablet = false

const Table = (props) => {

var lista = props.lista

const [searchQuery, setSearchQuery] = React.useState('');
const onChangeSearch = query => setSearchQuery(query);
const numberOfItemsPerPageList = [ 4, 6, 8];
const [dataSort, setDataSort] = React.useState('descending')

function FormataStringData(data) {
  var dia  = data.split(".")[0];
  var mes  = data.split(".")[1];
  var ano  = data.split(".")[2];

  return ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);

}

React.useEffect(() => {
  lista.sort((b, a) => FormataStringData(a.data).localeCompare(FormataStringData(b.data)) || a.hora.localeCompare(b.hora));
}, []);

const Rev = () => {

  if (dataSortAscendent) {
  setDataSort('descending')
  lista.sort((a, b) =>FormataStringData(b.data).localeCompare(FormataStringData(a.data)) || b.hora.localeCompare(a.hora));
  } else {
  setDataSort('ascending')
  lista.sort((a, b) => FormataStringData(a.data).localeCompare(FormataStringData(b.data)) || a.hora.localeCompare(b.hora));
  }
  dataSortAscendent = !dataSortAscendent
}

if (searchQuery.length > 0) {
const filteredList = lista.filter(filtro => {
return filtro.placa.includes(searchQuery.toLocaleLowerCase());
});
lista = filteredList
}
    React.useEffect(() => {
        setPage(0);
     }, [numberOfItemsPerPage]);

  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, lista.length);

  const tableRow = (item, id) => (
    <DataTable.Row key={id} style = {{alignItems: 'center', justifyContent: 'center'}}>
      {rowColorTable(id) }
      <DataTable.Cell style = {{justifyContent: 'center'}} textStyle = {[{color: rowColor}, styles.rowText]}>{item.motorista.toUpperCase()}</DataTable.Cell>
      <DataTable.Cell style = {{justifyContent: 'center'}} textStyle = {[{color: rowColor}, styles.rowText]}>{item.placa.toUpperCase()}</DataTable.Cell>
     { /*<DataTable.Cell style = {{justifyContent: 'center'}} textStyle = {[{color: rowColor}, styles.rowText]}>{item.reg_ini}</DataTable.Cell>*/}
      <DataTable.Cell style = {{justifyContent: 'center'}} textStyle = {[{color: rowColor}, styles.rowText]}>{item.reg_fin}</DataTable.Cell>
      <DataTable.Cell style = {{justifyContent: 'center'}} textStyle = {[{color: rowColor}, styles.rowText]}>{item.lts_abst}</DataTable.Cell>
      <DataTable.Cell style = {{justifyContent: 'center'}} textStyle = {[{color: rowColor}, styles.rowText]}>{item.temperatura}</DataTable.Cell>
      <DataTable.Cell style = {{justifyContent: 'center'}} textStyle = {[{color: rowColor}, styles.rowText]}>{item.densidade}</DataTable.Cell>
      <DataTable.Cell style = {{justifyContent: 'center'}} textStyle = {[{color: rowColor}, styles.rowText]}>{item.nota_fiscal}</DataTable.Cell>
      <DataTable.Cell style = {{justifyContent: 'center'}} textStyle = {[{color: rowColor}, styles.rowText]}>{item.responsavel}</DataTable.Cell>
      <DataTable.Cell style = {{justifyContent: 'center'}} textStyle = {[{color: rowColor}, styles.rowText]}>{item.data}</DataTable.Cell>
      <DataTable.Cell style = {{justifyContent: 'center'}} textStyle = {[{color: rowColor}, styles.rowText]}>{item.hora}</DataTable.Cell>
    </DataTable.Row>
  );

  const rowColorTable = (index) => {
    //console.log(rowColor)
            if(index % 2 == 0) {
              rowColor = '#eee'
          } else {
            rowColor = '#bbb'
          }
  }

  const theme  = {
    colors: {
      text: '#7f8873',
      iconColor:  colors.CANOPY,
      onSurface: colors.OREGANO,

    },
  };
  if (SCREEN_WIDTH < 900){
    tablet = false
  } else {
    tablet = true
  }
  // style={[styles.label, { color: labelColor }]}
  return (
    <View style={{flex: 1, width: '100%', flexDirection:'column'}}>
    {/*<Searchbar
      placeholder="Pesquisar"
      onChangeText={onChangeSearch}
      value={searchQuery}
      style = {{backgroundColor: colors.IMPERIAL_PRIMER}}
      inputStyle = {{color: '#fff', fontSize: normalize(9)}}
      iconColor = '#fff'
      placeholderTextColor= '#fff'

    />*/}

    <DataTable style={styles.container}>
      <DataTable.Header style={tablet?styles.tableHeaderTab:styles.tableHeader}>
        <DataTable.Title textStyle = {styles.headerTitle}>Motorista</DataTable.Title>
        <DataTable.Title textStyle = {styles.headerTitle}>Placa</DataTable.Title>
        {/*<DataTable.Title textStyle = {styles.headerTitle}>Reg. Inicial</DataTable.Title>*/}
        <DataTable.Title textStyle = {styles.headerTitle}>Reg. Final</DataTable.Title>
        <DataTable.Title textStyle = {styles.headerTitle}>Qtd</DataTable.Title>
        <DataTable.Title textStyle = {styles.headerTitle}>Temp.</DataTable.Title>
        <DataTable.Title textStyle = {styles.headerTitle}>Dens.</DataTable.Title>
        <DataTable.Title textStyle = {styles.headerTitle}>Nota Fiscal</DataTable.Title>
        <DataTable.Title textStyle = {styles.headerTitle}>Responsável</DataTable.Title>
        <DataTable.Title style = {{justifyContent: 'center'}} textStyle = {{paddingLeft: 0, fontSize: normalize(9), color: colors.OREGANO, fontWeight: 'bold'}} theme = {theme}
         sortDirection= {dataSort}
         onPress={()=> { Rev()} }>
        Data</DataTable.Title>
        <DataTable.Title textStyle = {styles.headerTitle}>Hora</DataTable.Title>
      </DataTable.Header>

      {lista
          .slice(
            page * numberOfItemsPerPage,
            page * numberOfItemsPerPage + numberOfItemsPerPage
          )
          .map((row, index) =>
            tableRow(row, index)
          )}


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
        color = 'red'
        labelColor = 'red'
        theme = {theme}
        />
    </DataTable>
    </View>
  );
};

export default Table;

const styles = StyleSheet.create({
  container: {
    width: '100%'//Mudar para px em caso de Scroll Horizontal
   //flex: 1,
    //alignItems: 'center', justifyContent: 'flex-end'
  },
  tableHeader: {
    //height: 40,
    backgroundColor: colors.BLUE_GREY,
    //paddingLeft: 20,
    //justifyContent: 'center',
  // alignItems: 'center',
   borderBottomColor: colors.OREGANO
  },
  tableHeaderTab: {
    // height: SCREEN_WIDTH/15,
     backgroundColor: colors.BLUE_GREY,
     //paddingLeft: 20,
     justifyContent: 'center',
    alignItems: 'center'
   },
  headerTitle: {
    flex: 1,
    color: colors.OREGANO,
    fontSize: normalize(9),
    textAlign: 'center',
    fontWeight: 'bold',
  },

  rowText: {
    fontSize: normalize(9),
    textAlign: 'center'
  }
});