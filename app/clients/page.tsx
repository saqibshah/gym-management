import { prisma } from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import ClientGenderBadge from "../components/ClientGenderBadge";
import ClientActions from "./ClientActions";
import Link from "../components/Link";

const ClientsPage = async () => {
  const clients = await prisma.client.findMany({
    include: {
      assignedTrainer: { select: { id: true, name: true } },
    },
    orderBy: { id: "asc" },
  });

  return (
    <div>
      <ClientActions />

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Sr #</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Contact</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Gender</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Category</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Fee</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Shift</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Trainer</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {clients.map((client) => (
            <Table.Row key={client.id}>
              <Table.Cell>{client.id}</Table.Cell>
              <Table.Cell>
                <Link href={`/clients/${client.id}`}>{client.name}</Link>
              </Table.Cell>
              <Table.Cell>{client.contact}</Table.Cell>
              <Table.Cell>
                <ClientGenderBadge gender={client.gender} />
              </Table.Cell>
              <Table.Cell>{client.category}</Table.Cell>
              <Table.Cell>{client.fee}</Table.Cell>
              <Table.Cell>{client.shift}</Table.Cell>
              <Table.Cell>
                {client.assignedTrainer ? client.assignedTrainer.name : "-"}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default ClientsPage;
