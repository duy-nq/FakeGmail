import BottomNavigation from "@/components/commons/BottomNavigation";
import { IONICONS_MAIL, IONICONS_MEET, IONICONS_MAIL_FOCUS, IONICONS_MEET_FOCUS } from "@/constants/iconConvension";
import { Alert, Animated, Modal, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useEmailStore } from "@/stores/email.store";
import { Slot } from "expo-router";
import { useModalContext } from "@/contexts/ModalContext";
import ProfileModal from "@/components/modals/ProfileModal";
import { useScrollContextMail } from "@/contexts/ScrollContextMail";


export default function TabsLayout() {
	const {emails} = useEmailStore();
	const { tabBarTranslateY } = useScrollContextMail();
	
	const tabs = [
		{
			label: "Mail",
			icon: <Icon name={IONICONS_MAIL} size={28} />,
			iconFocused: <Icon name={IONICONS_MAIL_FOCUS} size={28} />,
			to: "(mail)",
			unread: emails.length || 0,
		},
		{
			label: "Meet",
			icon: <Icon name={IONICONS_MEET} size={28} />,
			iconFocused: <Icon name={IONICONS_MEET_FOCUS} size={28} />,
			to: "(meet)",
			unread: 0,
		},
	];

	return (
		<View style={styles.container}>
			<ProfileModal />
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