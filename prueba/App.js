import React from 'react';
import 'react-native-gesture-handler';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import Inicio from './views/Inicio';
import DetalleCliente from './views/DetalleCliente';
import NuevoCliente from './views/NuevoCliente';
import BarraSuperior from './componets/ui/Barra';


const Stact = createStackNavigator();

//definir el tema
const theme = {
  ...DefaultTheme,
  primary: '#1774F2',
  accent: '#0655BF',
  TextInput:'#1774F2'
}

const App = () => {

  return (
    <>
    <PaperProvider>
    <NavigationContainer>
      <Stact.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        headerStyle:{
          backgroundColor:theme.colors.primary
        },
        headerTintColor: theme.colors.surface,
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}
      >
        <Stact.Screen
        name="Inicio"
        component={Inicio}
        options= {({navigation,route}) => ({ 
          headerTitleAlign: 'center',

          headerLeft: (props) => <BarraSuperior {...props}
                            navigation={navigation}
                            route={route}
                            />

        })}

        /> 
        <Stact.Screen
        name="NuevoCliente"
        component={NuevoCliente}
        options ={{
          title:"Nuevo Cliente"
        }}
        /> 
        <Stact.Screen
        name="DetalleCliente"
        component={DetalleCliente}
        options ={{
          title:"Detalle Cliente"
        }}

        />        
      </Stact.Navigator>
    </NavigationContainer>
    </PaperProvider>

    </>
  );
};



export default App;
