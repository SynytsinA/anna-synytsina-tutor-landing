import styles from "./ReviewCard.module.css";

export const getGradientClass = (index: number) => {
  const classes = [
    styles.insta,
    styles.indigoPink,
    styles.cyanBlue,
    styles.amberRed,
    styles.violetFuchsia,
  ];
  return classes[index % classes.length];
};
