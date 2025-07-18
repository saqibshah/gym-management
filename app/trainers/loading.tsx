import { Table } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Actions from "../components/Actions";

const LoadingClientsPage = () => {
  const clients = [1, 2, 3, 4, 5];

  const TableHeader = () => {
    const columns = ["Sr#", "Name", "Shift", "Specialization", "Actions"];
    return (
      <Table.Header>
        <Table.Row>
          {columns.map((column, idx) => (
            <Table.ColumnHeaderCell key={idx + 1}>
              {column}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
    );
  };

  return (
    <div>
      <Actions href="/trainers/new" title="Add New Trainer" />
      <Table.Root variant="surface">
        <TableHeader />
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
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default LoadingClientsPage;
