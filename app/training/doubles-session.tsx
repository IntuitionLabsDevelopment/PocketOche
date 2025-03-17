import { AroundTheDoubles } from "@/components/AroundTheDoubles";
import ScrollView from "@/components/ScrollView";
import { useRouter } from "expo-router";
import React from "react";

export default function TimedSession() {
  const router = useRouter();

  const onFinish = async () => {
    // Save scores to db

    // Go back to main screen
    router.back();
  };

  return (
    <ScrollView>
      <AroundTheDoubles onFinish={onFinish} setDoubles={() => null} />
    </ScrollView>
  );
}
