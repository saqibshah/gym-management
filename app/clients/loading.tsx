import { Flex, Table } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import authOptions from "../auth/authOptions";

const LoadingClientsPage = async () => {
  const clients = [1, 2, 3, 4, 5];
  const session = await getServerSession(authOptions);
  return (
    <div>
      <Flex mb="5" justify="between">
        <Skeleton width={165} height={32} />
        <Skeleton width={127} height={32} />
      </Flex>

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Sr #</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Client Details</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Category</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Fee</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Shift</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Payment Status</Table.ColumnHeaderCell>
            {session && (
              <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
            )}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {clients.map((client) => (
            <Table.Row key={client}>
              <Table.Cell>
                {" "}
                <Skeleton />{" "}
              </Table.Cell>
              <Table.Cell>
                {" "}
                <Skeleton count={4} />{" "}
              </Table.Cell>
              <Table.Cell>
                {" "}
                <Skeleton />{" "}
              </Table.Cell>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
              {session && (
                <Table.Cell>
                  <Flex direction="column" gap="4">
                    <Skeleton height={32} />
                    <Skeleton height={32} />
                    <Skeleton height={32} />
                  </Flex>
                </Table.Cell>
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default LoadingClientsPage;
