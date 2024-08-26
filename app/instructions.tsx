import { OrderedList, ListItem, Link, Code } from "@chakra-ui/react";

export const instructions = [
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
