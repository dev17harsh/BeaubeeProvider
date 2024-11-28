import {
  View,
  Text,
  Switch,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native'
import React, { useState } from 'react'
import AppHeader from '../components/AppHeader'
import { Colors } from '../theme/colors';
import { Images } from '../assets/images';
import { DimensionsConfig } from '../theme/dimensions';
const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);

const services = [
  { id: '1', label: 'Hair', icon: Images?.Hair },
  { id: '2', label: 'Makeup', icon: Images?.Makeup },
  { id: '3', label: 'Skincare', icon: Images?.Skincare },
  { id: '4', label: 'Nails', icon: Images?.Nail },
  { id: '5', label: 'Hair Removal', icon: Images?.HairRemoval },
  { id: '6', label: 'Tanning', icon: Images?.Tanning },
];

const AddServicesScreen = ({ navigation }) => {
  const [selectedService, setSelectedService] = useState('1');

  const handlePress = (id) => {
    setSelectedService(id);
  };

  const renderServiceItem = ({ item }) => {
    const isSelected = selectedService === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.serviceBox,
          isSelected && styles.selectedBox
        ]}
        onPress={() => handlePress(item.id)}
      >
        <Image source={item?.icon} tintColor={isSelected ? Colors?.white : Colors?.primary} style={styles?.serviceIcon} />
        <Text style={[styles.label, isSelected && styles.selectedLabel]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* Header */}
        <AppHeader
          title={"Services"}
        />
        <View style={styles.subContainer}>
          <Text style={styles.title}>What services do you offer?</Text>
          <FlatList
            data={services}
            renderItem={renderServiceItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.grid}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
          />

        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('PaymentMethod', { type: 'Add' })}
          style={styles.selectLocationButton}>
          <Text style={styles.selectionButtonTxt}>Finish</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default AddServicesScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors?.white,
  },
  selectLocationButton: {
    backgroundColor: '#8D10B5',
    width: (mobileW * 90) / 100,
    borderRadius: DimensionsConfig?.buttonHeight * 0.18,
    paddingVertical: DimensionsConfig?.buttonHeight * 0.28,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: (mobileH * 15) / 100,
    position: 'absolute',
    bottom: (mobileH * 2) / 100,

  },
  selectionButtonTxt: {
    fontSize: (mobileW * 4) / 100,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  subContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0D0E11',
    marginBottom: (mobileH * 3) / 100,
  },
  grid: {
    paddingBottom: (mobileH * 3) / 100,
  },
  serviceBox: {
    width: (mobileW - 60) / 2, // Adjusts for two columns with padding
    height: (mobileH * 16) / 100,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderColor: '#EEE6F1',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: (mobileH * 3) / 100,
    flexDirection: 'row',
  },
  serviceIcon: {
    width: (mobileW * 6) / 100,
    height: (mobileW * 6) / 100
  },
  selectedBox: {
    backgroundColor: Colors?.primary, // Purple color for selected state
    borderColor: Colors?.primary,
  },
  label: {
    marginLeft: (mobileH * 1) / 100,
    fontSize: 14,
    color: '#7D3C98',
  },
  selectedLabel: {
    color: '#FFFFFF',
  },
})