import { Skeleton } from "@/app/components";
import { Box, Flex } from "@radix-ui/themes";

const LoadingDetailsPage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Flex gap="3" align="center" my="2">
        <Skeleton width="3rem" />
        <Skeleton width="5rem" />
      </Flex>
      <Skeleton count={4} />
    </Box>
  );
};

export default LoadingDetailsPage;
