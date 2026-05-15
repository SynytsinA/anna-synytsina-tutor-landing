import { Briefcase, GraduationCap, Building2 } from "lucide-react";
import React from "react";

export const getStatIcon = (index: number): React.ReactElement => {
  switch (index) {
    case 0:
      return <Briefcase size={24} className="text-primary" />;
    case 1:
      return <GraduationCap size={24} className="text-secondary" />;
    case 2:
      return <Building2 size={24} className="text-accent" />;
    default:
      return <Briefcase size={24} />;
  }
};
