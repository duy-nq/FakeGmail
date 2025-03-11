import { useWindowDimensions } from "react-native";
import RenderHTML from "react-native-render-html";
import Email from "@/types/email.type";

interface RenderViewProps {
  email: Email;
}

export default function RenderView({ email }: RenderViewProps) {
  const { width } = useWindowDimensions();

  return (
    <RenderHTML
      contentWidth={width}
      source={{ html: email.body }}
      tagsStyles={{
        p: {
          fontSize: 16,
          color: "#202124",
          lineHeight: 24,
          marginVertical: 1,
        },
        a: { color: "#1a73e8", textDecorationLine: "underline" },
        h1: {
          fontSize: 24,
          fontWeight: "bold",
          color: "#202124",
          marginBottom: 8,
        },
        h2: {
          fontSize: 20,
          fontWeight: "bold",
          color: "#202124",
          marginBottom: 6,
        },
        h3: {
          fontSize: 18,
          fontWeight: "bold",
          color: "#202124",
          marginBottom: 4,
        },
        blockquote: {
          fontStyle: "italic",
          borderLeftWidth: 4,
          borderLeftColor: "#ccc",
          paddingLeft: 10,
          marginVertical: 8,
          color: "#5f6368",
        },
        strong: { fontWeight: "bold" },
        em: { fontStyle: "italic" },
      }}
    />
  );
}
