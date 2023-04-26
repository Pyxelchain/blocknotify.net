/*eslint-disable*/

import {
  Flex,
  Link,
  List,
  ListItem,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import FixedPlugin from "components/fixedPlugin/FixedPlugin";

export default function Footer() {
  const textColor = useColorModeValue("gray.400", "white");
  return (
    <Flex
      zIndex="3"
      flexDirection={{
        base: "column",
        xl: "row",
      }}
      alignItems="center"
      justifyContent="space-between"
      px={{ base: "30px", md: "50px" }}
      py={{ base: "20px", md: "30px" }}
      // position="fixed"
      bottom="0"
      left="0"
      width="100%"
    >
      <Text color={textColor} fontWeight="500" mb={{ base: "10px", xl: "0" }}>
        &copy; {new Date().getFullYear()} BlockNotify. All Rights Reserved.
      </Text>
      <List display="flex" alignItems="center">
        <ListItem me={{ base: "20px", md: "44px" }}>
          <Link fontWeight="500" color={textColor} href="https://google.com">
            Terms of Use
          </Link>
        </ListItem>
        <ListItem>
          <FixedPlugin />
        </ListItem>
      </List>
    </Flex>
  );
}
