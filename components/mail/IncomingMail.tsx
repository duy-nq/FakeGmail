import { IONICONS_STAR, IONICONS_STAR_FOCUS } from "@/constants/iconConvension";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

type Props = {
    sender: string,
    title: string,
    content: string,
    timestamp: string,
    star?: boolean,
}

export default function IncomingMail() {
    const [isStarred, setIsStarred] = useState(false);

    // Function to handle icon toggle on press
    const toggleIcon = () => {
        setIsStarred((prev) => !prev);  // Toggle the state value
    };
    
    return (
        <View style={styles.container}>
            <Image
                style={styles.avatar}
                source={
                    {
                        uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }
                }
            />
            <View style={styles.mailContainer}>
                <View style={styles.mail}>
                    <Text style={styles.sender} numberOfLines={1} ellipsizeMode="tail">Coursera</Text>
                    <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">Welcome to the Google UX Design auwdh awudh uaw uawdh uawd huawd huawdh auw!</Text>
                    <Text style={styles.content} numberOfLines={1} ellipsizeMode="tail">Hi</Text>
                </View>
                <View style={styles.addition}>
                    <Text>1 Th2</Text>
                        <TouchableOpacity onPress={toggleIcon}>
                    {/* Render the icon based on the state */}
                    <Icon 
                        name={isStarred ? IONICONS_STAR : IONICONS_STAR_FOCUS} 
                        size={20} 
                        color={isStarred ? "#786768" : "#B05E62"} 
                    />
                </TouchableOpacity>                
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "flex-start",
        paddingVertical: 15,
    },
    avatar: {
        height: 50,
        width: 50,
        borderRadius: 50,
        marginHorizontal: 12,
    },
    mailContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginRight: 12,
        flex: 1,
    },
    addition: {
        maxWidth: 50,
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "space-between",

    },
    mail: {
        alignSelf:"center",
        justifyContent: "space-between",
        flex: 1,
    },
    sender: {
        fontSize: 18,
        fontWeight: 600,
    },
    title: {
        fontSize: 14,
        fontWeight: 600,
    },
    content: {
        fontSize: 14,
        color: "gray",
    },
    timestamp: {
        fontSize: 14,
        color: "gray"
    }
});