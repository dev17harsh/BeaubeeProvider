import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppHeader from '../components/AppHeader';
import ListProfessionalModal from '../components/ListProfessionalModal';
import ServiceSelector from '../components/Modal.js/ServiceSelector';
import { mobileH, mobileW } from '../components/utils';
import { Images } from '../assets/images';
import CommonButton from '../components/CommonButton';
import { Colors } from '../theme/colors';
import { launchImageLibrary } from 'react-native-image-picker';
import Storage from '../components/Storage';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CreatePostAction, CreatePostRemoveAction } from '../redux/action/CreatePostAction';
import { GetSelectedServicesAction } from '../redux/action/GetSelectedServicesAction';
import { GetStaffAction } from '../redux/action/GetStaffAction';

const tabs = ['Hair', 'Makeup', 'Skincare', 'Nails'];
const services = [
  {
    id: 1,
    category: 'Hair',
    title: 'Buzz Cut',
    price: '$50.00',
    rating: '40%',
    reviews: 67,
    duration: '45 minutes',
    image: Images?.Hair,
  },
  {
    id: 2,
    category: 'Hair',
    title: 'Straight Hair',
    price: '$50.00',
    rating: '40%',
    reviews: 67,
    duration: '45 minutes',
    image: Images?.Hair,
  },
  {
    id: 3,
    category: 'Hair',
    title: 'Bald/Skinfade',
    price: '$50.00',
    rating: '40%',
    reviews: 67,
    duration: '45 minutes',
    image: Images?.Hair,
  },
  {
    id: 4,
    category: 'Hair',
    title: 'Kids Cut',
    price: '$50.00',
    rating: '40%',
    reviews: 67,
    duration: '45 minutes',
    image: Images?.Hair,
  },
  {
    id: 5,
    category: 'Makeup',
    title: 'Basic Makeup',
    price: '$60.00',
    rating: '45%',
    reviews: 50,
    duration: '50 minutes',
    image: Images?.Makeup,
  },
  {
    id: 6,
    category: 'Makeup',
    title: 'Basic Makeup for bride',
    price: '$20.00',
    rating: '35%',
    reviews: 50,
    duration: '20 minutes',
    image: Images?.Makeup,
  },
  {
    id: 7,
    category: 'Makeup',
    title: 'Simple Makeup',
    price: '$90.00',
    rating: '85%',
    reviews: 50,
    duration: '40 minutes',
    image: Images?.Makeup,
  },
  {
    id: 8,
    category: 'Makeup',
    title: 'Top cate Makeup',
    price: '$180.00',
    rating: '65%',
    reviews: 50,
    duration: '70 minutes',
    image: Images?.Makeup,
  },
];

const PostLook = ({ navigation }) => {
  const dispatch = useDispatch();
  const createPostData = useSelector((state) => state.createPostData);
  const getSelectedServiceData = useSelector((state) => state.getSelectedServiceData);
  const getStaffData = useSelector((state) => state.getStaffData);
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const [isModalProfessionalVisible, setModalProfessionalVisible] =
    useState(false);
  const [ProfessionalData, setProfessionalData] = useState(null);
  const handleOpenModal = () => setModalProfessionalVisible(true);
  const handleCloseModal = () => setModalProfessionalVisible(false);

  const [isServiceSelectorVisible, setServiceSelectorVisible] = useState(false);
  const [chosenService, setChosenService] = useState(null);
  const [chosenCategories, setChosenCatgories] = useState(null);
  const [selectedImageRes, setSelectedResImage] = useState({});
  const [services, setServices] = useState([]);
  const [professionalArray, setProfessionalArray] = useState([]);



  useEffect(() => {
    if (createPostData?.response?.message == 'success') {
      navigation.goBack()
      dispatch(CreatePostRemoveAction())
    }
  }, [createPostData]);

  useEffect(() => {
    // console.log('getSelectedServiceData?.response?.result', getSelectedServiceData?.response?.result)
    if (getSelectedServiceData?.response?.result?.length > 0) {
      //  console.log('getSelectedServiceData?.response?.result', getSelectedServiceData?.response?.result)
      setServices(getSelectedServiceData?.response?.result)
    }
  }, [getSelectedServiceData])

  useEffect(() => {
    if (Array.isArray(getStaffData?.response?.result)) {
      if (getStaffData?.response?.result.length > 0) {
        // console.log('getStaffData?.response?.result' , getStaffData?.response?.result)
        setProfessionalArray(getStaffData?.response?.result)
      } else {
        setProfessionalArray([])
      }
    }
  }, [getStaffData])



  useEffect(() => {
    GetSelectedServices()
    getStaffDetail()
  }, [])

  const getStaffDetail = async () => {
    const userId = await AsyncStorage.getItem('token')
    dispatch(GetStaffAction({
      business_id: userId
    }))
  }


  const GetSelectedServices = async () => {
    const userId = await AsyncStorage.getItem('token')
    const params = {
      business_id: userId
    }
    dispatch(GetSelectedServicesAction(params))
  }

  const handleSelectImage = async () => {
    try {
      openImagePicker();
    } catch (error) {
      console.log('Image picker error:', error);
    }
  };

  const storeDataToState = data => {
    setProfessionalData(data);
    // console.log('datadatadata', data);
  };

  const handleServiceSelect = (data) => {
    // console.log('service:', data);

    setChosenService(data?.service);
    setChosenCatgories(data?.selectServiceDetail)
  };

  const openImagePicker = () => {
    const options = {
      mediaType: 'mixed', // 'photo', 'video', or 'mixed' to show both
      quality: 1,
      selectionLimit: 1, // Allows selecting one item at a time
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const asset = response.assets[0];
        console.log('asset', asset);
        setSelectedImageUri(asset?.uri);
        setSelectedResImage(response.assets)
      }
    });
  };



  const createFileFromPickerData = (imagePickerResponse) => {
    if (imagePickerResponse && imagePickerResponse.length > 0) {
      const fileData = imagePickerResponse[0]; // Assuming single file selection
      const { uri, fileName, type } = fileData;

      // Check if it's an image or a video
      const isVideo = type && type.startsWith('video/');

      // Creating a file object for FormData
      const file = {
        uri: Platform.OS === 'android' ? uri : uri.replace('file://', ''), // Remove 'file://' on iOS
        name: fileName || (isVideo ? 'video.mp4' : 'image.jpg'), // Default names
        type: type || (isVideo ? 'video/mp4' : 'image/jpeg'), // Default MIME types
      };

      return file;
    }
    return null;
  };

  // console.log("selectedImageRes ======>" , selectedImageRes)
  const addNewPost = async () => {
    const userId = await AsyncStorage.getItem('token')
    const formData = new FormData();
    const imageFile = await createFileFromPickerData(selectedImageRes)
    formData.append('business_id', userId);
    formData.append('staff_id', ProfessionalData?.staff_id);
    formData.append('category_id', chosenCategories?.category_id);
    formData.append('service_id', chosenService?.service_id);
    formData.append('files', imageFile);
    dispatch(CreatePostAction(formData))
  }

  const postBtnEnable = chosenService?.service_id && ProfessionalData?.staff_id && selectedImageRes != {}

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title={'Post a Look!'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ListProfessionalModal
          visible={isModalProfessionalVisible}
          onClose={handleCloseModal}
          onSelect={e => storeDataToState(e)}
        />
        <ServiceSelector
          visible={isServiceSelectorVisible}
          onClose={() => setServiceSelectorVisible(false)}
          onSelectService={handleServiceSelect}
          tabs={tabs}
          services={services}
        />
        {/* Upload Section */}
        <View style={{ paddingHorizontal: (mobileW * 5) / 100 }}>
          {selectedImageUri == null ? (
            <View style={styles.uploadContainer}>
              <TouchableOpacity
                onPress={() => handleSelectImage()}
                style={styles.uploadButton}>
                {/* Replace with an actual icon if available */}
                <Image source={Images?.Upload} style={styles?.serviceIcon} />
              </TouchableOpacity>

              <Text style={styles.uploadText}>Upload a picture or a video</Text>
            </View>
          ) : (
            <Image
              source={{ uri: selectedImageUri }}
              style={styles?.uploadContainer}
            />
          )}
          {ProfessionalData == null ? (
            <TouchableOpacity
              onPress={() => handleOpenModal()}
              activeOpacity={0.8}
              disabled={professionalArray.length == 0}
              style={[styles.itemContainer, professionalArray.length == 0 && { opacity: 0.5 }]}>
              <Image
                source={Images?.AddProfissional}
                resizeMode="contain"
                style={styles.icon}
              />
              <View style={styles.txtView}>
                <Text style={styles.itemLabel}>Select Professional</Text>
              </View>
              <Image source={Images?.forwardIcon} style={styles.forwardIcon} />
            </TouchableOpacity>
          ) : (
            <View activeOpacity={0.8} style={styles.itemContainer}>
              <Image
                source={{ uri: ProfessionalData.profile }}
                resizeMode="contain"
                style={styles.personImage}
              />
              <View style={styles.txtView}>
                <Text style={[styles.itemLabel, { left: 9 }]}>
                  {ProfessionalData.name}
                </Text>
                <Text style={styles.emailLabel}>{ProfessionalData.email}</Text>
              </View>
              <TouchableOpacity onPress={() => handleOpenModal()}>
                <Image source={Images?.EditPen} style={styles.forwardIcon} />
              </TouchableOpacity>
            </View>
          )}
          {chosenService == null ? (
            <TouchableOpacity
              onPress={() => setServiceSelectorVisible(true)}
              activeOpacity={0.8}
              disabled={services.length == 0}
              style={[styles.itemContainer, services.length == 0 && { opacity: 0.5 }]}>
              <Image
                source={Images?.selectService}
                resizeMode="contain"
                style={styles.icon}
              />
              <View style={styles.txtView}>
                <Text style={styles.itemLabel}>Select Service</Text>
              </View>
              <Image source={Images?.forwardIcon} style={styles.forwardIcon} />
            </TouchableOpacity>
          ) : (
            <View activeOpacity={0.8} style={styles.serviceContainer}>
              <View
                style={{
                  backgroundColor: 'red',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 8,
                  alignSelf: 'flex-start',
                  paddingVertical: 8,
                  borderRadius: (mobileW * 10) / 100,
                  backgroundColor: Colors.semiPurpleLight,
                  borderWidth: 1,
                  borderColor: Colors.borderColor,
                }}>
                <Image
                  source={{ uri: chosenCategories?.category_image }}
                  resizeMode="contain"
                  style={styles.serviceImage}
                />
              </View>
              <View style={styles.txtView}>
                <Text style={styles.catName}>{chosenCategories.category}</Text>
                <Text style={styles.titleService}>{chosenService.service}</Text>
                <Text style={styles.duration}>
                  {'Duration: ' + chosenService.duration}
                </Text>
                <Text style={styles.servicePrice}>{chosenService.price}</Text>
              </View>
              <TouchableOpacity onPress={() => setServiceSelectorVisible(true)}>
                <Image source={Images?.EditPen} style={styles.forwardIcon} />
              </TouchableOpacity>
            </View>
          )}
          <View style={{ height: 20 }} />
          {/* Post Button */}
          <CommonButton
            isDisable={!postBtnEnable}
            onPress={() => {
              addNewPost()
            }}
            buttonStyle={{backgroundColor : postBtnEnable ? Colors?.primary : Colors?.OrGray}}
            title={'Post'}
          />
          <View style={{ height: 50 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  uploadContainer: {
    height: (mobileH * 50) / 100,
    borderRadius: 15,
    backgroundColor: Colors.purpleLite,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: (mobileW * 4) / 100,
  },
  uploadButton: {
    borderRadius: 10,
    padding: 10,
  },
  uploadIcon: {
    fontSize: 24,
    color: '#6A1B9A',
  },
  uploadText: {
    marginTop: 10,
    fontSize: 15,
    color: Colors.primary,
    fontWeight: '600',
  },
  optionContainer: {
    marginBottom: 30,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  iconWrapper: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F2E9FC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  iconText: {
    color: '#D5A3FF',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#3C1A78',
  },
  disabledText: {
    color: '#A0A0A0',
  },
  arrow: {
    fontSize: 18,
    color: '#A0A0A0',
  },
  postButton: {
    backgroundColor: '#DADADA',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  serviceIcon: {
    width: (mobileW * 7) / 100,
    height: (mobileW * 9) / 100,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: (mobileW * 3) / 100,
    width: (mobileW * 90) / 100,
    alignSelf: 'center',
    marginTop: (mobileW * 4.5) / 100,
    paddingVertical: (mobileW * 4) / 100,
    borderRadius: (mobileW * 3.5) / 100,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.borderColor,
  },
  serviceContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: (mobileW * 3) / 100,
    width: (mobileW * 90) / 100,
    alignSelf: 'center',
    marginTop: (mobileW * 4.5) / 100,
    paddingVertical: (mobileW * 4) / 100,
    borderRadius: (mobileW * 3) / 100,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    justifyContent: 'space-between',
    // paddingHorizontal: (mobileW * 5) / 100,
  },
  imageBackView: {
    backgroundColor: '#F5F0FF',
    borderRadius: (mobileW * 5.5) / 100,
    width: (mobileW * 11) / 100,
    height: (mobileW * 11) / 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: (mobileW * 10) / 100,
    height: (mobileW * 10) / 100,
  },
  personImage: {
    width: (mobileW * 12) / 100,
    height: (mobileW * 12) / 100,
    borderRadius: (mobileW * 6) / 100,
  },
  serviceImage: {
    width: (mobileW * 6) / 100,
    height: (mobileW * 6) / 100,
  },
  forwardIcon: {
    width: (mobileW * 4) / 100,
    height: (mobileW * 4) / 100,
  },
  txtView: {
    width: (mobileW * 66) / 100,
  },
  itemLabel: {
    fontSize: 15,
    color: '#301E39',
    fontWeight: '600',
  },
  emailLabel: {
    fontSize: (mobileW * 3) / 100,
    color: '#333333',
    marginLeft: 10,
    fontWeight: '400',
    paddingVertical: (mobileW * 0.6) / 100,
  },
  itemDescription: {
    fontSize: (mobileW * 3.2) / 100,
    color: '#c2becb',
    marginLeft: 10,
    fontWeight: '400',
  },
  servicePrice: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: (mobileW * 4) / 100,
  },
  titleService: {
    fontSize: (mobileW * 4) / 100,
    color: Colors.black,
    fontWeight: '600',
    paddingVertical: (mobileW * 0.5) / 100,
  },
  catName: {
    fontSize: (mobileW * 3.4) / 100,
    color: '#333333',
    fontWeight: '500',
    paddingVertical: (mobileW * 0.5) / 100,
  },
  duration: {
    fontSize: (mobileW * 3.4) / 100,
    color: '#333333',
    fontWeight: '400',
    paddingVertical: (mobileW * 0.5) / 100,
  },
});

export default PostLook;
