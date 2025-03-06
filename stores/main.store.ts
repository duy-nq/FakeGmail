import TabType from "@/types/tab.type";
import {create} from "zustand";
import {collection, doc, getDocs, query, where} from "firebase/firestore";
import { database } from "../firebase"

interface MainStore {
  tabs: TabType[];
  setMainStore: <T extends keyof MainStore>(key: T, value: MainStore[T]) 
    => void;
}

export const useMainStore = create<MainStore>((set) => ({
  tabs: [],
  setMainStore(key, value) {
    set({ 
      [key]: value,
    });
  },
}));