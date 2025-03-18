import { Text } from "@/components/ui/text";
import * as schema from "@/db/schema";
import { desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useCallback, useState } from "react";
import { Divider } from "../ui/divider";
import { Heading } from "../ui/heading";
import { VStack } from "../ui/vstack";

export default function DoublesPastSummary() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, {
    schema,
  });
  const [doublesData, setDoublesData] = useState<schema.DoublesTraining[]>([]);
  const loadData = async () => {
    const data = await drizzleDb.query.doublesTrainingTable.findMany({
      limit: 10,
      orderBy: [desc(schema.doublesTrainingTable.completedAt)],
    });
    setDoublesData(data);
  };
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );
  const DoublesRowSummary = ({
    doubles,
  }: {
    doubles: schema.DoublesTraining;
  }) => {
    const scoresTotal = doubles.scores.reduce((a, b) => a + b);
    return (
      <VStack>
        <Text>{doubles.completedAt.toDateString()}</Text>
        <Text>Overall: {scoresTotal}/60</Text>
        <Text>Accuracy: {((scoresTotal / 60) * 100).toFixed(2)}%</Text>
      </VStack>
    );
  };
  return (
    <VStack>
      <Heading>Recent Sessions</Heading>
      {doublesData.map((row, i) => (
        <>
          <DoublesRowSummary key={i} doubles={row} />
          <Divider />
        </>
      ))}
    </VStack>
  );
}
