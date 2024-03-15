import { TextInput } from "react-native-paper";
import {View, StyleSheet} from 'react-native'

export default TextInput = (props) => {

   const theme  = {
        colors: {
          text: '#000',
          placeholder:  colors.SHORE_WATER,
          onSurfaceVariant: 'red',
          primary: '#ddd',
          accent: '#ddd',       
          surface: '#000',
          disabled: '#fff',
          backdrop: '#000',
          onSurface: '#000',
          notification: '#000', 
          underlineColor: 'transparent',        
        },
      };

    return (
        <View>
            <TextInput
              label =  {props.label}       
              style={styles.itemInput}
              onChangeText={this.handleChangePlaca}
              autoCapitalize = {props.characters}
              mode = 'outlined'
              theme={theme}
            />         
            
        </View>
    )
}

const styles = StyleSheet.create({
   
    itemInput: {
      backgroundColor: colors.IMPERIAL_PRIMER,    
          width: '90%',
          height: 50,
          marginBottom: 10,
          borderColor: '#eee'  
    },
 
  });