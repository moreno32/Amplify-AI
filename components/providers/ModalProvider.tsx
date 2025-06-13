"use client";

import { useEffect, useState } from "react";
import { CreateCampaignModal } from "@/components/modals/CreateCampaignModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateCampaignModal />
    </>
  );
}; 