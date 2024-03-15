import DropDownPicker from 'react-native-dropdown-picker';
import { useState, useEffect } from 'react';
import  { Placas } from '../services/ItemService';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'react-native';
import { CheckInternetConnection } from '../../App';
import React from 'react';
import colors from '../constants/colors'

export default DropDown = React.forwardRef (({handleChangePlaca}, ref) =>{

  const internet = CheckInternetConnection(false)
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([{label: '', value: ''}]);
  const [fontCor, setFontCor] = useState( colors.DARK_BLUE)


  const clear = () => {
    setItems([])
    console.log("Limpo")
  }


  React.useImperativeHandle(ref, () => ({ clear }));
 const getData = async () => {
  try {
    var js
    const jsonValue = await AsyncStorage.getItem('placas')
    js = JSON.parse(jsonValue)
    setItems(js)
  } catch(e) {
    //error
  }
}

useEffect(() => {
    getData()
}, []);



  return (
    <View>
    <DropDownPicker
      open={open}
      value={value}
      teste = {value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      language = {'PT'}
      placeholder = {"Selecione uma placa"}
      onChangeValue={(value) => {
       handleChangePlaca(value)
      }}
      onSelectItem={() => {
        setFontCor( colors.DARK_BLUE)
      }}
      style = {{
        backgroundColor: '#F6F6F6',
        borderColor: '#F6F6F6',
        borderRadius: 3,
        marginBottom: 15,
        marginTop: -5,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
      }}

      theme="LIGHT"
      containerStyle={{
      width: '90%',
      marginTop: 6,
    }}
    textStyle={{
      fontSize: 16,
      color: fontCor
    }}
    />
    </View>
  );
})