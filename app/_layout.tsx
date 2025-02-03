import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen 
                name="(tabs)" 
                options={
                    {
                        headerShown: false
                    }
                }      
            />
            <Stack.Screen 
                name="+not-found" 
                options={
                    {
                        headerShown: false
                    }
                }
            />
        </Stack>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white"
    }
});