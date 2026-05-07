import { useLanguage } from "@/context/LanguageContext";

export const useServices = () => {
  const { t } = useLanguage();
  return {
    t: t.subjects,
    cards: t.subjects.cards || [],
  };
};
