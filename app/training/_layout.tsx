import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="timed" options={{ title: "Timed Training" }} />
      <Stack.Screen
        name="timed-modal"
        options={{ presentation: "modal", title: "Timed Training Session" }}
      />
    </Stack>
  );
}
