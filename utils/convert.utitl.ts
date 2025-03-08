const formatTextToSave = (text: string): string => {
  const lines = text.split("\n");

  return lines.map((line) => `<p>${line || "<br>"}</p>`).join("");
};

export default formatTextToSave;