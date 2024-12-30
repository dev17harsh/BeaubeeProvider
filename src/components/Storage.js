import AsyncStorage from '@react-native-async-storage/async-storage';

const Storage = {
  set: async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error(`Error saving data to key "${key}":`, error);
    }
  },

  // Get data from storage
  get: async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error(`Error retrieving data from key "${key}":`, error);
      return null;
    }
  },

  // Remove data from storage
  remove: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing data from key "${key}":`, error);
    }
  },

  // Clear all storage
  clear: async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },
};

export default Storage;
