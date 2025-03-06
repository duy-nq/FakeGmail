import { createContext, useContext } from "react";
import { Animated } from "react-native";

import { ReactNode } from "react";

const ScrollContextMail = createContext<{
  scrollY: Animated.Value;
  searchBarTranslateY: Animated.AnimatedInterpolation<string | number>;
  tabBarTranslateY: Animated.AnimatedInterpolation<string| number>;
  floatingButtonScale: Animated.AnimatedInterpolation<string | number>;
	floatingButtonWidth: Animated.AnimatedInterpolation<string | number>;
	floatingButtonTextPosition: Animated.AnimatedInterpolation<string | number>;
} | null>(null);

export function ScrollProvider({ children }: { children: ReactNode }) {
  const scrollY = new Animated.Value(0);

  const searchBarTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -73],
    extrapolate: "clamp",
  });

  const tabBarTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 50],
    extrapolate: "clamp",
  });

  const floatingButtonScale = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.8],
    extrapolate: "clamp",
  });

	const floatingButtonWidth = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [140, 55],
    extrapolate: "clamp",
  });

  const floatingButtonTextPosition = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 50],
    extrapolate: "clamp",
  });

  return (
    <ScrollContextMail.Provider
      value={{ scrollY, searchBarTranslateY, tabBarTranslateY, floatingButtonScale, floatingButtonWidth, floatingButtonTextPosition }}
    >
      {children}
    </ScrollContextMail.Provider>
  );
}

export function useScrollContextMail() {
  const context = useContext(ScrollContextMail);
  if (!context) {
    throw new Error(
      "useScrollContextMail must be used within a ScrollProvider"
    );
  }
  return context;
}
