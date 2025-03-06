import { Slot } from "expo-router";
import { useEffect } from "react";
import { ScrollProvider } from "@/contexts/ScrollContextMail";
import { ModalProvider } from "@/contexts/ModalContext";
import { useMainStore } from "@/stores/main.store";
import { useEmailStore } from "@/stores/email.store";
export default function RootLayout() {
	const { mainEmail, fGetOthers, fGetProfile } = useMainStore();
	const { fGetEmails } = useEmailStore();

	const fetchData = async () => {
    try {
      await Promise.all([
        fGetProfile(mainEmail),
        fGetOthers(mainEmail)
      ]);
      
      await fGetEmails();
      
      return true;
    } catch (error) {
      console.log('Login error:', error);
      return false;
    }
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