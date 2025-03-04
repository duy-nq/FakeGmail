import { Slot } from "expo-router";
import { View, StyleSheet } from "react-native";
import { useMainStore } from "@/stores/main.store";
import { useEffect } from "react";

export default function RootLayout() {
    const { fGetTabs } = useMainStore();

    const fetchData = async () => {
        await fGetTabs();
    };

    useEffect(() => {
        fetchData();
    }, []);
    
    return (
        <View style={styles.container}>
            <Slot />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
});