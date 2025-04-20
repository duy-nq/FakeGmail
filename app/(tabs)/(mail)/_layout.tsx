import FloatingButton from "@/components/buttons/FloatingButtonNew";
import AnimatedSearchBar from "@/components/search/AnimatedSearchBar";
import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MailLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <View style={styles.container}>
        <AnimatedSearchBar />
        <View style={styles.mailContainer}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
          </Stack>
        </View>
        <FloatingButton />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mailContainer: {
    flex: 1,
  },
});
