import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
import { Images } from '../../assets/images';
import { Colors } from '../../theme/colors';
import { DimensionsConfig } from '../../theme/dimensions';
import { GetPrepaidPackageAction } from '../../redux/action/GetPrepaidPackageAction';
import { useDispatch, useSelector } from 'react-redux';
const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);

const SelectPackageModal = ({ visible, onClose, onSelect }) => {
  const dispatch = useDispatch();
  const getPrepaidPackageData = useSelector((state) => state.getPrepaidPackageData);
  const [selectedOption, setSelectedOption] = useState('highToLow');
  const [selectedId, setSelectedId] = useState(null);
  const [data, setData] = useState([])


  useEffect(() => {
    if (visible) {
      dispatch(GetPrepaidPackageAction())
    }

  }, [visible])

  useEffect(() => {
    if (getPrepaidPackageData?.response?.result) {
      console.log('getPrepaidPackageData?.response?.result', getPrepaidPackageData?.response?.result)
      setData(getPrepaidPackageData?.response?.result)
    }
  }, [getPrepaidPackageData])

  // const data = [
  //   {
  //     id: '1',
  //     name: 'Package 1',
  //     rating: 5.0,
  //     reviews: 121,
  //     image: Images.Image1,
  //     email: 'Johnathanmorrison@gmail.com',
  //   },
  //   {
  //     id: '2',
  //     name: 'Package 2',
  //     rating: 5.0,
  //     reviews: 100,
  //     image: Images.Image2,
  //     email: 'Mariakevin@gmail.com',
  //   },
  //   {
  //     id: '3',
  //     name: 'Package 3',
  //     rating: 5.0,
  //     reviews: 99,
  //     image: Images.image11,
  //     email: 'Lindajohnson@gmail.com',
  //   },
  //   {
  //     id: '4',
  //     name: 'Package 4',
  //     rating: 5.0,
  //     reviews: 80,
  //     image: Images.image22,
  //     email: 'KevinFrank@gmail@gmail.com',
  //   },
  //   {
  //     id: '5',
  //     name: 'Package 5',
  //     rating: 5.0,
  //     reviews: 60,
  //     image: Images.image33,
  //     email: 'Dwaynejackson@gmail@gmail.com',
  //   },
  //   {
  //     id: '6',
  //     name: 'Package 6',
  //     rating: 5.0,
  //     reviews: 45,
  //     image: Images.image44,
  //     email: 'Tomcameron@gmail@gmail.com',
  //   },
  //   {
  //     id: '7',
  //     name: 'Package 7',
  //     rating: 5.0,
  //     reviews: 40,
  //     image: Images.image55,
  //     email: 'Conorcharlie@gmail@gmail.com',
  //   },
  // ];

  const handleItemPress = item => {
    const newSelectedId = item.id === selectedId ? null : item.id;
    setSelectedId(newSelectedId);

    // Return selected item data to the parent component
    if (onSelect) {
      onSelect(newSelectedId ? item : null); // Pass selected item or null if deselected
    }
    onClose();
  };

  const renderItem = ({ item, index }) => {
    const isSelected = item.id === selectedId;
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => handleItemPress(item)}>
        <Image source={Images.image44} style={styles.profileImage} />
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>Package {item?.total_price}</Text>
        </View>
        <Image
          source={isSelected ? Images.selectedButton : Images.unSelectedButton}
          style={styles.plusIcon}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <TouchableOpacity style={styles.modalOverlay} onPress={onClose} />
      <View style={styles.modalContent}>
        <TouchableOpacity
          onPress={onClose}
          hitSlop={100}
          style={styles?.CloserView}
        />
        <Text style={styles.title}>Select Package</Text>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </Modal>
  );
};

export default SelectPackageModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    height: '90%',
    width: '100%',
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: DimensionsConfig.screenWidth * 0.02,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 15,
    paddingHorizontal: (mobileW * 3) / 100,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: (mobileW * 3) / 100,
    borderBottomColor: '#E0E0E0',
    paddingHorizontal: (mobileW * 2) / 100,
    width: (mobileW * 90) / 100,
    backgroundColor: Colors.white,
    marginTop: (mobileW * 4) / 100,
    alignSelf: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  profileImage: {
    width: (mobileW * 14) / 100,
    height: (mobileW * 14) / 100,
    borderRadius: (mobileW * 2) / 100,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.black, // Star color
    marginRight: 8,
  },
  reviewsText: {
    fontSize: 14,
    color: '#888',
  },
  plusIcon: {
    width: (mobileW * 5) / 100,
    height: (mobileW * 5) / 100,
  },
  CloserView: {
    height: DimensionsConfig?.screenHeight * 0.004,
    width: DimensionsConfig?.screenWidth * 0.14,
    borderRadius: 10,
    backgroundColor: '#9E98AC',
    alignSelf: 'center',
    marginBottom: 10,
  },
});
