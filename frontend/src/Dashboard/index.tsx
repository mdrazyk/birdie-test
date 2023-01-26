import {
  Avatar,
  Box,
  Card,
  CardBody,
  Heading,
  HStack,
  VStack,
} from "@chakra-ui/react";

export const Dashboard = () => {
  return (
    <HStack h="100vh" p="10px" bg="blackAlpha.100">
      <VStack
        h="100%"
        w="400px"
        overflowY="auto"
        css={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
        }}
      >
        <Heading size="md" m="20px">Care recipients</Heading>
        <VStack gap="10px" w="100%">
          <Card
            w="100%"
            _hover={{
              boxShadow: "md",
              bg: "blackAlpha.100",
              cursor: "pointer",
            }}
          >
            <CardBody>
              <HStack>
                <Avatar name="Michael Scott" />
                <Heading size="sm">Michael Scott</Heading>
              </HStack>
            </CardBody>
          </Card>
          <Card
            w="100%"
            _hover={{
              boxShadow: "md",
              bg: "blackAlpha.100",
              cursor: "pointer",
            }}
          >
            <CardBody>
              <HStack>
                <Avatar name="Pam Beesly" />
                <Heading size="sm">Pam Beesly</Heading>
              </HStack>
            </CardBody>
          </Card>
          <Card
            w="100%"
            _hover={{
              boxShadow: "md",
              bg: "blackAlpha.100",
              cursor: "pointer",
            }}
          >
            <CardBody>
              <HStack>
                <Avatar name="Dwight Schrute" />
                <Heading size="sm">Dwight Schrute</Heading>
              </HStack>
            </CardBody>
          </Card>
        </VStack>
      </VStack>
      <VStack h="100%" w="100%" bg="white" borderRadius="md" boxShadow="md">
        <Box w="100%" p="5px">
          BBB
        </Box>
      </VStack>
    </HStack>
  );
};
