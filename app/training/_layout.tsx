import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="timed" options={{ title: "Timed Training" }} />
      <Stack.Screen
        name="timed-session"
        options={{ title: "Timed Training Session" }}
      />
      <Stack.Screen name="doubles" options={{ title: "Around the Doubles" }} />
      <Stack.Screen
        name="doubles-session"
        options={{ title: "Doubles Session" }}
      />
    </Stack>
  );
}
