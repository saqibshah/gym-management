import authOptions from "@/app/auth/authOptions";
import { prisma } from "@/prisma/client";
import { Client } from "@prisma/client";
import { Button, Flex, Table, Text } from "@radix-ui/themes";
import { format } from "date-fns";
import { getServerSession } from "next-auth";
import Link from "next/link";
import DeleteButton from "../components/DeleteButton";
import EditButton from "../components/EditButton";
import GenderBadge from "../components/GenderBadge";
import { cycleMonths } from "../libs/cycleMonths";
import PaymentStatus from "./_components/PaymentStatus";
import ClientPaymentFilter from "./ClientPaymentFilter";

interface Props {
  searchParams: Promise<{ status: "all" | "paid" | "pending" }>;
}

type ClientWithStatus = Client & {
  assignedTrainer: { id: number; name: string } | null;
  groupClass: { name: string } | null;
  _count: { payments: number };
  paymentStatus?: "paid" | "pending";
};

const ClientsPage = async ({ searchParams }: Props) => {
  let clients: ClientWithStatus[] = await prisma.client.findMany({
    include: {
      assignedTrainer: { select: { id: true, name: true } },
      groupClass: { select: { name: true } },
      _count: {
        select: {
          payments: true,
        },
      },
    },
    orderBy: { id: "desc" },
  });

  // Add computed status to each client
  clients = clients.map((client) => {
    const { spanMonths } = cycleMonths(client.joinedAt);
    const pendingInvoices = spanMonths - client._count.payments;

    return {
      ...client,
      paymentStatus: pendingInvoices > 0 ? "pending" : "paid",
    };
  });

  const statusFilter = (await searchParams).status;

  // Filter by status if needed
  const validStatuses = ["paid", "pending"];
  if (validStatuses.includes(statusFilter)) {
    clients = clients.filter((client) => client.paymentStatus === statusFilter);
  }

  const session = await getServerSession(authOptions);

  const TableHeader = () => {
    return (
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Sr #</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Client Details</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Category</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Fee</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Shift</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Payment Status</Table.ColumnHeaderCell>
          {session && <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>}
        </Table.Row>
      </Table.Header>
    );
  };

  const TableBody = () => {
    return (
      <Table.Body>
        {clients.map((client) => {
          return (
            <Table.Row key={client.id}>
              <Table.Cell>{client.id}</Table.Cell>
              <Table.Cell>
                <Flex direction="column" gap="2">
                  <Text className="capitalize">{client.name}</Text>
                  <Text>
                    <GenderBadge gender={client.gender} />
                  </Text>
                  <Text>{client.contact}</Text>
                  <Text>
                    Joined: {format(new Date(client.joinedAt), "do MMM yyyy")}
                  </Text>
                </Flex>
              </Table.Cell>
              <Table.Cell>
                <Flex direction="column" gap="2">
                  <Text className="capitalize">{client.category}</Text>
                  {client.category == "personal" ? (
                    <Text>Trainer: {client.assignedTrainer?.name}</Text>
                  ) : client.category == "group" ? (
                    <Text>Class: {client.groupClass?.name}</Text>
                  ) : (
                    ""
                  )}
                </Flex>
              </Table.Cell>
              <Table.Cell>{client.fee}</Table.Cell>
              <Table.Cell className="capitalize">{client.shift}</Table.Cell>
              <Table.Cell>
                <PaymentStatus
                  joinedAt={client.joinedAt}
                  payments={client._count.payments}
                />
              </Table.Cell>
              {session && (
                <Table.Cell>
                  <Flex direction="column" gap="4">
                    <Button>
                      <Link href={`/clients/${client.id}/add-payment`}>
                        Record Payment
                      </Link>
                    </Button>
                    <EditButton
                      title="Edit Client"
                      href={`/clients/${client.id}/edit`}
                    />
                    <DeleteButton
                      id={client.id}
                      title="Delete Client"
                      path="clients"
                    />
                  </Flex>
                </Table.Cell>
              )}
            </Table.Row>
          );
        })}
      </Table.Body>
    );
  };

  return (
    <div>
      {/* <Actions href="/clients/new" title="Add New Client" /> */}

      <Flex mb="5" justify="between">
        <ClientPaymentFilter />
        <Button>
          <Link href="/clients/new">Add New Client</Link>
        </Button>
      </Flex>

      <Table.Root variant="surface">
        <TableHeader />
        <TableBody />
      </Table.Root>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default ClientsPage;
