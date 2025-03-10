import { COLOR_FONT_BOLD, COLOR_FONT_NORMAL } from "@/constants/color";
import Email from "@/types/email.type";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { Image } from "react-native";
import IonIcons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { formatEmailDate } from "@/utils/datetime.util";
import { useState } from "react";
import OverviewExtend from "./OverviewExtend";

interface OverviewProps {
  email: Email;
}

export default function Overview({ email }: OverviewProps) {
  const [isHidden, setIsHidden] = useState(true);
  const spinValue = new Animated.Value(0);

  Animated.timing(spinValue, {
    toValue: isHidden ? 0 : 1,
    duration: 50,
    easing: Easing.linear,
    useNativeDriver: true,
  }).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "360deg"],
  });

  return (
    <View style={styles.biggerContainer}>
      <TouchableOpacity>
        <View style={styles.container}>
          <Image
            style={styles.avatar}
            source={{
              uri: email.senderImageUrl,
            }}
          />
          <View style={styles.mailContainer}>
            <View style={styles.mail}>
              <View style={styles.nameAndDate}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={[styles.unread, styles.sender]}
                >
                  {email.senderName}
                </Text>
                <MaterialIcons
                  name="verified"
                  size={16}
                  style={{ color: "blue" }}
                />
                <Text style={{ fontSize: 12 }}>
                  {formatEmailDate(email.createdAt)}
                </Text>
              </View>
              <TouchableOpacity onPress={() => setIsHidden(!isHidden)}>
                <View style={styles.recipientInfo}>
                  <Text numberOfLines={1} ellipsizeMode="tail">
                    to me
                  </Text>
                  <Animated.View style={{ transform: [{ rotate: spin }] }}>
                    <IonIcons name="chevron-down-outline" size={12} />
                  </Animated.View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.addition}>
              <TouchableOpacity>
                <IonIcons name="happy-outline" size={24} />
              </TouchableOpacity>
              <TouchableOpacity>
                <IonIcons name="return-up-back" size={24} />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialCommunityIcons name="dots-vertical" size={24} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <OverviewExtend email={email} hidden={isHidden} />
    </View>
  );
}

export const styles = StyleSheet.create({
  biggerContainer: {
    flexDirection: "column",
  },
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 15,
    paddingHorizontal: 12,
    flex: 1,
    gap: 10,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 40,
  },
  mailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "flex-start",
    flex: 1,
  },
  addition: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    gap: 18,
  },
  mail: {
    justifyContent: "center",
    flex: 1,
    gap: 8,
  },
  sender: {
    fontSize: 16,
    width: "auto",
    maxWidth: 120,
  },
  title: {
    fontSize: 12,
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
  recipientInfo: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 2,
  },
  nameAndDate: {
    flexDirection: "row",
    flex: 1,
    marginRight: 12,
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 6,
  },
});
