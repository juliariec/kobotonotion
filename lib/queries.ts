export const getBookListQuery = `
SELECT DISTINCT content.ContentId, content.Title, content.Attribution AS Author
FROM Bookmark
INNER JOIN content ON Bookmark.VolumeID = content.ContentID
ORDER BY content.Title
`;

export const getHighlightsQuery = `
SELECT Bookmark.Text
FROM Bookmark
INNER JOIN content ON Bookmark.VolumeID = content.ContentID
WHERE content.ContentID = @contentId
ORDER BY content.DateCreated DESC
`;
