import { Text } from "@radix-ui/themes";
import React, { PropsWithChildren } from "react";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;

  return (
    <Text color="red" as="div" mb="3" size="2">
      {children}
    </Text>
  );
};

export default ErrorMessage;
