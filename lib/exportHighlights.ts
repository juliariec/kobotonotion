import { Client } from "@notionhq/client";
import Database from "better-sqlite3";
import { getBookListQuery, getHighlightsQuery } from "./queries";
import { Book, Result, Highlight } from "./interfaces";

async function exportHighlights(
  databaseId: string,
  integrationToken: string,
  databaseFile: any
): Promise<Result[]> {
  const notion = new Client({ auth: integrationToken });
  const db = new Database(databaseFile);

  const bookList = db.prepare(getBookListQuery).all() as Book[];
  let bookResults = [] as Result[];

  for (const book of bookList) {
    try {
      // Remove subtitles from book title
      const title = book.Title.split(":")[0];

      // Check Notion database for the book
      const response = await notion.databases.query({
        database_id: databaseId,
        filter: {
          and: [
            {
              property: "Title",
              rich_text: {
                contains: title,
              },
            },
            {
              property: "Highlights",
              checkbox: {
                equals: false,
              },
            },
          ],
        },
      });

      if (response.results.length !== 1) {
        bookResults.push({
          title,
          status: response.results.length > 1 ? "skipped" : "not_found",
        });
        continue;
      }

      const pageId = response.results[0].id;
      const blocks = [];

      // Retrieve highlights for the book
      const highlightsList = db
        .prepare(getHighlightsQuery)
        .all(book.ContentId) as Highlight[];

      // Start with a block for the heading
      blocks.push({
        object: "block",
        type: "heading_1",
        heading_1: {
          text: [{ type: "text", text: { content: "Highlights" } }],
        },
      });

      // Generate a text block for each highlight
      highlightsList.forEach((highlight) => {
        if (highlight.Text) {
          blocks.push({
            object: "block",
            type: "paragraph",
            paragraph: {
              text: [{ type: "text", text: { content: highlight.Text } }],
            },
          });
        }
      });

      // Append the blocks to the book page
      const appendBlocksChunks = async (block_id: string, children: any[]) => {
        const chunkSize = 10;
        for (let i = 0; i < children.length; i += chunkSize) {
          const chunk = children.slice(i, i + chunkSize);
          await notion.blocks.children.append({
            block_id,
            children: chunk,
          });
        }
      };

      await appendBlocksChunks(pageId, blocks);

      // Update the status of the book page
      await notion.pages.update({
        page_id: pageId,
        properties: { Highlights: { checkbox: true } },
      });

      bookResults.push({ title, status: "uploaded" });

      console.log(`Uploaded highlights for ${title}.`);
    } catch (error) {
      console.error(`Error with ${book.Title}: `, error);
    }
  }

  return Promise.resolve(bookResults);
}

export default exportHighlights;