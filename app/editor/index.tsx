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

import formatTextToSave from "@/utils/convert.utitl";

export default function Editor() {
  const router = useRouter();
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

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
    }

    if (await fSendEmail(payload) != null) {
      alert("Email sent successfully");
      router.back();
    } else {
      alert("Failed to send email");
      return;
    }
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
            <TouchableOpacity style={styles.headerButton}>
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

          <View style={styles.divider} />

          {/* Email body */}
          <TextInput
            style={styles.bodyInput}
            value={body}
            onChangeText={setBody}
            placeholder="Compose email"
            multiline
            textAlignVertical="top"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
    flex: 1,
    fontSize: 16,
    color: "#202124",
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 200,
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
