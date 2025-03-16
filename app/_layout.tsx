import migrations from "@/drizzle/migrations";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as SQLite from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import { Suspense, useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { SQLiteProvider } from "expo-sqlite";

const DATABASE_NAME = "pocketoche.db";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const expo = SQLite.openDatabaseSync(DATABASE_NAME);
  const db = drizzle(expo);

  const { success, error } = useMigrations(db, migrations);
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded && success) {
      SplashScreen.hideAsync();
    }
  }, [loaded, success]);

  if (!loaded) {
    return null;
  }

  if (error) {
    return (
      <GluestackUIProvider mode="light">
        <View>
          <Text>Migration error: {error.message}</Text>
        </View>
      </GluestackUIProvider>
    );
  }

  if (!success) {
    return (
      <GluestackUIProvider mode="light">
        <View>
          <Text>Migration is in progress...</Text>
        </View>
      </GluestackUIProvider>
    );
  }

  return (
    <GluestackUIProvider mode="light">
      <Suspense fallback={<ActivityIndicator size="large" />}>
        <SQLiteProvider
          databaseName={DATABASE_NAME}
          options={{ enableChangeListener: true }}
          useSuspense
        >
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="training" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </SQLiteProvider>
      </Suspense>
    </GluestackUIProvider>
  );
}
