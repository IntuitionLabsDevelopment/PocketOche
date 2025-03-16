import React from "react";
import { Text } from "./ui/text";

export function Timer({ secondsLeft }: { secondsLeft: number }) {
  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;

  return (
    <Text size="xl">
      {mins}:{secs < 10 ? `0${secs}` : secs}
    </Text>
  );
}
