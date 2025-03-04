import BottomNavigation from "@/components/commons/BottomNavigation";
import { IONICONS_MAIL, IONICONS_MEET, IONICONS_MAIL_FOCUS, IONICONS_MEET_FOCUS, MATERIALICONS_CHAT, MATERIALICONS_CHAT_FOCUS } from "@/constants/iconConvension";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";

const tabs = [
    {
        label: "Mail",
        icon: <Icon name={IONICONS_MAIL} size={28} />,
        iconFocused: <Icon name={IONICONS_MAIL_FOCUS} size={28} />,
        to: "(mail)",
        unread: 100,
    },
    {
        label: "Chat",
        icon: <MaterialIconsIcon name={MATERIALICONS_CHAT} size={28} />,
        iconFocused: <MaterialIconsIcon name={MATERIALICONS_CHAT_FOCUS} size={28} />,
        to: "(chat)",
        unread: 2,
    },
    {
        label: "Meet",
        icon: <Icon name={IONICONS_MEET} size={28} />,
        iconFocused: <Icon name={IONICONS_MEET_FOCUS} size={28} />,
        to: "(meet)",
        unread: 4,
    },
];

export default function TabsLayout() {
	return (
		<View style={styles.container}>
				<BottomNavigation tabs={tabs} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
			flex: 1,
			backgroundColor: "white",
	},
});