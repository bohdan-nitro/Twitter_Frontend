import { Link } from "expo-router";
import { View, Text, StyleSheet, Image, TextInput, Pressable, ActivityIndicator } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTweetsApi } from "../lib/api/tweets";

export default function NewTweet() {
    const [text, setText] = useState<string>("");
    const router = useRouter();

    const queryClient = useQueryClient();

    const {createTweet} = useTweetsApi()

    const {mutateAsync, isError, isLoading, error} = useMutation({
        mutationFn: createTweet,

        
        onSuccess: (data) => {
            //Позволяет нам сделать обновление списка после мутации данныех то есть когда добавили новый твит произойдет запрос на все твиты что позволит взять новые твиты в том числе
            // queryClient.invalidateQueries({queryKey: ["tweets"]})

            //Или же мы можем брать и апдейтить не все твиты а только конкретный добавленный
            queryClient.setQueriesData(["tweets"], (existingTweets) => {
                return [data, ...existingTweets]

            })

        }
    })

    const user = {
        id: 'u1',
        username: 'VadimNotJustDev',
        name: 'Vadim',
        image:
            'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.png',
    }

    const onTweetPress = async () => {
        try{
            await mutateAsync({content: text});
            setText("")
            router.back()
        } catch(e:any){
            console.log("error: " + e.message)
        }
        
    }
    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
            <Link style={{fontSize: 20}} href={"../"}>Cancel</Link>
            <Pressable style={styles.button} onPress={onTweetPress}>
                <Text style={styles.btnText}>Tweet</Text>
            </Pressable>
            </View>
            {isLoading && <ActivityIndicator/>}
            <View style={styles.inputContainer}>
                <Image style={styles.image} src={user.image} />
                <TextInput value={text} onChangeText={(value) => setText(value)} style={{flex: 1}} placeholder="Whats happened?" multiline numberOfLines={5}/>
            </View>
        {isError && <Text>Error: {error?.message}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 50,
        aspectRatio: 1,
        borderRadius: 50,
        marginRight: 10
    },
    container: {
        padding: 15,
        backgroundColor: "#fff",
        flex: 1
    },
    inputContainer: {
        flexDirection: "row"
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
        alignItems: "center"
    },
    button:{
        backgroundColor: "#1C9BF0",
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 15
    },
    btnText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16
    }
})