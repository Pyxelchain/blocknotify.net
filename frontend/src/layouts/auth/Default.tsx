// Chakra imports
import { Box, Flex } from "@chakra-ui/react";
import PropTypes from "prop-types";
import Footer from "components/footer/FooterAuth";

function AuthIllustration(props: {
  children: JSX.Element | string;
  illustrationBackground: string;
}) {
  const { children, illustrationBackground } = props;
  // Chakra color mode
  return (
    <Flex position="relative" h="max-content">
      <Flex
        h={{
          sm: "initial",
          md: "unset",
          lg: "100vh",
          xl: "97vh",
        }}
        w="100%"
        maxW={{ md: "66%", lg: "1313px" }}
        mx="auto"
        pt={{ sm: "50px", md: "0px" }}
        px={{ lg: "30px", xl: "0px" }}
        ps={{ xl: "70px" }}
        justifyContent="start"
        direction="column"
        minH="100vh"
        flexDirection="column"
      >
        {children}

        <Box
          display={{ base: "block" }}
          h="100%"
          minH="100vh"
          w={{ lg: "50vw", "2xl": "44vw" }}
          position="absolute"
          right="0px"
        >
          <Flex
            bg={`url(${illustrationBackground})`}
            justify="center"
            align="end"
            w="100%"
            h="100%"
            // bgSize="contain"
            // bgPosition="50%"
            bgRepeat={"no-repeat"}
            // position="absolute"
            borderBottomLeftRadius={{ lg: "120px", xl: "200px" }}
          />
        </Box>

        <Footer />
      </Flex>
    </Flex>
  );
}

// PROPS

AuthIllustration.propTypes = {
  illustrationBackground: PropTypes.string,
  image: PropTypes.any,
};

export default AuthIllustration;
