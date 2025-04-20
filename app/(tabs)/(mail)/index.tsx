import React, { useState } from "react";
import {
  StyleSheet,
  RefreshControl,
  Animated,
  FlatList,
  Text,
} from "react-native";
import IncomingMail from "@/components/mail/IncomingMail";
import {
  COLOR_GOOGLE_BLUE,
  COLOR_GOOGLE_GREEN,
  COLOR_GOOGLE_RED,
  COLOR_GOOGLE_YELLOW,
} from "@/constants/color";
import { mockEmails } from "@/constants/mailData";
import { useScrollContextMail } from "@/contexts/ScrollContextMail";
import { useEmailStore } from "@/stores/email.store";
import { useMainStore } from "@/stores/main.store";

const colors = ["#34A853", "#4285F4", "#EA4335", "#FBBC05"]; // Google colors

export default function MailList() {
  const [refreshing, setRefreshing] = useState(false);
  const [spinnerColor] = useState(new Animated.Value(0)); // Animated value for color transition
  const { emails, fGetEmails } = useEmailStore();
  const { mainEmail } = useMainStore();

  // Function to refresh mails
  const onRefresh = async () => {
    setRefreshing(true);
    startColorAnimation(); // Start animation

    await fGetEmails(mainEmail).then(() => {
      setRefreshing(false);
    });
  };

  // Function to animate spinner color
  const startColorAnimation = () => {
    Animated.loop(
      Animated.timing(spinnerColor, {
        toValue: colors.length - 1, // Cycle through all colors
        duration: 1500,
        useNativeDriver: false, // Required for backgroundColor animations
      })
    ).start();
  };

  const { scrollY } = useScrollContextMail();

  return (
    <FlatList
      data={emails}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <IncomingMail email={item} />}
      contentContainerStyle={styles.scrollViewContent}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
      )}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          progressViewOffset={100}
          colors={[
            COLOR_GOOGLE_RED,
            COLOR_GOOGLE_BLUE,
            COLOR_GOOGLE_YELLOW,
            COLOR_GOOGLE_GREEN,
          ]}
          tintColor={COLOR_GOOGLE_BLUE}
        />
      }
      ListHeaderComponent={
        <Text style={{ textAlign: "left", padding: 12 }}>Incoming Mails</Text>
      }
      ListEmptyComponent={
        <Text
          style={{
            textAlign: "center",
            padding: 12,
            color: "#000",
            fontSize: 24,
          }}
        >
          It's empty here!
        </Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 90,
    paddingTop: 80,
    backgroundColor: "#fff",
  },
});
