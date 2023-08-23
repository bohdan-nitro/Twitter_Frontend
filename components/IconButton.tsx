import { View, Text, StyleSheet } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

type IconButtonProp = {
    icon: React.ComponentProps<typeof EvilIcons>["name"];
    text?: string | number;
}

export const IconButton = ({icon, text}: IconButtonProp) => {
    return (
        <View style={styles.iconContainer}>
            <EvilIcons size={22} name={icon} color={"gray"} />
            <Text style={{ fontSize: 12, color: "gray" }}>{text}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    iconContainer: {
        flexDirection: "row",
        marginTop: 10,
        alignItems: "center",
    }

});