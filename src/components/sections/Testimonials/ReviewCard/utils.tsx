export const getGradientClass = (index: number) => {
  const classes = [
    "bg-[linear-gradient(45deg,#f09433_0%,#e6683c_25%,#dc2743_50%,#cc2366_75%,#bc1888_100%)]",
    "bg-gradient-to-br from-indigo-600 to-pink-500",
    "bg-gradient-to-br from-cyan-500 to-blue-500",
    "bg-gradient-to-br from-amber-500 to-red-500",
    "bg-gradient-to-br from-violet-500 to-fuchsia-500",
  ];
  return classes[index % classes.length];
};
