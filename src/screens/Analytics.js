import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import { mobileW } from '../components/utils';
import { Images } from '../assets/images';
import SelectServiceModal from '../components/Modal.js/SelectServiceModal';
import AppHeader from '../components/AppHeader';
import { Colors } from '../theme/colors';
import {BarChart} from 'react-native-gifted-charts';
import CustomButton from '../components/CustomButton';


const data = [
  {value: 4000, label: 'Mar', frontColor: Colors.semiPurpleLight},
  {value: 10000, label: 'Apr', frontColor: Colors.semiPurpleLight},
  {value: 6000, label: 'May', frontColor: Colors.semiPurpleLight},
  {value: 7000, label: 'Jun', frontColor: Colors.semiPurpleLight},
  {value: 10000, label: 'Jul', frontColor: Colors.semiPurpleLight},
  {value: 3400, label: 'Aug', frontColor: Colors.primary},
];

const yearData = [
  {id: 1, year: '2024'},
  {id: 2, year: '2025'},
  {id: 3, year: '2026'},
  {id: 4, year: '2027'},
  {id: 5, year: '2028'},
  {id: 6, year: '2029'},
  {id: 7, year: '2030'},
];

const reviewData = [{}, {}, {}, {}];
const purpData = [
  {
    name: 'Buzz Cut',
    price: '40,000',
    service: '283',
  },
  {
    name: 'Faid',
    price: '30,000',
    service: '283',
  },
  {
    name: 'Trim',
    price: '28,000',
    service: '283',
  },
];

const services = [
  {
    id: 1,
    title: '1 Aug - 7 Aug',
    duration: '$5,000 AUD',
  },
  {
    id: 2,
    title: '8 Aug - 14 Aug',
    duration: '$4,500 AUD',
  },
  {
    id: 3,
    title: '15 Aug - 19 Aug',
    duration: '$3,500 AUD',
  },
  {
    id: 4,
    title: '20 Aug - 24 Aug',
    duration: '$3,700 AUD',
  },
  {
    id: 5,
    title: '24 Aug - 31 Aug',
    duration: '$2,900 AUD',
  },
];

export default function Analytics({navigation}) {
  const [selectedYear, setselectedYear] = useState(1);
  const [isServiceSelectorVisible, setServiceSelectorVisible] = useState(false);

  const renderItems = item => {};

  const renderReview = item => {
    return (
      <View style={styles.reviewBox}>
        <View style={styles.nameImageView}>
          <Image source={Images?.image11} style={styles.assistantImage} />
          <Text
            style={{
              width: (mobileW * 40) / 100,
            }}>
            Hello User
          </Text>
          <View style={styles.ratingRow}>
            <Image source={Images?.activeStar} style={styles.starIcon} />
            <Text style={styles.rating}>{'  4.8'}</Text>
          </View>
        </View>
        <Text style={{marginTop: (mobileW * 3) / 100}}>
          Quisque rutrum aenean imperdiet etiam ultricies nisi vel augue
          curabitur ullamcorper ultricies nisi nam eget dui etiam rhoncus
          maecenas.
        </Text>
      </View>
    );
  };

  const renderPurpData = items => {
    const index = items.index;
    const item = items.item;    
    return (
      <View style={styles.purpDataView}>
        <Text style={[styles.assistantName,{width:mobileW*25/100}]}>
          {index + 1 + '. ' + item.name}
        </Text>
        <Text style={[styles.assistantName, {right: 10,width:mobileW*25/100}]}>{'$'+item.price}</Text>
        <Text style={styles.assistantName}>{item.service}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <AppHeader title={'Analytics'} />
      <SelectServiceModal
        visible={isServiceSelectorVisible}
        onClose={() => setServiceSelectorVisible(false)}
        // onSelectService={handleServiceSelect}
        services={services}
      />
      <ScrollView>
        <View
          style={{
            paddingHorizontal: (mobileW * 2) / 100,
            paddingVertical: (mobileW * 4) / 100,
          }}>
          <FlatList
            data={yearData}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={item => {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setselectedYear(item.item.id)}
                  style={{
                    paddingHorizontal: (mobileW * 5) / 100,
                    paddingVertical: (mobileW * 3) / 100,
                    backgroundColor:
                      item.item.id === selectedYear
                        ? Colors.primary
                        : Colors.white,
                     alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: (mobileW * 3) / 100,
                    marginRight: (mobileW * 2) / 100,
                    borderWidth: 0.6,
                    borderColor: Colors.OrGray,
                  }}>
                  <Text
                    style={{
                      fontSize: (mobileW * 3) / 100,
                      fontWeight: '500',
                      color:
                        item.item.id == selectedYear
                          ? Colors.white
                          : Colors.black,
                    }}>
                    {item.item.year}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View
          style={{
            width: (mobileW * 95) / 100,
            alignSelf: 'center',
            marginTop: (mobileW * 3) / 100,
          }}>
          <BarChart
            data={data}
            barWidth={(mobileW * 8) / 100} // Width of each bar
            barBorderRadius={5} // Rounded corners for bars
            // yAxisThickness={1} // Thickness of the y-axis line
            // xAxisThickness={1} // Thickness of the x-axis line
            yAxisTextStyle={{color: '#6B7280', fontSize: 12}} // Y-axis label styles
            xAxisLabelTextStyle={{color: '#374151', fontSize: 12}} // X-axis label styles
            initialSpacing={20} // Space before the first bar
            hideRules // Hide grid lines
            yAxisLabelPrefix="$" // Prefix for y-axis values
            height={250} // Height of the chart
            noOfSections={6} // Number of horizontal sections
            width={(mobileW * 80) / 100}
          />
        </View>
        <View
          style={{
            width: (mobileW * 90) / 100,
            alignSelf: 'center',
            paddingBottom: (mobileW * 3) / 100,
          }}>
          <CustomButton
            style={{
              backgroundColor: Colors.semiPurpleLight,
              marginTop: (mobileW * 3) / 100,
            }}
            textStyle={{color: Colors.primary}}
            title={'View Weekly Breakdown'}
          />
          <View style={styles.straightLine} />
          <View style={styles.assistantInfo}>
            <Text style={styles.assistantName}>{'Customers'}</Text>
            <View style={styles.ratingRow}>
              <Text style={styles.rating}>43,434</Text>
            </View>
          </View>
          <View style={styles.assistantInfo}>
            <Text style={styles.assistantName}>{'Racurring'}</Text>
            <View style={styles.ratingRow}>
              <Text style={styles.rating}>8,125</Text>
            </View>
          </View>
          <View style={styles.assistantInfo}>
            <Text style={styles.assistantName}>{'Rating'}</Text>
            <View style={styles.ratingRow}>
              <Image source={Images?.activeStar} style={styles.starIcon} />
              <Text style={styles.rating}>
                {'  4.8'} ({'218 Reviews'} Reviews)
              </Text>
            </View>
          </View>
          <View style={{paddingVertical: (mobileW * 5) / 100}}>
            <FlatList
              data={yearData}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={item => renderReview(item)}
            />
          </View>
          <CustomButton
            style={{
              backgroundColor: Colors.semiPurpleLight,
              marginTop: (mobileW * 3) / 100,
            }}
            textStyle={{color: Colors.primary}}
            title={'View All Reviews'}
          />
        </View>
        <View style={styles.straightLine} />

        <View
          style={{
            marginLeft: (mobileW * 5) / 100,
            marginBottom: (mobileW * 4) / 100,
          }}>
          <Text style={styles.payMethod}>Top Services</Text>
        </View>
        <View style={{}}>
          <View style={styles.purpleView}>
            <Text style={[styles.serviceName, {left: (mobileW * 4) / 100}]}>
              {'Service Name'}
            </Text>
            <Text style={styles.serviceName}>{'Revenue'}</Text>
            <Text style={styles.serviceName}>{'Services'}</Text>
          </View>
          {/* purpData */}
          <FlatList
            data={purpData}
            showsHorizontalScrollIndicator={false}
            renderItem={item => renderPurpData(item)}
            contentContainerStyle={{marginTop: (mobileW * 3) / 100}}
          />
        </View>
        <View
          style={{
            width: (mobileW * 90) / 100,
            alignSelf: 'center',
            paddingBottom: (mobileW * 10) / 100,
            marginTop: (mobileW * 3) / 100,
          }}>
          <CustomButton
            style={{
              backgroundColor: Colors.semiPurpleLight,
              marginTop: (mobileW * 3) / 100,
            }}
            onPress={() => setServiceSelectorVisible(true)}
            textStyle={{color: Colors.primary}}
            title={' View All Services'}
          />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors?.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: (mobileW * 5) / 100,
    backgroundColor: Colors?.white,
    paddingVertical: (mobileW * 8) / 100,
    borderBottomColor: '#ebedf4',
    borderBottomWidth: (mobileW * 0.5) / 100,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  straightLine: {
    width: '89%',
    height: 1,
    alignSelf: 'center',
    backgroundColor: '#E7E7E7',
    marginVertical: (mobileW * 5) / 100,
  },
  assistantName: {
    fontSize: (mobileW * 3.6) / 100,
    fontWeight: '500',
    color: '#333',
  },
  serviceName: {
    fontSize: (mobileW * 3.7) / 100,
    fontWeight: '600',
    color: '#333',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: (mobileW * 3.6) / 100,
    color: Colors.black,
    fontWeight: '500',
  },
  starIcon: {
    width: (mobileW * 4) / 100,
    height: (mobileW * 4) / 100,
  },
  assistantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: (mobileW * 1) / 100,
  },
  assistantImage: {
    width: (mobileW * 11) / 100,
    height: (mobileW * 11) / 100,
    borderRadius: (mobileW * 5.5) / 100,
  },
  reviewBox: {
    width: (mobileW * 75) / 100,
    backgroundColor: Colors.white,
    paddingVertical: (mobileW * 4) / 100,
    paddingHorizontal: (mobileW * 4) / 100,
    borderRadius: (mobileW * 3) / 100,
    borderColor: Colors.OrGray,
    elevation: 2,
    borderWidth: 0.4,
    marginRight: (mobileW * 4) / 100,
  },
  nameImageView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  payMethod: {
    fontSize: (mobileW * 4) / 100,
    fontWeight: '500',
    color: Colors.black,
    marginTop: (mobileW * 3) / 100,
  },
  purpleView: {
    width: mobileW,
    backgroundColor: Colors.semiPurpleLight,
    paddingVertical: (mobileW * 3) / 100,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: (mobileW * 5) / 100,
  },
  purpDataView: {
    width: mobileW,
    paddingVertical: (mobileW * 1) / 100,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: (mobileW * 5.5) / 100,
  },
});
