// app/libs/formatMoney.ts
export const formatMoney = (
  amount: number,
  currency: string = "PKR",
  locale: string = "en-PK"
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0, // no decimal places for PKR
  }).format(amount);
};
