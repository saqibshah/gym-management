import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const ClientActions = () => {
  return (
    <div className="mb-4">
      <Button>
        <Link href="/clients/new">New Client</Link>
      </Button>
    </div>
  );
};

export default ClientActions;
