"use client";
import React, { useState } from "react";

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
  useDisclosure,
} from "@chakra-ui/react";

const instructions = [
  {
    title: "Create Integration",
    description: "Create a custom integration in Notion",
    body: "Navigate to Notion and create a custom integration",
  },
  {
    title: "Create Database",
    description: "Create a target database in Notion",
    body: "Navigate to Notion and create a new database",
  },
  {
    title: "Save Integration Details",
    description: "Copy integration key and database ID",
    body: "Copy your integration key and your database ID for input",
  },
];

const Walkthrough: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [step, setStep] = useState(0);
  const [stepDetails, setStepDetails] = useState(instructions);

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
    onOpen();
    setStep(0);
  };

  return (
    <>
      <Button mt={4} onClick={openWalkthrough}>
        Show Walkthrough
      </Button>

      <Modal size="lg" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Walkthrough</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <WalkthroughStepper setStep={setStep} stepDetails={stepDetails} />
            {instructions.map((details, index) => (
              <Box key={index} display={step != index ? "none" : ""}>
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
              onClick={onClose}
            >
              Skip
            </Button>
            <Button
              display={isLastStep() ? "" : "none"}
              colorScheme="green"
              onClick={onClose}
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
