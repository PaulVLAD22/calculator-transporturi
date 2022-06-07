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
  Select,
  Button,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { prices } from "./prices";

export enum Car {
  Camion = "camion",
  Sprinter = "sprinter",
}
let countries: (string | undefined)[] = [];

prices.forEach(row => {
  countries.push(row.Tara);
});

export const App = () => {
  const [importingCountry, setImportingCountry] = React.useState<string>("");
  const [exportingCountry, setExportingCountry] = React.useState<string>("");
  const [grupaj, setGrupaj] = React.useState(false);
  const [carType, setCarType] = React.useState<Car>();
  const [result, setResult] = React.useState<number>(0);

  const toggleCarType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCarType(e.target.value as Car);
  };
  const calculatePrice = () => {
    // pleaca din romania
    if (importingCountry === "Romania") {
    }
    // vine din romania
    else {
    }
    setResult(500);
  };
  const changeImportingCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setImportingCountry(e.target.value);
  };
  const changeExportingCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setExportingCountry(e.target.value);
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
              <FormLabel htmlFor="km">From</FormLabel>
              <Select onChange={changeImportingCountry}>
                {countries.map(country => (
                  <option value={country}>{country}</option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="km">To</FormLabel>
              <Select onChange={changeExportingCountry}>
                {countries.map(country => (
                  <option value={country}>{country}</option>
                ))}
              </Select>
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
          {carType !== Car.Camion && carType !== Car.Sprinter ? (
            <Text color="red.500" fontSize="lg">
              Select a car type
            </Text>
          ) : grupaj === false ? (
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
            </>
          )}
          <Button onClick={calculatePrice}>Calculate</Button>
          <Text fontSize={"2xl"}>{result === 0 ? "" : result}</Text>
        </VStack>
      </Center>
    </ChakraProvider>
  );
};
