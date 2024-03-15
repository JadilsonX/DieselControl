import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Alert
} from 'react-native';
import { addItem } from '../services/ItemService';
import { TextInput } from 'react-native-paper';
import DropDownPicker from '../components/DropDown';
import NetworkUtills, { isConnected } from '../services/NetWorkUtills';
import colors from '../constants/colors'
import NetInfo from "@react-native-community/netinfo";
import Globais from '../services/Globais'
var checkSubmit = false
var internet

export default class AddItem extends Component {
  constructor(props) {
      super(props);
      this.state = {
        motorista: '',
        placa: '',
        regIni: '',
        regFin: '',
        litrosAbast: '',
        temperatura: '',
        densidade: '',
        notaFiscal: '',
      }
     //this.handleChangePlaca = this.handleChangePlaca.bind(this);
      //this.handleChangeRegIni = this.handleChangeRegIni.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      //this.clearRef = React.createRef();
    }

    handleChangeMotorista = (text) => {
      this.setState({
        motorista:text
      });
    }

    handleChangePlaca = (text) => {
      this.setState({
        placa:text
      });
    }
    handleChangeRegIni = (text) => {
      this.setState({
        regIni:text
      });
    }
    handleChangeRegFin = (text) => {
      this.setState({
        regFin:text
      });
    }
    handleChangeLtsAbst = (text) => {
      this.setState({
        litrosAbast:text
      });
    }

    handleChangeTemperatura = (text) => {
      this.setState({
        temperatura:text
      });
    }
    handleChangeDensidade = (text) => {
      this.setState({
        densidade:text
      });
    }
    handleChangeNotaFiscal = (text) => {
      this.setState({
        notaFiscal:text
      });
    }
   /* hasInternet = () => {
      Alert.alert(
        'Sucesso',
        'Informações enviadas com sucesso'
             );

    }
    noInternet = () => {
      Alert.alert(
        'Erro de conexão',
        'Não foi possível enviar os dados no momento devido a problema na conexão. Serão enviados assim que a conexão for restabelecida. '

             );
    }

    CheckInternetConnection = () => {

      isConnected()
        .then(() =>  this.hasInternet())
        .catch(() => this.noInternet())
    }*/
    handleSubmit() {
      //console.log("OK? " + isConnected)
      if (this.state.motorista != '' && this.state.placa != '' /*&& this.state.regIni != ''  */&& this.state.regFin != '' && this.state.litrosAbast != ''
       && this.state.densidade != '' && this.state.temperatura != '' && this.state.notaFiscal != ''){
        this.submitAlert(true)
      addItem(
        this.state.motorista,
        this.state.placa,
        //this.state.regIni,
        this.state.regFin,
        this.state.litrosAbast,
        this.state.temperatura,
        this.state.densidade,
        this.state.notaFiscal,
        );


        //this.CheckInternetConnection()
       /*if(!internet){
          Alert.alert(
            'Erro de conexão',
            'Não foi possível enviar as informações no momento devido a problema de conexão. Serão enviadas assim que a conexão for restabelecida. '

                 );
        } else {
        Alert.alert(
          'MSG',
          'Informações enviadas com sucsso'

               );}*/
               this.clear()
      } else {
        this.submitAlert(false)

      }


    }


    submitAlert = (success) => {
      console.log("success: " + success)
      if (success) {
      if(!Globais.internet){
        Alert.alert(
          'Erro de conexão',
          'Não foi possível enviar os dados no momento devido a um erro na conexão. Os dados serão enviadas assim que a conexão for restabelecida. '

               );
      } else {
      Alert.alert(
        'MSG',
        'Informações enviadas com sucesso'

             );}

    } else {
      Alert.alert('Atenção', 'Favor preencher todos os campos')
    }
    }

    clear = () => {
      this.setState({motorista: ''})
      //this.setState({regIni: ''})
      this.setState({regFin: ''})
      this.setState({litrosAbast: ''})
      this.setState({temperatura: ''})
      this.setState({densidade: ''})
      this.setState({notaFiscal: ''})
      this.setState({placa: ''})
      //this.clearRef.current?.clear();

    }

    theme  = {
      colors: {
        text: colors.OREGANO,
        placeholderTextColor: colors.OREGANO,
        onSurfaceVariant:  colors.DARK_BLUE, //placeholder
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

  render(props) {


    //console.log(this.props)
    return (
      <View style={styles.main}>

             <TextInput
              label = "Motorista:"
              style={styles.itemInput}
              onChangeText={this.handleChangeMotorista}
              value = {this.state.motorista}
              //mode = 'outlined'
              theme={this.theme}

            />

              <TextInput
              label = "Placa:"
              style={styles.itemInput}
              onChangeText={this.handleChangePlaca}
              value = {this.state.placa}
              autoCapitalize = 'characters'
             // mode = 'outlined'
              theme={this.theme}
            />
            {/*<TextInput
              label = "Registro Inical da Bomba:"
              style={styles.itemInput}
              onChangeText={this.handleChangeRegIni}
              value = {this.state.regIni}
              //mode = 'outlined'
              keyboardType= 'numeric'
              theme={this.theme}
    />*/}
            <TextInput
              label = "Registro Final do Tanque:"
              style={styles.itemInput}
              onChangeText={this.handleChangeRegFin}
              value = {this.state.regFin}
              //mode = 'outlined'
              keyboardType= 'numeric'
              theme={this.theme}
            />
            <TextInput
              label = "Litros Abastecidos:"
              style={styles.itemInput}
              onChangeText={this.handleChangeLtsAbst}
              value = {this.state.litrosAbast}
              //mode = 'outlined'
              keyboardType= 'numeric'
              theme={this.theme}
            />
            <TextInput
              label = "Temperatura:"
              style={styles.itemInput}
              onChangeText={this.handleChangeTemperatura}
              value = {this.state.temperatura}
              //mode = 'outlined'
              keyboardType= 'phone-pad'
              theme={this.theme}
            />
            <TextInput
              label = "Densidade:"
              style={styles.itemInput}
              onChangeText={this.handleChangeDensidade}
              value = {this.state.densidade}
             // mode = 'outlined'
              keyboardType = 'phone-pad'
              theme={this.theme}
            />
            <TextInput
              label = "Nota Fiscal:"
              style={styles.itemInput}
              onChangeText={this.handleChangeNotaFiscal}
              value = {this.state.notaFiscal}
             // mode = 'outlined'
              keyboardType= 'numeric'
              theme={this.theme}
            />

            {/*<DropDownPicker
              handleChangePlaca={this.handleChangePlaca}
              ref={this.clearRef}
            />*/}
        <View style = {{width: '100%', flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
        <TouchableHighlight
                style = {styles.button}
                underlayColor = {'#466584'}
                onPress = {this.handleSubmit}
              >
              <Text
                  style={styles.buttonText}>
                  Enviar
              </Text>
            </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.INFINITY,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center'
  },
  itemInput: {
    backgroundColor:  '#F6F6F6',
        width: '90%',
        height: 50,
        marginBottom: 15,
        borderColor: '#eee',
        fontFamily: 'Lato-Regular'
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    alignSelf: 'center',
  },
  button: {
    height: 50,
    width: '90%',
    flexDirection: 'row',
    backgroundColor:colors.BLUE_GREY,
    borderColor: '#383E44',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 20,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});