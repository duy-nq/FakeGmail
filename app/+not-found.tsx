import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function NotFound() {
    return (
        <View>
            <Text>Okay! Nothing here!</Text>
            <Link href={"/"}>Back!</Link>
        </View>
    );
};