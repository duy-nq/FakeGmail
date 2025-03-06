import { database } from "@/firebase";
import Email from "@/types/email.type";
import { collection, getDocs, query, where } from "firebase/firestore";
import { create } from "zustand";

interface EmailStore {
  emails: Email[];
  setEmailStore: <T extends keyof EmailStore>(key: T, value: EmailStore[T]) 
    => void;
  fGetEmails: () => Promise<boolean>;
}

export const useEmailStore = create<EmailStore>((set) => ({
  emails: [],
  setEmailStore(key, value) {
    set({ 
      [key]: value,
    });
  },
  fGetEmails: async () => {
    try {     
      const mailsRef = collection(database, "emails");
      const q = query(mailsRef, where("isRead", "==", false));

      const querySnapshot = await getDocs(q);

      const queryData = querySnapshot.docs.map((email) => ({
        id: email.id,
        ...email.data(),
      })) as Email[];

      set({ emails: queryData });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
}));