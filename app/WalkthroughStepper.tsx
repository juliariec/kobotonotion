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
  setStep: (num: number) => void;
  stepDetails: Array<any>;
}

const WalkthroughStepper: React.FC<WalkthroughStepperProps> = ({
  setStep,
  stepDetails,
}) => {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: stepDetails.length,
  });

  const handleClick = (idx: number) => () => {
    setActiveStep(idx);
    setStep(idx);
  };

  return (
    <Stepper size="sm" index={activeStep}>
      {stepDetails.map((step, index) => (
        <Step key={index} onClick={handleClick(index)}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box>
            <StepTitle>{step.title}</StepTitle>
            {/* <StepDescription>{step.description}</StepDescription> */}
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
};

export default WalkthroughStepper;
