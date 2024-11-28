import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  ImageBackground,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {Images} from '../assets/images';
import AppHeader from '../components/AppHeader';
import {Colors} from '../theme/colors';
import {TextInput as TextInputPaper} from 'react-native-paper';
import CustomSwitch from '../components/CustomSwitch';
import {launchImageLibrary} from 'react-native-image-picker';
import CommonButton from '../components/CommonButton';
import {mobileH, mobileW} from '../components/utils';
import BreakDuratinModal from '../components/Modal.js/BreakDurationModal';

const data = [
  {image: Images.AddPhoto},
  {image: Images.image11},
  {image: Images.image22},
  {image: Images.image33},
  {image: Images.image44},
  {image: Images.image55},
];

const EditProfileBusiness = ({navigation}) => {
  const [breakModal, setbreakModal] = useState(false);
  const [isEnable, setisEnable] = useState(false);
  const [isEnablePhone, setisEnablePhone] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const breakVisibleModal = () => {
    setbreakModal(!breakModal);
  };

  const toggleOpen = () => {
    setisEnable(!isEnable);
  };

  const togglePhone = () => {
    setisEnablePhone(!isEnablePhone);
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

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      {/* Header */}
      <BreakDuratinModal visible={breakModal} onClose={breakVisibleModal} />
      <AppHeader title={'Edit Profile'} />

      <ScrollView style={styles.Scrollcontainer}>
        {/* Business Image */}
        <ImageBackground
          resizeMode="cover"
          source={Images?.image11}
          imageStyle={styles?.businessImage}
          style={styles?.businessImage}>
          <Image source={Images?.image22} style={styles.homeServiceIcon} />
          <TouchableOpacity
            onPress={() => openImagePicker()}
            activeOpacity={0.8}>
            <Image source={Images?.cameraWithBack} style={styles.cameraIcon} />
          </TouchableOpacity>
        </ImageBackground>

        <View style={{alignItems: 'center', marginTop: (mobileW * 16) / 100}}>
          <TextInputPaper
            style={{
              width: (mobileW * 90) / 100,
              fontSize: 14,
              marginTop: (mobileW * 3) / 100,
              backgroundColor: '#fff',
            }}
            outlineColor={Colors?.lightGray}
            activeOutlineColor={Colors?.primary}
            label="Business Name"
            placeholder="Business"
            mode="outlined"
          />
          <View style={styles.inputMainView}>
            <TextInputPaper
              style={styles.textInputStyle}
              outlineColor={Colors?.lightGray}
              activeOutlineColor={Colors?.primary}
              label="Email"
              placeholder="test@email.com"
              mode="outlined"
            />
            <CustomSwitch
              isEnabled={isEnable}
              toggleSwitch={() => {
                toggleOpen();
              }}
            />
          </View>
          <View style={styles.inputMainView}>
            <TextInputPaper
              style={styles.textInputStyle}
              outlineColor={Colors?.primary}
              activeOutlineColor={Colors?.primary}
              label="Phone"
              placeholder="+73 73538638368"
              mode="outlined"
            />
            <CustomSwitch
              isEnabled={isEnablePhone}
              toggleSwitch={() => {
                togglePhone();
              }}
            />
          </View>
        </View>
        {/* Business Details */}
        <View style={styles.socialMediaTextView}>
          <Text style={styles.selectTitle}>Select Plateforms</Text>
          {/* Facebook View */}
          <View style={styles.socialMediaMainView}>
            <View style={styles.plateformBavkView}>
              <Image source={Images?.facebook} style={styles.socialMediaIcon} />
              <TextInput
                placeholder="www.facebook.com"
                style={styles.socialtextInputStyle}
              />
            </View>
            <CustomSwitch
              isEnabled={isEnablePhone}
              toggleSwitch={() => {
                togglePhone();
              }}
            />
          </View>

          {/* Facebook View */}
          <View style={styles.socialMediaMainView}>
            <View style={styles.plateformBavkView}>
              <Image
                source={Images?.instagram}
                style={styles.socialMediaIcon}
              />
              <TextInput
                placeholder="www.instagram.com"
                style={styles.socialtextInputStyle}
              />
            </View>
            <CustomSwitch
              isEnabled={isEnablePhone}
              toggleSwitch={() => {
                togglePhone();
              }}
            />
          </View>

          {/* Facebook View */}
          <View style={styles.socialMediaMainView}>
            <View style={styles.plateformBavkView}>
              <Image source={Images?.whatsapp} style={styles.socialMediaIcon} />
              <TextInput
                placeholder="www.whatsapp.com"
                style={styles.socialtextInputStyle}
              />
            </View>
            <CustomSwitch
              isEnabled={isEnablePhone}
              toggleSwitch={() => {
                togglePhone();
              }}
            />
          </View>

          {/* Facebook View */}
          <View style={styles.socialMediaMainView}>
            <View style={styles.plateformBavkView}>
              <Image source={Images?.twitter} style={styles.socialMediaIcon} />
              <TextInput
                placeholder="www.twitter.com"
                style={styles.socialtextInputStyle}
              />
            </View>
            <CustomSwitch
              isEnabled={isEnablePhone}
              toggleSwitch={() => {
                togglePhone();
              }}
            />
          </View>

          {/* Facebook View */}
          <View style={styles.socialMediaMainView}>
            <View style={styles.plateformBavkView}>
              <Image source={Images?.youtube} style={styles.socialMediaIcon} />
              <TextInput
                placeholder="www.youtube.com"
                style={styles.socialtextInputStyle}
              />
            </View>
            <CustomSwitch
              isEnabled={isEnablePhone}
              toggleSwitch={() => {
                togglePhone();
              }}
            />
          </View>

          {/*  */}
          <View style={{marginTop: (mobileW * 4) / 100}}>
            <Text style={styles.selectTitle}>Add Photo</Text>
            <View style={{marginTop: (mobileW * 4) / 100}}>
              <FlatList
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => (
                  <TouchableOpacity>
                    <ImageBackground
                      source={item?.image}
                      style={{
                        width: (mobileW * 40) / 100,
                        height: (mobileW * 40) / 100,
                        marginRight: (mobileW * 4) / 100,
                      }}>
                      {index !== 0 && (
                        <TouchableOpacity activeOpacity={0.8}>
                          <Image
                            source={Images?.RemoveWithBack}
                            style={{
                              left: 110,
                              top: 6,
                              width: (mobileW * 8) / 100,
                              height: (mobileW * 8) / 100,
                            }}
                          />
                        </TouchableOpacity>
                      )}
                    </ImageBackground>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.key}
              />
            </View>

            <CommonButton title={'Save Changes'} />
          </View>
        </View>
      </ScrollView>
    </View>
    </SafeAreaView>
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
    width: (mobileW * 24) / 100,
    height: (mobileW * 24) / 100,
    bottom: (mobileH * -19) / 100,
    borderWidth: (mobileW * 1) / 100,
    borderColor: Colors.white,
    borderRadius: (mobileW * 11) / 100,
  },
  cameraIcon: {
    width: (mobileW * 12) / 100,
    height: (mobileW * 12) / 100,
    bottom: (mobileH * -14) / 100,
    right: (mobileH * -5) / 100,
  },
  socialMediaIcon: {
    width: (mobileW * 6) / 100,
    height: (mobileW * 6) / 100,
    left: 5,
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
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
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
    width: '100%',
    height: 1,
    backgroundColor: Colors.borderColor,
    marginVertical: (mobileW * 4) / 100,
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
  txtView: {
    width: (mobileW * 68) / 100,
  },
  itemLabel: {
    fontSize: (mobileW * 4) / 100,
    color: '#333333',
    marginLeft: 10,
    flex: 1,
    fontWeight: '500',
  },
  itemDescription: {
    fontSize: (mobileW * 3.2) / 100,
    color: '#c2becb',
    marginLeft: 10,
    fontWeight: '400',
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
  inputMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: (mobileW * 5) / 100,
  },
  textInputStyle: {
    width: (mobileW * 70) / 100,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  selectTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#000',
    left: 10,
  },
  socialMediaMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: (mobileW * 92) / 100,
    marginTop: (mobileW * 4) / 100,
  },
  plateformBavkView: {
    width: (mobileW * 70) / 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: (mobileW * 1.7) / 100,
    alignItems: 'center',
    left: (mobileW * 2) / 100,
  },
  socialtextInputStyle: {
    width: '88%',
    height: (mobileW * 11) / 100,
    color: Colors.black,
  },
  socialMediaTextView: {
    paddingHorizontal: (mobileW * 3) / 100,
    paddingVertical: (mobileW * 2) / 100,
    marginTop: (mobileW * 3) / 100,
    marginBottom: (mobileW * 10) / 100,
  },
});

export default EditProfileBusiness;
