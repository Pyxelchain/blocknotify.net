import { useEffect, useRef, useState } from "react";
import {
  Stat,
  StatLabel,
  Box,
  Text,
  Input,
  Button,
  useToast,
  FormControl,
  FormLabel,
  Heading,
  InputGroup,
  InputRightAddon,
  VStack,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import axios, { AxiosResponse } from "axios";
import { useAccount, useSignMessage } from "wagmi";
import { verifyMessage } from "ethers/lib/utils.js";

export default function Default(props: {
  startContent?: JSX.Element;
  endContent?: JSX.Element;
  name: string;
}) {
  const toast = useToast();
  const { address } = useAccount();
  const [numberSignature, setNumberSignature] = useState(null);
  const [verifySignature, setVerifySignature] = useState(null);
  const [deleteSignature, setDeleteSignature] = useState(null);
  const [userStatus, setUserStatus] = useState<AxiosResponse<any, any>>(null);
  const [validPhoneNumber, setValidPhoneNumber] = useState(false);
  const [numberResponse, setNumberResponse] = useState(null);
  const [verifyResponse, setVerifyResponse] = useState(null);
  const [deleteResponse, setDeleteResponse] = useState(null);

  const { startContent, endContent, name } = props;

  // handle phone number input
  const [phoneNumber, setPhoneNumber] = useState(null);
  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhoneNumber(event.target.value);
  };

  // handling phone code input
  const [phoneCode, setPhoneCode] = useState(null);
  const handlePhoneCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhoneCode(event.target.value);
  };

  // sign message and check returned address for matching signed in one
  const recoveredNumberAddress = useRef<string>();
  const { isLoading: phoneNumberLoading, signMessage: signNumberMessage } =
    useSignMessage({
      onSuccess(data, variables) {
        // Verify signature when sign message succeeds
        const address = verifyMessage(variables.message, data);
        recoveredNumberAddress.current = address;
        setNumberSignature(data);
      },
      onError(error) {
        toast({
          title: "Error signing message",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    });

  // sign verify message and check returned address for matching signed in one
  const recoveredVerifyAddress = useRef<string>();
  const { isLoading: phoneVerifyLoading, signMessage: signVerifyMessage } =
    useSignMessage({
      onSuccess(data, variables) {
        // Verify signature when sign message succeeds
        const address = verifyMessage(variables.message, data);
        recoveredVerifyAddress.current = address;
        setVerifySignature(data);
      },
      onError(error) {
        toast({
          title: "Error signing message",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    });

  // sign delete message and check returned address for matching signed in one
  const recoveredDeleteAddress = useRef<string>();
  const { isLoading: phoneDeleteLoading, signMessage: signDeleteMessage } =
    useSignMessage({
      onSuccess(data, variables) {
        // Verify signature when sign message succeeds
        const address = verifyMessage(variables.message, data);
        recoveredDeleteAddress.current = address;
        setDeleteSignature(data);
      },
      onError(error) {
        toast({
          title: "Error signing message",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    });

  // handle submitting signed message
  const handleSubmitPhone = () => {
    signNumberMessage({ message: phoneNumber ?? "" });
  };

  const handleSubmitVerify = () => {
    signVerifyMessage({ message: phoneCode ?? "" });
  };

  const handleSubmitDelete = () => {
    // just pass in delete as signature
    signDeleteMessage({ message: "delete" });
  };

  // retreive user status after each successful signature
  useEffect(() => {
    axios
      .get(`https://api.blocknotify.net/api/status?address=${address}`)
      .then((res) => {
        setUserStatus(res);
        console.log(res);
        // toast({
        //   title: res.data.status,
        //   status: "success",
        //   duration: 5000,
        //   isClosable: true,
        // });
      })
      .catch((err) =>
        toast({
          title: "Something went wrong in user status retrieval",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      );
  }, [numberResponse, verifyResponse, deleteResponse]);

  useEffect(() => {
    // make sure recovered address equals the connected address
    if (
      numberSignature &&
      numberSignature !== "" &&
      address === recoveredNumberAddress.current
    ) {
      axios
        .post(`https://api.blocknotify.net/api/register`, {
          phone: phoneNumber,
          signature: numberSignature,
        })
        .then((res) => {
          setNumberResponse(true);
          toast({
            title: "A code was sent to the phone number.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          // props.onReload("pending")
          // addMessage(<pre>{JSON.stringify(res, null, 4)}</pre>, 'primary')
          // TODO: figure out how to reload the app now... it doesn't auto-redirect them
          // ReactDOM.render(<App/>);
        })
        .catch((err) =>
          toast({
            title: "Something went wrong, code not sent",
            status: "error",
            duration: 5000,
            isClosable: true,
          })
        ); // milliseconds
    }
  }, [numberSignature]);

  useEffect(() => {
    const phoneRegex = /^\+[1-9]\d{1,14}$/; //  /^\d{10}$/; // Regex for 10 digit phone number
    if (phoneRegex.test(phoneNumber)) {
      setValidPhoneNumber(true);
    } else {
      setValidPhoneNumber(false);
    }
  }, [phoneNumber]);

  useEffect(() => {
    // make sure recovered address equals the connected address
    if (
      verifySignature &&
      verifySignature !== "" &&
      address === recoveredVerifyAddress.current
    ) {
      axios
        .post(`https://api.blocknotify.net/api/verify`, {
          challenge: phoneCode,
          signature: verifySignature,
        })
        .then((res) => {
          // TODO: now what? we are registered? how do we switch the router from Register to Verify?
          // addMessage("Success! A code was sent to the phone number.", 'success')
          setVerifyResponse(true);
          toast({
            title: "The phone number was succesfully verified",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          // props.onReload("pending")
          // addMessage(<pre>{JSON.stringify(res, null, 4)}</pre>, 'primary')
          // TODO: figure out how to reload the app now... it doesn't auto-redirect them
          // ReactDOM.render(<App/>);
        })
        .catch((err) =>
          toast({
            title: "Something went wrong, verify not sent",
            status: "error",
            duration: 5000,
            isClosable: true,
          })
        ); // milliseconds
    }
  }, [verifySignature]);

  useEffect(() => {
    // make sure recovered address equals the connected address
    if (
      deleteSignature &&
      deleteSignature !== "" &&
      address === recoveredDeleteAddress.current
    ) {
      axios
        .post(`https://api.blocknotify.net/api/delete`, {
          signature: deleteSignature,
        })
        .then((res) => {
          setDeleteResponse(true);
          setPhoneCode(null);
          setPhoneNumber(null);
          toast({
            title: "The phone number was successfully removed",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        })
        .catch((err) =>
          toast({
            title: "Something went wrong, verify not sent",
            status: "error",
            duration: 5000,
            isClosable: true,
          })
        ); // milliseconds
    }
  }, [deleteSignature]);

  return (
    <Card
      borderRadius="12px"
      boxShadow="0px 0px 5px rgba(0, 0, 0, 0.2)"
      bg="rgba(255, 255, 255, 0.05)"
      // backdropFilter="blur(10px)"
      _hover={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)" }}
      maxW={{ base: "90%", md: "sm" }} // limit maximum width of card for smaller screens
      mx={{ base: "auto", md: "0" }} // add horizontal padding for smaller screens
    >
      <Box m={4}>
        <Box mt={4} mb={6}>
          <Heading as="h2" size="lg" lineHeight="100%">
            Event Notifier
          </Heading>
          <Text fontSize={{ base: "sm" }} mt={2}>
            Verify your phone to enable on-chain event notifications
          </Text>
        </Box>
        {startContent}

        {userStatus &&
        (userStatus.data.status === "new" ||
          userStatus.data.status === "pending") ? (
          <VStack
            alignItems="flex-start"
            spacing="18px"
            ml={startContent ? "18px" : "0px"}
          >
            {userStatus.data.status === "pending" ? (
              <Stat>
                <StatLabel
                  lineHeight="100%"
                  color={"red.200"}
                  fontSize={{ base: "sm" }}
                >
                  Please verify the phone code
                </StatLabel>
              </Stat>
            ) : null}

            <VStack alignItems="flex-start" spacing="12px" width="100%">
              <FormControl
                id="phoneNumber"
                isDisabled={userStatus.data.status === "pending"}
              >
                <FormLabel fontSize={{ base: "sm" }}>Phone Number</FormLabel>
                <InputGroup size="sm">
                  <Input
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                  />
                  <InputRightAddon>
                    <Button
                      onClick={handleSubmitPhone}
                      isLoading={phoneNumberLoading}
                      isDisabled={userStatus.data.status === "pending"}
                      variant="no-effects"
                    >
                      Register
                    </Button>
                  </InputRightAddon>
                </InputGroup>
              </FormControl>

              <FormControl id="phoneCode">
                <FormLabel fontSize={{ base: "sm" }}>Phone Code</FormLabel>
                <InputGroup size="sm">
                  <Input value={phoneCode} onChange={handlePhoneCodeChange} />
                  <InputRightAddon>
                    <Button
                      onClick={handleSubmitVerify}
                      isLoading={phoneVerifyLoading}
                      variant="no-effects"
                    >
                      Verify
                    </Button>
                  </InputRightAddon>
                </InputGroup>
              </FormControl>
            </VStack>
          </VStack>
        ) : (
          <VStack
            alignItems="flex-start"
            spacing="18px"
            ml={startContent ? "18px" : "0px"}
          >
            <Heading as="h3" size="md" lineHeight="100%">
              {name}
            </Heading>

            <Stat>
              <StatLabel lineHeight="100%" fontSize={{ base: "sm" }}>
                Notify Bot Active
              </StatLabel>
            </Stat>

            <Button
              onClick={handleSubmitDelete}
              isLoading={phoneDeleteLoading}
              mt={2}
            >
              Delete
            </Button>
          </VStack>
        )}
      </Box>

      {endContent}
    </Card>
  );
}
