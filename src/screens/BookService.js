import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import AppHeader from '../components/AppHeader';
import {Colors} from '../theme/colors';
import {Images} from '../assets/images';
import {DimensionsConfig} from '../theme/dimensions';
import ListProfessionalModal from '../components/Modal.js/ListProfessionalModal';
import CommonButton from '../components/CommonButton';

const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);
const BookServices = ({navigation}) => {
  const [selectedValue, setSelectedValue] = useState('0');
  const [selectedSlot, setSelectedSlot] = useState('1:00 - 2:00');
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [isModalProfessionalVisible, setModalProfessionalVisible] =
    useState(false);

  const timeSlots = [
    {time: '12:00 - 1:00', notification: true},
    {time: '1:00 - 2:00', notification: false},
    {time: '3:00 - 4:00', notification: false},
    {time: '4:00 - 5:00', notification: true},
    {time: '5:00 - 6:00', notification: false},
    {time: '6:00 - 7:00', notification: false},
    {time: '7:00 - 8:00', notification: false},
    {time: '8:00 - 9:00', notification: true},
    {time: '9:00 - 10:00', notification: false},
    {time: '10:00 - 11:00', notification: false},
    {time: '11:00 - 12:00', notification: true},
  ];

  const addons = [
    {id: '1', name: 'Add On 1', duration: '10 minutes', price: '$10.00'},
    {id: '2', name: 'Add On 2', duration: '10 minutes', price: '$10.00'},
  ];

  const onDateChange = date => {
    setSelectedStartDate(date);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={[
        styles.timeSlot,
        selectedSlot === item.time && styles.selectedTimeSlot,
      ]}
      onPress={() => setSelectedSlot(item.time)}>
      <Text
        style={[
          styles.timeText,
          selectedSlot === item.time && styles.selectedTimeText,
        ]}>
        {item.time}
      </Text>
      {item.notification && (
        <Image
          resizeMode="contain"
          source={Images.belIconWithBack}
          style={styles.bellIcons}
        />
      )}
    </TouchableOpacity>
  );

  const AddOnCard = ({name, duration, price}) => (
    <View style={styles.addOnCard}>
      <Text style={styles.addOnName}>{name}</Text>
      <Text style={styles.addOnDuration}>Duration: {duration}</Text>
      <Text style={styles.addOnPrice}>{price}</Text>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );

  const handleOpenModal = () => setModalProfessionalVisible(true);
  const handleCloseModal = () => setModalProfessionalVisible(false);

  return (
    <View style={styles.container}>
      <ListProfessionalModal
        visible={isModalProfessionalVisible}
        onClose={handleCloseModal}
        // selectedItem={e => console.log(e)}
      />
      <AppHeader title={'Book Service'} />

      <ScrollView style={styles.Scrollcontainer}>
        {/* Header */}
        <View style={styles.creditSection}>
          <Text style={styles.creditAmount}>Straight Hair</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              // width: (mobileW * 86) / 100,
              flexDirection: 'row',
              marginTop: (mobileW * 2) / 100,
            }}>
            <Text
              style={[
                styles.creditTitle,
                {color: Colors?.primary, fontWeight: '600', fontSize: 14},
              ]}>
              $60.00
            </Text>
            <Text style={styles.creditTitle}>Duration: 45 minuets</Text>
          </View>
        </View>
        <View style={styles.straightLine} />
        <View>
          <Text style={styles.sectionTitle}>Add ons (Optional)</Text>
          <FlatList
            data={addons}
            keyExtractor={item => item.id}
            horizontal
            renderItem={({item}) => (
              <AddOnCard
                name={item.name}
                duration={item.duration}
                price={item.price}
              />
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.addOnList}
          />
        </View>
        <View style={styles.straightLine} />
        <Text style={styles.sectionTitle}>Select Professional (Optional)</Text>
        {/* Payment Method Section */}
        <View style={styles.paymentMethodContainer}>
          <TouchableOpacity
            onPress={() => {
              handleOpenModal();
            }}
            style={styles.methodDetails}>
            <Image
              resizeMode="contain"
              source={Images?.Image1}
              style={styles.personIcons}
            />
            <View
              style={{width: (mobileW * 64) / 100, left: (mobileW * 2) / 100}}>
              <Text style={styles.personNameText}>{'Select Professional'}</Text>
            </View>
            <Image source={Images.forwardIcon} style={styles.backIcon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={[styles.sectionRemove]}>
            X Remove Selection
          </Text>
        </TouchableOpacity>
        {/* Buttons */}
        <CommonButton
          title={'Finish'}
          onPress={() => navigation.goBack()}
          buttonStyle={{marginTop: (mobileH * 20) / 100}}
        />
        <View style={{marginTop: (mobileH * 5) / 100}} />
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
    paddingHorizontal: (mobileW * 5) / 100,
  },
  creditSection: {
    backgroundColor: '#fff',
    marginTop: (mobileW * 5) / 100,
    paddingHorizontal: (mobileW * 3) / 100,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    elevation: 1,
    paddingVertical: (mobileW * 4) / 100,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    // width: (mobileW * 90) / 100,
  },
  creditTitle: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.textBrown,
  },
  creditAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textDark,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textDark,
    marginBottom: 18,
    marginTop: -10,
  },
  sectionRemove: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.red,
    marginBottom: 18,
    marginTop: 10,
  },
  cardIcons: {
    width: (mobileW * 4) / 100,
    height: (mobileW * 4) / 100,
  },
  sectionText: {
    fontSize: (mobileW * 3.8) / 100,
    fontWeight: '300',
    color: '#3F3D56',
    left: (mobileW * 3) / 100,
  },
  selectionTxtView: {
    marginVertical: (mobileW * 1) / 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: (mobileW * 2) / 100,
    elevation: 3,
    marginTop: (mobileW * 5) / 100,
    shadowColor: '#000', // For iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  mapImage: {
    width: (mobileW * 90) / 100,
    height: (mobileW * 40) / 100,
    borderTopLeftRadius: (mobileW * 2.3) / 100,
    borderTopRightRadius: (mobileW * 2.3) / 100,
  },
  locationName: {fontSize: (mobileW * 4) / 100, color: '#000'},
  locationNameAdd: {
    fontSize: (mobileW * 2.8) / 100,
    color: '#000',
    marginTop: (mobileW * 1) / 100,
  },
  locationAddress: {
    width: (mobileW * 90) / 100,
    paddingHorizontal: (mobileW * 5) / 100,
    paddingVertical: (mobileW * 4) / 100,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: (mobileW * 2.3) / 100,
    borderBottomRightRadius: (mobileW * 2.3) / 100,
  },
  backIcon: {
    width: (mobileW * 4.2) / 100,
    height: (mobileW * 4.2) / 100,
  },
  AddIcon: {
    width: (mobileW * 6) / 100,
    height: (mobileW * 6) / 100,
  },
  straightLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#E7E7E7',
    marginVertical: (mobileW * 7) / 100,
  },
  timeSlotContainer: {},
  timeSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F6EFF9',
    margin: 6,
    paddingHorizontal: (mobileW * 3) / 100,
  },
  selectedTimeSlot: {
    backgroundColor: '#9B51E0',
  },
  timeText: {
    fontSize: 14,
    color: '#3F3D56',
  },
  selectedTimeText: {
    color: '#FFFFFF',
  },
  bellIcon: {
    marginLeft: 8,
  },
  bellIcons: {
    width: (mobileW * 6) / 100,
    height: (mobileW * 6) / 100,
    left: (mobileW * 2) / 100,
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
    borderWidth: 1,
    borderColor: '#EEE6F1',
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
  rescheduleButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  rescheduleText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  personImageIcons: {
    width: (mobileW * 14) / 100,
    height: (mobileW * 14) / 100,
    borderRadius: (mobileW * 7) / 100,
    backgroundColor: '#F6EFF9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  personIcons: {
    width: (mobileW * 12) / 100,
    height: (mobileW * 12) / 100,
    borderRadius: (mobileW * 6) / 100,
  },
  personNameText: {
    fontSize: 16,
    color: '#000',
    left: (mobileW * 1) / 100,
  },
  calendarText: {
    color: '#3F3D56',
  },
  todayText: {
    fontWeight: 'bold',
    color: '#000',
  },
  calenderView: {
    backgroundColor: '#ffffff',
    padding: (mobileW * 4) / 100,
    borderRadius: (mobileW * 2) / 100,
    borderWidth: (mobileW * 0.2) / 100,
    borderColor: Colors.OrGray,
  },
  addOnList: {
    flexDirection: 'row',
  },
  addOnCard: {
    borderRadius: DimensionsConfig?.screenWidth * 0.03,
    padding: DimensionsConfig?.screenWidth * 0.04,
    marginRight: DimensionsConfig?.screenWidth * 0.03,
    width: DimensionsConfig?.screenWidth * 0.55,
    position: 'relative',
    borderWidth: 1,
    borderColor: Colors.borderColor,
  },
  addOnName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  addOnDuration: {
    fontSize: 12,
    color: '#888',
    marginVertical: DimensionsConfig?.screenWidth * 0.015,
  },
  addOnPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#9C27B0',
  },
  addButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#F6EFF9',
    borderRadius: (DimensionsConfig?.screenWidth * 0.07) / 2,
    width: DimensionsConfig?.screenWidth * 0.07,
    height: DimensionsConfig?.screenWidth * 0.07,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 22,
    color: '#9C27B0',
    alignSelf: 'center',
    marginTop: -DimensionsConfig?.screenWidth * 0.008,
  },
  noteforProfessionalTxt: {
    fontSize: 12,
    color: '#9E98AC',
    marginVertical: DimensionsConfig?.screenWidth * 0.01,
  },
});

export default BookServices;
