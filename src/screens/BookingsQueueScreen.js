import React, { useState, useEffect, useRef } from 'react';
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
import { DimensionsConfig } from '../theme/dimensions';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetStaffAction } from '../redux/action/GetStaffAction';
import { GetUserDetailAction } from '../redux/action/GetUserDetailAction';
import { UpdateFutureBookingsAction, UpdateFutureBookingsRemoveAction } from '../redux/action/UpdateFutureBookingsAction';
import { GetBookingsAction } from '../redux/action/GetBookingsAction';
import { UpdateQueuebtnStatusAction, UpdateQueuebtnStatusRemoveAction } from '../redux/action/UpdateQueuebtnStatusAction';
import { GetQueueAction } from '../redux/action/GetQueueAction';
import { UpdateQueueBookingRemoveAction, UpdateQueueBookingStatusAction } from '../redux/action/UpdateQueueBookingStatusAction';

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
    image: Images.person1,
    status: true,
    price: '$70.00',
    addOns: 'Add On 1',
    rating: '5.0',
    reviews: '78',
    assistantName: 'Linda Johnson',
  },
  {
    id: '2',
    name: 'Ava Williams',
    service: 'Deluxe Pedicure',
    time: '5:00 pm',
    image: Images.person2,
    price: '$100.00',
    addOns: 'Add On 2',
    rating: '4.0',
    reviews: '121',
    assistantName: 'Jasmine Does',
  },
  {
    id: '3',
    name: 'Mia Brown',
    service: 'Deep Cleansing Facial',
    time: '5:40 pm',
    image: Images.person3,
    price: '$90.00',
    addOns: 'Add On 1',
    rating: '3.0',
    reviews: '121',
    assistantName: 'John Willium',
  },
  {
    id: '4',
    name: 'Charlotte Jones',
    service: 'Relaxation Massage',
    time: '6:15 pm',
    image: Images.person4,
    price: '$80.00',
    addOns: 'Add On 3',
    rating: '4.0',
    reviews: '121',
    assistantName: 'Enna Mallik',
  },
  {
    id: '5',
    name: 'Amelia Taylor',
    service: 'Hair Styling and Blowout',
    time: '6:45 pm',
    image: Images.person5,
    price: '$40.00',
    addOns: 'Add On 4',
    rating: '5.0',
    reviews: '121',
    assistantName: 'Rosy Stone',
  },
];

const profileDataDetails = {
  name: 'Olivia Smith',
  service: 'Straight Hair',
  price: '$70.00',
  addOns: 'Add On 1',
  assistantName: 'Linda Johnson',
  rating: '5.0',
  reviews: '121',
  onAddAmendPress: () => navigation.navigate('BookService'),
  onCompletePress: () => alert('Mark as Complete Pressed'),
};

const BookingsQueueScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const getStaffData = useSelector((state) => state.getStaffData);
  const UserDetailData = useSelector((state) => state.getUserDetailData);
  const updateFutureBookingsData = useSelector((state) => state.updateFutureBookingsData);
  const getBookingsData = useSelector((state) => state.getBookingsData);
  const getQueueData = useSelector((state) => state.getQueueData);
  const updateQueueBtnStatusData = useSelector((state) => state.updateQueueBtnStatusData);
  const updateQueueBookingStatusData = useSelector((state) => state.updateQueueBookingStatusData);
  const isFocused = useIsFocused()
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
  const [selectedDates, setSelectedDates] = useState(null);
  const [isEnableQueUeModal, setEnableQueueModal] = useState(false);
  const [profileData, setprofileData] = useState(profileDataDetails);
  const [staffDropDownData, setStaffDropDownData] = useState([]);
  const [timeSlots, setTimeSlots] = useState([])
  const [queueData, setQueueData] = useState([])


  const dateScrollRef = useRef(null);


  // const timeSlots = [
  //   { id: "1", time: "4:10 pm - 4:40 pm", description: "Haircut and Beard Trim", stylist: "John D.", hour: "4PM" },
  //   { id: "2", time: "5:00 pm - 5:30 pm", description: "Haircut and Beard Trim", stylist: "John D.", hour: "5PM" },
  //   { id: "3", time: "5:30 pm - 6:00 pm", description: "Haircut and Beard Trim", stylist: "John D.", hour: "5PM" },
  //   { id: "4", time: "6:10 pm - 6:40 pm", description: "Haircut and Beard Trim", stylist: "John D.", hour: "6PM" },
  // ];


  useEffect(() => {
    if (isFocused) {
      getData()
      dispatch(GetUserDetailAction())
      getQueueValData('')
    }

  }, [isFocused])



  useEffect(() => {
    if (getStaffData?.response?.result) {
      // console.log('getStaffData?.response?.result', getStaffData?.response?.result)
      if (Array.isArray(getStaffData?.response?.result)) {
        const dropdownOptions = getStaffData?.response?.result.map(staff => ({
          label: `${staff.first_name || ''} ${staff.last_name.slice('')[0] || ''}`.trim() || 'Unnamed Staff',
          value: staff.staff_id
        }));
        setStaffDropDownData(dropdownOptions)
      }
    }
  }, [getStaffData])

  useEffect(() => {
    if (UserDetailData?.response?.result) {
      // console.log('UserDetailData?.respons', UserDetailData?.response?.result)
      setisEnable(UserDetailData?.response?.result?.is_pouse_future_booking == 'true' ? false : true)
      setisEnableQueue(UserDetailData?.response?.result?.is_queue == 'true' ? true : false)
    }
  }, [UserDetailData])

  useEffect(() => {
    if (updateQueueBtnStatusData?.response?.message == 'success') {
      dispatch(UpdateQueuebtnStatusRemoveAction())
      dispatch(GetUserDetailAction())
      setresumeQuery(false)
      setpauseQuery(false)
      setEnablineQueModal(false)
      // console.log('updateQueueBtnStatusData?.response?.result' , updateQueueBtnStatusData?.response?.result)
    }
  }, [updateQueueBtnStatusData])

  useEffect(() => {
    if (updateQueueBookingStatusData?.response?.message == 'success') {
      dispatch(UpdateQueueBookingRemoveAction())
      getQueueValData('')
      setresumeQuery(false)
      setpauseQuery(false)
      setEnablineQueModal(false)
      setEnableQueueModal(false)
      // console.log('updateQueueBookingStatusData?.response?.result' , updateQueueBookingStatusData?.response?.result)
    }
  }, [updateQueueBookingStatusData])

  useEffect(() => {
    if (updateFutureBookingsData?.response?.message == 'success') {
      dispatch(UpdateFutureBookingsRemoveAction())
      dispatch(GetUserDetailAction())
      bookingModalOffOn()
      // console.log('updateFutureBookingsData?.response?.result' , updateFutureBookingsData?.response?.result)
    }
  }, [updateFutureBookingsData])

  useEffect(() => {
    if (getBookingsData?.response?.message == 'success') {
      // console.log('getBookingsData', getBookingsData?.response)

      setTimeSlots(getBookingsData?.response?.result)
    } else {
      setTimeSlots([])
    }
  }, [getBookingsData])

  useEffect(() => {
    // console.log('getQueueData', getQueueData?.response?.result)
    if (getQueueData?.response?.message == 'success') {

      setQueueData(getQueueData?.response?.result)
    } else {
      setQueueData([])
    }
  }, [getQueueData])


  const getData = async () => {
    const userId = await AsyncStorage.getItem('token')
    dispatch(GetStaffAction({
      business_id: userId
    }))
  }

  const getQueueValData = async (staffId) => {
    dispatch(GetQueueAction({
      staff_id: staffId
    }))
  }



  // Ensure timeSlots is always initialized
  const validTimeSlots = Array.isArray(timeSlots) ? timeSlots : [];

  // Generate all hours from 12 AM to 12 PM
  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = i === 0 ? "12AM" : i < 12 ? `${i}AM` : i === 12 ? "12PM" : `${i - 12}PM`;
    return hour;
  });

  // Group data by hour
  const groupedSlots = validTimeSlots.reduce((acc, appointment) => {
    const appointmentHour = getHourFrom12HourTime(appointment.appointment_start_time);
    const formattedHour =
      appointmentHour === 0
        ? "12AM"
        : appointmentHour < 12
          ? `${appointmentHour}AM`
          : appointmentHour === 12
            ? "12PM"
            : `${appointmentHour - 12}PM`;

    acc[formattedHour] = acc[formattedHour] || [];
    acc[formattedHour].push(appointment);
    return acc;
  }, {});

  function getHourFrom12HourTime(timeStr) {
    // Match time format like "01:00 PM"
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) {
      hours += 12;
    } else if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }

    return hours; // returns 0–23
  }


  const openCalendar = () => {
    setCalendarVisible(true);
  };
  // Set up the dates dynamically for a week from today
  useEffect(() => {
    const today = new Date();
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Last day of current month

    const generatedDates = [];
    let currentDate = new Date(today);

    while (currentDate <= endOfMonth) {
      generatedDates.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setDates(generatedDates);
    setSelectedDates(generatedDates[0]);
    getBookingsFromDate({ date: generatedDates[0], staff_id: '' })


    // Simulating fetching dynamic appointment data
    // setAppointmentsData({
    //   [generatedDates[0]]: [
    //     {
    //       time: '16:10 - 16:40',
    //       slot: '16:10',
    //       name: 'John D.',
    //       service: 'Haircut and Beard Trim',
    //     },
    //     {
    //       time: '17:00 - 17:40',
    //       slot: '17:00',
    //       name: 'John D.',
    //       service: 'Haircut and Beard Trim',
    //     },
    //   ],
    //   [generatedDates[1]]: [
    //     {
    //       time: '17:30 - 18:00',
    //       slot: '17:30',
    //       name: 'Jane S.',
    //       service: 'Manicure',
    //     },
    //   ],
    // });
  }, []);

  const getBookingsFromDate = ({ date, staff_id }) => {
    dispatch(GetBookingsAction({ appointment_date: date, staff_id: staff_id }))
  }

  // Generate time slots between 4 PM and 8 PM
  // const timeSlots = generateTimeSlots('16:00', '20:00');

  const renderTimeSlot = time => {
    const appointment = appointmentsData[selectedDate]?.find(
      appt => appt.slot === time,
    );
    return (
      <View style={styles.timeSlotContainer} key={time}>
        <Text style={styles.timeLabel}>{time}</Text>
        {appointment ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('BookingDetailScreen');
            }}
            style={[styles.appointmentContainer]}>
            <Text style={styles.timeText}>{appointment?.time}</Text>
            <Text style={styles.nameText}>{appointment?.name}</Text>
            <Text style={styles.serviceText}>{appointment?.service}</Text>
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
        data={staffDropDownData}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select' : '...'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          getBookingsFromDate({ date: selectedDates, staff_id: item.value })
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

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const UpdateBookingStatus = ({ booking_id, status }) => {
    dispatch(UpdateQueueBookingStatusAction({
      booking_id: booking_id,
      status: status
    }))
  }


const handleDatePickerSelect = (pickedDate) => {
  setSelectedDates(pickedDate);
  getBookingsFromDate({ date: pickedDate, staff_id: '' });

  // Find index of picked date in your dates array
  const index = dates.findIndex(d => d === pickedDate);
  if (index !== -1 && dateScrollRef.current) {
    dateScrollRef.current.scrollTo({
      x: index * 55,
      animated: true,
    });
  }
};

  const BookingsData = () => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: (mobileW * 3) / 100,
            paddingHorizontal : (mobileW * 2) / 100,
            borderBottomWidth: (mobileW * 0.2) / 100,
            borderBottomColor: Colors.lightGray,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // justifyContent: 'flex-start',
              paddingHorizontal: (mobileW * 2) / 100,
              width: (mobileW * 25) / 100,
            }}>
            <CustomSwitch
              isEnabled={isEnable}
              toggleSwitch={() => {
                // toggleOpen(),
                bookingModalOffOn();
              }}
            />
            <TouchableOpacity
              onPress={() => {
                modalOnoff();
              }} style={{
                marginLeft: (mobileW * 1) / 100,
              }}>
              <Image style={styles.infoIcon} tintColor={'#554F67'} source={Images.Information} />
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
            style={{ fontSize: 16, color: Colors.primary, fontWeight: '600' }}>
            {formatDate(selectedDates)}
          </Text>
          <TouchableOpacity onPress={() => openCalendar()}>
            <Image
              resizeMode="contain"
              style={[styles.EditIcon, { left: (mobileW * 2) / 100 }]}
              source={Images.Edit}
            />
          </TouchableOpacity>
        </View>
        <View>
          <ScrollView
          ref={dateScrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.daysContainer}>
            {dates.length > 0 && dates.map((date, index) => (
              <View
                key={index}
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
                    date === selectedDates && styles.selectedDay,
                  ]}
                  onPress={() => {
                    // getBookingsFromDate({ date: date, staff_id: '' })
                    // setSelectedDates(date)
                    handleDatePickerSelect(date)
                  }}>
                  <Text
                    style={[
                      styles.dayText,
                      date === selectedDates && styles.selectedDayText,
                    ]}>
                    {getDay(date)}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.horizontalLine} />
        {/* {selectedDates.length > 1 ?(
            <>
            
            </>
          ):( */}
        <FlatList
          data={Array.isArray(hours) ? hours : []}
          keyExtractor={(item, index) => String(item?.id ?? index)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: hour }) => (
            <View style={styles.hourSection}>
              {/* Hour Header */}
              <View style={{ width: '15%' }}>
                <Text style={styles.hourText}>{hour}</Text>
              </View>
              <View style={{ width: '85%' }}>
                {/* Time Slots for the Hour */}
                {groupedSlots[hour]?.length > 0 ? (
                  groupedSlots[hour].map((slot) => (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('BookingDetailScreen', { details: slot });
                      }}
                      style={[styles.appointmentContainer]}>
                      <Text style={styles.timeText}>{slot?.appointment_start_time} - {slot?.appointment_end_time}</Text>
                      <Text style={styles.nameText}>{slot?.customer_name}</Text>
                      <Text style={styles.serviceText}>{slot?.services?.join(', ')}</Text>
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text style={styles.emptySlot}>No bookings availables</Text>
                )}
              </View>
            </View>
          )}
        />
        {/* )} */}
        {/* Vertical Time Slots with Appointments */}
        {/* <ScrollView style={styles.appointmentsList}>
          {timeSlots.map(time => renderTimeSlot(time))}
        </ScrollView> */}


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
        data={staffDropDownData}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'All Staff' : '...'}
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
        onPress={() => {
          if (item?.booking_status == 'Pending') {
            setEnableQueueModal(true)
            setprofileData(item);
          } else {
            setIsProfileModalVisible(true)
            setprofileData(item);
          }
        }}
        style={[styles?.card, item?.booking_status == 'Cancel' && { borderColor: Colors?.red }, item?.booking_status != 'Pending' && item?.booking_status != 'Cancel' && styles.borderStyle]}>
        <Image source={{ uri: item?.customer_profile }} style={styles?.avatar} />
        <View style={styles?.infoContainer}>
          <Text style={[styles?.name, { color: '#301E39', fontSize: 14, fontWeight: '600' }]}>{item?.customer_name}</Text>
          <Text style={[styles?.service, { color: '#554F67', fontWeight: '400', fontSize: 12 }]}>{item?.services?.join(', ')}</Text>
        </View>
        {
          item?.booking_status == 'Cancel' ? (
            <View style={[styles?.progressContainer, { backgroundColor: Colors?.red }]}>
              <Text style={[styles?.progressTxt, { fontSize: 12, fontWeight: '600', color: Colors?.white }]}>{'Cancel'}</Text>
            </View>
          ) :
            item?.booking_status == 'Complete' ? (
              <View style={styles?.progressContainer}>
                <Text style={[styles?.progressTxt, { fontSize: 12, fontWeight: '600', }]}>{'Completed'}</Text>
              </View>
            ) :
              item?.booking_status == 'Start Service' ? (
                <View style={styles?.progressContainer}>
                  <Text style={[styles?.progressTxt, { fontSize: 12, fontWeight: '600', }]}>{'In Progress'}</Text>
                </View>
              ) : (
                <View style={styles?.timeContainer}>
                  <Image style={styles?.timeIcon} source={Images?.Time} />
                  <Text style={[styles?.time, { color: '#554F67', fontSize: 12, fontWeight: '600' }]}>{item?.appointment_start_time}</Text>
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
          profileImage={Images?.image33}
          name={profileData?.customer_name}
          serviceName={profileData?.services?.join(', ')}
          price={`$ ${profileData?.price}`}
          // addOns={profileData.addOns}
          assistantImage={{ uri: profileData?.professional_details?.profile }}
          assistantName={profileData.professional_details?.name}
          rating={profileData?.avg_rating}
          reviews={profileData?.total_reviews}
          onAddAmendPress={() => {
            navigation.navigate('BookService', { data: profileData }), setIsProfileModalVisible(false);
          }}
          onCompletePress={() => {
            UpdateBookingStatus({
              booking_id: profileData?.booking_id,
              status: 'Complete'
            })
            setIsProfileModalVisible(false)
          }}
          navigation={navigation}
        />

        <BookingModal
          modalText={`Are you sure you want to start service for ${profileData?.customer_name}?`}
          buttonText={'Start Service'}
          cancelButtonText={'No Show'}
          thirdButtonText={'Back'}
          visible={isEnableQueUeModal}
          onClose={() => {
            // setEnableQueueModal(false)
            UpdateBookingStatus({
              booking_id: profileData?.booking_id,
              status: 'Cancel'
            })
          }}
          onFirstBtn={() => {
            UpdateBookingStatus({
              booking_id: profileData?.booking_id,
              status: 'Start Service'
            })
          }}
          onClickThird={() => {
            setEnableQueueModal(false)
          }}
          cancelBtnTextColor={Colors?.white}
          // type={resumeQuery}
          buttonBackgroundColor={Colors.primary}
          cancelButtonBackgroundColor={Colors?.red}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: (mobileW * 4) / 100,
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
                // toggleOpenQue();
                if (isEnableQueue) {
                  pauseQueryModal()
                } else {
                  enableQueueModal();
                }
              }}
            />
            <Image style={styles.infoIcon} source={Images.Information} />
          </View>
          {dropDownQue()}
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              backgroundColor: Colors.white,
              padding: 16,
              width: (mobileW * 90) / 100,
              alignSelf: 'center',
              marginTop: (mobileW * 4) / 100,
              borderRadius: (mobileW * 2) / 100,
              elevation: 2,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              borderWidth: 1,
              borderColor: '#EEE6F1'
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                style={styles?.infoBackIcon}
                source={Images?.infoWithBack}
              />
              <Text style={[styles.name, { left: 10, color: '#0D0E11', fontSize: 14, fontWeight: '700' }]}>
                Queue is getting too long
              </Text>
            </View>
            <Text
              style={[
                styles.service,
                {
                  paddingVertical: (mobileW * 2) / 100,
                  paddingHorizontal: (mobileW * 2) / 100,
                  color: '#554F67',
                  fontWeight: '400',
                  fontSize: 12
                },
              ]}>
              Pause the queue temporarily, new customer’s won’t be able to join
              the queue. The existing queue remains.
            </Text>
            {isEnableQueue ? (
              <CommonButton
                buttonStyle={{ backgroundColor: Colors.red }}
                title={'Pause Queue Temporarily'}
                onPress={() => pauseQueryModal()}
              />
            ) : (
              <CommonButton
                buttonStyle={{ backgroundColor: Colors.semiPurpleLight }}
                textStyle={{ color: Colors.primary }}
                title={'Resume Queue'}
                onPress={() => resumeQueryModal()}
              />
            )}
          </View>
          <FlatList
            data={Array.isArray(queueData) ? queueData : []}
            keyExtractor={(item, index) => String(item?.id ?? index)}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
          />
        </ScrollView>
      </>
    );
  };

  const onPressUpdateBookingStatus = () => {
    dispatch(UpdateFutureBookingsAction({
      status: isEnable
    }))
  }

  const onPressQueueStatus = (val) => {
    dispatch(UpdateQueuebtnStatusAction({
      status: val
    }))
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors?.white} barStyle={'dark-content'} />
      {/* Cancel appointment Modal */}

      <BookingModal
        modalText={!isEnable ? 'Are you sure you want to resume the bookings for today?' : 'Are you sure you want to pause the bookings for today?'}
        visible={modalVisible}
        buttonText={!isEnable ? 'Resume Bookings' : 'Pause Bookings'}
        onClose={bookingModalOffOn}
        type={isEnable}
        onFirstBtn={() => {
          onPressUpdateBookingStatus()
        }}
        buttonBackgroundColor={!isEnable ? Colors.primary : Colors.red}
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
        onFirstBtn={() => {
          onPressQueueStatus(false)
        }}
      // type={pauseQuery}
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
        // type={resumeQuery}
        buttonBackgroundColor={Colors.primary}
        onFirstBtn={() => {
          onPressQueueStatus(true)
        }}
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
        onFirstBtn={() => {
          if (isEnableQueue) {
            onPressQueueStatus(false)
          } else {
            onPressQueueStatus(true)
          }
        }}
        // type={resumeQuery}
        buttonBackgroundColor={Colors.primary}
      />



      <OnOffModal visible={onOffModal} onClose={modalOnoff} />
      <CalendarPickerModal
        visible={isCalendarVisible}
        onClose={() => setCalendarVisible(false)} // Close modal handler
        selectedDates={selectedDates}
        setSelectedDates={setSelectedDates}
        onPressDate={(val) => {
          // setSelectedDates(val)
          // getBookingsFromDate({ date: val, staff_id: '' })
          handleDatePickerSelect(val)
        }}
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
    color: '#16161B',
    fontSize: 16,
    fontWeight: '700'
  },
  dayText1: {
    color: '#554F67',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: (mobileW * 1) / 100,
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
    marginBottom: 5
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
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
    marginHorizontal: (mobileW * 3) / 100,
    marginVertical: (mobileH * 2) / 100,
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
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  tabText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '600'
  },
  activeTabText: {
    fontWeight: '600'
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
    height: (mobileW * 9) / 100,
    borderColor: '#D8DAE7',
    borderWidth: (mobileW * 0.25) / 100,
    borderRadius: (mobileW * 5) / 100,
    paddingHorizontal: (mobileW * 4) / 100,
    width: (mobileW * 35) / 100,
    left: 10,
  },
  dropdownQue: {
    height: (mobileW * 9) / 100,
    borderColor: '#D8DAE7',
    borderWidth: (mobileW * 0.25) / 100,
    borderRadius: (mobileW * 5) / 100,
    paddingHorizontal: (mobileW * 4) / 100,
    width: (mobileW * 65) / 100,
    right: 10,
  },
  placeholderStyle: {
    fontSize: 14,
    color: Colors.gray,
  },
  selectedTextStyle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#301E39',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
    fontWeight: '500',
    color: '#301E39',
  },
  selectedText: {
    marginTop: 16,
    fontSize: 14,
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
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3,
    marginTop: (mobileW * 2) / 100,
    borderColor: '#EEE6F1',
    borderWidth: 1
  },
  borderStyle: {
    borderWidth: 0.7,
    borderColor: Colors.primary,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
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
    color: '#554F67',
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
  hourSection: {
    marginBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    width: '100%',
  },
  hourText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 8,
  },
  slotContainer: {
    backgroundColor: "#F6E9FF",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  slotTime: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#6C3BA1",
  },
  slotDescription: {
    fontSize: 13,
    color: "#555",
    marginTop: 4,
  },
  slotStylist: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  emptySlot: {
    fontSize: 12,
    color: Colors?.gray,
    fontStyle: "italic",
  },
  horizontalLine: {
    height: 1,
    width: '100%',
    backgroundColor: '#E6E8F1',
    marginBottom: DimensionsConfig.screenHeight * 0.016
  }
});

export default BookingsQueueScreen;
