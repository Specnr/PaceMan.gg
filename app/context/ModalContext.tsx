"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";
import Modal from "@/components/Modal";

type ModalContextType = {
  showAuthModal: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const openAuthModal = () => setShowAuthModal(true);
  const closeAuthModal = () => setShowAuthModal(false);

  return (
    <ModalContext.Provider value={{ showAuthModal, openAuthModal, closeAuthModal }}>
      {children}
      {showAuthModal && <Modal onClose={closeAuthModal} />}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
} 