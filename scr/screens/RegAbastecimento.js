import React, { Component, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Alert,
  StatusBar,
} from 'react-native';

import { TextInput } from 'react-native-paper';
import { sendAbastecimento } from '../services/ItemService';
import { CheckBox } from '@react-native-community/checkbox';
import { Switch } from 'react-native-paper'
import DropDownPicker from '../components/DropDown';
import { normalize } from '../services/ResizeFonts';
import colors from '../constants/colors'
import { CheckInternetConnection } from '../../App';
import Globais from '../services/Globais'

var checkSubmit = false

export default class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      motorista: '',
      placa: '',
      km: '',
      litrosAbast: '',
      placeHolder1: 'Motorista:',
      placeHolder2: 'Placa:',
      placeHolder3: 'Km Atual:',
      toggleCheckBox: false,
      tag: '',
      empLabelColor: '#3d455c',
      checkPlacaField: false,
      checkTagField: false
    }


    this.clearRef = React.createRef();
    //this.handleChangeMotorista = this.handleChangeMotorista.bind(this);
    //this.handleChangeRegIni = this.handleChangeRegIni.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeMotorista = (text) => {

    this.setState({
      motorista: text
    });
  }
  handleChangePlaca = (dropdownPlaca) => {
    this.setState({
      placa: dropdownPlaca

    });
    checkSubmit = false;

  }

  handleChangeTag = (text) => {
    this.setState({
      tag: text
    });

  }
  handleChangeKm = (text) => {
    this.setState({
      km: text
    });
  }
  handleChangeLtsAbst = (text) => {
    this.setState({
      litrosAbast: text
    });

  }
  handleSubmit() {
    CheckInternetConnection(false)

    if (this.state.motorista != '' && this.state.litrosAbast != '' && this.state.km != '' && this.state.placa != '') {
      this.submitAlert(true)
      /*if (!this.state.toggleCheckBox) {
        if (this.state.placa != '') {
         this.submitAlert(true)
        } else {
          this.submitAlert(false)
        }

      } else {

       if (this.state.tag != '') {
           this.submitAlert(true)
        } else {
          this.submitAlert(false)
        }

      }*/
      sendAbastecimento(
        this.state.motorista,
        this.state.placa,
        this.state.km,
        this.state.litrosAbast
      );

    } else { this.submitAlert(false) }
  }
  submitAlert = (success) => {
    console.log("success: " + success)
    if (success) {
      if (!Globais.internet) {
        Alert.alert(
          'Erro de conexão',
          'Não foi possível enviar os dados no momento devido a um erro na conexão. Os dados serão enviadas assim que a conexão for restabelecida. '

        );
      } else {
        Alert.alert(
          'MSG',
          'Informações enviadas com sucesso'

        );
      }

    } else {
      Alert.alert('Atenção', 'Favor preencher todos os campos')
    }
    this.clear()
  }


  handleCheckBox = (newValue) => {
    this.setState({
      toggleCheckBox: newValue
    });
    //console.log(!this.state.toggleCheckBox)
    this.handlePlaceholder()
  }

  handlePlaceholder = () => {
    if (!this.state.toggleCheckBox) {
      this.setState({ placeHolder1: 'Solicitante:' })
      this.setState({ placeHolder2: 'Tag:' })
      this.setState({ placeHolder3: 'Horímetro:' })
      this.setState({ empLabelColor: '#eee' })
      this.setState({ placa: '' })

    } else {
      this.setState({ placeHolder1: 'Motorista:' })
      this.setState({ placeHolder2: 'Placa:' })
      this.setState({ placeHolder3: 'Km:' })
      this.setState({ empLabelColor: '#383E44' })
    }
    //console.log(this.state.toggleCheckBox)

  }

  clear = () => {
    checkSubmit = true;
    console.log("clear")
    this.setState({ motorista: '' })
    this.setState({ km: '' })
    this.setState({ litrosAbast: '' })
    this.setState({ tag: '' })
    this.setState({ placa: '' })
    this.clearRef.current?.clear();
    //this.setState({value: ''})
  }

  theme = {
    colors: {
      text: colors.OREGANO,
      placeholderTextColor: colors.OREGANO,
      onSurfaceVariant: colors.DARK_BLUE, //placeholder
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
    //const [toggleCheckBox, setToggleCheckBox] = useState(false)
    return (

      <View style={styles.main}>
        {console.log('Render? ' + Globais.isAdmin)}

        {Globais.isAdmin? <View
          style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.INFINITY }}>
          <View style={{ paddingRight: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0B1526', flexDirection: 'row', borderRadius: 14, marginBottom: 20, borderColor: '#050112', borderWidth: 2, alignSelf: 'center' }}>
            <Switch
              disabled={false}
              value={this.state.toggleCheckBox}
              onValueChange={this.handleCheckBox}
              color={colors.SHORE_WATER}
            />

            <Text style={{ fontSize: normalize(9), color: this.state.empLabelColor, fontFamily: 'Montserrat-Regular' }}>Empilhadeira
            </Text>
          </View>
        </View> : console.log('Render? ' + Globais.isAdmin)}
        <TextInput
          label={this.state.placeHolder1}
          style={styles.itemInput}
          onChangeText={this.handleChangeMotorista}
          //mode = 'outlined'
          value={this.state.motorista}
          theme={this.theme}
        />

        <TextInput
          label={this.state.placeHolder3}
          style={styles.itemInput}
          onChangeText={this.handleChangeKm}
          value={this.state.km}
          //mode = 'outlined'
          keyboardType='decimal-pad'
          theme={this.theme}
        //Color = 'red'
        //textColor = 'red'
        //underlineColor='red'
        //activeUnderlineColor='red'
        />

        <TextInput
          label="Litros Abastecidos:"
          style={styles.itemInput}

          onChangeText={this.handleChangeLtsAbst}
          value={this.state.litrosAbast}
          //mode = 'outlined'
          keyboardType='numeric'
          theme={this.theme}

        />
        {!this.state.toggleCheckBox ?
          <DropDownPicker
            handleChangePlaca={this.handleChangePlaca}
            ref={this.clearRef}
          />
          :
          <TextInput
            label={'Tag:'}
            style={styles.itemInput}
            onChangeText={this.handleChangePlaca}
            value={this.state.placa}
            keyboardType='numeric'
            //mode = 'outlined'
            theme={this.theme}
          />
        }
         <View>
       </View>
      <View >
    </View>


        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
          <TouchableHighlight
            style={styles.button}
            underlayColor={'#466584'}
            onPress={this.handleSubmit}
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
    marginTop: 15
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center'
  },
  itemInput: {
    backgroundColor: '#F6F6F6',
    width: '90%',
    height: 50,
    marginBottom: 15,
    borderColor: 'red'
  },
  itemInputFinal: {
    backgroundColor: '#eef',
    width: '90%',
    marginBottom: 8,
    fontSize: 18
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
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
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});
