// Chakra imports
import { Box, Flex } from "@chakra-ui/react";
import EventNotif from "components/card/EventNotif";

const EventNotifContainer = (props: any) => {
  return (
    <Box
      // maxW="400px" // Set a max-width for the container, adjust as necessary
      mx="auto" // Center the container horizontally
      {...props}
    >
      {props.children}
    </Box>
  );
};

export default function MainDashboard() {
  return (
    <Flex
      h="calc(100vh - 64px)" // Deduct the header height (change 64px if your header height is different)
      justifyContent="center"
      alignItems="center"
    >
      <EventNotifContainer>
        <EventNotif name={"On-chain Event Notifier"} />
      </EventNotifContainer>
    </Flex>
  );
}
