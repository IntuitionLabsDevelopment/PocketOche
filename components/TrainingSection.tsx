import { Center } from "./ui/center";
import { Heading } from "./ui/heading";

interface TrainingSectionProps {
  children: React.ReactNode;
  headerText: string;
}

export default function TrainingSection({
  children,
  headerText,
}: TrainingSectionProps) {
  return (
    <Center>
      <Heading size="3xl">{headerText}</Heading>
      {children}
    </Center>
  );
}
