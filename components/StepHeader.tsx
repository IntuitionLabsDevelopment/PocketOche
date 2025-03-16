import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Text } from "@/components/ui/text";
import React from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "./ui/icon";

interface StepHeaderProps {
  currentIndex: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
}

export const StepHeader = ({
  currentIndex,
  totalSteps,
  onBack,
  onNext,
}: StepHeaderProps) => {
  return (
    <Center className="flex-row">
      <Button
        action={"primary"}
        variant={"outline"}
        size={"sm"}
        onPress={onBack}
        isDisabled={currentIndex === 0}
      >
        <ButtonIcon as={ArrowLeftIcon} />
        <ButtonText>Back</ButtonText>
      </Button>
      <Text bold={true} size="3xl" className="mx-4">
        {currentIndex + 1} / {totalSteps}
      </Text>
      <Button
        action={"primary"}
        variant={"outline"}
        size={"sm"}
        onPress={onNext}
        isDisabled={currentIndex === totalSteps - 1}
      >
        <ButtonText>Next</ButtonText>
        <ButtonIcon as={ArrowRightIcon} />
      </Button>
    </Center>
  );
};
