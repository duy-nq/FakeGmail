import { useMainStore } from "@/stores/main.store";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useEmailStore } from "@/stores/email.store";
import Email from "@/types/email.type";
import "react-quill/dist/quill.snow.css";
import * as DocumentPicker from "expo-document-picker";
import File from "@/types/file.type";

import formatTextToSave from "@/utils/convert.utitl";
import Attachment from "@/components/mail/Attactment";

export default function Editor() {
  const router = useRouter();
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [bodyHeight, setBodyHeight] = useState(40);

  const { profile } = useMainStore();
  const { fSendEmail } = useEmailStore();

  const handleBack = () => {
    router.back();
  };

  const handleSend = async () => {
    if (recipient === "") {
      alert("Recipient is required");
      return;
    }

    if (body === "") {
      alert("Email body is required");
      return;
    }

    const payload: Email = {
      id: "",
      sender: profile.email,
      senderName: profile.displayName,
      senderImageUrl: profile.imageUrl,
      recipients: recipient.split(","),
      subject: subject === "" ? "No Subject" : subject,
      body: formatTextToSave(body),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      attachments: [],
      labels: [],
      isRead: false,
      isStarred: false,
      isDelete: false,
      isDraft: false,
    };

    if ((await fSendEmail(payload)) != null) {
      alert("Email sent successfully");
      router.back();
    } else {
      alert("Failed to send email");
      return;
    }
  };

  const handleUploadAttachment = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        multiple: true,
      });

      if (result.canceled) {
        return;
      }

      const attachments = result.assets.map(
        (file) =>
          ({
            fileName: file.name,
            uri: file.uri,
            type: file.mimeType || "unknown",
            size: file.size || 0,
          } as File)
      );

      setAttachments(attachments);
    } catch (error) {
      console.log("Error uploading attachment", error);
    }
  };

  const handleRemoveAttachment = (fileName: string) => {
    const newAttachments = attachments.filter(
      (file) => file.fileName !== fileName
    );
    setAttachments(newAttachments);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.headerButton}>
            <Icon name="arrow-back" size={24} color="#5f6368" />
          </TouchableOpacity>

          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={handleUploadAttachment}
            >
              <Icon name="attach" size={24} color="#5f6368" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <MaterialIcons
                name="send"
                size={24}
                color="#5f6368"
                onPress={handleSend}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <MaterialIcons name="more-vert" size={24} color="#5f6368" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.scrollView}>
          {/* From field */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>From</Text>
            <Text style={styles.fromEmail}>{profile.email}</Text>
          </View>

          <View style={styles.divider} />

          {/* Recipients */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>To</Text>
            <TextInput
              style={styles.inputField}
              value={recipient}
              onChangeText={setRecipient}
              placeholder="Recipients"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.divider} />

          {/* Subject */}
          <TextInput
            style={styles.subjectInput}
            value={subject}
            onChangeText={setSubject}
            placeholder="Subject"
          />

          {/* Email body */}
          <TextInput
            style={[styles.bodyInput, { height: bodyHeight }]}
            onContentSizeChange={(e) => {
              const newHeight = e.nativeEvent.contentSize.height;
              setBodyHeight(newHeight); // Ensure it shrinks back
            }}
            value={body}
            onChangeText={setBody}
            placeholder="Compose email"
            multiline={true}
            textAlignVertical="top"
          />

          <View
            style={{
              flexDirection: "row",
              gap: 8,
              flexWrap: "wrap",
              marginVertical: 12,
            }}
          >
            {attachments.map((file, index) => {
              return <Attachment key={index} file={file} onRemove={handleRemoveAttachment} />;
            })}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f3f4",
  },
  headerActions: {
    flexDirection: "row",
  },
  headerButton: {
    padding: 12,
  },
  scrollView: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  inputLabel: {
    width: 40,
    fontSize: 16,
    color: "#5f6368",
  },
  fromEmail: {
    fontSize: 16,
    color: "#202124",
  },
  inputField: {
    flex: 1,
    fontSize: 16,
    color: "#202124",
    paddingVertical: 0,
    paddingLeft: 1,
  },
  divider: {
    height: 1,
    backgroundColor: "#f1f3f4",
    marginHorizontal: 16,
  },
  ccBccContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  ccBccButton: {
    marginRight: 16,
  },
  ccBccText: {
    fontSize: 16,
    color: "#5f6368",
  },
  subjectInput: {
    fontSize: 16,
    color: "#202124",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  bodyInput: {
    fontSize: 16,
    color: "#202124",
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 40,
    maxHeight: "40%",
  },
  formatBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#f1f3f4",
    backgroundColor: "#f9f9f9",
  },
  formatButton: {
    padding: 12,
    marginHorizontal: 4,
  },
});
