import React, { Component } from 'react';
import {
  View,
  Alert,
  StatusBar,
  ScrollView,
} from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './scr/screens/Home';
import RegRecebimento from './scr/screens/RegRecebimento';
import RegAbastecimento from './scr/screens/RegAbastecimento';
import Lançamentos from './scr/screens/Lançamentos';
import ExibirRecebimento from './scr/screens/ExibirRecebimento';
import ExibirAbastecimento from './scr/screens/ExibirAbastecimento';
import ExibirEstatisticas from './scr/screens/ExibirEstatisticas';
import { isConnected } from './scr/services/NetWorkUtills';
import codePush from "react-native-code-push";
import Login from './scr/screens/login';
import colors from './scr/constants/colors';
import Globais from './scr/services/Globais'
import CircularProgress from './scr/components/CircularProgress';
import { IconButton } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { normalize } from './scr/services/ResizeFonts';
import AccountSettings from './scr/screens/AccountSettings'

//import colors from '../constants/colors'

var connection = false
var internet = true
let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  updateDialog: {
    appendReleaseDescription: true,
    mandatoryUpdateMessage: 'Uma atualização necessária está disponível.',
    optionalInstallButtonLabel: 'Instalar',
    title: 'Atualização disponível'
  }
};

const Stack = createNativeStackNavigator();
const hasInternet = () => {
  //!internet? internet = false: internet = true
  Globais.internet = true
  internet = true
}

const noInternet = (alert) => {
  internet = false
  Globais.internet = false
  if (alert)
    Alert.alert('Erro de conexão', 'Não foi possível estabelecer conexão com o servidor. Verifique a sua conexão.')
}

export function CheckInternetConnection(alert) {
  isConnected()
    .then(() => hasInternet())
    .catch(() => noInternet(alert))
}

function HomeScreen({ navigation }) {
  CheckInternetConnection(true)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1f2631' }}>
      <StatusBar hidden={false} />
      <Home
        navRec={() => navigation.navigate('Registro de Recebimento')}
        navAbs={() => navigation.navigate('Registro de Abastecimento')}
        navCons={() => navigation.navigate('Lançamentos')}
        update={() => navigation.setOptions({ title: Globais.user })}
      />
    </View>
  );
}

function RegRecebimentoScreen() {
  CheckInternetConnection(true)
  return (
    <ScrollView style={{ backgroundColor: colors.DARK_BLUE }}>
      <StatusBar hidden={true} />
      <RegRecebimento
        isConnected={connection}
      />
    </ScrollView>
  );
}

function RegAbastecimentoScreen() {
  CheckInternetConnection(true)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.DARK_BLUE }}>
      <StatusBar hidden={true} />
      <RegAbastecimento />
    </View>
  );
}

function ConsultaDados({ navigation }) {
  CheckInternetConnection(true)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Lançamentos
        navExibAbast={() => navigation.navigate('Abastecimento')}
        navExibReceb={() => navigation.navigate('Recebimento')}
        navExibirEstat={() => navigation.navigate('Estatisticas')}
      />
    </View>
  );
}

function ExibirRecebimentoScreen() {
  CheckInternetConnection(true)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#1f2631', width: '100%', }}>
      <StatusBar hidden={true} />
      <ExibirRecebimento
      />
    </View>
  );
}

function ExibirAbastecimentoScreen() {
  CheckInternetConnection(true)
  return (
    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', backgroundColor: '#1f2631', width: '100%', height: '100%', }}>
      <StatusBar hidden={true} />
      <ExibirAbastecimento
      />
    </View>
  );
}

function ExibirEstatisticasScreen() {
  CheckInternetConnection(true)
  return (
    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', backgroundColor: '#1f2631', width: '100%', height: '100%' }}>
      <StatusBar hidden={true} />
      <ExibirEstatisticas
      />
    </View>
  );
}

function LoginScreen({ navigation }) {
  CheckInternetConnection(true)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#1f2631', width: '100%', }}>
      <StatusBar hidden={false} />
      <Login
        navHome={() => navigation.navigate('Home')}
      />
    </View>
  );
}

function CustomTitle() {
  return (
    <CircularProgress />
  )
}

function Logout(navigate) {
  auth()
    .signOut()
    .then(() => navigate);
}

function AccountSettingsScreen() {
  return (
     <AccountSettings/>
  );

}

class App extends Component {


  render(props) {
    return (

      <View style={{ flex: 1, backgroundColor: '#292d3e' }}>

        <NavigationContainer theme={DarkTheme}>

          <Stack.Navigator theme={DarkTheme} mode="modal" initialRouteName="Login">

            <Stack.Screen name="Home" component={HomeScreen}
              options={({ navigation, route }) => ({
                orientation: 'portrait',
                title: 'Olá, ' + Globais.user,
                statusBarColor: '#192b49',
                headerLeft: (props) => <CustomTitle {...props} />,
                headerRight: () => (<View style={{ marginRight: -15, flexDirection: 'row' }}><IconButton style = {{marginRight: -10}}icon='account-cog-outline' iconColor='white' size={26} onPress={() => { navigation.navigate('accountsSettings') }} /><IconButton icon='logout' iconColor='white' size={26} onPress={() => { Logout(navigation.navigate('Login')) }} /></View>),
                headerStyle: {
                  backgroundColor: colors.BLUE_GREY_,
                  cardOverlayEnable: false,
                },
                headerTitleStyle: {
                  fontSize: 16,
                  fontFamily: 'Lato-Regular',
                },
              })} />

            <Stack.Screen name="Registro de Recebimento" component={RegRecebimentoScreen} options={{
              orientation: 'portrait',
              title: 'Registro de Recebimento',
              statusBarColor: '#192b49',
              headerStyle: {
                backgroundColor: colors.BLUE_GREY_,
                cardOverlayEnable: false
              },
              headerTitleStyle: {
                fontSize: normalize(18),
                fontFamily: 'Lato-Regular',
              },
            }} />
            <Stack.Screen name="Registro de Abastecimento" component={RegAbastecimentoScreen}
              options={{
                orientation: 'portrait',
                title: 'Registro de Abastecimento',
                statusBarColor: '#192b49',
                headerStyle: {
                  backgroundColor: colors.BLUE_GREY_,
                },
                headerTitleStyle: {
                  fontSize: normalize(18),
                  fontFamily: 'Lato-Regular',
                },
              }} />
            <Stack.Screen name="Lançamentos" component={ConsultaDados} options={{
              orientation: 'portrait',
              title: 'Lançamentos',
              statusBarColor: '#192b49',
              headerStyle: {
                backgroundColor: colors.BLUE_GREY_,
              },
              headerTitleStyle: {
                fontSize: normalize(18),
                fontFamily: 'Lato-Regular',
              },
            }} />
            <Stack.Screen name="Recebimento" component={ExibirRecebimentoScreen} options={{
              orientation: 'landscape',
              title: 'Recebimento',
              statusBarHidden: true,
              headerStyle: {
                backgroundColor: colors.BLUE_GREY_,
              },
              headerTitleStyle: {
                fontSize: normalize(18),
                fontFamily: 'Lato-Regular',
              },
            }} />
            <Stack.Screen name="Abastecimento" component={ExibirAbastecimentoScreen} options={{
              orientation: 'landscape',
              title: 'Abastecimento',
              statusBarHidden: true,
              headerStyle: {
                backgroundColor: colors.BLUE_GREY_,
              },
              headerTitleStyle: {
                fontSize: normalize(18),
                fontFamily: 'Lato-Regular',
              },
            }} />
            <Stack.Screen name="Estatisticas" component={ExibirEstatisticasScreen} options={{
              orientation: 'portrait',
              title: 'Estatísticas',
              statusBarHidden: true,
              headerStyle: {
                backgroundColor: colors.BLUE_GREY_,
              },
              headerTitleStyle: {
                fontSize: normalize(18),
                fontFamily: 'Lato-Regular',
              },
            }} />

            <Stack.Screen name="Login" component={LoginScreen} options={{
              orientation: 'portrait',
              headerShown: false,
              statusBarColor: colors.DARK_BLUE,
              //title: 'Login',
              headerStyle: {
                backgroundColor: colors.BLUE_GREY_,
              },
              headerTitleStyle: {
                fontSize: normalize(18),
                fontFamily: 'Lato-Regular',
              },
            }} />
            <Stack.Screen name="accountsSettings" component={AccountSettingsScreen} options={{
              orientation: 'portrait',
              statusBarColor: colors.DARK_BLUE,
              title: 'Gerenciamento de usuários',
              headerStyle: {
                backgroundColor: colors.BLUE_GREY_,
              },
              headerTitleStyle: {
                fontSize: normalize(18),
                fontFamily: 'Lato-Regular',
              },
            }} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

export default codePush(codePushOptions)(App);