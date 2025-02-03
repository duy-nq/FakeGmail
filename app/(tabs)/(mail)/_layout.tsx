import FloatingButton from "@/components/buttons/FloatingButton";
import CustomSearchBar from "@/components/search/SearchBar";
import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function MailLayout() {
    return (
        <View style={styles.viewStyle}>
            <Stack>
                <Stack.Screen 
                    name="index" 
                    options={
                        {
                            headerShown: false
                        }
                    }      
                />
            </Stack>
            <FloatingButton />
        </View>
    );
};

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
    } 
});
