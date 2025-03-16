import TimedTraining from "@/components/TimedTraining";
import * as schema from "@/db/schema";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useState } from "react";

export default function TimedSession() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    time?: string;
  }>();
  const time = params.time ? parseInt(params.time) : 0;

  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, {
    schema,
  });
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

  return (
    <TimedTraining
      setBullseyes={setBullseyes}
      setDoubles={setDoubles}
      setOuters={setOuters}
      setTriples={setTriples}
      onFinish={onFinish}
      minsPerRound={time}
    />
  );
}
