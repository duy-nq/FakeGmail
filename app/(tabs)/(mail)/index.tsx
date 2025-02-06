import React, { useState, useEffect, useRef } from "react";
import { Stack } from "expo-router";
import { StyleSheet, View, ScrollView, RefreshControl, Animated } from "react-native";
import IncomingMail from "@/components/mail/IncomingMail";
import { COLOR_GOOGLE_BLUE, COLOR_GOOGLE_GREEN, COLOR_GOOGLE_RED, COLOR_GOOGLE_YELLOW } from "@/constants/color";
import { mockEmails } from "@/constants/mailData";
import CustomSearchBar from "@/components/search/SearchBar";
import { transform } from "@babel/core";
import FloatingButton from "@/components/buttons/FloatingButton";

export default function MailLayout() {
    const [refreshing, setRefreshing] = useState(false);
    const [spinnerColor, setSpinnerColor] = useState(COLOR_GOOGLE_GREEN); // Initial color
    const [isExpanded, setisExpanded] = useState(false);
    const [oldOffsetY, setOldOffsetY] = useState(0);

    const scrollY = useRef((new Animated.Value(0))).current;

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

    const translateY = scrollY.interpolate({
        inputRange: [0, 1000],
        outputRange: [0, -60], // Adjust to match search bar height
        extrapolate: "clamp",
      });
      
      // Reduce top padding dynamically
      const paddingTop = scrollY.interpolate({
        inputRange: [0, 1000],
        outputRange: [0, 0], // Adjust to shift elements up
        extrapolate: "clamp",
      });

    return (
        <View style={styles.viewStyle}>
            <Animated.ScrollView
                contentContainerStyle={[styles.scrollViewContent]}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[COLOR_GOOGLE_GREEN, COLOR_GOOGLE_BLUE, COLOR_GOOGLE_RED, COLOR_GOOGLE_YELLOW]} // Android: Array of colors
                        tintColor={spinnerColor} // iOS: Dynamically change color
                    />
                }
                onScroll={(event) => {
                    const yOffset = event.nativeEvent.contentOffset.y > 0 ? event.nativeEvent.contentOffset.y : 0

                    if (yOffset > oldOffsetY) {
                        setisExpanded(false);
                    } else if (yOffset < oldOffsetY) {
                        setisExpanded(true);
                    } else if (yOffset < 0) {
                        setisExpanded(true);
                    }

                    setOldOffsetY(yOffset);
                    scrollY.setValue(yOffset);
                }}
                scrollEventThrottle={30}
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
            </Animated.ScrollView>
            <FloatingButton expand={isExpanded}/>
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