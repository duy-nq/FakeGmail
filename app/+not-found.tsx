import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function NotFound() {
    return (
        <View>
            <Text>Okay! Nothing here!</Text>
            <Link href={"/(tabs)/mail"}>Back!</Link>
        </View>
    );
};