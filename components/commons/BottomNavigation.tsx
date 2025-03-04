import { COLOR_BAR } from "@/constants/color";
import TabType from "@/types/tab.type";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";

interface BottomNavigationProps {
  tabs: TabType[];
};

export default function BottomNavigation({tabs}: BottomNavigationProps) {
  return (
    <Tabs
      screenOptions={
        {
          tabBarHideOnKeyboard: true,
        }
      }
    >
      {tabs.map((tab, index) => (
        <Tabs.Screen 
          key={index}
          name={tab.to}
          options={
            {
              headerShown: false,
              tabBarIcon: ({ focused }) => focused ? 
                tab.iconFocused : 
                tab.icon,
              tabBarShowLabel: false,
              tabBarBadge: tab.unread == 0 ? undefined : tab.unread <= 99 ? tab.unread : "99+",
              tabBarBadgeStyle: tab.unread <= 99 ? [styles.bagdeStyle, {width: 22}] : [styles.bagdeStyle, {width: 28}],
              tabBarItemStyle: styles.tabBarItemStyle
            }
          }
        />
      ))}
    </Tabs>
  );
};

const styles = StyleSheet.create({
    bagdeStyle: {
        top: -4,
        left: 18,
        height: 16,
        backgroundColor: "#900",
        color: "white",
        fontSize: 12,
        fontWeight: "700",
        lineHeight: 16,
        textAlign: "center",
        textAlignVertical: "center",
        letterSpacing: 0.25,
    },
    tabBarItemStyle: {
        alignContent: "space-around",
        paddingTop:5,
        backgroundColor: COLOR_BAR
    }
});