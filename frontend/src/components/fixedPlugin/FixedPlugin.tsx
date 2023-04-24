// Chakra Imports
import { Button, Icon, useColorMode } from "@chakra-ui/react";
// Custom Icons
import { IoMdMoon, IoMdSunny } from "react-icons/io";

export default function FixedPlugin(props: { [x: string]: any }) {
  const { ...rest } = props;
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button
      {...rest}
      h="40px"
      w="40px"
      // zIndex="99"
      // position="fixed"
      variant="no-effects"
      // left={document.documentElement.dir === "rtl" ? "35px" : ""}
      // right={document.documentElement.dir === "rtl" ? "" : "35px"}
      // bottom="30px"
      //   border="1px solid"
      //   borderColor="#6A53FF"
      // borderRadius="50px"
      onClick={toggleColorMode}
      // display="flex"
      // p="0px"
      // alignItems="center"
      // justifyContent="center"
    >
      <Icon
        h="24px"
        w="24px"
        as={colorMode === "light" ? IoMdMoon : IoMdSunny}
      />
    </Button>
  );
}
