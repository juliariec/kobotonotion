import { UseToastOptions } from "@chakra-ui/react";

export const MISSING_TOAST: UseToastOptions = {
  title: "Missing information",
  description: "Please fill out all fields and upload a valid file.",
  status: "warning",
  duration: 3000,
  isClosable: true,
};

export const SUCCESS_TOAST: UseToastOptions = {
  title: "Success",
  description: "Your data has been submitted successfully.",
  status: "success",
  duration: 3000,
  isClosable: true,
};

export const ERROR_TOAST: UseToastOptions = {
  title: "Error",
  description: "There was an error submitting your data.",
  status: "error",
  duration: 3000,
  isClosable: true,
};
