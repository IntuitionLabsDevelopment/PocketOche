import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { StepHeader } from "./StepHeader";

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
  const progress = useState(new Animated.Value(0))[0];

  const nextPage = () => {
    if (currentIndex < sections.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const previousPage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    const animateProgress = () => {
      progress.setValue(0);
      Animated.timing(progress, {
        toValue: 1,
        duration: interval,
        useNativeDriver: false,
      }).start();
    };
    const timer = setInterval(() => {
      if (!sections[currentIndex].isTimed) {
        return;
      }
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sections.length);
    }, interval);
    if (sections[currentIndex].isTimed) {
      animateProgress();
    }
    return () => clearInterval(timer);
  }, [currentIndex, interval, progress]);

  return (
    <View style={styles.container}>
      <StepHeader
        currentIndex={currentIndex}
        totalSteps={sections.length}
        onBack={previousPage}
        onNext={nextPage}
      />
      {sections[currentIndex].isTimed && (
        <View style={styles.progressBarContainer}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0%", "100%"],
                }),
              },
            ]}
          />
        </View>
      )}
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
  progressBarContainer: {
    height: 4,
    width: "100%",
    backgroundColor: "#e0e0e0",
    marginTop: 8,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#3b5998",
  },
});
