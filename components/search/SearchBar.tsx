import { COLOR_BAR, COLOR_FONT_BOLD, COLOR_FONT_NORMAL } from "@/constants/color";
import { TEXT_SEARCH_BAR } from "@/constants/en";
import { IONICONS_MENU } from "@/constants/iconConvension";
import { useState } from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";
import IonIcons from "react-native-vector-icons/Ionicons"

export default function CustomSearchBar() {
    const [searchQuery, setSearchQuery] = useState("");
    
    return (
        <View style={styles.container}>
            <IonIcons 
                name={IONICONS_MENU}
                size={26} 
                style={styles.iconMenu}
            />
            <View style={styles.input}>
                <TextInput 
                    placeholder={TEXT_SEARCH_BAR}
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                    style={styles.inputArea}
                />
            </View>
            <Image
                style={styles.profile}
                source={
                    {
                        uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginHorizontal: 12,
        height: 55,
        borderRadius: 60,
        marginVertical: 10,
        alignItems: "center",
        backgroundColor: COLOR_BAR
    },
    iconMenu: {
        marginLeft: 18,
        alignItems: "center",
    },
    input: {
        flex: 1,
        marginLeft: 12
    },
    inputArea: {
        fontSize: 18,
        color: COLOR_FONT_NORMAL,
    },
    profile: {
        height: 30,
        width: 30,
        borderRadius: 30,
        marginHorizontal: 12,
    }
});