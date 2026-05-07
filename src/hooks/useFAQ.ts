import { useState } from "react";

import { useLanguage } from "@/context/LanguageContext";

export const useFAQ = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return {
    t: t.faq,
    openIndex,
    toggleItem,
  };
};
