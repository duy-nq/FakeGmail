import { Animated, StyleSheet, View } from "react-native";
import CustomSearchBar from "@/components/search/SearchBar";
import { useScrollContextMail } from "@/contexts/ScrollContextMail";

export default function AnimatedSearchBar() {
    const { searchBarTranslateY } = useScrollContextMail();

    return (
        <Animated.View style={[styles.container, { transform: [{ translateY: searchBarTranslateY }] }]}>
            <CustomSearchBar />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        backgroundColor: "white",
    },
});