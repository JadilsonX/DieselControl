import React from "react";
import { View, Text, StyleSheet, TouchableHighlight, Alert} from 'react-native'
import { TextInput, Checkbox, useTheme } from "react-native-paper";
import colors from "../constants/colors";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import functions from '@react-native-firebase/functions';

export default AccountSettings = () => {
    const [email, setEmail] = React.useState("");
    const [pass, setPass] = React.useState("")
    const [name, setName] = React.useState("")
    const [checked, setChecked] = React.useState(false);
    const userRef = database().ref('/users');
    const admRef = database().ref('/admins')
    const cores = useTheme()
    const createUserAux = functions().httpsCallable('createUserAux');
createUserAux({ email, pass })
  .then(console.log)
  .catch(console.error);
    const createUser = () => {
        if (email != '' && pass != ''){
        auth()
  .createUserWithEmailAndPassword(email, pass)
  .then(() => {
    console.log('User account created & signed in!');

  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });
} else {
    Alert.alert('Atenção', 'Preencha todos os campos!')
}
    }

    return (
        <View style={styles.container}>
            <View>
            <TextInput
                placeholder="Nome"
                onChangeText={(n) => setName(n)}
                value={name}
                style={styles.textInput}

            />
            <TextInput
                placeholder="Email"
                onChangeText={(e) => setEmail(e)}
                value={email}
                style={styles.textInput}
            />
            <TextInput
                placeholder="Senha"
                onChangeText={(s) => setPass(s)}
                value={pass}
                style={styles.textInput}

            />

            <View style = {{flexDirection: 'row'}}>
                <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setChecked(!checked);
                    }}
                />
                <Text style ={{marginTop: 8, fontSize: 18, fontFamily: 'Lato-Regular', color: cores.colors.primary}}>Adm?</Text>
            </View>

            </View>
            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10,  }}>
            <TouchableHighlight
            style = {[styles.button, {backgroundColor: colors.BLUE_GREY_}]}
            onPress = {()=> createUser}
            underlayColor={'#466584'}
            >
                <Text style = {styles.buttonText}>Salvar</Text>
            </TouchableHighlight>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
    },
    textInput: {
        marginBottom: 0
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
        backgroundColor: '',
        borderColor: '#383E44',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
      }
})