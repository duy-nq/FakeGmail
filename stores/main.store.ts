import TabType from "@/types/tab.type";
import {create} from "zustand";
import {collection, doc, getDocs, query, where} from "firebase/firestore";
import { database } from "../firebase"
import Profile from "@/types/profile.type";

interface MainStore {
  tabs: TabType[];
  mainEmail: string;
  profile: Profile;
  others: Profile[];
  setMainStore: <T extends keyof MainStore>(key: T, value: MainStore[T]) 
    => void;
  fGetProfile: (email: string) => Promise<boolean>;
  fGetOthers: (email: string) => Promise<boolean>;
}

export const useMainStore = create<MainStore>((set) => ({
  tabs: [],
  mainEmail: "namcua2104@gmail.com",
  profile: {
    id: "null",
    displayName: "",
    email: "",
    imageUrl: "",
    createdAt: new Date(),
  },
  others: [],
  setMainStore(key, value) {
    set({ 
      [key]: value,
    });
  },
  fGetProfile: async (email) => {
    try {
      const profileRef = collection(database, "users");
      const q = query(profileRef, where("email", "==", email));

      const querySnapshot = await getDocs(q);

      const queryData = querySnapshot.docs.map((profile) => ({
        id: profile.id,
        ...profile.data(),
      })) as Profile[];

      if (queryData.length === 0) {
        return false;
      }

      set({ profile: queryData[0] });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  fGetOthers: async (email) => {
    try {
      const profileRef = collection(database, "users");
      const q = query(profileRef, where("email", "!=", email));

      const querySnapshot = await getDocs(q);

      const queryData = querySnapshot.docs.map((profile) => ({
        id: profile.id,
        ...profile.data(),
      })) as Profile[];

      set({ others: queryData });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
}));