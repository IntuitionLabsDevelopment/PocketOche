import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet } from "react-native";

import Button from "@/components/Button";
import ScrollView from "@/components/ScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import * as schema from "@/db/schema";
import { desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useCallback, useState } from "react";

export default function TimedTraining() {
  const [data, setData] = useState<schema.TimedTraining[]>([]);
  const router = useRouter();

  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });

  const load = async () => {
    console.log("Loading timed training data...");
    const data = await drizzleDb.query.timedTrainingTable.findMany({
      limit: 10,
      orderBy: [desc(schema.timedTrainingTable.completedAt)],
    });
    setData(data);
  };

  useFocusEffect(
    useCallback(() => {
      load();
    }, []),
  );

  return (
    <ScrollView>
      <ThemedView style={styles.titleContainer}>
        <Button
          title="Start Session"
          onPress={() => router.push("/training/timed-session")}
          style={{ backgroundColor: "#30DD00" }}
        />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Recent Training Sessions</ThemedText>
        {data.map((item) => (
          <ThemedView key={item.completedAt.toISOString()}>
            <ThemedText type="defaultSemiBold">
              {item.completedAt.toDateString()}
            </ThemedText>
            <ThemedText>Triples: {item.triples}</ThemedText>
            <ThemedText>Outers: {item.outers}</ThemedText>
            <ThemedText>Bullseyes: {item.bullseyes}</ThemedText>
            <ThemedText>Doubles: {item.doubles}/60</ThemedText>
          </ThemedView>
        ))}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
    justifyContent: "center",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
