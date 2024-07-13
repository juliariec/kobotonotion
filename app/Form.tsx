"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import axios from "axios";

interface Result {
  id: string;
  status: string;
}

const FormComponent: React.FC = () => {
  const [integrationToken, setIntegrationToken] = useState<string>("");
  const [databaseId, setDatabaseId] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<Result[] | null>(null);
  const toast = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!integrationToken || !databaseId || !file) {
      toast({
        title: "Missing information",
        description: "Please fill out all fields and upload a valid file.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64File = reader.result as string;

      setLoading(true);
      setResults(null);

      try {
        const response = await axios.post("/api/submit", {
          integrationToken,
          databaseId,
          sqliteFile: base64File,
        });

        setResults(response.data.results);
        toast({
          title: "Success",
          description: "Your data has been submitted successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "There was an error submitting your data.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <Box p={4} maxWidth="500px" mx="auto">
      <form onSubmit={handleSubmit}>
        <FormControl isRequired mb={4}>
          <FormLabel>Integration Token</FormLabel>
          <Input
            type="text"
            value={integrationToken}
            onChange={(e) => setIntegrationToken(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired mb={4}>
          <FormLabel>Database ID</FormLabel>
          <Input
            type="text"
            value={databaseId}
            onChange={(e) => setDatabaseId(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired mb={4}>
          <FormLabel>SQLite File</FormLabel>
          <Input type="file" accept=".sqlite" onChange={handleFileChange} />
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          width="full"
          disabled={loading}
        >
          {loading ? <Spinner size="sm" /> : "Submit"}
        </Button>
      </form>

      {results && (
        <Box mt={8}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {results.map((result) => (
                <Tr key={result.id}>
                  <Td>{result.id}</Td>
                  <Td>{result.status}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </Box>
  );
};

export default FormComponent;
