import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { mobileH, mobileW } from '../components/utils';
import { Colors } from '../theme/colors';
import CustomSwitch from '../components/CustomSwitch';
import { Images } from '../assets/images';
import { Dropdown } from 'react-native-element-dropdown';
import OnOffModal from '../components/OnOffModal';
import BookingModal from '../components/Modal.js/BookingModal';
import CalendarPickerModal from '../components/Modal.js/CalendarPickerModal';
import ProfileModal from '../components/ProfileCard';
import CommonButton from '../components/CommonButton';

// Helper function to generate time slots between a given start and end time
const generateTimeSlots = (startTime, endTime) => {
  const timeSlots = [];
  let currentTime = startTime;

  while (currentTime < endTime) {
    timeSlots.push(currentTime);
    // Increment time by 15 minutes
    let [hour, minute] = currentTime.split(':').map(Number);
    minute += 15;
    if (minute === 60) {
      minute = 0;
      hour += 1;
    }
    currentTime = `${hour}:${minute.toString().padStart(2, '0')}`;
  }

  return timeSlots;
};

const dataForQue = [
  {
    id: '1',
    name: 'Olivia Smith',
    service: 'Classic Manicure',
    time: '4:10 pm',
    image: Images.image11,
    status: true,
  },
  {
    id: '2',
    name: 'Ava Williams',
    service: 'Deluxe Pedicure',
    time: '5:00 pm',
    image: Images.image22,
  },
  {
    id: '3',
    name: 'Mia Brown',
    service: 'Deep Cleansing Facial',
    time: '5:40 pm',
    image: Images.image33,
  },
  {
    id: '4',
    name: 'Charlotte Jones',
    service: 'Relaxation Massage',
    time: '6:15 pm',
    image: Images.image55,
  },
  {
    id: '5',
    name: 'Amelia Taylor',
    service: 'Hair Styling and Blowout',
    time: '6:45 pm',
    image: Images.image44,
  },
];

const profileData = {
  // profileImage:{Images.image11,},
  name: 'Olivia Smith',
  serviceName: 'Straight Hair',
  price: '$70.00',
  addOns: 'Add On 1',
  // assistantImage: "https://example.com/linda.jpg",
  assistantName: 'Linda Johnson',
  rating: '5.0',
  reviews: '121',
  onAddAmendPress: () => alert('Add/Amend Pressed'),
  onCompletePress: () => alert('Mark as Complete Pressed'),
};


const BookingsQueueScreen = ({navigation}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [dates, setDates] = useState([]);
  const [appointmentsData, setAppointmentsData] = useState({});
  const [selectedTab, setSelectedTab] = useState('Booking');
  const [isEnable, setisEnable] = useState(false);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [onOffModal, setonOffModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isCalendarVisible, setCalendarVisible] = useState(false); // Renamed state for modal visibility
  const [datePicked, setDatePicked] = useState(null); // Renamed state for the selected date
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [pauseQuery, setpauseQuery] = useState(false);
  const [resumeQuery, setresumeQuery] = useState(false);
  const [isEnableQueue, setisEnableQueue] = useState(false);
  const [EnablineQueModal, setEnablineQueModal] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);

  const openCalendar = () => {
    setCalendarVisible(true);
  };

  const handleDateSelected = date => {
    console.log('date:', date);
  };

  const data = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
    { label: 'Option 4', value: '4' },
  ];
  // Set up the dates dynamically for a week from today
  useEffect(() => {
    const today = new Date();
    const generatedDates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      return date.toISOString().split('T')[0];
    });
    setDates(generatedDates);
    setSelectedDate(generatedDates[0]);

    // Simulating fetching dynamic appointment data
    setAppointmentsData({
      [generatedDates[0]]: [
        {
          time: '16:10 - 16:40',
          slot: '16:10',
          name: 'John D.',
          service: 'Haircut and Beard Trim',
        },
        {
          time: '17:00 - 17:40',
          slot: '17:00',
          name: 'John D.',
          service: 'Haircut and Beard Trim',
        },
      ],
      [generatedDates[1]]: [
        {
          time: '17:30 - 18:00',
          slot: '17:30',
          name: 'Jane S.',
          service: 'Manicure',
        },
      ],
    });
  }, []);

  // Generate time slots between 4 PM and 8 PM
  const timeSlots = generateTimeSlots('16:00', '20:00');

  const renderTimeSlot = time => {
    const appointment = appointmentsData[selectedDate]?.find(
      appt => appt.slot === time,
    );
    return (
      <View style={styles.timeSlotContainer} key={time}>
        <Text style={styles.timeLabel}>{time}</Text>
        {appointment ? (
          <TouchableOpacity
            onPress={() => {navigation.navigate('BookingDetailScreen')}}
            style={[styles.appointmentContainer]}>
            <Text style={styles.timeText}>{appointment.time}</Text>
            <Text style={styles.nameText}>{appointment.name}</Text>
            <Text style={styles.serviceText}>{appointment.service}</Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
    );
  };

  const getDay = date => {
    return new Date(date).toLocaleDateString('en-US', { day: 'numeric' });
  };

  const getWeekday = date => {
    // Create a new Date object
    const options = { weekday: 'short' };
    return new Date(date)
      .toLocaleDateString('en-US', options)
      .split(',')[0]
      .toUpperCase(); // Ensure the output is in uppercase
  };

  const tabsView = () => {
    return (
      <View style={styles.tabs}>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab('Booking');
          }}
          style={[styles.tab, selectedTab === 'Booking' && styles.activeTab]}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'Booking' && styles.activeTabText,
            ]}>
            Bookings
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab('Queue');
          }}
          style={[styles.tab, selectedTab === 'Queue' && styles.activeTab]}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'Queue' && styles.activeTabText,
            ]}>
            Queue
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const toggleOpen = () => {
    setisEnable(!isEnable);
  };

  const dropDown = () => {
    return (
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select' : '...'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
    );
  };

  const modalOnoff = () => {
    setonOffModal(!onOffModal);
  };

  const bookingModalOffOn = () => {
    setModalVisible(!modalVisible);
  };

  const pauseQueryModal = () => {
    setpauseQuery(!pauseQuery);
  };

  const resumeQueryModal = () => {
    setresumeQuery(!resumeQuery);
  };

  const enableQueueModal = () => {
    setEnablineQueModal(!EnablineQueModal);
  };

  const BookingsData = () => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: (mobileW * 4) / 100,
            borderBottomWidth: (mobileW * 0.2) / 100,
            borderBottomColor: Colors.lightGray,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              width: (mobileW * 25) / 100,
            }}>
            <CustomSwitch
              isEnabled={isEnable}
              toggleSwitch={() => {
                toggleOpen(), bookingModalOffOn()
              }}
            />
            <TouchableOpacity onPress={() => {
              modalOnoff();
            }}>
              <Image style={styles.infoIcon} source={Images.Information} />
            </TouchableOpacity>
          </View>
          {dropDown()}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              width: (mobileW * 18) / 100,
            }}>
            <Image style={styles.calenderIcon} source={Images.Calender} />
            <TouchableOpacity onPress={() => openCalendar()}>
              <Image
                style={styles.calenderBlueIcon}
                source={Images.CalenderBlue}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'center',
            paddingVertical: (mobileW * 4) / 100,
          }}>
          <Text
            style={{ fontSize: (mobileW * 4.5) / 100, color: Colors.primary }}>
            August 14, 2022
          </Text>
          <TouchableOpacity onPress={() => openCalendar()}>
            <Image
              resizeMode="contain"
              style={[styles.EditIcon, { left: (mobileW * 2) / 100 }]}
              source={Images.Edit}
            />
          </TouchableOpacity>
        </View>
        {selectedDates.length > 1 ?(
          <></>
        ):(
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.daysContainer}>
            {dates.map((date, index) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  paddingHorizontal: (mobileW * 0.6) / 100,
                }}>
                <Text style={[styles.dayText1]}>{getWeekday(date)}</Text>
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dayButton,
                    date === selectedDate && styles.selectedDay,
                  ]}
                  onPress={() => setSelectedDate(date)}>
                  <Text
                    style={[
                      styles.dayText,
                      date === selectedDate && styles.selectedDayText,
                    ]}>
                    {getDay(date)}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
        {/* Vertical Time Slots with Appointments */}
        <ScrollView style={styles.appointmentsList}>
          {timeSlots.map(time => renderTimeSlot(time))}
        </ScrollView>

        {/* Floating Add Button */}
        <TouchableOpacity
          // onPress={() => openCalendar()}
          style={styles.addButton}>
          <Image style={styles.calenderIcon} source={Images.PlusWhite} />
        </TouchableOpacity>
      </>
    );
  };

  const dropDownQue = () => {
    return (
      <Dropdown
        style={[styles.dropdownQue, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select' : '...'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
    );
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setIsProfileModalVisible(true)}
        style={[styles?.card, item.status && styles.borderStyle]}>
        <Image source={item.image} style={styles?.avatar} />
        <View style={styles?.infoContainer}>
          <Text style={styles?.name}>{item.name}</Text>
          <Text style={styles?.service}>{item.service}</Text>
        </View>
        {item.status ? (
          <View style={styles?.progressContainer}>
            <Text style={styles?.progressTxt}>{'In Progress'}</Text>
          </View>
        ) : (
          <View style={styles?.timeContainer}>
            <Image style={styles?.timeIcon} source={Images?.Time} />
            <Text style={styles?.time}>{item.time}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const toggleOpenQue = () => {
    setisEnableQueue(!isEnableQueue);
  };

  const QueueData = () => {
    return (
      <>
        <ProfileModal
          visible={isProfileModalVisible}
          onClose={() => setIsProfileModalVisible(false)}
          profileImage={Images?.image11}
          name={profileData.name}
          serviceName={profileData.serviceName}
          price={profileData.price}
          addOns={profileData.addOns}
          assistantImage={Images?.image11}
          assistantName={profileData.assistantName}
          rating={profileData.rating}
          reviews={profileData.reviews}
          onAddAmendPress={profileData.onAddAmendPress}
          onCompletePress={profileData.onCompletePress}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: (mobileW * 4) / 100,
            borderBottomWidth: (mobileW * 0.2) / 100,
            borderBottomColor: Colors.lightGray,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              width: (mobileW * 25) / 100,
            }}>
            <CustomSwitch
              isEnabled={isEnableQueue}
              toggleSwitch={() => {
                toggleOpenQue();
                enableQueueModal();
              }}
            />
            <Image style={styles.infoIcon} source={Images.Information} />
          </View>
          {dropDownQue()}
        </View>
        <ScrollView>
          <View
            style={{
              backgroundColor: Colors.white,
              padding: 16,
              width: (mobileW * 90) / 100,
              alignSelf: 'center',
              marginTop: (mobileW * 4) / 100,
              borderRadius: (mobileW * 2) / 100,
              elevation: 2,
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                style={styles?.infoBackIcon}
                source={Images?.infoWithBack}
              />
              <Text style={[styles.name, { left: 10 }]}>
                Queue is getting too long
              </Text>
            </View>
            <Text
              style={[
                styles.service,
                {
                  paddingVertical: (mobileW * 2) / 100,
                  paddingHorizontal: (mobileW * 2) / 100,
                },
              ]}>
              Pause the queue temporarily, new customer’s won’t be able to join
              the queue. The existing queue remains.
            </Text>
            <CommonButton
              buttonStyle={{ backgroundColor: Colors.red }}
              title={'Pause Queue Temporarily'}
              onPress={() => pauseQueryModal()}
            />
          </View>
          <FlatList
            data={dataForQue}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
          />
        </ScrollView>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors?.white} barStyle={'dark-content'} />
      {/* Cancel appointment Modal */}
      <BookingModal
        modalText={'Are you sure you want to cancel this appointment?'}
        visible={modalVisible}
        onClose={bookingModalOffOn}
        type={modalVisible}
      />
      {/* Pause Query Moadl */}
      <BookingModal
        modalText={'Are you sure you want to pause the queue temporarily?'}
        buttonText={'Pause Queue'}
        midText={
          'The queue will be paused temporarily and will resume automatically once there are few customers left in it. '
        }
        visible={pauseQuery}
        onClose={pauseQueryModal}
        type={pauseQuery}
      />
      {/* Resume Query Moadl */}
      <BookingModal
        modalText={'Are you sure you want to resume the queue temporarily?'}
        buttonText={'Resume Queue'}
        midText={
          'The queue will be resumed regardless of the number of customers in it.'
        }
        visible={resumeQuery}
        onClose={resumeQueryModal}
        type={resumeQuery}
        buttonBackgroundColor={Colors.primary}
      />
      {/* Enable Query Moadl */}
      <BookingModal
        modalText={'Online bookings will be paused for the day!'}
        buttonText={'Turn On Queue'}
        midText={
          'Turning on queue will pause future bookings for today, existing bookings will take priority before queue.'
        }
        visible={EnablineQueModal}
        onClose={enableQueueModal}
        type={resumeQuery}
        buttonBackgroundColor={Colors.primary}
      />

      <OnOffModal visible={onOffModal} onClose={modalOnoff} />
      <CalendarPickerModal
        visible={isCalendarVisible}
        onClose={() => setCalendarVisible(false)} // Close modal handler
        selectedDates={selectedDates}
        setSelectedDates={setSelectedDates}
      />
      {tabsView()}
      {/* Data manage as per screen */}
      {selectedTab === 'Booking' ? BookingsData() : QueueData()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: (mobileW * 2) / 100,
  },
  daysContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
  },
  dayButton: {
    alignItems: 'center',
    padding: (mobileW * 3) / 100,
    marginTop: (mobileW * 1) / 100,
    width: (mobileW * 12) / 100,
    height: (mobileW * 12) / 100,
  },
  dayText: {
    color: '#666',
    fontSize: (mobileW * 4) / 100,
  },
  dayText1: {
    color: '#666',
    fontSize: (mobileW * 2.4) / 100,
    textAlign: 'center',
  },
  dateText: {
    color: '#666',
    fontSize: (mobileW * 3) / 100,
    fontWeight: 'bold',
  },
  selectedDay: {
    backgroundColor: Colors.primary,
    borderRadius: (mobileW * 6) / 100,
    width: (mobileW * 12) / 100,
    height: (mobileW * 12) / 100,
  },
  selectedDayText: {
    color: '#fff',
    fontSize: (mobileW * 4.5) / 100,
  },
  selectedDateText: {
    color: '#fff',
  },
  appointmentsList: {
    paddingHorizontal: 16,
    marginTop: (mobileW * 2) / 100,
  },
  timeSlotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  timeLabel: {
    width: 60,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    paddingRight: 10,
  },
  appointmentContainer: {
    flex: 1,
    backgroundColor: Colors.literPurple,
    borderRadius: 10,
    padding: 16,
    borderStartWidth: (mobileW * 1) / 100,
    borderStartColor: Colors.primary,
  },
  timeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8A2BE2',
  },
  nameText: {
    fontSize: 12,
    color: '#333',
  },
  serviceText: {
    fontSize: 12,
    color: '#666',
  },
  emptySlot: {
    flex: 1,
    height: 50,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
  },
  addButton: {
    backgroundColor: Colors?.primary,
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: (mobileW * 13) / 100,
    height: (mobileW * 13) / 100,
    borderRadius: (mobileW * 7.5) / 100,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
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
  infoIcon: {
    width: (mobileW * 5.5) / 100,
    height: (mobileW * 5.5) / 100,
  },
  timeIcon: {
    width: (mobileW * 4.3) / 100,
    height: (mobileW * 4.3) / 100,
  },
  infoBackIcon: {
    width: (mobileW * 9) / 100,
    height: (mobileW * 9) / 100,
  },
  EditIcon: {
    width: (mobileW * 6.5) / 100,
    height: (mobileW * 4.2) / 100,
  },
  calenderIcon: {
    width: (mobileW * 6) / 100,
    height: (mobileW * 6) / 100,
    resizeMode: 'contain',
  },
  calenderBlueIcon: {
    width: (mobileW * 5) / 100,
    height: (mobileW * 5) / 100,
    resizeMode: 'contain',
  },
  dropdown: {
    height: (mobileW * 8) / 100,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: (mobileW * 5) / 100,
    paddingHorizontal: (mobileW * 4) / 100,
    width: (mobileW * 35) / 100,
    left: 10,
  },
  dropdownQue: {
    height: (mobileW * 8) / 100,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: (mobileW * 5) / 100,
    paddingHorizontal: (mobileW * 4) / 100,
    width: (mobileW * 65) / 100,
    right: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  selectedText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: (mobileW * 2) / 100,
  },
  borderStyle: {
    borderWidth: 0.7,
    borderColor: Colors.primary,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  service: {
    fontSize: 14,
    color: '#666',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
    fontWeight: '600',
  },
  progressTxt: {
    fontSize: 14,
    color: Colors.primary,
    marginLeft: 4,
    fontWeight: '600',
  },
  progressContainer: {
    backgroundColor: Colors.purpleLite,
    paddingHorizontal: (mobileW * 4) / 100,
    paddingVertical: (mobileW * 0.5) / 100,
    borderRadius: (mobileW * 3) / 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BookingsQueueScreen;
