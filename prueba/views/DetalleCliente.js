import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Headline, Subheading, Text, Button,FAB } from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';

const DetalleCliente = ({ navigation, route }) => {
    const { Nombre, Telefono, Correo, Empresa, id } = route.params.item;
    const { guardarConsultarAPI } = route.params;

    const mostrarConfirmacion = () => {
        Alert.alert(
            'Deseas Eliminar este cliente',
            'Un contacto eliminado no se puede recuperar',
            [
                { text: 'Si, Eliminar', onPress: () => eliminarContacto() },
                { text: 'Cancelar', style: 'cancel' }
            ]

        )
    }

    const eliminarContacto = async () => {
        const url = `http://10.0.2.2:3000/clientes/${id}`
        try {
            await axios.delete(url);
        } catch (error) {
            console.log(error);
        }

        //Redireccionar
        navigation.navigate('Inicio');

        //Volver a consultar la API
        guardarConsultarAPI(true);

    }

    return (
        <View style={globalStyles.contenedor}>



            <Headline style={globalStyles.titulo}>{Nombre}</Headline>
            <Text style={styles.texto}>Empresa: <Subheading>{Empresa}</Subheading></Text>
            <Text style={styles.texto}>Empresa: <Subheading>{Correo}</Subheading></Text>
            <Text style={styles.texto}>Empresa: <Subheading>{Telefono}</Subheading></Text>

            <Button style={styles.boton} mode="contained" icon="cancel"
                onPress={() => mostrarConfirmacion()}
            >
                Eliminar Cliente
</Button>

        <FAB
        icon = "pencil"
        style={globalStyles.fab}
        onPress={() => navigation.navigate("NuevoCliente",{cliente: route.params.item, guardarConsultarAPI}) }
        />

        </View>
    );
}
const styles = StyleSheet.create({
    texto: {
        marginBottom: 20,
        fontSize: 18
    },
    boton: {
        marginTop: 100,
        backgroundColor: 'red'
    }
})

export default DetalleCliente;