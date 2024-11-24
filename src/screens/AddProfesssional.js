import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Images } from '../assets/images';
import AppHeader from '../components/AppHeader';
import { Colors } from '../theme/colors';
import CustomButton from '../components/CustomButton';
import { mobileH, mobileW } from '../components/utils';
import { launchImageLibrary } from 'react-native-image-picker';
import { TextInput as TextInputPaper } from 'react-native-paper';
import BreakDuratinModal from '../components/Modal.js/BreakDurationModal';

const ScheduleDay = [
  { day: 'Monday', time: '10:00AM to 09:00PM' },
  { day: 'Tuesday', time: '10:00AM to 09:00PM' },
  { day: 'Wednesday', time: '10:00AM to 09:00PM' },
  { day: 'Thusday', time: '10:00AM to 09:00PM' },
  { day: 'Friday', time: '10:00AM to 09:00PM' },
  { day: 'Saturday', time: '10:00AM to 09:00PM' },
  { day: 'Sunday', time: '10:00AM to 09:00PM' },
];

const checkboxOptions = [
  { title: 'Hair', Image: Images?.Hair },
  { title: 'SkinCare', Image: Images?.Skincare },
  { title: 'Makeup', Image: Images?.Makeup },
  { title: 'Nails', Image: Images?.Nail },
  { title: 'Taining', Image: Images?.Tanning },
  { title: 'Hair Removal', Image: Images?.HairRemoval },
];

const AddProfesssional = ({ navigation }) => {
  const [breakModal, setbreakModal] = useState(false);
  const [availableData, setAvailableData] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);

  const breakVisibleModal = () => {
    setbreakModal(!breakModal);
  };

  const renderData = items => {
    const item = items.item;
    return (
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          paddingVertical: (mobileW * 2) / 100,
        }}>
        <Text
          style={{
            color: Colors.black,
          }}>
          {item.day}
        </Text>
        <Text>{item.time}</Text>
      </View>
    );
  };

  const handleCheckboxPress = option => {
    setSelectedCheckbox(option);
  };

  const openImagePicker = () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response?.assets && response.assets.length > 0) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  const renderCheckbox = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.checkbox,
        selectedCheckbox === item?.title && styles.selectedCheckbox,
      ]}
      onPress={() => handleCheckboxPress(item?.title)}>
      <Image
        resizeMode="contain"
        source={
          item?.Image
        }
        tintColor={selectedCheckbox === item?.title ? Colors?.white : Colors?.primary}
        style={styles.cardIcons}
      />
      <Text
        style={[
          styles.checkboxText,
          selectedCheckbox === item?.title && styles.selectedCheckboxText,
        ]}>
        {item?.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <BreakDuratinModal visible={breakModal} onClose={breakVisibleModal} />
      <AppHeader title={'Add Professsional'} />

      <ScrollView style={styles.Scrollcontainer}>
        {/* Business Image */}
        <View>
          <ImageBackground
            source={Images?.image22}
            imageStyle={styles.homeServiceIcon}
            style={styles.homeServiceIcon}
          />
          <TouchableOpacity
            onPress={() => openImagePicker()}
            activeOpacity={0.8}>
            <Image source={Images?.cameraWithBack} style={styles.cameraIcon} />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center', marginTop: (mobileW * 3) / 100 }}>
          {/* User Info */}
          <Text style={styles.name}>Kynthia Johnson</Text>
          <Text style={styles.email}>kynthiajohnson@email.com</Text>
          <Text style={styles.phone}>+123 456 7890</Text>
        </View>

        <View
          style={{
            width: mobileW,
            paddingHorizontal: (mobileW * 5) / 100,
            marginTop: (mobileW * 5) / 100,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TextInputPaper
            style={{
              width: (mobileW * 43) / 100,
              fontSize: 14,
              backgroundColor: '#fff',
              color: '#301E39'
            }}
            outlineColor={"#EEE6F1"}
            activeOutlineColor={"#EEE6F1"}
            label="First Name"
            // value="Flat/Villa No."
            placeholder="Enter first name"
            // onChangeText={text => setText(text)}
            mode="outlined"
          />
          <TextInputPaper
            style={{
              width: (mobileW * 43) / 100,
              fontSize: 14,
              backgroundColor: '#fff',
              color: '#301E39'
            }}
            outlineColor={"#EEE6F1"}
            activeOutlineColor={"#EEE6F1"}
            label="Last Name"
            // onChangeText={text => setText(text)}
            placeholder="Enter last name"
            mode="outlined"
          />
        </View>

        <View
          style={{
            width: mobileW,
            paddingHorizontal: (mobileW * 5) / 100,
            marginTop: (mobileW * 5) / 100,
          }}>
          <TextInputPaper
            style={{
              width: (mobileW * 90) / 100,
              fontSize: 14,
              backgroundColor: '#fff',
              color: '#301E39'
            }}
            outlineColor={"#EEE6F1"}
            activeOutlineColor={"#EEE6F1"}
            label="Position Description"
            // onChangeText={text => setText(text)}
            placeholder="Position description goes here"
            mode="outlined"
          />

          <TextInputPaper
            style={{
              width: (mobileW * 90) / 100,
              fontSize: 14,
              backgroundColor: '#fff',
              color: '#301E39'
            }}
            outlineColor={"#EEE6F1"}
            activeOutlineColor={"#EEE6F1"}
            label="Email"
            // onChangeText={text => setText(text)}
            placeholder="Enter email"
            mode="outlined"
          />

          <TextInputPaper
            style={{
              width: (mobileW * 90) / 100,
              fontSize: 14,
              backgroundColor: '#fff',
              color: '#301E39',
              marginTop: (mobileW * 5) / 100,
            }}
            outlineColor={"#EEE6F1"}
            activeOutlineColor={"#EEE6F1"}
            label="Tier"
            // onChangeText={text => setText(text)}
            placeholder="Enter tier"
            mode="outlined"
          />
        </View>

        <View style={styles.straightLine} />

        <FlatList
          data={checkboxOptions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderCheckbox}
          numColumns={2}
          contentContainerStyle={styles.checkboxContainer}
        />

        {/* Business Details */}
        <View
          style={{
            paddingHorizontal: (mobileW * 3) / 100,
          }}>

          <View style={styles.itemContainerBio}>
            <View style={[styles.txtView]}>
              <Text style={styles.itemLabel}>Tell customer about this professional</Text>
            </View>
            <Text style={styles.itemDescription}>
              Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu,
              consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus
              in, viverra quis
            </Text>
          </View>

          <View style={styles.itemContainerBio}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <View style={[styles.txtView]}>
                <Text style={styles.itemLabel}>Availability</Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {navigation.navigate('Availability')}}>
                <Image
                  source={
                    !availableData
                      ? Images?.PlusWithLightBAck
                      : Images.MinusWithLightBack
                  }
                  style={styles?.plusWithBack}
                />
              </TouchableOpacity>
            </View>
            {availableData && (
              <View style={{ marginTop: (mobileW * 3) / 100 }}>
                <FlatList
                  data={ScheduleDay}
                  renderItem={item => renderData(item)}
                />
              </View>
            )}
          </View>
          <View
            style={{
              marginBottom: (mobileW * 6) / 100,
              width: (mobileW * 90) / 100,
              alignSelf: 'center',
            }}>
            <CustomButton
              title={'Add Member'}
              style={{
                marginBottom: (mobileW * 3) / 100,
                marginTop: (mobileW * 5) / 100,
                backgroundColor: Colors.primary,
              }}
              textStyle={{ color: Colors.white }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  Scrollcontainer: {
    backgroundColor: '#FFFFFF',
  },
  businessImage: {
    width: (mobileW * 110) / 100,
    height: 200,
    alignItems: 'center',
    alignSelf: 'center',
  },
  detailsContainer: {
    padding: 16,
  },
  homeServiceBadge: {
    color: Colors.white,
    fontWeight: 'bold',
    paddingVertical: 4,
    fontSize: (mobileW * 2.5) / 100,
  },
  homeServiceIcon: {
    width: (mobileW * 35) / 100,
    height: (mobileW * 35) / 100,
    borderWidth: (mobileW * 1) / 100,
    borderColor: Colors.white,
    borderRadius: (mobileW * 17.5) / 100,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  businessName: {
    fontSize: (mobileW * 5) / 100,
    fontWeight: '900',
    marginTop: 8,
    color: Colors.black,
  },
  rating: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#333333',
  },
  infoContainer: {
    marginTop: 16,
    width: (mobileW * 90) / 100,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  openBadge: {
    color: '#ffffff',
    backgroundColor: 'green',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  infoText: {
    color: '#666666',
  },
  distanceText: {
    color: Colors?.black,
  },
  tabs: {
    flexDirection: 'row',
    marginTop: 16,
  },
  tabText: {
    fontSize: 16,
    color: '#A0A0A0',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  activeTab: {
    color: '#A020F0',
    borderBottomColor: '#A020F0',
    borderBottomWidth: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  professionalsContainer: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  professionalName: {
    marginTop: 4,
    fontSize: 14,
  },
  serviceList: {
    marginTop: 8,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: (mobileW * 5) / 100,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
  },
  serviceName: {
    fontSize: 16,
    color: Colors.black,
    fontWeight: '600',
  },
  serviceDuration: {
    fontSize: 14,
    color: '#A0A0A0',
  },
  servicePriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  servicePrice: {
    fontSize: 16,
    color: '#A020F0',
    marginRight: 8,
  },
  tabContainer: {
    paddingVertical: 8,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  // activeTab: {
  //   borderBottomColor: '#A020F0',
  // },
  tabText: {
    fontSize: 16,
    color: '#333',
  },
  activeTabText: {
    fontWeight: 'bold',
    color: Colors.black,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllText: {
    color: Colors.black,
    fontSize: 14,
  },
  professionalsList: {
    paddingVertical: 8,
    marginTop: (mobileH * 2) / 100,
  },
  professionalCard: {
    alignItems: 'center',
    marginRight: 16,
    paddingHorizontal: (mobileW * 1) / 100,
  },
  professionalImage: {
    width: (mobileW * 20) / 100,
    height: (mobileW * 20) / 100,
    borderRadius: (mobileW * 10) / 100,
  },
  professionalName: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    color: '#333',
    marginTop: (mobileW * 2) / 100,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#333',
    marginLeft: 4,
  },
  backIcon: {
    width: (mobileW * 5) / 100,
    height: (mobileW * 5) / 100,
  },
  forwardcon: {
    width: (mobileW * 3.5) / 100,
    height: (mobileW * 3.5) / 100,
    left: (mobileW * 2) / 100,
  },
  plusIcon: {
    width: (mobileW * 6) / 100,
    height: (mobileW * 6) / 100,
  },
  locationIcon: {
    width: (mobileW * 5) / 100,
    height: (mobileW * 5) / 100,
    tintColor: Colors.primary,
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: (mobileW * 5) / 100,
    backgroundColor: '#ffffff',
    marginTop: (mobileW * 3) / 100,
    borderRadius: (mobileW * 2.5) / 100,
    paddingHorizontal: (mobileW * 3) / 100,
    // elevation: 3,
    borderWidth: 1,
    borderColor: '#EEE6F1',
    marginVertical: (mobileW * 4) / 100,
  },
  methodDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
  straightLine: {
    width: '90%',
    height: 1,
    backgroundColor: Colors.borderColor,
    marginVertical: (mobileW * 4) / 100,
    alignSelf: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 2,
  },
  phone: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 20,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4ECFC',
    paddingHorizontal: (mobileW * 6) / 100,
    paddingVertical: (mobileW * 3) / 100,
    borderRadius: (mobileW * 3) / 100,
  },
  editButtonText: {
    color: '#8D10B5',
    fontSize: 16,
    marginLeft: 15,
  },
  icon: {
    width: (mobileW * 4) / 100,
    height: (mobileW * 4) / 100,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: (mobileW * 3) / 100,
    width: (mobileW * 90) / 100,
    alignSelf: 'center',
    paddingVertical: (mobileW * 4) / 100,
    borderRadius: (mobileW * 2) / 100,
    borderWidth: 0.3,
    borderColor: Colors.OrGray,
    justifyContent: 'space-between',
    marginTop: (mobileW * 4) / 100,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  itemContainerBio: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: (mobileW * 3) / 100,
    width: (mobileW * 90) / 100,
    alignSelf: 'center',
    paddingVertical: (mobileW * 4) / 100,
    borderRadius: (mobileW * 2) / 100,
    borderWidth: 0.3,
    borderColor: Colors.OrGray,
    justifyContent: 'space-between',
    marginTop: (mobileW * 4) / 100,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  itemContainer1: {
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: (mobileW * 2) / 100,
    width: (mobileW * 90) / 100,
    alignSelf: 'center',
    marginTop: (mobileW * 5) / 100,
    paddingVertical: (mobileW * 4) / 100,
    borderRadius: (mobileW * 3) / 100,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  txtView: {},
  itemLabel: {
    fontSize: (mobileW * 4) / 100,
    color: '#333333',
    flex: 1,
    fontWeight: '700',
  },
  itemDescription: {
    fontSize: (mobileW * 3.7) / 100,
    color: Colors.gray,
    fontWeight: '400',
    marginTop: (mobileW * 1) / 100,
  },
  dayView: {
    width: '98%',
    backgroundColor: Colors.semiPurpleLight,
    borderRadius: (mobileW * 1.8) / 100,
    marginTop: (mobileW * 3) / 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: (mobileW * 3) / 100,
    paddingVertical: (mobileW * 2.5) / 100,
  },
  dayTxt: {
    fontSize: (mobileW * 3.5) / 100,
    color: Colors.black,
    fontWeight: '400',
    width: '60%',
  },
  timeTxt: {
    fontSize: (mobileW * 3.2) / 100,
    color: Colors.black,
    fontWeight: '400',
  },
  forwardDicicon: {
    width: (mobileW * 5) / 100,
    height: (mobileW * 5) / 100,
  },
  plusIcon: {
    width: (mobileW * 6) / 100,
    height: (mobileW * 6) / 100,
  },
  locationIcons: {
    width: (mobileW * 11) / 100,
    height: (mobileW * 11) / 100,
    resizeMode: 'contain',
  },
  reviewTxt: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.gray, // Star color
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.black, // Star color
    marginRight: 8,
  },
  plusWithBack: {
    width: (mobileW * 6.5) / 100,
    height: (mobileW * 6.5) / 100,
  },
  cameraIcon: {
    width: (mobileW * 12) / 100,
    height: (mobileW * 12) / 100,
    position: 'absolute',
    bottom: (mobileH * -2) / 100,
    right: (mobileH * 17) / 100,
  },
  checkbox: {
    borderRadius: (mobileW * 2) / 100,
    paddingVertical: (mobileW * 3) / 100,
    paddingHorizontal: (mobileW * 2) / 100,
    marginRight: (mobileW * 4.5) / 100,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E7E7E7',
    marginTop: (mobileW * 4) / 100,
    width: (mobileW * 43) / 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCheckbox: {
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  checkboxText: {
    fontSize: 16,
    color: Colors.primary,
    marginLeft: 10,
  },
  selectedCheckboxText: {
    color: '#fff',
  },
  cardIcons: {
    width: (mobileW * 5) / 100,
    height: (mobileW * 5) / 100,
  },
  checkboxContainer: {
    width: (mobileW * 90) / 100,
    alignSelf: 'center',
  },
});

export default AddProfesssional;
