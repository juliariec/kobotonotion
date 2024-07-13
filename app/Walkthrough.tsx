"use client";
import React, { useState, useEffect, useMemo } from "react";

import WalkthroughStepper from "./WalkthroughStepper";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Link,
  Text,
  Code,
  useDisclosure,
} from "@chakra-ui/react";

import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";

const instructions = [
  {
    title: "Create Notion Integration",
    description: "Create a custom integration in Notion",
    body: (
      <OrderedList spacing={4}>
        <ListItem>
          Navigate to{" "}
          <Link
            color="teal"
            href="https://www.notion.so/profile/integrations"
            isExternal
          >
            https://www.notion.so/profile/integrations
          </Link>
        </ListItem>
        <ListItem>
          Click &quot;New Integration&quot; and enter Name and Workspace details
        </ListItem>
        <ListItem>Copy your Internal Integration Secret for later</ListItem>
      </OrderedList>
    ),
  },
  {
    title: "Create Notion Database",
    description: "Create a target database in Notion",
    body: (
      <OrderedList spacing={4}>
        <ListItem>
          In your Notion workspace, create a new database to store your Kobo
          highlights
        </ListItem>
        <ListItem>
          Ensure your database has a checkbox property named Highlights and a
          text property named Title
        </ListItem>
        <ListItem>
          To allow your integration to access this database, click the three
          dots in the upper right hand corner, navigate to Connections &gt;
          Connect To, and then select the name of your newly created integration
        </ListItem>
        <ListItem>
          While viewing your database page, copy the Database ID from the URL by
          selecting the text between <Code>.so/</Code> and <Code>?v=</Code>
        </ListItem>
      </OrderedList>
    ),
  },
  {
    title: "Get Kobo Data",
    description:
      "Get the data from your Kobo in order to upload for processing",
    body: (
      <OrderedList spacing={4}>
        <ListItem>Connect your Kobo device to your computer</ListItem>
        <ListItem>
          Navigate to <i>folder name</i> and locate <i>filename.sqlite</i>
        </ListItem>
      </OrderedList>
    ),
  },
];

const Walkthrough: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [step, setStep] = useState(0);
  const [stepDetails, setStepDetails] = useState(instructions);

  const handleClose = () => {
    onClose();
    localStorage.setItem("skipWalkthrough", "true");
  };

  const skipWalkthrough = () => {
    if (localStorage) return localStorage.getItem("skipWalkthrough") == "true";
    else return false;
  };

  const incrementStep = () => {
    if (step != stepDetails.length - 1) {
      setStep(step + 1);
    }
  };

  const decrementStep = () => {
    if (step != 0) {
      setStep(step - 1);
    }
  };

  const isFirstStep = () => {
    return step == 0;
  };

  const isLastStep = () => {
    return step == stepDetails.length - 1;
  };

  const openWalkthrough = () => {
    localStorage.removeItem("skipWalkthrough");
    onOpen();
    setStep(0);
  };

  return (
    <>
      <Button mt={4} onClick={openWalkthrough}>
        Show Walkthrough
      </Button>

      <Modal size="lg" isOpen={!skipWalkthrough()} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Walkthrough</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <WalkthroughStepper
              step={step}
              setStep={setStep}
              stepDetails={stepDetails}
            />
            {instructions.map((details, index) => (
              <Box p="5" key={index} display={step != index ? "none" : ""}>
                {details.body}
              </Box>
            ))}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={decrementStep}
              isDisabled={isFirstStep()}
            >
              Previous
            </Button>
            <Button
              display={isLastStep() ? "none" : ""}
              colorScheme="blue"
              mr={3}
              onClick={incrementStep}
            >
              Next
            </Button>
            <Button
              display={isLastStep() ? "none" : ""}
              variant="ghost"
              onClick={handleClose}
            >
              Skip
            </Button>
            <Button
              display={isLastStep() ? "" : "none"}
              colorScheme="green"
              onClick={handleClose}
            >
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

function onClose() {
  return;
}

export default Walkthrough;
