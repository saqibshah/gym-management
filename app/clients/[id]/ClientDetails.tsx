import { ClientGenderBadge } from "@/app/components";
import { Client } from "@prisma/client";
import { Flex, Heading } from "@radix-ui/themes";

const ClientDetails = ({ client }: { client: Client }) => {
  return (
    <>
      <Heading>{client.name}</Heading>
      <Flex gap="3" align="center" my="2">
        <ClientGenderBadge gender={client.gender} />
      </Flex>
      <p>{client.contact}</p>
      <p>{client.category}</p>
      <p>{client.fee}</p>
      <p>{client.shift}</p>
    </>
  );
};

export default ClientDetails;
