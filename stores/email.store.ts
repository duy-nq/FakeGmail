import { database } from "@/firebase";
import Email from "@/types/email.type";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { create } from "zustand";

interface EmailStore {
  emails: Email[];
  setEmailStore: <T extends keyof EmailStore>(key: T, value: EmailStore[T]) 
    => void;
  fGetEmails: (email: string) => Promise<boolean>;
  fSendEmail: (email: Email) => Promise<string | null>;
}

export const useEmailStore = create<EmailStore>((set) => ({
  emails: [],
  setEmailStore(key, value) {
    set({ 
      [key]: value,
    });
  },
  fGetEmails: async (email) => {
    try {           
      const mailsRef = collection(database, "emails");
      const q = query(mailsRef, where("recipients", "array-contains", email));

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
  fSendEmail: async (email) => {
    const {id, ...emailData} = email;
    
    try {
      const mailsCollectionRef = collection(database, "emails");
      const mailRef = await addDoc(mailsCollectionRef, emailData);
      return mailRef.id;
    } catch (error) {
      console.log(error);
      return null;  
    }
  },
}));