const extractPlainText = (html: string) => {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "") // Remove styles
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "") // Remove scripts
    .replace(/<\/(p|div|br|h[1-6])>/gi, "\n") // Convert block elements to new lines
    .replace(/<[^>]+>/g, "") // Remove all other HTML tags
    .replace(/\n\s*\n/g, "\n") // Remove extra new lines
    .replace(/\s+/g, " ") // Normalize spaces
    .trim();
};

export default extractPlainText;
