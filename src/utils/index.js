export const formatEurAmount = (amount) => {
  if (amount === 0) {
    return "-";
  } else {
    return Number(amount).toLocaleString("fi-FI");
  }
};
