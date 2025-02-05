import React, { useState } from 'react';
import { TextInput, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Colors } from '../theme/colors';
import { DimensionsConfig } from '../theme/dimensions';
import { Images } from '../assets/images'; // Make sure to import your eye icons from the images file

const InputField = ({ placeholder, value, onChangeText, isPassword, customStyle, keyboardType = 'default' }) => {
  const [secureTextEntry, setSecureTextEntry] = useState(isPassword); // State to manage password visibility

  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry); // Toggle secureTextEntry on eye icon press
  };

  return (
    <View style={[styles.inputContainer, customStyle]}>
      <TextInput
        placeholder={placeholder}
        secureTextEntry={secureTextEntry} // This will toggle based on the state
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={Colors.gray}
        keyboardType={keyboardType}
      />
      {isPassword && (
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIconContainer}>
          <Image
            source={secureTextEntry ? Images.EyeIcon : Images.EyeOffIcon} // Toggle the icon based on secureTextEntry state
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: DimensionsConfig.inputHeight,
    width: DimensionsConfig.inputWidth,
    borderWidth: 1,
    borderColor: '#EEE6F1',
    borderRadius: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Make space for the eye icon
  },
  input: {
    color: Colors.gray,
    fontSize: 14,
    flex: 1, // Take the full width except for the eye icon space
  },
  eyeIconContainer: {
    paddingHorizontal: 10, // Space around the eye icon
  },
  eyeIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default InputField;
