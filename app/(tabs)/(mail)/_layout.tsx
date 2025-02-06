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
        </View>
    );
};

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
    } 
});
