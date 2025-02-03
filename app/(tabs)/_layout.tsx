import { COLOR_BAR } from "@/constants/color";
import { IONICONS_MAIL, IONICONS_MEET, IONICONS_MAIL_FOCUS, IONICONS_MEET_FOCUS, MATERIALICONS_CHAT, MATERIALICONS_CHAT_FOCUS } from "@/constants/iconConvension";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons"

export default function TabsLayout() {
    const numberOfUnread = {
        mail: 100,
        chat: 5,
        meet: 4,
    }

    return (
        <Tabs>
            <Tabs.Screen 
                name="(mail)"
                options={
                    {
                        headerShown: false,
                        tabBarIcon: ({ focused }) => focused ? 
                            <Icon name={IONICONS_MAIL_FOCUS} size={28} /> : 
                            <Icon name={IONICONS_MAIL} size={28} />,
                        tabBarShowLabel: false,
                        tabBarBadge: numberOfUnread.mail == 0 ? undefined : numberOfUnread.mail <= 99 ? numberOfUnread.mail : "99+",
                        tabBarBadgeStyle: numberOfUnread.mail <= 99 ? [styles.bagdeStyle, {width: 22}] : [styles.bagdeStyle, {width: 28}],
                        tabBarItemStyle: styles.tabBarItemStyle
                    }
                }
            />
            <Tabs.Screen 
                name="(chat)"
                options={
                    {
                        headerShown: false,
                        tabBarIcon: ({ focused }) => focused ? 
                            <MaterialIconsIcon name={MATERIALICONS_CHAT_FOCUS} size={28} /> : 
                            <MaterialIconsIcon name={MATERIALICONS_CHAT} size={28} />,
                        tabBarShowLabel: false,
                        tabBarBadge: numberOfUnread.mail == 0 ? undefined : numberOfUnread.mail <= 99 ? numberOfUnread.mail : "99+",
                        tabBarBadgeStyle: numberOfUnread.mail <= 99 ? [styles.bagdeStyle, {width: 22}] : [styles.bagdeStyle, {width: 28}],
                        tabBarItemStyle: styles.tabBarItemStyle
                    }
                }
            />
            <Tabs.Screen 
                name="(meet)"
                options={
                    {
                        headerShown: false,
                        tabBarIcon: ({ focused }) => focused ? 
                            <Icon name={IONICONS_MEET_FOCUS} size={28} /> : 
                            <Icon name={IONICONS_MEET} size={28} />,
                        tabBarShowLabel: false,
                        tabBarBadge: numberOfUnread.meet == 0 ? undefined : numberOfUnread.meet <= 99 ? numberOfUnread.meet : "99+",
                        tabBarBadgeStyle: numberOfUnread.meet <= 99 ? [styles.bagdeStyle, {width: 22}] : [styles.bagdeStyle, {width: 28}],
                        tabBarItemStyle: styles.tabBarItemStyle
                    }
                }
            />
        </Tabs>
    );
};

const styles = StyleSheet.create({
    bagdeStyle: {
        top: -4,
        left: 18,
        height: 16,
        backgroundColor: "#900",
        color: "white",
        fontSize: 12,
        fontWeight: "700",
        lineHeight: 16,
        textAlign: "center",
        textAlignVertical: "center",
        letterSpacing: 0.25,
    },
    tabBarItemStyle: {
        alignContent: "space-around",
        paddingTop:5,
        backgroundColor: COLOR_BAR
    }
});