import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";

interface TimedSectionsProps {
  sections: React.ReactNode[];
  interval: number; // interval in milliseconds
}

export default function TimedSections({
  sections,
  interval,
}: TimedSectionsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const progress = useState(new Animated.Value(0))[0];

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
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sections.length);
      animateProgress();
    }, interval);

    animateProgress(); // Start the animation immediately

    return () => clearInterval(timer);
  }, [sections.length, interval, progress]);

  return (
    <View style={styles.container}>
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
      {sections.map((section, index) => (
        <View
          key={index}
          style={{ display: index === currentIndex ? "flex" : "none" }}
        >
          {section}
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
