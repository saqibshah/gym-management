import { prisma } from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ClientDetails from "./ClientDetails";
import EditClientButton from "./EditClientButton";
import DeleteClientButton from "./DeleteClientButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

interface Props {
  params: Promise<{ id: string }>;
}

const ClientDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  const client = await prisma.client.findUnique({
    where: { id: parseInt((await params).id) },
  });

  if (!client) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <ClientDetails client={client} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <EditClientButton id={client.id} />
            <DeleteClientButton id={client.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default ClientDetailPage;
