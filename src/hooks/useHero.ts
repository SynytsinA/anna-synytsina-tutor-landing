import { useCallback } from "react";

import { useLanguage } from "@/context/LanguageContext";

export const useHero = () => {
  const { t } = useLanguage();

  const handleScroll = useCallback((id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const titleStartString = t.hero.titleStart || "";
  const firstSpaceIndex = titleStartString.indexOf(" ");

  let firstWord = titleStartString;
  let restOfTitle = "";

  if (firstSpaceIndex !== -1) {
    firstWord = titleStartString.substring(0, firstSpaceIndex);
    restOfTitle = titleStartString.substring(firstSpaceIndex);
  }

  return {
    t,
    handleScroll,
    firstWord,
    restOfTitle,
  };
};
