import { Stack } from "expo-router";

export default function MeetLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="meet"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
