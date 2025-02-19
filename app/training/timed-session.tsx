import ScrollView from "@/components/ScrollView";
import Tally from "@/components/Tally";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import * as schema from "@/db/schema";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { Button, StyleSheet } from "react-native";

export default function TimedSession() {
  const router = useRouter();

  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });

  const [triples, setTriples] = useState(0);
  const [outers, setOuters] = useState(0);
  const [bullseyes, setBullseyes] = useState(0);
  const [doubles, setDoubles] = useState(0);

  const onFinish = async () => {
    // Save scores to db
    const scores = {
      triples,
      outers,
      bullseyes,
      doubles,
    };

    await drizzleDb.insert(schema.timedTrainingTable).values(scores);

    // Go back to main screen
    router.back();
  };

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.section}>
          <ThemedText type="title">Triples</ThemedText>
          <Tally onChange={setTriples} allowNegative={false} />
        </ThemedView>
        <ThemedView style={styles.section}>
          <ThemedText type="title">Bullseyes</ThemedText>
          <ThemedView style={styles.bull}>
            <Tally heading="Outer" onChange={setOuters} allowNegative={false} />
            <Tally
              heading="Bull"
              onChange={setBullseyes}
              allowNegative={false}
            />
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.section}>
          <ThemedText type="title">Doubles</ThemedText>
          <Tally onChange={setDoubles} allowNegative={false} />
        </ThemedView>
        <Button title="Finish" onPress={onFinish} />
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginVertical: 16,
  },
  bull: {
    marginTop: 8,
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-evenly",
  },
});
