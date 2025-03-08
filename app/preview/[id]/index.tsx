import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEmailStore } from "@/stores/email.store";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import IonIcons from "react-native-vector-icons/Ionicons";
import Email from "@/types/email.type";
import RenderView from "@/components/renders/RenderView";
import Overview from "@/components/mail/Overview";

export default function EmailPreview() {
  const [email, setEmail] = useState<Email | null>(null);
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { emails } = useEmailStore();

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (id && emails) {
      const foundEmail = emails.find((e) => e.id === id);
      if (foundEmail) {
        setEmail(foundEmail);
      }
    }
  }, [id, emails]);

  const handleBack = () => {
    router.back();
  };

  if (!email) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={handleBack}>
          <Icon name="arrow-back" size={24} color="#5f6368" />
        </TouchableOpacity>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <IonIcons name="archive-outline" size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <MaterialCommunityIcons name="trash-can-outline" size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <IonIcons name="mail-unread-outline" size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <MaterialCommunityIcons name="dots-vertical" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Subject */}
        <View style={styles.subjectContainer}>
          <Text style={styles.subject}>{email.subject}</Text>

          <View style={styles.labelContainer}>
            {email.labels &&
              email.labels.map((label, index) => (
                <View key={index} style={styles.label}>
                  <Text style={styles.labelText}>{label}</Text>
                </View>
              ))}
          </View>

          <TouchableOpacity>
            <IonIcons name="star-outline" size={24} />
          </TouchableOpacity>
        </View>

        {/* Sender info */}
        <Overview email={email} />

        {/* Email body */}
        <View style={styles.emailBody}>
          <RenderView email={email} />
          {email.attachments && email.attachments.length > 0 && (
            <View style={styles.attachmentsContainer}>
              <Text style={styles.attachmentsTitle}>
                Attachments ({email.attachments.length})
              </Text>

              {email.attachments.map((attachment, index) => (
                <View key={index} style={styles.attachment}>
                  <Icon name="document-outline" size={24} color="#5f6368" />
                  <View style={styles.attachmentInfo}>
                    <Text style={styles.attachmentName}>{attachment}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 56,
    paddingHorizontal: 10,
  },
  headerActions: {
    flexDirection: "row",
    gap: 18,
  },
  headerButton: {},
  scrollView: {
    flex: 1,
  },
  subjectContainer: {
    paddingVertical: 18,
    marginHorizontal: 12,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  subject: {
    fontSize: 20,
    fontWeight: "500",
    color: "#202124",
    flex: 1,
  },
  labelContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  label: {
    backgroundColor: "#f1f3f4",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 8,
    marginBottom: 4,
  },
  labelText: {
    fontSize: 12,
    color: "#5f6368",
  },
  senderContainer: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f3f4",
    alignItems: "center",
  },
  senderAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1a73e8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
  senderInfo: {
    flex: 1,
  },
  senderNameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  senderName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#202124",
  },
  emailDate: {
    fontSize: 14,
    color: "#5f6368",
  },
  senderEmail: {
    fontSize: 14,
    color: "#5f6368",
  },
  emailActions: {
    flexDirection: "row",
  },
  actionButton: {
    padding: 8,
  },
  emailBody: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f3f4",
  },
  bodyText: {
    fontSize: 16,
    color: "#202124",
    lineHeight: 24,
  },
  attachmentsContainer: {
    marginTop: 20,
    padding: 8,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
  },
  attachmentsTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#5f6368",
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  attachment: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 4,
    marginBottom: 8,
    backgroundColor: "white",
  },
  attachmentInfo: {
    marginLeft: 12,
  },
  attachmentName: {
    fontSize: 14,
    color: "#202124",
    marginBottom: 2,
  },
  attachmentSize: {
    fontSize: 12,
    color: "#5f6368",
  },
  replyContainer: {
    flexDirection: "row",
    padding: 16,
    justifyContent: "space-around",
  },
  replyButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    paddingHorizontal: 16,
    backgroundColor: "#f1f3f4",
    borderRadius: 20,
  },
  replyText: {
    fontSize: 14,
    color: "#5f6368",
    marginLeft: 8,
    fontWeight: "500",
  },
  bottomBar: {
    height: 56,
    borderTopWidth: 1,
    borderTopColor: "#f1f3f4",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  composeButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#f1f3f4",
    justifyContent: "center",
    alignItems: "center",
  },
});
