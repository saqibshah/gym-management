import { Flex, Table } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Actions from "../components/Actions";

const LoadingClientsPage = () => {
  const clients = [1, 2, 3, 4, 5];
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
            <Table.ColumnHeaderCell>Trainer</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Payment Status</Table.ColumnHeaderCell>
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
                <Skeleton count={3} />{" "}
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
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default LoadingClientsPage;
