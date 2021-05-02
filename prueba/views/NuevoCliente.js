import React, {useState,useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Headline, Button,Paragraph,Dialog,Portal } from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';

const NuevoCliente = ({navigation, route}) => {

    const {guardarConsultarAPI} = route.params;

    // campos formulario
    const [Nombre, guardarNombre] = useState('');
    const [Telefono, guardarTelefono] = useState('');
    const [Correo, guardarCorreo] = useState('');
    const [Empresa, guardarEmpresa] = useState('');
    const [alerta, guardarAlerta] = useState('false');

    //Detectar si estamos editando o no
    useEffect (() => {
        if(route.params.cliente){
            const {Nombre,Telefono,Correo,Empresa} = route.params.cliente;

            guardarNombre(Nombre);
            guardarTelefono(Telefono);
            guardarCorreo(Correo);
            guardarEmpresa(Empresa);
        }
    }, []);

    //almacena el cliente en la base de datos

    const guardarCliente  = async () => {

        //validar datos
        if(Nombre === '' || Telefono === '' || Correo === '' || Empresa === ''){
            guardarAlerta(true)
            return;
        }
        //Generar el cliente
        const cliente = {Nombre, Telefono,Empresa,Correo};
        console.log(cliente);

        //si estamos editando o creando un nuevo cliente
        if(route.params.cliente){

            const {id}= route.params.cliente;
            cliente.id = id;
            const url = `http://10.0.2.2:3000/clientes/${id}`;

            try {
                await axios.put(url, cliente);
            } catch (error) {
                console.log(error);
            }

        }else{
            //Guardar al cliente en una API
        try {
            //para android
            await axios.post('http://10.0.2.2:3000/clientes',cliente);
            
        } catch (error) {
            console.log(error);
        }
        }

        //Redireccionar
        navigation.navigate('Inicio');

        //Limpiar el formulario
        guardarNombre('');
        guardarTelefono('');
        guardarCorreo('');
        guardarEmpresa('');

        //cambiar a true para traernos el nuevo cliente
        guardarConsultarAPI(true);
    }

    return (

        <View style={globalStyles.contenedor}>

            <Headline style={globalStyles.titulo}>
                Añadir Nuevo Cliente
            </Headline>

            <TextInput
                label="Nombre"
                placeholder="juan"
                onChangeText={texto => guardarNombre(texto)}
                value={Nombre}
                style={styles.input}
            />
            <TextInput
                label="Telefono"
                placeholder="88888888"
                onChangeText={texto => guardarTelefono(texto)}
                value={Telefono}
                style={styles.input}
            />
            <TextInput
                label="Correo"
                placeholder="Correo@correo.com"
                onChangeText={texto => guardarCorreo(texto)}
                value={Correo}
                style={styles.input}
            />
            <TextInput
                label="Empresa"
                placeholder="Nombre Empresa"
                onChangeText={texto => guardarEmpresa(texto)}
                value={Empresa}
                style={styles.input}
            />

            <Button icon="pencil-circle" mode="contained" onPress={() => guardarCliente()} >
                Guardar Cliente
            </Button>

            <Portal>
                <Dialog
                visible={alerta}
                onDismiss= {() => guardarAlerta (false)}
                >
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Todos los campos son obligatorios</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => guardarAlerta(false)} >OK</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 20,
        backgroundColor: 'transparent'
    }

})

export default NuevoCliente;