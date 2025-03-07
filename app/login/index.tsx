import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useMainStore } from "@/stores/main.store";
import { useEmailStore } from "@/stores/email.store";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  const router = useRouter();

  const { fGetProfile, fGetOthers, setMainStore, mainEmail } = useMainStore();
  const { fGetEmails } = useEmailStore();

  const validateEmail = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  };

  const fetchData = async () => {
    try {
      const profile = await fGetProfile(email);
      if (!profile) {
        return false;
      }

      await Promise.all([fGetEmails(email), fGetOthers(email)]); 

      return true;
    } catch (error) {
      console.log("Login error:", error);
      return false;
    }
  };

  const handleNext = async () => {
    if (validateEmail(email)) {
      if (email == mainEmail) {
        console.log("Email already logged in");
        alert("Email already logged in, redirecting to home page");
        router.replace("/");
        return;
      }
      console.log("Proceeding with email:", email);
    } else {
      setIsValid(false);
      return;
    }

    if (await fetchData()) {
      setMainStore("mainEmail", email);
      console.log("Login successful");
      router.replace("/");
    } else {
      console.log("Login failed");
      alert("Cannot find your email. Please try again.");
      return;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <View style={styles.content}>
          <Image
            source={require("@/assets/images/google.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>Sign in</Text>
          <Text style={styles.subtitle}>to continue to Gmail</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, !isValid && styles.inputError]}
              placeholder="Email or phone"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setIsValid(true);
              }}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            {!isValid && (
              <Text style={styles.errorText}>Enter a valid email address</Text>
            )}

            <Text style={styles.forgotText}>Forgot email?</Text>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.infoText}>
              Not your computer? Use Guest mode to sign in privately.
            </Text>
            <Text style={styles.learnMore}>Learn more</Text>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.createButton}
              onPress={() => router.replace("/")}
            >
              <Text style={styles.createButtonText}>Go back?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  keyboardAvoid: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    alignItems: "center",
  },
  logo: {
    width: 75,
    height: 25,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    color: "#202124",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#5f6368",
    marginBottom: 32,
  },
  inputContainer: {
    width: "100%",
    maxWidth: 400,
    marginBottom: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: "#dadce0",
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    color: "#202124",
  },
  inputError: {
    borderColor: "#d93025",
  },
  errorText: {
    color: "#d93025",
    fontSize: 12,
    marginTop: 8,
  },
  forgotText: {
    color: "#1a73e8",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 16,
  },
  infoSection: {
    width: "100%",
    maxWidth: 400,
    marginBottom: 32,
  },
  infoText: {
    fontSize: 14,
    color: "#5f6368",
    lineHeight: 20,
  },
  learnMore: {
    color: "#1a73e8",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 8,
  },
  buttonRow: {
    width: "100%",
    maxWidth: 400,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  createButton: {
    paddingVertical: 10,
  },
  createButtonText: {
    color: "#1a73e8",
    fontSize: 14,
    fontWeight: "500",
  },
  nextButton: {
    backgroundColor: "#1a73e8",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  nextButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
});
