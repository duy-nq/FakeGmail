import { MATERIALCOMMUNITYICONS_PENCIL } from "@/constants/iconConvension";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleSheet, Pressable, Animated, View } from "react-native";
import { useRef } from "react";
import { useScrollContextMail } from "@/contexts/ScrollContextMail";
import { useRouter } from "expo-router";

export default function FloatingButton() {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const { floatingButtonTextPosition, floatingButtonWidth } = useScrollContextMail();
const router = useRouter();

  const onPressIn = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const onBlur = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const handlePress = () => {
    console.log("Pressed");
    router.push("/editor");
  };

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(220, 226, 250, 1)", "rgba(180, 190, 240, 1)"],
  });

  return (
    <Animated.View style={[
      styles.floatingButton, 
      { 
        backgroundColor,
        width: floatingButtonWidth,
      }
    ]}>
      <Pressable
        style={styles.pressableArea}
        onPressIn={onPressIn}
        onPressOut={onBlur}
        onPress={handlePress}
      >
        <MaterialCommunityIcon name={MATERIALCOMMUNITYICONS_PENCIL} size={26} />
        <View style={styles.textContainer}>
          <Animated.Text style={[styles.buttonText, { translateX: floatingButtonTextPosition }]}>
            Compose
          </Animated.Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    flexDirection: "row",
    position: "absolute",
    right: 20,
    bottom: 20,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 15,
    justifyContent: "space-around",
    alignItems: "center",
    elevation: 6, // for shadow on Android
    shadowColor: "#000000", // for shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    minWidth: 55,
    height: 60,
  },
  pressableArea: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "black",
    fontWeight: 500,
    fontSize: 16,
    paddingLeft: 10,
    height: 25,
  },
  textContainer: {
    overflow: "hidden",
    flex: 1,
  },
});
