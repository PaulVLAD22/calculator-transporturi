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
import { password } from "./secrets";

export enum Car {
  Camion = "Camion",
  Sprinter = "Sprinter",
}
let countries: (string | undefined)[] = [];

prices.forEach(row => {
  if (row.Tara && row.Tara?.split(" ").length === 1) {
    countries.push(row.Tara);
  }
});

const debug = false;

export const App = () => {
  const [accessGranted, setAccessGranted] = React.useState<boolean>(debug);
  const [importingCountry, setImportingCountry] = React.useState<string>("");
  const [exportingCountry, setExportingCountry] = React.useState<string>("");
  const [frigoOrAdr, setFrigoOrAdr] = React.useState<boolean>(false);
  const [grupaj, setGrupaj] = React.useState(false);
  const [carType, setCarType] = React.useState<Car>();
  const [result, setResult] = React.useState<number>(0);
  const [error, setError] = React.useState<string>("");
  const [kilometers, setKilometers] = React.useState<number>();
  const [kg, setKg] = React.useState<number>();
  const [m, setM] = React.useState<number>();

  const toggleCarType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCarType(e.target.value as Car);
  };
  const calculatePrice = () => {
    setError("");
    let valueInEuro = 0;
    // caz 1 nu include romania
    if (importingCountry !== "Romania" && exportingCountry !== "Romania") {
      if (!kilometers) {
        setError("Kilometrii nu au fost introdusi");
        return;
      }
      if (grupaj === false) {
        if (carType === "Camion") {
          valueInEuro = kilometers * 1.3;
        } else {
          valueInEuro = kilometers * 0.5;
        }
      } else {
        if (carType === "Sprinter" && kg) {
          valueInEuro = (kg * 120) / 100;
        } else if (carType === "Camion" && m) {
          valueInEuro = m * 225;
        }
      }
    } else if (
      importingCountry === "Romania" &&
      exportingCountry === "Romania"
    ) {
      if (!kilometers) {
        setError("Kilometrii nu au fost introdusi");
        return;
      }
      let preturiRomania = prices.find(ob => ob.Tara === "Romania");
      if (preturiRomania)
        valueInEuro =
          Number(
            preturiRomania[
              ("I" + carType + "/km") as keyof typeof preturiRomania
            ]
          ) * kilometers;

      // romania + alta tara
    } else {
      if (grupaj === false) {
        if (kilometers) {
          if (importingCountry === "Romania") {
            let exportingCountryValue = prices.find(
              ob => ob.Tara === exportingCountry
            );
            if (exportingCountryValue)
              valueInEuro =
                Number(
                  exportingCountryValue[
                    ("E" +
                      carType +
                      "/km") as keyof typeof exportingCountryValue
                  ]
                ) * kilometers;
          } else {
            let exportingCountryValue = prices.find(
              ob => ob.Tara === importingCountry
            );
            if (exportingCountryValue)
              valueInEuro =
                Number(
                  exportingCountryValue[
                    ("I" +
                      carType +
                      "/km") as keyof typeof exportingCountryValue
                  ]
                ) * kilometers;
          }
        } else {
          setError("Kilometrii nu au fost introdusi");
        }
      }
      // grupaj export
      else {
        if (carType === "Sprinter" && kg) {
          if (importingCountry === "Romania") {
            let exportingCountryValue = prices.find(
              ob => ob.Tara === exportingCountry
            );
            if (exportingCountryValue)
              valueInEuro =
                (Number(
                  exportingCountryValue[
                    "ESprinter/100kg" as keyof typeof exportingCountryValue
                  ]
                ) *
                  kg) /
                100;
          } else {
            let exportingCountryValue = prices.find(
              ob => ob.Tara === importingCountry
            );
            if (exportingCountryValue)
              valueInEuro =
                (Number(
                  exportingCountryValue[
                    "ISprinter/100kg" as keyof typeof exportingCountryValue
                  ]
                ) *
                  kg) /
                100;
          }

          if (kg < 200) {
            valueInEuro *= 1.5;
          } else if (kg >= 200 && kg <= 300) {
            valueInEuro *= 1.3;
          }
        } else if (carType === "Camion" && m) {
          if (importingCountry === "Romania") {
            let exportingCountryValue = prices.find(
              ob => ob.Tara === exportingCountry
            );
            if (exportingCountryValue)
              valueInEuro =
                Number(
                  exportingCountryValue[
                    "ECamion/m" as keyof typeof exportingCountryValue
                  ]
                ) * m;
          } else {
            let exportingCountryValue = prices.find(
              ob => ob.Tara === importingCountry
            );
            if (exportingCountryValue)
              valueInEuro =
                Number(
                  exportingCountryValue[
                    "ICamion/m" as keyof typeof exportingCountryValue
                  ]
                ) * m;
          }

          if (m < 2) {
            valueInEuro *= 1.5;
          } else if (m >= 2 && m <= 3) {
            valueInEuro *= 1.3;
          }
        } else {
          setError("Combinatie de Input Gresita");
        }
      }
    }
    if (frigoOrAdr) {
      console.log("SALUT");
      valueInEuro *= 1.2;
    }
    if (valueInEuro !== 0) setResult(valueInEuro);
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
        {/* commenteaza daca scoti logarea cu parola */}
        {accessGranted === false ? (
          <FormControl width="50%">
            <FormLabel>Parola</FormLabel>
            <Input
              type="password"
              onChange={e => {
                if (e.target.value === password) setAccessGranted(true);
              }}
            ></Input>
          </FormControl>
        ) : (
          //
          <VStack
            w={{ base: "100%", md: "50%" }}
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
                <FormLabel htmlFor="km">De la</FormLabel>
                <Select
                  placeholder="Select a country"
                  value={importingCountry}
                  onChange={changeImportingCountry}
                >
                  {countries.map(country => (
                    <option value={country}>{country}</option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="km">Catre</FormLabel>
                <Select
                  placeholder="Select a country"
                  value={exportingCountry}
                  onChange={changeExportingCountry}
                >
                  {countries.map(country => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </HStack>
            <HStack justify={"space-around"}>
              <Select onChange={toggleCarType} placeholder="Choose Car">
                <option value="Sprinter">Sprinter</option>
                <option value="Camion">Camion</option>
              </Select>
              <Checkbox
                size="lg"
                onChange={() => {
                  setGrupaj(!grupaj);
                }}
              >
                Grupaj
              </Checkbox>
              <Checkbox
                size="lg"
                onChange={() => {
                  setFrigoOrAdr(!frigoOrAdr);
                }}
              >
                FRIGO/ADR
              </Checkbox>
            </HStack>
            {carType !== Car.Camion && carType !== Car.Sprinter ? (
              <Text color="red.500" fontSize="lg">
                Alege tipul de vehicul
              </Text>
            ) : grupaj === false ? (
              <FormControl>
                <FormLabel htmlFor="km">km</FormLabel>
                <Input
                  id="km"
                  type="number"
                  value={kilometers}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setKilometers(Number(e.target.value))
                  }
                />
              </FormControl>
            ) : (
              <>
                {carType === Car.Camion && (
                  <FormControl>
                    <FormLabel htmlFor="m">m podea</FormLabel>
                    <Input
                      id="m"
                      type="number"
                      value={m}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setM(Number(e.target.value))
                      }
                    />
                  </FormControl>
                )}
                {carType === Car.Sprinter && (
                  <FormControl>
                    <FormLabel htmlFor="kg">Kg</FormLabel>
                    <Input
                      id="kg"
                      type="number"
                      value={kg}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setKg(Number(e.target.value))
                      }
                    />
                  </FormControl>
                )}
              </>
            )}
            <Button onClick={calculatePrice}>Calculate</Button>
            {error !== "" ? (
              <Text fontSize={"lg"} color="red.500">
                {error}
              </Text>
            ) : (
              result !== 0 && (
                <Text fontSize={"2xl"}>
                  {result.toString() +
                    " Euro / " +
                    (result * 5).toString() +
                    " RON"}
                </Text>
              )
            )}
          </VStack>
        )}
      </Center>
    </ChakraProvider>
  );
};
