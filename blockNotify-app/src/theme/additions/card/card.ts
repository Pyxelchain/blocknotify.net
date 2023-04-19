import { mode } from "@chakra-ui/theme-tools";

const Card = {
  baseStyle: (props: any) => ({
    p: "20px",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    position: "relative",
    borderRadius: "12px",
    minWidth: "0px",
    wordWrap: "break-word",
    bg: mode("#ffffff", "navy.800")(props),
    backgroundClip: "border-box",
    "-webkit-backface-visibility": "hidden", // added to fix blurriness on mobile
    maxWidth: "500px", // added to add spacing between the card and screen edges
    margin: "0 auto", // added to center the card horizontally
  }),
};

export const CardComponent = {
  components: {
    Card,
  },
};
