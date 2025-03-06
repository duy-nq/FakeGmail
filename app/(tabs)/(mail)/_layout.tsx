import FloatingButton from "@/components/buttons/FloatingButtonNew";
import AnimatedSearchBar from "@/components/search/AnimatedSearchBar";
import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function MailLayout() {
    return (
        <View style={styles.container}>
            <AnimatedSearchBar />
            <View style={styles.mailContainer}>
                <Stack>
                    <Stack.Screen name="index" options={{headerShown: false}} />
                </Stack>
            </View>
            <FloatingButton />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mailContainer: {
        flex: 1,
    },
});
