import React, { useState, useEffect } from "react";
import { Stack } from "expo-router";
import { StyleSheet, View, ScrollView, RefreshControl } from "react-native";
import IncomingMail from "@/components/mail/IncomingMail";
import { COLOR_GOOGLE_BLUE, COLOR_GOOGLE_GREEN, COLOR_GOOGLE_RED, COLOR_GOOGLE_YELLOW } from "@/constants/color";
import { mockEmails } from "@/constants/mailData";
import CustomSearchBar from "@/components/search/SearchBar";

export default function MailLayout() {
    const [refreshing, setRefreshing] = useState(false);
    const [spinnerColor, setSpinnerColor] = useState(COLOR_GOOGLE_GREEN); // Initial color

    // Simulate a refresh action
    const onRefresh = () => {
        setRefreshing(true);
        startColorAnimation(); // Start color animation
        // Simulate an async operation (e.g., fetching new data)
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    };

    // Function to animate the spinner color
    const startColorAnimation = () => {
        const colors = [COLOR_GOOGLE_GREEN, COLOR_GOOGLE_BLUE, COLOR_GOOGLE_RED, COLOR_GOOGLE_YELLOW];
        let index = 0;

        const interval = setInterval(() => {
            if (!refreshing) {
                clearInterval(interval); // Stop the animation when refreshing is done
                return;
            }
            setSpinnerColor(colors[index]);
            index = (index + 1) % colors.length; // Cycle through the colors
        }, 500); // Change color every 500ms
    };

    return (
        <View style={styles.viewStyle}>
            <Stack>
                <Stack.Screen 
                    name="index" 
                    options={{
                        headerShown: false
                    }}      
                />
            </Stack>
            <ScrollView
                contentContainerStyle={styles.scrollViewContent}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[COLOR_GOOGLE_GREEN, COLOR_GOOGLE_BLUE, COLOR_GOOGLE_RED, COLOR_GOOGLE_YELLOW]} // Android: Array of colors
                        tintColor={spinnerColor} // iOS: Dynamically change color
                    />
                }
            >
                <CustomSearchBar />
                {mockEmails.map((email, index) => (
                    <IncomingMail
                        key={index}
                        sender={email.sender}
                        title={email.title}
                        content={email.content}
                        timestamp={email.timestamp}
                        star={email.star}
                        unread={email.unread}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 90 // Optional: Add padding to avoid overlap with FloatingButton
    },
    componentStyle: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    }
});