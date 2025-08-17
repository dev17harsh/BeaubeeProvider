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
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { DimensionsConfig } from '../theme/dimensions';
import { Images } from '../assets/images';
import AppHeader from '../components/AppHeader';
import CustomSwitch from '../components/CustomSwitch';
import CustomButton from '../components/CustomButton';
import CommonButton from '../components/CommonButton';
import { Colors } from '../theme/colors';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AddToRosterAction, AddToRosterRemoveAction } from '../redux/action/AddToRosterAction';
const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);

const daysOfWeek = ['Monday'];

const generateTimeOptions = () => {
  const times = [];
  const date = new Date();
  date.setHours(0, 0, 0, 0);

  for (let i = 0; i < 48; i++) {
    times.push(
      date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
    );
    date.setMinutes(date.getMinutes() + 30);
  }
  return times;
};

const timeOptions = generateTimeOptions();

const RosteringHours = ({ navigation, ...props }) => {

  const dispatch = useDispatch();
  const addToRosterData = useSelector((state) => state.addToRosterData);
  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);
  const [items, setItems] = useState(timeOptions.map(t => ({ label: t, value: t })));

  const [schedule, setSchedule] = useState([
    { start_time: '12:00 PM', end_time: '12:30 PM' },
  ]
  );
  const [intialize, setIntialize] = useState(false);

  useEffect(() => {
    // console.log('?.response?.result', addToRosterData?.response)
    if (addToRosterData?.response?.message == 'success') {
      dispatch(AddToRosterRemoveAction())
      navigation.goBack()
    }
  }, [addToRosterData])

  const convertTo12Hour = (time) => {
    let [hour, minute] = time.split(':');
    hour = parseInt(hour, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12; // Convert 0 to 12 for AM
    return `${hour}:${minute} ${ampm}`;
  };



  useEffect(() => {
    if (props?.route?.params?.data) {
      // console.log('props?.route?.params?.data', props?.route?.params?.data)
      setSchedule([{ start_time: convertTo12Hour(props?.route?.params?.data?.start_time), end_time: convertTo12Hour(props?.route?.params?.data?.start_time) },])
      setIntialize(true)
    } else {
      setIntialize(true)
    }

  }, [props?.route?.params])

  const addTimeFrame = () => {
    const newSchedule = [...schedule]; // avoid mutation
    newSchedule.push({
      start_time: '12:00 PM',
      end_time: '12:30 PM',
    });
    setSchedule(newSchedule);
  };



  const convertTo24Hour = (time) => {
    const [timePart, modifier] = time.split(' ');
    let [hours, minutes] = timePart.split(':');

    if (modifier.toLowerCase() === 'pm' && hours !== '12') {
      hours = String(parseInt(hours, 10) + 12);
    } else if (modifier.toLowerCase() === 'am' && hours === '12') {
      hours = '00';
    }

    return `${hours.padStart(2, '0')}:${minutes}`;
  };


  const convertArrayTimes = (timeArray) => {
    return timeArray.map(({ start_time, end_time }) => ({
      start_time: convertTo24Hour(start_time),
      end_time: convertTo24Hour(end_time),
    }));
  };


  const updateTime = (timeFrameIndex, type, value) => {
    const newSchedule = [...schedule]; // avoid mutation
    const timeFrame = { ...newSchedule[timeFrameIndex] };

    if (type === 'start_time') {
      timeFrame.start_time = value;
      if (
        timeOptions.indexOf(value) >= timeOptions.indexOf(timeFrame.end_time)
      ) {
        const newClosingIndex = timeOptions.indexOf(value) + 1;
        timeFrame.end_time =
          timeOptions[newClosingIndex] || timeOptions[timeOptions.length - 1];
      }
    } else {
      timeFrame.end_time = value;
    }

    newSchedule[timeFrameIndex] = timeFrame;
    setSchedule(newSchedule);
  };



  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).replace(',', '');
  };

  const onPressSave = async () => {
    // console.log('save ', schedule, schedule)
    const userId = await AsyncStorage.getItem('token')
    const scheduleValue = convertArrayTimes(schedule)
    // console.log('scheduleValue', scheduleValue)

    const formData = new FormData();
    if (props?.route?.params?.type == 'Edit') {
      formData.append('roaster_id', props?.route?.params?.data?.roaster_id);
    }
    formData.append('business_id', userId);
    formData.append('staff_id', props?.route?.params?.staffDetail?.staff_id);
    formData.append('date', props?.route?.params?.selectedData?.date);
    formData.append('shifts', JSON.stringify(scheduleValue));
    console.log('formData', formData, scheduleValue)


    dispatch(AddToRosterAction(formData))
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <AppHeader title={'Rostering Hours'} />
        <ScrollView style={{ paddingHorizontal: (mobileW * 3) / 100 }}>
          <TouchableOpacity style={[styles.itemContainer]}>
            <Image source={props?.route?.params?.staffDetail?.profile ? { uri: props?.route?.params?.staffDetail?.profile } : Images?.image11} style={styles.profileImage} />
            <View style={styles.textContainer}>
              <Text style={styles.nameText}>{props?.route?.params?.staffDetail?.first_name} {props?.route?.params?.staffDetail?.last_name}</Text>
            </View>

            <Text style={[styles.nameText, { color: Colors.black }]}>
              {formatDate(props?.route?.params?.selectedData?.date)}
            </Text>
          </TouchableOpacity>
          {props?.route?.params?.data ? (
            <View
              style={{
                backgroundColor: Colors.semiPurpleLight,
                width: '100%',
                paddingVertical: (mobileW * 3) / 100,
                width: (mobileW * 89) / 100,
                alignSelf: 'center',
                borderRadius: (mobileW * 2) / 100,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: (mobileW * 2) / 100,
              }}>
              <Image source={Images?.timeBack} style={styles.imageWatch} />
              <Text
                style={[
                  styles.nameText,
                  { left: 10, color: Colors.gray, fontWeight: '400' },
                ]}>
                {`Linda is available ${convertTo12Hour(props?.route?.params?.data?.start_time)}-${convertTo12Hour(props?.route?.params?.data?.end_time)}`}
              </Text>
            </View>) : null}
          <View style={styles.straightLine} />

          {/* {schedule.map((item, index) => ( */}
          <View style={styles.dayContainer}>
            {intialize && schedule.map((timeFrame, timeFrameIndex) => {
              const validClosingOptions = timeOptions.slice(
                timeOptions.indexOf(timeFrame.start_time) + 1,
              );
              return (
                <View key={timeFrameIndex} style={styles.timeContainer}>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={timeFrame.start_time}
                      style={styles.timePicker}
                      onValueChange={value =>
                        updateTime(
                          timeFrameIndex,
                          'start_time',
                          value,
                        )
                      }
                      mode="dropdown">
                      {timeOptions.map(timeOption => (
                        <Picker.Item
                          label={timeOption}
                          value={timeOption}
                          key={timeOption}
                        />
                      ))}
                    </Picker>
                  </View>
                  <Text style={styles.toText}>To</Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={timeFrame.end_time}
                      style={styles.timePicker}
                      onValueChange={value =>
                        updateTime(
                          timeFrameIndex,
                          'end_time',
                          value,
                        )
                      }
                      mode='dialog'>
                      {validClosingOptions.map(timeOption => (
                        <Picker.Item
                          label={timeOption}
                          value={timeOption}
                          key={timeOption}
                        />
                      ))}
                    </Picker>

                  </View>
                </View>
              );
            })}
            {props?.route?.params?.data ? null : (
              <TouchableOpacity
                onPress={() => addTimeFrame()}
                style={styles.addTimeFrameButton}>
                <Image
                  source={Images.PlusWithLightBAck}
                  style={styles.addIcon}
                />
                <Text style={styles.addText}>Add Timeframe</Text>
              </TouchableOpacity>)}
          </View>
          {/* ))} */}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <CommonButton
            onPress={() => {
              // console.log('scmnsjcns', JSON.stringify(schedule))
              onPressSave()
            }}
            title={'Save'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RosteringHours;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    height: '85%',
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
    paddingVertical: (mobileW * 4) / 100,
    backgroundColor: Colors.white,
    alignSelf: 'center',
    width: (mobileW * 90) / 100,
    marginTop: (mobileW * 2) / 100,
  },
  profileImage: {
    width: (mobileW * 12) / 100,
    height: (mobileW * 12) / 100,
    borderRadius: (mobileW * 7) / 100,
    marginRight: 16,
  },
  imageWatch: {
    width: (mobileW * 7) / 100,
    height: (mobileW * 7) / 100,
  },
  textContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#301E39',
  },
  emailText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#554F67',
    maxWidth: '95%',
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
  listContent: {
    marginBottom: (mobileW * 3) / 100,
  },
  tabs: {
    flexDirection: 'row',
    marginHorizontal: (mobileW * 1) / 100,
    backgroundColor: '#F6EFF9',
    borderRadius: (mobileW * 3) / 100,
    borderWidth: (mobileW * 1.5) / 100,
    borderColor: '#F6EFF9',
    marginVertical: (mobileW * 2) / 100,
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
  locationSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: '#ffffff',
    width: (mobileW * 90) / 100,
    alignSelf: 'center',
    borderRadius: (mobileW * 8) / 100,
    paddingVertical: (mobileW * 3.5) / 100,
    paddingHorizontal: (mobileW * 4) / 100,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  tagIcon: {
    width: (mobileW * 5.2) / 100,
    height: (mobileW * 5.2) / 100,
  },
  textInputView: {
    left: 7,
    width: (mobileW * 75) / 100,
  },
  searchPlaceholder: {
    fontSize: (mobileW * 4) / 100,
    fontWeight: '400',
    color: '#554F67',
  },
  straightLine: {
    width: '98%',
    height: 1,
    alignSelf: 'center',
    backgroundColor: '#E7E7E7',
    marginVertical: (mobileW * 5) / 100,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: mobileW * 0.03,
  },
  dayText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  openText: {
    marginRight: mobileW * 0.03,
    fontSize: 14,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: mobileW * 0.03,
  },
  pickerContainer: {
    width: mobileW * 0.4,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#EEE6F1',
    marginHorizontal: 5,
  },
  timePicker: {
    width: '100%',
    height: mobileH * 0.07,
    color: '#000',
  },
  toText: {
    fontSize: 14,
    color: Colors.gray,
    marginHorizontal: 5,
  },
  addTimeFrameButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: mobileW * 0.03,
  },
  addIcon: {
    width: mobileW * 0.06,
    height: mobileW * 0.06,
  },
  addText: {
    color: Colors.primary,
    fontWeight: '700',
    marginLeft: mobileW * 0.02,
  },
  buttonContainer: {
    width: mobileW * 0.9,
    alignSelf: 'center',
    marginVertical: mobileW * 0.055,
  },
});
