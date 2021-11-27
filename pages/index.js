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
  HStack,
  Box,
  Table,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
  Code,
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
    heading: "Fira Code",
    body: "Fira Code",
  },
});

function Header() {
  return (
    <HStack mt={16} mb={6}>
      <Heading>Regex Generator</Heading>
      <Spacer />
      <Link href="https://github.com/nishidate-yuki/regex-generator" isExternal>
        GitHub
      </Link>
    </HStack>
  );
}

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

function ManualRow({ func, regex }) {
  return (
    <Tr>
      <Td>
        <Code background={"none"} color="white" px={2} py={0.5}>
          {func}
        </Code>
      </Td>
      <Td>
        <Code background={"none"} color="white" px={2} py={0.5}>
          {regex}
        </Code>
      </Td>
    </Tr>
  );
}

function Manual() {
  return (
    <Box mt={16}>
      <Table variant="unstyled" size="sm">
        <Thead>
          <Th>Function</Th>
          <Th>Regex</Th>
        </Thead>
        <Tbody>
          <ManualRow func="digit()" regex="\d" />
          <ManualRow func="whitespace()" regex="\s" />
          <ManualRow func="word()" regex="\w" />
          <ManualRow func="notDigit()" regex="\D" />
          <ManualRow func="notWhitespace()" regex="\S" />
          <ManualRow func="notWord()" regex="\W" />
          <ManualRow func="zeroOrMore(char)" regex="*" />
          <ManualRow func="oneOrMore(char)" regex="+" />
          <ManualRow func="zeroOrOne(char)" regex="?" />
          <ManualRow func="times(char, num)" regex="{num}" />
          <ManualRow func="timesLeast(char, num)" regex="{num,}" />
          <ManualRow
            func="timesBetween(char, start, end)"
            regex="{start,end}"
          />
          <ManualRow func="any()" regex="." />
          <ManualRow func="or(first, second)" regex="|" />
          <ManualRow func="captureGroup(str)" regex="()" />
          <ManualRow func="groupAt(num)" regex="\num" />
          <ManualRow func="tab()" regex="\t" />
          <ManualRow func="newline()" regex="\n" />
          <ManualRow func="range(start, end)" regex="-" />
          <ManualRow func="anyOneOf(str)" regex="[]" />
          <ManualRow func="anyOneOfRange(start, ned)" regex="[-]" />
          <ManualRow func="startOfLine()" regex="^" />
          <ManualRow func="endOfLine()" regex="$" />
        </Tbody>
      </Table>
    </Box>
  );
}

export default function Home() {
  const [regex, setRegex] = useState(".*");

  return (
    <ChakraProvider theme={theme}>
      <Head my={"md"}>
        <title>Regex Generator</title>
        <link rel="icon" href="/favicon.ico?" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Regex Generator" />
        <meta name="twitter:image" content="/favicon.ico?" />
      </Head>

      <Container maxW="container.md">
        <Header />
        <Textarea
          placeholder="zeroOrMore( any() )"
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

        <Manual />
        <Footer />
      </Container>
    </ChakraProvider>
  );
}
