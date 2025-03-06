import { Slot } from "expo-router";
import { useEffect } from "react";
import { ScrollProvider } from "@/contexts/ScrollContextMail";
import { useEmailStore } from "@/stores/email.store";
import { ModalProvider } from "@/contexts/ModalContext";

export default function RootLayout() {
	const { fGetEmails } = useEmailStore();

	const fetchData = async () => {
		await fGetEmails();
	};

	useEffect(() => {
			fetchData();
	}, []);
	
	return (
	<ScrollProvider>
		<ModalProvider>
			<Slot />
		</ModalProvider>
	</ScrollProvider>
	);
}