import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet } from "react-native";

import Button from "@/components/Button";
import ScrollView from "@/components/ScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import * as schema from "@/db/schema";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Picker } from "@react-native-picker/picker";
import { desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useCallback, useState } from "react";

export default function TimedTraining() {
  const [data, setData] = useState<schema.TimedTraining[]>([]);
  const [selectedTime, setSelectedTime] = useState(5);
  const textColor = useThemeColor({}, "text");
  const router = useRouter();

  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });

  const load = async () => {
    const data = await drizzleDb.query.timedTrainingTable.findMany({
      limit: 10,
      orderBy: [desc(schema.timedTrainingTable.completedAt)],
    });
    setData(data);
  };

  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  return (
    <ScrollView>
      <ThemedText type="description">
        Use timed training to improve your aim at the board. You will have a set
        amount of time to hit as many triple 20's, then bullseyes as possible.
        After the two timed rounds, you will finish by going around the board
        from 1-20, with three darts at each number, hitting as many doubles as
        you can.
      </ThemedText>
      <ThemedView>
        <ThemedText type="defaultSemiBold">Select Time Per Round</ThemedText>
        <Picker
          selectedValue={selectedTime}
          onValueChange={(itemValue, itemIndex) => setSelectedTime(itemValue)}
          style={{ color: textColor }}
          dropdownIconColor={textColor}
        >
          <Picker.Item label="No timer" value={-1} />
          <Picker.Item label="3 Minutes" value={3} />
          <Picker.Item label="5 Minutes" value={5} />
          <Picker.Item label="10 Minutes" value={10} />
        </Picker>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <Button
          title="Start New Session"
          onPress={() =>
            router.push(`/training/timed-session?time=${selectedTime}`)
          }
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
