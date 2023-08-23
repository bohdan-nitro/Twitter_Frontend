import { StyleSheet, View, FlatList, Pressable, ActivityIndicator, Text } from 'react-native';
import Tweet from '../../../../components/Tweet';

import { Entypo } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useState, useEffect } from 'react';
import { useTweetsApi } from '../../../../lib/api/tweets';
import { useQuery } from '@tanstack/react-query';

// const tweet = tweets[0];

export default function TabOneScreen() {
  const [tweets, setTweets] = useState([]);

  const {listTweets} = useTweetsApi()

  const {data, isLoading, error} = useQuery({
    queryKey: ['tweets'],
    queryFn:listTweets
  })

  // useEffect(() => {
  //   const fetchTweets = async () => {
  //     const res = await listTweets();
  //     setTweets(res);
  //   }
  //   fetchTweets();
    
  // }, [])

  if(isLoading){
    return <ActivityIndicator/>
  }
  if(error){
    return <Text style={{color: "red"}}>{error.message}</Text>
  }

  return (
    <View style={styles.page}>
      <FlatList 
      data={data} 
      keyExtractor={item => item.id} 
      renderItem={({item}) => <Tweet tweet={item}/>}
      />
      <Pressable style={styles.floatingButton}>
      <Link href={"/new-tweet"} asChild>
        <Entypo  name='plus' size={24} color={"#fff"}/>
      </Link>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
   page: {
    flex: 1,
    backgroundColor: "#fff"
   },
   floatingButton:{
    backgroundColor: "#1C9BF0",
    width: 50,
    height: 50,
   justifyContent: "center",
   alignItems: "center",
    position: "absolute",
    bottom: 15,
    right: 15,
    borderRadius: 40
   }
});
