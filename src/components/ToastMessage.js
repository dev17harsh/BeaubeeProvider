import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
} from "react-native";
import { Images } from "../assets/images";
import { mobileW } from "./utils";

const ToastMessage = ({ visible, message, onClose, toastStyle }) => {
  const slideAnim = useRef(new Animated.Value(100)).current; // Initial position
  useEffect(() => {
    if (visible) {
      // Slide the toast in
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Automatically hide the toast after 3 seconds
      const timer = setTimeout(() => {
        handleClose();
      }, 3000);

      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [visible]);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: 100,
      duration: 300,
      useNativeDriver: true,
    }).start(() => onClose && onClose());
  };

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        { transform: [{ translateY: slideAnim }] },
      ]}
    >
      <TouchableOpacity onPress={handleClose} style={[styles.toast, { ...toastStyle }]}>
        <Image
          source={Images?.rightCheck}
          style={{ width: mobileW * 6 / 100, height: mobileW * 6 / 100 }}
        />
        <Text style={styles.toastText}>{message}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    zIndex: 1000,
  },
  toast: {
    backgroundColor: "#3EC574",
    paddingVertical: 23,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  toastText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    left: 5,
    width: '90%'
  },
});

export default ToastMessage;
