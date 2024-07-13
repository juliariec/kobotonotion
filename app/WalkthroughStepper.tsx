"use client";
import React, { useState } from "react";

import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Box,
} from "@chakra-ui/react";

interface WalkthroughStepperProps {
  step: number;
  setStep: (num: number) => void;
  stepDetails: Array<any>;
}

const WalkthroughStepper: React.FC<WalkthroughStepperProps> = ({
  step,
  setStep,
  stepDetails,
}) => {
  return (
    <Stepper size="sm" index={step}>
      {stepDetails.map((step, index) => (
        <Step key={index} onClick={() => setStep(index)}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box>
            <StepTitle>{step.title}</StepTitle>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
};

export default WalkthroughStepper;
