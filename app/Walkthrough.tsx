"use client";
import React, { useState } from "react";

import WalkthroughStepper from "./WalkthroughStepper";

import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import { useLocalStorage } from "./hooks";
import { instructions } from "./instructions";

const SKIP_WALKTHROUGH_KEY = "skipWalkthrough";

const Walkthrough: React.FC = () => {
  const { onOpen, onClose } = useDisclosure();
  const [step, setStep] = useState(0);
  const [stepDetails, setStepDetails] = useState(instructions);
  const [skipWalkthrough, setSkipWalkthrough] = useLocalStorage(
    SKIP_WALKTHROUGH_KEY,
    false
  );

  const handleClose = () => {
    onClose();
    setSkipWalkthrough(true);
  };

  const incrementStep = () => {
    if (step != stepDetails.length - 1) {
      setStep(step + 1);
    }
  };

  const decrementStep = () => {
    if (step != 0) setStep(step - 1);
  };

  const isFirstStep = () => step == 0;
  const isLastStep = () => step == stepDetails.length - 1;

  const openWalkthrough = () => {
    setSkipWalkthrough(false);
    onOpen();
    setStep(0);
  };

  return (
    <>
      <Button mt={4} onClick={openWalkthrough}>
        Show Walkthrough
      </Button>

      <Modal size="lg" isOpen={!skipWalkthrough} onClose={handleClose}>
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

export default Walkthrough;
