import * as React from "react";
import excel, { readFile } from "xlsx";
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
  Select,
  Button,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";
export enum Car {
  Camion = "camion",
  Sprinter = "sprinter",
}
export const App = () => {
  const [grupaj, setGrupaj] = React.useState(false);
  const [carType, setCarType] = React.useState<Car>();
  const [result, setResult] = React.useState<number>(0);
  console.log(carType);
  console.log(carType == Car.Camion);
  const toggleCarType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCarType(e.target.value as Car);
  };
  const calculatePrice = () => {
    setResult(500);
  };

  return (
    <ChakraProvider theme={theme}>
      <Center className="App" w="100vw" h="100vh" overflow="hidden">
        <VStack
          w="50%"
          gap="10px"
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
              <Input id="import" type="text" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="">Exporting to</FormLabel>
              <Input id="export" type="text" />
            </FormControl>
          </HStack>
          <HStack justify={"space-around"}>
            <Select onChange={toggleCarType} placeholder="Choose Car">
              <option value="sprinter">Sprinter</option>
              <option value="camion">Camion</option>
            </Select>
            <Checkbox
              size="lg"
              onChange={() => {
                setGrupaj(!grupaj);
              }}
            >
              Grupaj
            </Checkbox>
          </HStack>
          {grupaj === false ? (
            <FormControl>
              <FormLabel htmlFor="km">Kilometers</FormLabel>
              <Input id="km" type="number" />
            </FormControl>
          ) : (
            <>
              {carType === Car.Camion && (
                <FormControl>
                  <FormLabel htmlFor="m">Metrii</FormLabel>
                  <Input id="m" type="number" />
                </FormControl>
              )}
              {carType === Car.Sprinter && (
                <FormControl>
                  <FormLabel htmlFor="kg">Kg</FormLabel>
                  <Input id="kg" type="number" />
                </FormControl>
              )}
              {carType !== Car.Camion && carType !== Car.Sprinter && (
                <Text color="red.500" fontSize="lg">
                  Select a car type
                </Text>
              )}
            </>
          )}
          <Button onClick={calculatePrice}>Calculate</Button>
          <Text fontSize={"2xl"}>{result === 0 ? "" : result}</Text>
        </VStack>
      </Center>
    </ChakraProvider>
  );
};
