"use client";
import { Result } from "@/lib/interfaces";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ERROR_TOAST, MISSING_TOAST, SUCCESS_TOAST } from "./toasts";

export const INTEGRATION_TOKEN = "integrationToken";
export const DATABASE_ID = "databaseId";
export const DATABASE_FILE = "databaseFile";

const FormComponent: React.FC = () => {
  const [integrationToken, setIntegrationToken] = useState<string>("");
  const [databaseId, setDatabaseId] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<Result[]>();
  const toast = useToast();

  useEffect(() => {
    if (localStorage && !!localStorage.getItem(INTEGRATION_TOKEN))
      setIntegrationToken(localStorage.getItem(INTEGRATION_TOKEN) as string);
    if (localStorage && !!localStorage.getItem(DATABASE_ID))
      setDatabaseId(localStorage.getItem(DATABASE_ID) as string);
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!integrationToken || !databaseId || !file) {
      toast(MISSING_TOAST);
      return;
    }

    localStorage.setItem(INTEGRATION_TOKEN, integrationToken);
    localStorage.setItem(DATABASE_ID, databaseId);

    const formData = new FormData();
    formData.append("token", integrationToken);
    formData.append("dbid", databaseId);
    formData.append("file", file);

    try {
      setLoading(true);
      setResults([]);

      const response = await fetch("/api/submit", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.log("response not ok");
        toast(ERROR_TOAST);
      }

      const data = await response.json();
      setResults(data.results);
      toast(SUCCESS_TOAST);
    } catch (error) {
      console.log("error");
      toast(ERROR_TOAST);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={4} mx="auto">
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
          <Input type="file" onChange={handleFileChange} />
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

      {!!results?.length ? (
        <Box mt={8}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {results.map((result) => (
                <Tr key={result.title}>
                  <Td>{result.title}</Td>
                  <Td>{result.status}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      ) : (
        <>No results.</>
      )}
    </Box>
  );
};

export default FormComponent;
