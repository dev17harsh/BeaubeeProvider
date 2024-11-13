import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppHeader from "../components/AppHeader";
import ListProfessionalModal from "../components/ListProfessionalModal";
import ServiceSelector from "../components/Modal.js/ServiceSelector";
import { mobileH, mobileW } from "../components/utils";
import { Images } from "../assets/images";
import CommonButton from "../components/CommonButton";
import { Colors } from "../theme/colors";
import { launchImageLibrary } from "react-native-image-picker";


const tabs = ['Hair', 'Makeup', 'Skincare', 'Nails'];
const services = [
  {
    id: 1,
    category: 'Hair',
    title: 'Buzz Cut',
    price: 'From $50.00',
    rating: '40%',
    reviews: 67,
    duration: '45 minutes',
  },
  {
    id: 2,
    category: 'Hair',
    title: 'Straight Hair',
    price: 'From $50.00',
    rating: '40%',
    reviews: 67,
    duration: '45 minutes',
  },
  {
    id: 3,
    category: 'Hair',
    title: 'Bald/Skinfade',
    price: 'From $50.00',
    rating: '40%',
    reviews: 67,
    duration: '45 minutes',
  },
  {
    id: 4,
    category: 'Hair',
    title: 'Kids Cut',
    price: 'From $50.00',
    rating: '40%',
    reviews: 67,
    duration: '45 minutes',
  },
  {
    id: 5,
    category: 'Makeup',
    title: 'Basic Makeup',
    price: 'From $60.00',
    rating: '45%',
    reviews: 50,
    duration: '60 minutes',
  },
];

const PostLook = ({navigation}) => {
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const [isModalProfessionalVisible, setModalProfessionalVisible] =
    useState(false);
  const [ProfessionalData, setProfessionalData] = useState(null);
  const handleOpenModal = () => setModalProfessionalVisible(true);
  const handleCloseModal = () => setModalProfessionalVisible(false);

  const [isServiceSelectorVisible, setServiceSelectorVisible] = useState(false);
  const [chosenService, setChosenService] = useState(null);

  // Callback to handle selected service data from ServiceSelector
  const handleServiceSelection = service => {
    setChosenService(service);
    console.log('Chosen Service:', service);
  };

  const handleSelectImage = async () => {
    try {
      openImagePicker()
    } catch (error) {
      console.log('Image picker error:', error);
    }
  };

  const storeDataToState = data => {
    setProfessionalData(data);
    console.log('datadatadata', data);
  };

  const handleServiceSelect = service => {
    setChosenService(service);
  };

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo', // 'photo', 'video', or 'mixed' to show both
      quality: 1,
      selectionLimit: 1,  // Allows selecting one item at a time
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // Capture the selected media
        const asset = response.assets[0];
        console.log('asset' , asset)
        setSelectedImageUri(asset?.uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <AppHeader title={'Poat a Look!'} />
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
        <View style={{paddingHorizontal: (mobileW * 5) / 100}}>
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
              source={{uri: selectedImageUri}}
              style={styles?.uploadContainer}
            />
          )}
          {ProfessionalData == null ? (
            <TouchableOpacity
              onPress={() => handleOpenModal()}
              activeOpacity={0.8}
              style={styles.itemContainer}>
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
            <TouchableOpacity
              onPress={() => handleOpenModal()}
              activeOpacity={0.8}
              style={styles.itemContainer}>
              <Image
                source={Images?.image11}
                resizeMode="contain"
                style={styles.personImage}
              />
              <View style={styles.txtView}>
                <Text style={styles.itemLabel}>{ProfessionalData.name}</Text>
                <Text style={styles.emailLabel}>{ProfessionalData.email}</Text>
              </View>
              <Image source={Images?.EditPen} style={styles.forwardIcon} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => setServiceSelectorVisible(true)}
            activeOpacity={0.8}
            style={styles.itemContainer}>
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
          <View style={{height: 20}} />
          {/* Post Button */}
          <CommonButton title={'Post'} onPress={() => navigation.goBack()} />
          <View style={{height: 50}} />
        </View>
      </ScrollView>
    </View>
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
    fontSize: (mobileW * 4) / 100,
    // color: Colors.primary,
    fontWeight: '500',
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
    shadowOffset: {width: 0, height: 1},
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
    paddingHorizontal: (mobileW * 2) / 100,
    width: (mobileW * 90) / 100,
    alignSelf: 'center',
    marginTop: (mobileW * 4.5) / 100,
    paddingVertical: (mobileW * 4) / 100,
    borderRadius: (mobileW * 3) / 100,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
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
  forwardIcon: {
    width: (mobileW * 4) / 100,
    height: (mobileW * 4) / 100,
  },
  txtView: {
    width: (mobileW * 69) / 100,
  },
  itemLabel: {
    fontSize: (mobileW * 3.5) / 100,
    color: '#333333',
    marginLeft: 10,
    fontWeight: '500',
  },
  emailLabel: {
    fontSize: (mobileW * 3) / 100,
    color: '#333333',
    marginLeft: 10,
    fontWeight: '400',
  },
  itemDescription: {
    fontSize: (mobileW * 3.2) / 100,
    color: '#c2becb',
    marginLeft: 10,
    fontWeight: '400',
  },
});

export default PostLook;
