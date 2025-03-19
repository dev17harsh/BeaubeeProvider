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
import { DimensionsConfig } from '../../theme/dimensions';
import { Images } from '../../assets/images';
import { Colors } from '../../theme/colors';
import CommonButton from '../CommonButton';
import { TextInput as TextInputPaper } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { GetCustomerDetailsAction } from '../../redux/action/GetCustomerDetailsAction';
const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);

const SelectGiftCardModal = ({ visible, onClose, onSelect }) => {
  const dispatch = useDispatch();
  const getCustomerDetailsData = useSelector((state) => state.getCustomerDetailsData);
  const [customerData, setCustomerData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedTab, setSelectedTab] = useState('Exixting');

  useEffect(() => {
    // console.log('getCustomerDetailsData?.response?.result' , getCustomerDetailsData?.response?.result)
    if (getCustomerDetailsData?.response?.result) {
      setCustomerData(getCustomerDetailsData?.response?.result)
    }
  }, [getCustomerDetailsData])

  useEffect(() => {
    if (visible) {
      dispatch(GetCustomerDetailsAction('All'))
    }
  }, [visible])

  const tabsView = () => {
    return (
      <View style={styles.tabs}>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab('Exixting');
          }}
          style={[styles.tab, selectedTab === 'Exixting' && styles.activeTab]}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'Exixting' && styles.activeTabText,
            ]}>
            Exixting
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab('New');
          }}
          style={[styles.tab, selectedTab === 'New' && styles.activeTab]}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'New' && styles.activeTabText,
            ]}>
            New
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  // const data = [
  //   {
  //     id: '1',
  //     name: 'Johnathan Morrison',
  //     rating: 5.0,
  //     reviews: 121,
  //     image: Images.Image1,
  //     email: 'Johnathanmorrison@gmail.com',
  //   },
  //   {
  //     id: '2',
  //     name: 'Maria Kevin',
  //     rating: 5.0,
  //     reviews: 100,
  //     image: Images.Image2,
  //     email: 'Mariakevin@gmail.com',
  //   },
  //   {
  //     id: '3',
  //     name: 'Linda Johnson',
  //     rating: 5.0,
  //     reviews: 99,
  //     image: Images.image11,
  //     email: 'Lindajohnson@gmail.com',
  //   },
  //   {
  //     id: '4',
  //     name: 'Kevin Frank',
  //     rating: 5.0,
  //     reviews: 80,
  //     image: Images.image22,
  //     email: 'KevinFrank@gmail@gmail.com',
  //   },
  //   {
  //     id: '5',
  //     name: 'Dwayne Jackson',
  //     rating: 5.0,
  //     reviews: 60,
  //     image: Images.image33,
  //     email: 'Dwaynejackson@gmail@gmail.com',
  //   },
  //   {
  //     id: '6',
  //     name: 'Tom Cameron',
  //     rating: 5.0,
  //     reviews: 45,
  //     image: Images.image44,
  //     email: 'Tomcameron@gmail@gmail.com',
  //   },
  //   {
  //     id: '7',
  //     name: 'Conor Charlie',
  //     rating: 5.0,
  //     reviews: 40,
  //     image: Images.image55,
  //     email: 'Conorcharlie@gmail@gmail.com',
  //   },
  // ];

  const handleItemPress = item => {
    // const newSelectedId = item.user_id === selectedId ? null : item.user_id;
    setSelectedId(item);

    // Return selected item data to the parent component
    // if (onSelect) {
    //   onSelect(newSelectedId ? item : null); // Pass selected item or null if deselected
    // }
  };

  const renderItem = ({ item }) => {
    const isSelected = item?.user_id === selectedId?.user_id;
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => handleItemPress(item)}>
        <Image source={{ uri: item.user_image }} style={styles.profileImage} />
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>{item.customer_name}</Text>
        </View>
        <Image
          source={isSelected ? Images.selectedButton : Images.unSelectedButton}
          style={styles.plusIcon}
        />
      </TouchableOpacity>
    );
  };

  const newDataView = () => {
    return (
      <>
        <Text style={styles.title}>Customer Details</Text>
        <View>
          <TextInputPaper
            style={styles.textInputStyle}
            outlineColor={Colors?.OrGray}
            activeOutlineColor={Colors?.gray}
            label="Name"
            // onChangeText={text => setText(text)}
            mode="outlined"
            placeholder="Enter Name"
          />
          <TextInputPaper
            style={styles.textInputStyle}
            outlineColor={Colors?.OrGray}
            activeOutlineColor={Colors?.gray}
            label="Email"
            // onChangeText={text => setText(text)}
            mode="outlined"
            placeholder="Enter Email"
          />
          <TextInputPaper
            style={styles.textInputStyle}
            outlineColor={Colors?.OrGray}
            activeOutlineColor={Colors?.gray}
            label="Phone"
            // onChangeText={text => setText(text)}
            mode="outlined"
            placeholder="Enter Phone"
          />
          <View
            style={{
              width: (mobileW * 92) / 100,
              marginTop: (mobileH * 30) / 100,
              alignSelf: 'center',
            }}>
            <CommonButton onPress={() => onClose()} title={'Add Customer'} />
          </View>
        </View>
      </>
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
        {tabsView()}
        {selectedTab === 'Exixting' ? (
          <>
            <Text style={styles.title}>Select Customer</Text>
            <FlatList
              data={customerData}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.user_id}
              renderItem={renderItem}
              contentContainerStyle={styles.listContent}
            />
            <CommonButton onPress={() => { onClose(), onSelect(selectedId.user_id ? selectedId : null) }} title={'Select'} />
          </>
        ) : (
          <>{newDataView()}</>
        )}
      </View>
    </Modal>
  );
};

export default SelectGiftCardModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    height: '95%',
    width: '100%',
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: DimensionsConfig.screenWidth * 0.02,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textDark,
    marginBottom: 15,
    paddingHorizontal: (mobileW * 3) / 100,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#E0E0E0',
    backgroundColor: Colors.white,
    alignSelf: 'center',
    width: (mobileW * 90) / 100,
    // elevation: 1,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.3,
    // shadowRadius: 4,
    marginTop: (mobileW * 1) / 100,
    paddingHorizontal: (mobileW * 3) / 100,
    // borderRadius: (mobileW * 2) / 100,
    // borderWidth:1,
    // borderColor:Colors.borderColor
  },
  profileImage: {
    width: (mobileW * 12) / 100,
    height: (mobileW * 12) / 100,
    borderRadius: (mobileW * 7) / 100,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textDark,
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
  tabs: {
    flexDirection: 'row',
    marginHorizontal: (mobileW * 1) / 100,
    backgroundColor: '#F6EFF9',
    borderRadius: (mobileW * 3) / 100,
    borderWidth: (mobileW * 1.5) / 100,
    borderColor: '#F6EFF9',
    marginVertical: (mobileW * 2) / 100,
    marginVertical: (mobileH * 3) / 100,
  },
  tab: {
    flex: 1,
    padding: 10,
    borderRadius: (mobileW * 3) / 100,
    paddingVertical: (mobileW * 2.8) / 100,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    fontSize: 14,
    color: Colors.black,
  },
  activeTabText: {
    fontWeight: 'bold',
  },
  textInputStyle: {
    width: (mobileW * 90) / 100,
    fontSize: 14,
    backgroundColor: '#fff',
    marginTop: (mobileW * 4) / 100,
    alignSelf: 'center',
  },
});
