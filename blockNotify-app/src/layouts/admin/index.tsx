import { Box, Flex, HStack, Text, Link, Image } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Footer from "components/footer/FooterAdmin";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "routes";
import { useAccount } from "wagmi";
import illustration from "assets/img/auth/auth.png";

const Header = () => {
  // const { connectWallet } = useWallet(); // Add this import if not already present

  return (
    <Flex alignItems="center" py={4} px={8}>
      <HStack spacing={2} alignItems="center">
        <Text fontSize="2xl" fontWeight="bold" mr={2}>
          BlockNotify
        </Text>
        <Image src={illustration} width="25px" height="25px" />
      </HStack>

      <HStack spacing={4} alignItems="center" ml={{ base: 2, md: 4, lg: 10 }}>
        <Link fontWeight="500" href="/">
          Notifier
        </Link>
        <Link fontWeight="500" href="https://docs.blocknotify.net">
          Docs
        </Link>
      </HStack>

      <HStack spacing={4} alignItems="center" ml="auto">
        <ConnectButton
          chainStatus={{
            smallScreen: "none",
            largeScreen: "icon",
          }}
          showBalance={{
            smallScreen: false,
            largeScreen: true,
          }}
          accountStatus={{
            smallScreen: "avatar",
            largeScreen: "full",
          }}
        />
      </HStack>
    </Flex>
  );
};

export default function Dashboard(props: { [x: string]: any }) {
  const { address } = useAccount();

  // functions for changing the states from components
  const getRoute = () => {
    return window.location.pathname !== "/admin/full-screen-maps";
  };

  const getRoutes = (routes: RoutesType[]): any => {
    return routes.map((route: RoutesType, key: any) => {
      if (route.layout === "/admin") {
        return (
          <Route
            path={route.layout + route.path}
            component={route.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  document.documentElement.dir = "ltr";

  if (!address) {
    return <Redirect from="/admin" to="/auth" />;
  }

  return (
    <Flex direction="column" minHeight="100vh">
      <Header />

      <Box flexGrow={1} py={6} px={8}>
        {getRoute() ? (
          <Box w="100%">
            <Switch>
              {getRoutes(routes)}

              <Redirect from="/" to="/admin/default" />
            </Switch>
          </Box>
        ) : null}
      </Box>

      <Footer />
    </Flex>
  );
}
