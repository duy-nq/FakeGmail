import { Tabs } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";

export default function TabsLayout() {
    return (
        <Tabs>
            <Tabs.Screen 
                name="index"
                options={
                    {
                        headerShown: false,
                        tabBarIcon: () => <Icon name="rocket" size={40} color="#900" />,
                    }
                }
            />
            <Tabs.Screen 
                name="meet"
                options={
                    {
                        headerShown: false,
                        tabBarIcon: () => <Icon name="rocket" size={30} color="#900" />
                    }
                }
            />
        </Tabs>
    );
};