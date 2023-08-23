import React from 'react'
import { View, Text, Button} from 'react-native';
import { useAuth } from '../../context/AuthContext';

 const Bookmarks = () => {
  const {removeAuthToken} = useAuth();
  return (
    <View>
        <Text>Bookmarks</Text>
        <Button title='Logout' onPress={removeAuthToken}/>
    </View>
  )
}
export default Bookmarks;
