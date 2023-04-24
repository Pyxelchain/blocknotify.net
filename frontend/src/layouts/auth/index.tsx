import { Redirect, Route, Switch } from "react-router-dom";
import routes from "routes";

// Chakra imports
import { Box, useColorModeValue } from "@chakra-ui/react";

// Layout components
import { useAccount } from "wagmi";

// Custom Chakra theme
export default function Auth() {
  // states and functions
  const getRoute = () => {
    return window.location.pathname !== "/auth/full-screen-maps";
  };
  const getRoutes = (routes: RoutesType[]): any => {
    return routes.map((route: RoutesType, key: any) => {
      if (route.layout === "/auth") {
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

  const { address } = useAccount();

  if (address) {
    return <Redirect from="/auth" to="/admin" />;
  }

  return (
    <Box
      float="right"
      minHeight="100vh"
      height="100%"
      position="relative"
      w="100%"
      transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
      transitionDuration=".2s, .2s, .35s"
      transitionProperty="top, bottom, width"
      transitionTimingFunction="linear, linear, ease"
    >
      {getRoute() ? (
        <Box mx="auto" minH="100vh">
          <Switch>
            {getRoutes(routes)}

            <Redirect
              from="/auth"
              to="/auth/sign-in/default
                  "
            />
          </Switch>
        </Box>
      ) : null}
    </Box>
  );
}
