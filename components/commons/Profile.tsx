import { COLOR_FONT_BOLD, COLOR_FONT_NORMAL } from "@/constants/color";
import { Image, StyleSheet, Text, View } from "react-native";

type Props = {
    name: string,
    email: string,
    imageUrl?: string,
    unread: number
}

export default function Profile ({ name, email, imageUrl, unread } : Props) {   
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
                    <Text 
                        style={[styles.sender, styles.read]} 
                        numberOfLines={1} 
                        ellipsizeMode="tail"
                    >
                        {name}
                    </Text>
                    <Text 
                        style={[styles.title, styles.read]} 
                        numberOfLines={1} 
                        ellipsizeMode="tail"
                    >
                        {email}
                    </Text>
                </View>
                <View style={styles.addition}>
                    <Text style={styles.title}>{unread === 0 ? "" : unread <= 99 ? unread : "99+"}</Text>                
                </View>
            </View>
        </View>
    );
};

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "flex-start",
        paddingVertical: 15,
    },
    avatar: {
        height: 40,
        width: 40,
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
        alignSelf: "flex-end",
    },
    mail: {
        alignSelf:"center",
        justifyContent: "space-between",
        flex: 1,
        gap: 2,
    },
    sender: {
        fontSize: 16,
    },
    title: {
        fontSize: 12,
    },
    read: {
        color: COLOR_FONT_NORMAL,
    }
});