import Head from "next/head";
import React, { useState } from "react";
import {
  ChakraProvider,
  extendTheme,
  Container,
  Heading,
  Textarea,
  Spacer,
  Center,
  Text,
  Link,
} from "@chakra-ui/react";
import "@fontsource/fira-code";

// characters
function digit() {
  return `\\d`;
}

function word() {
  return `\\w`;
}

function whitespace() {
  return `\\s`;
}

function notDigit() {
  return `\\D`;
}

function notWord() {
  return `\\W`;
}

function notWhitespace() {
  return `\\S`;
}

// quantifiers
function zeroOrMore(char) {
  return `${char}*`;
}

function oneOrMore(char) {
  return `${char}+`;
}

function zeroOrOne(char) {
  return `${char}?`;
}

function times(char, n) {
  return `${char}{${n}}`;
}

function timesLeast(char, n) {
  return `${char}{${n},}`;
}

function timesBetween(char, start, end) {
  return `${char}{${start},${end}}`;
}

// more
function any() {
  return `.`;
}

// logic
function or(first, second) {
  return `${first}|${second}`;
}

function captureGroup(str) {
  return `(${str})`;
}

function groupAt(n) {
  return `\\${n}`;
}

// more whitespace
function tab() {
  return `\\t`;
}

function newline() {
  return `\\n`;
}

// character classes
function range(start, end) {
  return `${start}-${end}`;
}

function anyOneOf(str) {
  return `[${str}]`;
}

function anyOneOfRange(start, end) {
  return anyOneOf(range(start, end));
}

// anchors and boundaries
function startOfLine() {
  return `^`;
}

function endOfLine() {
  return `$`;
}

// compile
function compile(code) {
  try {
    return eval(code);
  } catch (e) {
    console.log(e.message);
    return "";
  }
}

// app
const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "#111",
        color: "white",
      },
    },
  },
  fonts: {
    heading: "Open Sans",
    body: "Raleway",
  },
});

function Footer() {
  return (
    <Center my={16}>
      <Text color={"gray.500"}>
        © {new Date().getFullYear()} -{" "}
        <Link href="https://twitter.com/yknsdt" isExternal>
          Yuki Nishidate
        </Link>
      </Text>
    </Center>
  );
}

export default function Home() {
  const [regex, setRegex] = useState("regex");

  return (
    <ChakraProvider theme={theme}>
      <Head my={"md"}>
        <title>Regex Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxW="container.md">
        <Heading my={12}>Regex Generator</Heading>
        <Textarea
          placeholder="code..."
          fontFamily="Fira Code"
          resize="none"
          rows={6}
          onChange={(event) => {
            const value = event.target.value;
            const result = compile(value);
            if (result) {
              setRegex(result);
            }
          }}
        ></Textarea>
        <Spacer height={4} />
        <Textarea
          value={regex}
          readOnly={true}
          fontFamily="Fira Code"
          resize="none"
          rows={6}
        ></Textarea>
        <Footer />
      </Container>
    </ChakraProvider>
  );
}
