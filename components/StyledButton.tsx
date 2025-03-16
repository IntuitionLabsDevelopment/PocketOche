import { Button, ButtonText } from "@/components/ui/button";
import React from "react";
import { GestureResponderEvent } from "react-native";

interface ButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
}

export default function StyledButton({ title, onPress }: ButtonProps) {
  return (
    <Button
      action={"primary"}
      variant={"solid"}
      size={"md"}
      isDisabled={false}
      onPress={onPress}
    >
      <ButtonText>{title}</ButtonText>
    </Button>
  );
}
