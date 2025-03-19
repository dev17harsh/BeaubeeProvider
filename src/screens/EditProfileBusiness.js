import React, { useEffect, useState } from 'react';
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
import { Images } from '../assets/images';
import AppHeader from '../components/AppHeader';
import { Colors } from '../theme/colors';
import { TextInput as TextInputPaper } from 'react-native-paper';
import CustomSwitch from '../components/CustomSwitch';
import { launchImageLibrary } from 'react-native-image-picker';
import CommonButton from '../components/CommonButton';
import { mobileH, mobileW } from '../components/utils';
import BreakDuratinModal from '../components/Modal.js/BreakDurationModal';
import { useDispatch, useSelector } from 'react-redux';
import { DimensionsConfig } from '../theme/dimensions';
import { UpdateBusinessProfileAction, UpdateBusinessProfileRemoveAction } from '../redux/action/UpdateBusinessProfileAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetUserDetailAction } from '../redux/action/GetUserDetailAction';
import { useIsFocused } from '@react-navigation/native';
import { DeleteBusinessImagesAction, DeleteBusinessImagesRemoveAction } from '../redux/action/DeleteBusinessImagesAction';

const data = [
  { image: Images.AddPhoto },
];

const EditProfileBusiness = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused()
  const UserDetailData = useSelector((state) => state.getUserDetailData);
  const UpdateBusinessProfileData = useSelector((state) => state.updateBusinessProfileData);
  const DeleteBusinessImageData = useSelector((state) => state.DeleteBusinessImageData);
  const [breakModal, setbreakModal] = useState(false);
  const [isEnableEmail, setisEnableEmail] = useState(false);
  const [isEnablePhone, setisEnablePhone] = useState(false);
  const [isEnableFacebook, setisEnableFacebook] = useState(false);
  const [isEnableInstagram, setisEnableInstagram] = useState(false);
  const [isEnableWhatsapp, setisEnableWhatsapp] = useState(false);
  const [isEnableTwitter, setisEnableTwitter] = useState(false);
  const [isEnableYoutube, setisEnableYoutube] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageRes, setProfileResImage] = useState({});
  const [coverImage, setCoverImage] = useState(null);
  const [coverImageRes, setCoverResImage] = useState({});
  const [addPhotoImage, setAddPhotoImage] = useState(null);
  const [addPhotoImageRes, setAddPhotoResImage] = useState({});
  const [businessName, setBusinessName] = useState('')
  const [emailId, setEmailId] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [facebookUrl, setFacebookUrl] = useState('')
  const [InstagramUrl, setInstagramUrl] = useState('')
  const [whatsappUrl, setWhatsappUrl] = useState('')
  const [twitterUrl, setTwitterUrl] = useState('')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    dispatch(GetUserDetailAction())
  }, [isFocused])

  useEffect(() => {
    // console.log('UserDetailData?.respons', UserDetailData?.response)
    if (UserDetailData?.response?.result) {
      // setUserDetail(UserDetailData?.response?.result)
      setBusinessName(UserDetailData?.response?.result?.business_name)
      setEmailId(UserDetailData?.response?.result?.email)
      setPhoneNumber(UserDetailData?.response?.result?.mobile)
      setProfileImage(UserDetailData?.response?.result?.profile)
      setCoverImage(UserDetailData?.response?.result?.cover_profile)
      setisEnableEmail(UserDetailData?.response?.result?.email_status == 'true' ? true : false)
      setisEnablePhone(UserDetailData?.response?.result?.mobile_status == 'true' ? true : false)
      setFacebookUrl(UserDetailData?.response?.result?.facebook)
      setisEnableFacebook(UserDetailData?.response?.result?.facebook_status == 'true' ? true : false)
      setInstagramUrl(UserDetailData?.response?.result?.insta)
      setisEnableInstagram(UserDetailData?.response?.result?.insta_status == 'true' ? true : false)
      setTwitterUrl(UserDetailData?.response?.result?.twitter)
      setisEnableTwitter(UserDetailData?.response?.result?.twitter_status == 'true' ? true : false)
      setWhatsappUrl(UserDetailData?.response?.result?.whatsapp)
      setisEnableWhatsapp(UserDetailData?.response?.result?.whatsapp_status == 'true' ? true : false)
      setYoutubeUrl(UserDetailData?.response?.result?.youtube)
      setisEnableYoutube(UserDetailData?.response?.result?.youtube_status == 'true' ? true : false)
      setPhotos([
        { image: Images.AddPhoto, business_image_id: 0 },
        ...UserDetailData?.response?.result?.business_images
      ])

    }
  }, [UserDetailData])

  useEffect(()=>{
    if(DeleteBusinessImageData?.response?.result == 'Business Image Delete Successfully'){
      console.log('?.response?.result' , DeleteBusinessImageData?.response?.result)
      dispatch(DeleteBusinessImagesRemoveAction())
      navigation.goBack()
      // dispatch(GetUserDetailAction())
    }
  },[DeleteBusinessImageData])

  useEffect(() => {
    if (UpdateBusinessProfileData?.response?.result) {
      // console.log('UpdateBusinessProfileData?.respons', UpdateBusinessProfileData?.response)
      dispatch(UpdateBusinessProfileRemoveAction())
      navigation.goBack()
    }
  }, [UpdateBusinessProfileData])

  const breakVisibleModal = () => {
    setbreakModal(!breakModal);
  };

  const toggleEmail = () => {
    setisEnableEmail(!isEnableEmail);
  };

  const togglePhone = () => {
    setisEnablePhone(!isEnablePhone);
  };

  const toggleFaceBook = () => {
    setisEnableFacebook(!isEnableFacebook);
  };

  const toggleInstagram = () => {
    setisEnableInstagram(!isEnableInstagram);
  };

  const toggleWhatsapp = () => {
    setisEnableWhatsapp(!isEnableWhatsapp);
  };

  const toggleTwitter = () => {
    setisEnableTwitter(!isEnableTwitter);
  };

  const toggleYoutube = () => {
    setisEnableYoutube(!isEnableYoutube);
  };

  const openCoverImagePicker = () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response?.assets && response.assets.length > 0) {
        setCoverResImage(response.assets)
        setCoverImage(response.assets[0].uri);
      }
    });
  };

  const openProfileImagePicker = () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response?.assets && response.assets.length > 0) {
        setProfileResImage(response.assets)
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  const openPhotoImagePicker = () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response?.assets && response.assets.length > 0) {
        setAddPhotoResImage(response.assets)
        setAddPhotoImage(response.assets[0].uri);
      }
    });
  };

  const createFileFromPickerData = (imagePickerResponse) => {
    if (imagePickerResponse && imagePickerResponse.length > 0) {
      const fileData = imagePickerResponse[0]; // Assuming you have a single image
      const { uri, fileName, type } = fileData;

      // Creating a file object for FormData
      const file = {
        uri: Platform.OS === 'android' ? uri : uri.replace('file://', ''), // Remove 'file://' on iOS
        name: fileName,
        type: type,
      };

      return file;
    }
    return null;
  };

  const onPressSaveChanges = async () => {
    console.log('save changes api')
    const userId = await AsyncStorage.getItem('token')
    const formData = new FormData();
    const profileFile = await createFileFromPickerData(profileImageRes)
    const coverFile = await createFileFromPickerData(coverImageRes)
    const businessPicFile = await createFileFromPickerData(addPhotoImageRes)
    formData.append('business_id', userId);
    formData.append('business_name', businessName.toString());
    formData.append('email', emailId.toString());
    formData.append('email_status', isEnableEmail.toString());
    formData.append('mobile', phoneNumber.toString());
    formData.append('mobile_status', isEnablePhone.toString());
    if (profileFile != null) {
      formData.append('profile', profileFile);
    }
    if (coverFile != null) {
      formData.append('cover_profile', coverFile);
    }
    if (businessPicFile != null) {
      formData.append('business_pictures', businessPicFile);
    }
    formData.append('facebook', facebookUrl.toString());
    formData.append('facebook_status', isEnableFacebook.toString());
    formData.append('insta', InstagramUrl.toString());
    formData.append('insta_status', isEnableInstagram.toString());
    formData.append('youtube', youtubeUrl.toString());
    formData.append('youtube_status', isEnableYoutube.toString());
    formData.append('twitter', twitterUrl.toString());
    formData.append('twitter_status', isEnableTwitter.toString());
    formData.append('whatsapp', whatsappUrl.toString());
    formData.append('whatsapp_status', isEnableWhatsapp.toString());

    console.log('formData', formData)
    dispatch(UpdateBusinessProfileAction(formData))
  }

  const onPressCross = async (id)=>{
    const userId = await AsyncStorage.getItem('token')
    dispatch(DeleteBusinessImagesAction({
      business_id : userId,
      business_image_id : id
    }))
  }

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
            source={coverImage == null ? Images.image22 : { uri: coverImage }}
            imageStyle={styles?.businessImage}
            style={styles?.businessImage}>
            <TouchableOpacity
              onPress={() => openCoverImagePicker()}
              activeOpacity={0.8}>
              <Image
                source={Images?.cameraWithBack}
                style={[styles.cameraIcon, { right: DimensionsConfig.screenHeight * 0.03, top: DimensionsConfig.screenHeight * 0.22, position: 'absolute', zIndex: 99999 }]}
              />
            </TouchableOpacity>
          </ImageBackground>

          <View style={{
            alignSelf: 'center',
            top: -DimensionsConfig.screenHeight * 0.06
          }}>
            <Image source={profileImage == null ? Images.staff : { uri: profileImage }} style={styles.homeServiceIcon} />
            <TouchableOpacity
              onPress={() => openProfileImagePicker()}
              activeOpacity={0.8}>
              <Image
                source={Images?.cameraWithBack}
                style={[styles.cameraIcon, { top: -DimensionsConfig.screenHeight * 0.05, right: (mobileH * -7) / 100 }]}
              />
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: 'center', marginTop: -(mobileW * 20) / 100 }}>
            <TextInputPaper
              style={{
                width: (mobileW * 90) / 100,
                fontSize: 14,
                marginTop: (mobileW * 3) / 100,
                backgroundColor: '#fff',
              }}
              outlineColor={Colors?.lightGray}
              activeOutlineColor={Colors?.primary}
              value={businessName}
              onChangeText={(txt) => {
                setBusinessName(txt)
              }}
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
                keyboardType={'email-address'}
                onChangeText={(txt) => {
                  setEmailId(txt)
                }}
                value={emailId}
                placeholder="test@gmail.com"
                mode="outlined"
              />
              <CustomSwitch
                isEnabled={isEnableEmail}
                toggleSwitch={() => {
                  toggleEmail();
                }}
              />
            </View>
            <View style={styles.inputMainView}>
              <TextInputPaper
                style={styles.textInputStyle}
                outlineColor={Colors?.primary}
                activeOutlineColor={Colors?.primary}
                label="Phone"
                onChangeText={(txt) => {
                  setPhoneNumber(txt)
                }}
                maxLength={10}
                value={phoneNumber}
                keyboardType={'number-pad'}
                placeholder="73538638368"
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
                <Image
                  source={Images?.facebook}
                  style={styles.socialMediaIcon}
                />
                <TextInput
                  placeholder="www.facebook.com"
                  placeholderTextColor={Colors.textLight}
                  style={styles.socialtextInputStyle}
                  value={facebookUrl}
                  onChangeText={(txt) => {
                    setFacebookUrl(txt)
                  }}
                />
              </View>
              <CustomSwitch
                isEnabled={isEnableFacebook}
                toggleSwitch={() => {
                  toggleFaceBook();
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
                  placeholderTextColor={Colors.textLight}
                  style={styles.socialtextInputStyle}
                  value={InstagramUrl}
                  onChangeText={(txt) => {
                    setInstagramUrl(txt)
                  }}
                />
              </View>
              <CustomSwitch
                isEnabled={isEnableInstagram}
                toggleSwitch={() => {
                  toggleInstagram();
                }}
              />
            </View>

            {/* Facebook View */}
            <View style={styles.socialMediaMainView}>
              <View style={styles.plateformBavkView}>
                <Image
                  source={Images?.whatsapp}
                  style={styles.socialMediaIcon}
                />
                <TextInput
                  placeholder="www.whatsapp.com"
                  placeholderTextColor={Colors.textLight}
                  style={styles.socialtextInputStyle}
                  value={whatsappUrl}
                  onChangeText={(txt) => {
                    setWhatsappUrl(txt)
                  }}
                />
              </View>
              <CustomSwitch
                isEnabled={isEnableWhatsapp}
                toggleSwitch={() => {
                  toggleWhatsapp();
                }}
              />
            </View>

            {/* Facebook View */}
            <View style={styles.socialMediaMainView}>
              <View style={styles.plateformBavkView}>
                <Image
                  source={Images?.twitter}
                  style={styles.socialMediaIcon}
                />
                <TextInput
                  placeholder="www.twitter.com"
                  placeholderTextColor={Colors.textLight}
                  style={styles.socialtextInputStyle}
                  value={twitterUrl}
                  onChangeText={(txt) => {
                    setTwitterUrl(txt)
                  }}
                />
              </View>
              <CustomSwitch
                isEnabled={isEnableTwitter}
                toggleSwitch={() => {
                  toggleTwitter();
                }}
              />
            </View>

            {/* Facebook View */}
            <View style={styles.socialMediaMainView}>
              <View style={styles.plateformBavkView}>
                <Image
                  source={Images?.youtube}
                  style={styles.socialMediaIcon}
                />
                <TextInput
                  placeholder="www.youtube.com"
                  placeholderTextColor={Colors.textLight}
                  style={styles.socialtextInputStyle}
                  value={youtubeUrl}
                  onChangeText={(txt) => {
                    setYoutubeUrl(txt)
                  }}
                />
              </View>
              <CustomSwitch
                isEnabled={isEnableYoutube}
                toggleSwitch={() => {
                  toggleYoutube();
                }}
              />
            </View>

            {/*  */}
            <View style={{ marginTop: (mobileW * 4) / 100 }}>
              <Text style={styles.selectTitle}>Add Photo</Text>
              <View style={{ marginTop: (mobileW * 4) / 100 }}>
                <FlatList
                  data={photos}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => index == 0 && openPhotoImagePicker()}>
                      <ImageBackground
                        source={index == 0 ? addPhotoImage != null ? { uri: addPhotoImage } : item?.image : {uri :item?.image}}
                        style={{
                          width: (mobileW * 40) / 100,
                          height: (mobileW * 40) / 100,
                          marginRight: (mobileW * 4) / 100,
                        }}
                        imageStyle={{
                          borderRadius: (mobileW * 5) / 100,
                          resizeMode: 'cover'
                        }}
                      >
                        {index !== 0 && (
                          <TouchableOpacity activeOpacity={0.8} onPress={()=>{
                            onPressCross(item?.business_image_id)
                          }}>
                            <Image
                              source={Images?.RemoveWithBack}
                              style={{
                                left: (mobileW * 31) / 100,
                                top: (mobileW * 1.8) / 100,
                                width: (mobileW * 7) / 100,
                                height: (mobileW * 7) / 100,
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

              <CommonButton
                onPress={() => onPressSaveChanges()}
                title={'Save Changes'} />
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
    // alignItems: 'center',
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
    // bottom: (mobileH * -19) / 100,
    borderWidth: (mobileW * 1) / 100,
    borderColor: Colors.white,
    borderRadius: (mobileW * 12) / 100,
    backgroundColor: Colors?.black
  },
  cameraIcon: {
    width: (mobileW * 12) / 100,
    height: (mobileW * 12) / 100,
    // bottom: (mobileH * -14) / 100,
    // right: (mobileH * -5) / 100,
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
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
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textDark,
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
    color: Colors.DarkPurple,
  },
  socialMediaTextView: {
    paddingHorizontal: (mobileW * 3) / 100,
    paddingVertical: (mobileW * 2) / 100,
    marginTop: (mobileW * 3) / 100,
    marginBottom: (mobileW * 10) / 100,
  },
});

export default EditProfileBusiness;
