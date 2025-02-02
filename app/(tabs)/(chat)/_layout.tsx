import React from "react";
import { Stack } from "expo-router";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { FloatingAction } from "react-native-floating-action";

export default function ChatLayout() {
    return (
        <Stack>
            <Stack.Screen 
                name="chat" 
                options={{ headerShown: false }} 
            />
        </Stack>
    );
}

const styles = StyleSheet.create({
    floatingButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: 'blue',
        borderRadius: 50,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5, // for shadow on Android
        shadowColor: 'rgba(0, 0, 0, 0.25)', // for shadow on iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    buttonText: {
        color: 'white',
        fontSize: 24,
    }
});
