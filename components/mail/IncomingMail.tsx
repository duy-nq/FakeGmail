import {
  COLOR_FONT_BOLD,
  COLOR_FONT_NORMAL,
  COLOR_STAR,
  COLOR_STAR_FOCUS,
} from "@/constants/color";
import { IONICONS_STAR, IONICONS_STAR_FOCUS } from "@/constants/iconConvension";
import Email from "@/types/email.type";
import formatEmailTimestamp from "@/utils/datetime.util";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface IncomingMailProps {
  email: Email;
}

export default function IncomingMail({ email }: IncomingMailProps) {
  const [isStarred, setIsStarred] = useState(email.isStarred);

  // Function to handle icon toggle on press
  const toggleIcon = () => {
    setIsStarred((prev) => !prev); // Toggle the state value
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={{
          uri: email.senderImageUrl,
        }}
      />
      <View style={styles.mailContainer}>
        <View style={styles.mail}>
          <Text
            style={
              email.isRead
                ? [styles.sender, styles.unread]
                : [styles.sender, styles.read]
            }
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {email.senderName}
          </Text>
          <Text
            style={
              email.isRead
                ? [styles.title, styles.unread]
                : [styles.title, styles.read]
            }
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {email.subject}
          </Text>
          <Text style={styles.content} numberOfLines={1} ellipsizeMode="tail">
            {email.body}
          </Text>
        </View>
        <View style={styles.addition}>
          <Text>{formatEmailTimestamp(email.createdAt)}</Text>
          <TouchableOpacity onPress={toggleIcon}>
            {/* Render the icon based on the state */}
            <Icon
              name={isStarred ? IONICONS_STAR_FOCUS : IONICONS_STAR}
              size={20}
              color={isStarred ? COLOR_STAR_FOCUS : COLOR_STAR}
              style={{ paddingBottom: 0.5 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 15,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginHorizontal: 12,
  },
  mailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 12,
    flex: 1,
  },
  addition: {
    maxWidth: 50,
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  mail: {
    alignSelf: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  sender: {
    fontSize: 18,
  },
  title: {
    fontSize: 14,
  },
  content: {
    fontSize: 14,
    color: COLOR_FONT_NORMAL,
  },
  timestamp: {
    fontSize: 14,
    color: "gray",
  },
  unread: {
    fontWeight: 600,
    color: COLOR_FONT_BOLD,
  },
  read: {
    color: COLOR_FONT_NORMAL,
  },
});
