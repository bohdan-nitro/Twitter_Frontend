import { View, Text, Image, StyleSheet, Pressable} from "react-native";
import tweets from "@/assets/data/tweets";
import { TweetType } from "../types";
import { Entypo, EvilIcons } from "@expo/vector-icons";
import { IconButton } from "./IconButton";
import { Link } from "expo-router";

type TweetProps = {
    tweet: TweetType
}

const Tweet = ({ tweet }: TweetProps) => {
    return (
        <Link href={`/feed/tweet/${tweet.id}`} asChild>
        <Pressable style={styles.container}>
            <Image src={tweet.user.image} style={styles.userImage} />

            <View style={styles.mainContainer}>
                <View style={styles.row}>
                    <Text style={styles.name}>{tweet.user.name}</Text>
                    <Text style={styles.username}>{tweet.user.username}  2h</Text>
                    <Entypo name="dots-three-horizontal" size={16} color={"gray"} style={{ marginLeft: "auto" }} />
                </View>

                <Text style={styles.content}>{tweet.content}</Text>

                {tweet.image ? <Image src={tweet.image} style={styles.image} /> : null}

                <View style={styles.footer}>
                    <IconButton icon="comment" text={tweet.numberOfComments}/>
                    <IconButton icon="retweet" text={tweet.numberOfRetweets}/>
                    <IconButton icon="heart" text={tweet.numberOfLikes}/>
                    <IconButton icon="chart" text={tweet.impressions || 0}/>
                    <IconButton icon="share-apple"/>
                </View>
            </View>

        </Pressable>
        </Link>
    )

}

export default Tweet;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingHorizontal: 20,
        borderBottomColor: "lightgrey",
        borderBottomWidth: StyleSheet.hairlineWidth,
        paddingVertical: 12
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    mainContainer: {
        marginLeft: 10,
        flex: 1
    },
    name: {
        fontWeight: "700"
    },
    content: {
        lineHeight: 20,
        marginTop: 5
    },
    image: {
        width: "100%",
        aspectRatio: 16 / 9,
        marginTop: 10,
        borderRadius: 10
    },
    row: {
        flexDirection: "row"
    },
    username: {
        marginLeft: 5,
        color: "gray"
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    iconContainer: {
        flexDirection: "row",
        marginTop: 10,
        alignItems: "center",
      
    }

});