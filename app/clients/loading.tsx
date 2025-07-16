import { Table } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ClientActions from "./ClientActions";

const LoadingClientsPage = () => {
  const clients = [1, 2, 3, 4, 5];
  return (
    <div>
      <ClientActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Membership Number</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Contact</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Gender</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Category</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Fee</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Shift</Table.ColumnHeaderCell>
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
                <Skeleton />{" "}
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
