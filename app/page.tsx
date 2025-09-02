import { Grid } from "@radix-ui/themes";
import LatestClients from "./LatestClients";
import RecentPayments from "./RecentPayments";

export default function Home() {
  return (
    <Grid columns={{ initial: "1", sm: "2" }} gap="5">
      <LatestClients />
      <RecentPayments />
    </Grid>
  );
}

export const dynamic = "force-dynamic";
