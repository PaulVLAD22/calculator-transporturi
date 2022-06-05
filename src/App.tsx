import * as React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Input,
  Center,
  HStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Checkbox,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";

export const App = () => {
  const [grupaj, setGrupaj] = React.useState(false);
  console.log(grupaj);
  return (
    <ChakraProvider theme={theme}>
      <Center className="App" w="100vw" h="100vh" overflow="hidden">
        <VStack
          w="50%"
          gap="20px"
          boxShadow={"dark-lg"}
          px="20"
          py="10"
          borderRadius={"3xl"}
        >
          <Text fontFamily={""} textAlign={"center"} fontSize="5xl">
            Transportation Calculator
          </Text>
          <ColorModeSwitcher />
          <HStack justify={"space-around"} width="100%">
            <FormControl>
              <FormLabel htmlFor="">Importing from</FormLabel>
              <Input id="export" type="text" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="">Exporting to</FormLabel>
              <Input id="export" type="text" />
            </FormControl>
          </HStack>
          <Checkbox
            size="lg"
            onChange={() => {
              setGrupaj(!grupaj);
            }}
          >
            Grupaj
          </Checkbox>
        </VStack>
      </Center>
    </ChakraProvider>
  );
};
