import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { Suspense, useEffect } from "react";
import "react-native-reanimated";
import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { ActivityIndicator, Text, View } from "react-native";
import { TimedTraining, timedTrainingTable } from "@/db/schema";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";

import { useColorScheme } from "@/hooks/useColorScheme";
import { SQLiteProvider } from "expo-sqlite";

const DATABASE_NAME = "pocketoche.db";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const expo = SQLite.openDatabaseSync(DATABASE_NAME);
  const db = drizzle(expo);

  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    if (!success) return;

    (async () => {
      await db.delete(timedTrainingTable);

      const dummyData: TimedTraining[] = Array.from(
        { length: 12 },
        (_, index) => {
          const date = new Date();
          date.setDate(index);
          return {
            completionTime: date,
            triples: Math.floor(Math.random() * 20) + 1,
            outers: Math.floor(Math.random() * 20) + 1,
            bullseyes: Math.floor(Math.random() * 20) + 1,
            doubles: Math.floor(Math.random() * 20) + 1,
          };
        },
      );

      console.log("Inserting dummy data...");

      await db.insert(timedTrainingTable).values(dummyData);
    })();
  }, [success]);

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  if (error) {
    return (
      <View>
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }

  if (!success) {
    return (
      <View>
        <Text>Migration is in progress...</Text>
      </View>
    );
  }

  return (
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
  );
}
