import Tweet from "../../../../../components/Tweet";
import { useGlobalSearchParams, useSearchParams } from "expo-router";
import { ActivityIndicator, Text } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useTweetsApi } from "../../../../../lib/api/tweets";

const TweetScreen = () => {
    const { id } = useSearchParams();
    const {getTweet} = useTweetsApi()

    const {data, error, isLoading} = useQuery({
        queryKey: ['tweet', id],
        queryFn:() => getTweet(id as string)
    })

    if(error){
        return (
            <Text>tweet {id} is not found!</Text>
        )
    }
    if(isLoading){
        return <ActivityIndicator/>
    }

    console.log(id)
    return (
        <Tweet tweet={data}/>
    )
}
export default TweetScreen;