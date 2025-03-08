const extractPlainText = (html: string) => {
  return html
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
};

export default extractPlainText;