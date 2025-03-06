import { createContext, useContext, useState } from "react";

import { ReactNode } from "react";

const ModalContext = createContext<{
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
} | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ModalContext.Provider value={{ modalVisible, setModalVisible }}>
      {children}
    </ModalContext.Provider>
  );
};

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error(
      "useModalContext must be used within a ModalProvider"
    );
  }
  return context;
};