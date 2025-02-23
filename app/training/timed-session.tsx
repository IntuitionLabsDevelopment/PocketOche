import Button from "@/components/Button";
import ScrollView from "@/components/ScrollView";
import Tally from "@/components/Tally";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import TimedSections from "@/components/TimedSections";
import * as schema from "@/db/schema";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { StyleSheet } from "react-native";

export default function TimedSession() {
  const router = useRouter();

  const params = useLocalSearchParams<{ time?: string }>();
  const time = params.time ? parseInt(params.time) : 5;
  const timerInterval = time * 60 * 1000;

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
      timeInterval: time > 0 ? time : null,
    };

    await drizzleDb.insert(schema.timedTrainingTable).values(scores);

    // Go back to main screen
    router.back();
  };

  const triplesSection = (
    <ThemedView style={styles.section}>
      <ThemedText type="title">Triples</ThemedText>
      <Tally onChange={setTriples} allowNegative={false} />
    </ThemedView>
  );

  const bullSection = (
    <ThemedView style={styles.section}>
      <ThemedText type="title">Bullseyes</ThemedText>
      <ThemedView style={styles.bull}>
        <Tally heading="Outer" onChange={setOuters} allowNegative={false} />
        <Tally heading="Bull" onChange={setBullseyes} allowNegative={false} />
      </ThemedView>
    </ThemedView>
  );

  const doublesSection = (
    <ThemedView style={styles.section}>
      <ThemedText type="title">Doubles</ThemedText>
      <Tally onChange={setDoubles} allowNegative={false} />
      <Button
        title="Finish"
        onPress={onFinish}
        style={{ backgroundColor: "#30DD00" }}
      />
    </ThemedView>
  );

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <TimedSections
          sections={[
            { component: triplesSection, timed: time > 0 },
            { component: bullSection, timed: time > 0 },
            { component: doublesSection },
          ]}
          interval={timerInterval}
        />
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
