import { Badge } from "@radix-ui/themes";

interface Props {
  color: "red" | "green" | "yellow";
  label: string;
}

const PaymentBadge = ({ color, label }: Props) => {
  return <Badge color={color}>{label}</Badge>;
};

export default PaymentBadge;
