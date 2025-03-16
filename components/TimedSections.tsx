import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { StepHeader } from "./StepHeader";
import { Timer } from "./Timer";

interface TimedSection {
  component: React.ReactNode;
  isTimed?: boolean;
}

interface TimedSectionsProps {
  sections: TimedSection[];
  interval: number; // interval in milliseconds
}

export default function TimedSections({
  sections,
  interval,
}: TimedSectionsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(interval / 1000);

  const resetSecondsLeft = () => {
    setSecondsLeft(interval / 1000);
  };
  const nextPage = () => {
    if (currentIndex < sections.length - 1) {
      setCurrentIndex(currentIndex + 1);
      resetSecondsLeft();
    }
  };
  const previousPage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      resetSecondsLeft();
    }
  };

  useEffect(() => {
    const nextSectionTimer = setInterval(() => {
      if (!sections[currentIndex].isTimed) {
        return;
      }
      nextPage();
    }, interval);

    return () => clearInterval(nextSectionTimer);
  }, [currentIndex, interval]);

  useEffect(() => {
    let timeLeft: NodeJS.Timeout | undefined;
    if (sections[currentIndex].isTimed) {
      timeLeft = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev > 0) {
            return prev - 1;
          }
          return 0;
        });
      }, 1000);
    }
    return () => clearInterval(timeLeft);
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <StepHeader
        currentIndex={currentIndex}
        totalSteps={sections.length}
        onBack={previousPage}
        onNext={nextPage}
      />
      {sections[currentIndex].isTimed && <Timer secondsLeft={secondsLeft} />}
      {sections.map((section, index) => (
        <View
          key={index}
          style={{
            display: index === currentIndex ? "flex" : "none",
          }}
        >
          {section.component}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
