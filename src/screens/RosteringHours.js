import React, { useState } from 'react';
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

const RosteringHours = ({ visible, onClose, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState('highToLow');
  const [selectedId, setSelectedId] = useState(null);

  const [schedule, setSchedule] = useState(
    daysOfWeek.map(day => ({
      day,
      isOpen: day !== 'Saturday' && day !== 'Sunday',
      timeFrames: [
        { openingTime: '12:00 PM', closingTime: '12:30 PM' }, // Default timeframe
      ],
    })),
  );

  const toggleOpen = index => {
    const newSchedule = [...schedule];
    newSchedule[index].isOpen = !newSchedule[index].isOpen;
    setSchedule(newSchedule);
  };

  const addTimeFrame = index => {
    const newSchedule = [...schedule];
    newSchedule[index].timeFrames.push({
      openingTime: '12:00 PM',
      closingTime: '12:30 PM',
    });
    setSchedule(newSchedule);
  };

  const updateTime = (index, timeFrameIndex, type, value) => {
    const newSchedule = [...schedule];
    const timeFrame = newSchedule[index].timeFrames[timeFrameIndex];

    if (type === 'openingTime') {
      timeFrame.openingTime = value;
      if (
        timeOptions.indexOf(value) >= timeOptions.indexOf(timeFrame.closingTime)
      ) {
        const newClosingIndex = timeOptions.indexOf(value) + 1;
        timeFrame.closingTime =
          timeOptions[newClosingIndex] || timeOptions[timeOptions.length - 1];
      }
    } else {
      timeFrame.closingTime = value;
    }
    setSchedule(newSchedule);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <AppHeader title={'Rostering Hours'} />
      <ScrollView style={{ paddingHorizontal: (mobileW * 3) / 100 }}>
        <TouchableOpacity style={[styles.itemContainer]}>
          <Image source={Images?.image11} style={styles.profileImage} />
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{'Linda Johnson'}</Text>
          </View>

          <Text style={[styles.nameText, { color: Colors.black }]}>
            {'3 Aug, 2024'}
          </Text>
        </TouchableOpacity>
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
          <Text style={[styles.nameText, { left: 10, color: Colors.gray, fontWeight: '400' }]}>{'Linda is available 9am-1pm'}</Text>
        </View>
        <View style={styles.straightLine} />

        {schedule.map((item, index) => (
          <View key={item.day} style={styles.dayContainer}>
            {item.timeFrames.map((timeFrame, timeFrameIndex) => {
              const validClosingOptions = timeOptions.slice(
                timeOptions.indexOf(timeFrame.openingTime) + 1,
              );
              return (
                <View key={timeFrameIndex} style={styles.timeContainer}>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={timeFrame.openingTime}
                      style={styles.timePicker}
                      onValueChange={value =>
                        updateTime(index, timeFrameIndex, 'openingTime', value)
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
                      selectedValue={timeFrame.closingTime}
                      style={styles.timePicker}
                      onValueChange={value =>
                        updateTime(index, timeFrameIndex, 'closingTime', value)
                      }
                      mode="dropdown">
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
            <TouchableOpacity
              onPress={() => addTimeFrame(index)}
              style={styles.addTimeFrameButton}>
              <Image source={Images.PlusWithLightBAck} style={styles.addIcon} />
              <Text style={styles.addText}>Add Timeframe</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <CommonButton title={'Save'} />
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
    height: DimensionsConfig?.screenHeight * 0.008,
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
