import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native'
import React, {useState} from 'react';
import { useGlobalSearchParams, useSearchParams } from 'expo-router';
import { authenticate } from '../../lib/api/auth';
import { useAuth } from '../../context/AuthContext';

const Authenticate = () => {
    const [code, setCode] = useState('');

    const {email} = useSearchParams();

    const {updateAuthToken} = useAuth();

    console.log(email, "eamil")

    const onConfirm = async () => {
        if( typeof email !== "string"){
            return;
        }
        try {
            const res = await authenticate({email, emailToken: code })
            console.log(res)
            await updateAuthToken(res.autToken)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Confirm your email</Text>
      <TextInput onChangeText={(val) => setCode(val)} value={code} style={styles.input} placeholder='Email code'/>

      <Pressable onPress={onConfirm} style={styles.button}>
        <Text style={styles.buttonText}>Confirm</Text>
      </Pressable>
    </View>
  )
}

export default Authenticate;

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1,
      justifyContent: 'center',
      padding: 24,
    },
    label: {
      fontSize: 24,
      marginVertical: 5,
      color: 'gray',
    },
    error: {
      marginVertical: 5,
      color: 'red',
    },
    input: {
      borderColor: 'gray',
      borderWidth: StyleSheet.hairlineWidth,
      padding: 10,
      fontSize: 20,
      marginVertical: 5,
      borderRadius: 10,
    },
    button: {
      backgroundColor: '#050A12',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      marginVertical: 5,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });