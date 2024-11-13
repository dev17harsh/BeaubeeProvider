// CustomSwitch.js
import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';

const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);

const CustomSwitch = ({ isEnabled, toggleSwitch }) => {
  // Animated value for circle position
  const circlePosition = useRef(new Animated.Value(isEnabled ? 1 : 0)).current;

  // Animation effect when the switch state changes
  useEffect(() => {
    Animated.timing(circlePosition, {
      toValue: isEnabled ? 1 : 0,
      duration: 300, // Smooth animation duration
      useNativeDriver: false,
    }).start();
  }, [isEnabled]);

  // Interpolating the animated value to translate the circle
  const translateX = circlePosition.interpolate({
    inputRange: [-(mobileW * 0.05) / 100, 1],
    outputRange: [0, (mobileW * 5.8) / 100], // Adjust this to control the distance of movement
  });

  return (
    <TouchableOpacity onPress={toggleSwitch} style={[styles.switchContainer, isEnabled ? styles.switchOn : styles.switchOff]}>
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [{ translateX }], // Apply the translation animation
          },
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    width: (mobileW * 12) / 100,
    height: (mobileH * 3.5) / 100,
    borderRadius: ((mobileH * 3.5) / 100) / 2,
    justifyContent: 'center',
    backgroundColor: '#ddd', // Default background when off
  },
  switchOn: {
    backgroundColor: '#7D3C98', // Purple color for ON state
  },
  switchOff: {
    backgroundColor: '#ddd', // Light grey for OFF state
  },
  circle: {
    width: (mobileH * 2.8) / 100,
    height: (mobileH * 2.8) / 100,
    borderRadius: ((mobileH * 2.8) / 100) / 2,
    backgroundColor: 'white',
    position: 'absolute', // Absolute positioning to animate within container
  },
});

export default CustomSwitch;
