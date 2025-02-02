import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Int32 } from "react-native/Libraries/Types/CodegenTypes";

type Props = {
    iconName: string,
    color?: string,
    notification?: Int32,
}

export default function IconButton({ iconName, color, notification } : Props) {
    return (
        <View style={styles.container}>
            <Icon name={iconName} size={28} color={color ? color : "#900"}/>
            {
                notification && notification != 0 ? 
                notification <= 99 ? 
                    <Text style={[styles.notification, { right: -12 }]}>
                        {notification}
                    </Text> 
                    :
                    <Text style={[styles.notification, { right: -18 }]}>
                        99+
                    </Text> 
                : <></>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "relative", // Ensure the container is the reference point for absolute positioning
    },
    notification: {
        position: "absolute",
        top: -4,       // Adjust this to move it upwards or downwards
        right: -12,     // Adjust this to move it left or right
        width: "auto",
        height: 16,
        borderRadius: 12,
        backgroundColor: "#900",
        color: "white",
        fontSize: 12,
        fontWeight: "600",
        lineHeight: 16,
        textAlign: "center",
        textAlignVertical: "center",
        paddingInline: 4,
        minWidth: 22,
        maxWidth: 32,
        letterSpacing: 0.25,
    }
});
