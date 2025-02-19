import { StyleSheet } from "react-native";

import ScrollView from "@/components/ScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import * as schema from "@/db/schema";
import { desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { Link } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";

export default function TimedTraining() {
  const [data, setData] = useState<schema.TimedTraining[]>([]);

  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });

  useEffect(() => {
    const load = async () => {
      const data = await drizzleDb.query.timedTrainingTable.findMany({
        limit: 10,
        orderBy: [desc(schema.timedTrainingTable.completionTime)],
      });
      setData(data);
    };
    load();
  }, []);

  return (
    <ScrollView>
      <ThemedView style={styles.titleContainer}>
        <Link href="/training/timed-modal">Start Session</Link>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Recent Training Sessions</ThemedText>
        {data.map((item) => (
          <ThemedView key={item.completionTime?.toISOString()}>
            <ThemedText type="defaultSemiBold">
              {item.completionTime?.toDateString()}
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
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
