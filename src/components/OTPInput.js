import React, { useState, useRef } from "react";
import { View, TextInput, StyleSheet, Keyboard } from "react-native";

const OTPInput = ({ length = 6, onChange }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputs = useRef([]);

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take the last character
    setOtp(newOtp);
    onChange(newOtp.join(""));

    // Move to the next input if available
    if (value && index < length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleBackspace = (key, index) => {
    if (key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handlePaste = (event) => {
    const pastedData = event.nativeEvent.text.split("");
    const newOtp = [...otp];
    pastedData.forEach((char, i) => {
      if (i < length) {
        newOtp[i] = char;
      }
    });
    setOtp(newOtp);
    onChange(newOtp.join(""));
  };

  return (
    <View style={styles.container}>
      {otp.map((_, index) => (
        <TextInput
          key={index}
          style={styles.input}
          keyboardType="number-pad"
          maxLength={1}
          value={otp[index]}
          onChangeText={(value) => handleChange(value, index)}
          onKeyPress={({ nativeEvent }) => handleBackspace(nativeEvent.key, index)}
          ref={(ref) => (inputs.current[index] = ref)}
          onSubmitEditing={Keyboard.dismiss}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  input: {
    width: 40,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    textAlign: "center",
    fontSize: 18,
    backgroundColor: "#f9f9f9",
  },
});

export default OTPInput;
