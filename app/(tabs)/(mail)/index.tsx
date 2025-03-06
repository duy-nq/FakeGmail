import React, { useState } from "react";
import { StyleSheet, RefreshControl, Animated, FlatList, Text } from "react-native";
import IncomingMail from "@/components/mail/IncomingMail";
import { COLOR_GOOGLE_BLUE, COLOR_GOOGLE_GREEN, COLOR_GOOGLE_RED, COLOR_GOOGLE_YELLOW } from "@/constants/color";
import { mockEmails } from "@/constants/mailData";
import { useScrollContextMail } from "@/contexts/ScrollContextMail";

const colors = ["#34A853", "#4285F4", "#EA4335", "#FBBC05"]; // Google colors

export default function MailList() {
    const [refreshing, setRefreshing] = useState(false);
    const [spinnerColor] = useState(new Animated.Value(0)); // Animated value for color transition

    // Function to refresh mails
    const onRefresh = () => {
        setRefreshing(true);
        startColorAnimation(); // Start animation

        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    };

    // Function to animate spinner color
    const startColorAnimation = () => {
        Animated.loop(
            Animated.timing(spinnerColor, {
                toValue: colors.length - 1, // Cycle through all colors
                duration: 1500,
                useNativeDriver: false, // Required for backgroundColor animations
            })
        ).start();
    };

    const { scrollY } = useScrollContextMail();

    return (
        <FlatList 
            data={mockEmails}
            keyExtractor={item => item.content.toString()}
            renderItem={({ item }) => (
                <IncomingMail 
                    key={item.timestamp}
                    sender={item.sender}
                    title={item.title}
                    content={item.content}
                    timestamp={item.timestamp}
                    unread={item.unread}
                    star={item.star}
                />
            )}
            contentContainerStyle={styles.scrollViewContent}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: false }
            )}
            refreshControl={
                <RefreshControl 
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    progressViewOffset={100}
                    colors={[COLOR_GOOGLE_RED, COLOR_GOOGLE_BLUE, COLOR_GOOGLE_YELLOW, COLOR_GOOGLE_GREEN]}
                />
            }
            ListHeaderComponent={
                <Text style={{ textAlign: "left", padding: 12 }}>
                    Important
                </Text>
            }
        />
    );
};

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 90,
        paddingTop: 80,
        backgroundColor: '#fff',
    },
});