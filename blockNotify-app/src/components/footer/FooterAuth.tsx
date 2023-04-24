/* eslint-disable */

import {
  Flex,
  Link,
  List,
  ListItem,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import FixedPlugin from "components/fixedPlugin/FixedPlugin";
import { IoBookSharp } from "react-icons/io5";

export default function Footer() {
  let textColor = useColorModeValue("gray.400", "white");

  return (
    <Flex
      zIndex="3"
      flexDirection={{
        base: "column",
        lg: "row",
      }}
      alignItems={{
        base: "center",
        xl: "center",
      }}
      justifyContent={"space-evenly"}
      px={{ base: "30px", md: "0px" }}
      pb="30px"
    >
      <Text
        color={textColor}
        textAlign={{
          base: "center",
          xl: "start",
        }}
        mb={{ base: "20px", lg: "0px" }}
      >
        {" "}
        &copy; {new Date().getFullYear()}
        <Text as="span" fontWeight="500" ms="4px">
          BlockNotify
        </Text>
      </Text>

      <List display="flex" alignItems="center">
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}
        >
          <Link fontWeight="500" href="https://docs.blocknotify.net">
            <IoBookSharp />
          </Link>
        </ListItem>

        <ListItem>
          <FixedPlugin />
        </ListItem>
      </List>
    </Flex>
  );
}
