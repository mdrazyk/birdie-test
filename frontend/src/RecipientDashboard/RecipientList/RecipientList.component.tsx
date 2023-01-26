import { Avatar, Card, CardBody, Heading, HStack } from "@chakra-ui/react";

export const RecipientListComponent = ({
  recipients,
  selectedRecipient,
  setSelectedRecipient,
}: {
  recipients: {
    recipientId: string;
    firstName: string;
    lastName: string;
  }[];
  selectedRecipient: string | null;
  setSelectedRecipient: (recipientId: string) => void;
}) => (
  <>
    {recipients.map((recipient) => (
      <Card
        key={recipient.recipientId}
        w="100%"
        _hover={{
          boxShadow: "lg",
          cursor: "pointer",
        }}
        bg={
          selectedRecipient === recipient.recipientId
            ? "blackAlpha.100"
            : "white"
        }
        onClick={() => setSelectedRecipient(recipient.recipientId)}
      >
        <CardBody>
          <HStack>
            <Avatar name={`${recipient.firstName} ${recipient.lastName}`} />
            <Heading size="sm">{`${recipient.firstName} ${recipient.lastName}`}</Heading>
          </HStack>
        </CardBody>
      </Card>
    ))}
  </>
);
