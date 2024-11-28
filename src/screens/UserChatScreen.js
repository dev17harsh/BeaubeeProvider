import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Colors } from '../theme/colors';
import { Images } from '../assets/images';
import { DimensionsConfig } from '../theme/dimensions';
// import Icon from 'react-native-vector-icons/MaterialIcons';

const UserChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hi, can you share some photos? 😊', time: '8:40 PM', type: 'received' },
    { id: '2', text: 'Hello Kynthia, sure, just give me a minute', time: '8:32 PM', type: 'sent' },
    { id: '3', text: 'Take your time, no worries', time: '8:40 PM', type: 'received' },
    { id: '4', text: 'Here you go 😊', time: '8:32 PM', type: 'sent' },
    {
      id: '5',
      images: [
        Images.image11,
        Images.image22,
        Images.image33
      ],
      time: '8:32 PM',
      type: 'sent',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const firstName = 'Kynthia'
  const lastName = 'P.'

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: inputText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'sent',
      };
      setMessages([newMessage, ...messages]);
      setInputText('');
    }
  };

  const sendImage = (imageUri) => {
    const newMessage = {
      id: Date.now().toString(),
      images: [imageUri],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'sent',
    };
    setMessages([newMessage, ...messages]);
  };

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        sendImage(response.assets[0].uri);
      }
    });
  };

  const initials = `${firstName?.charAt(0) ?? ''}${lastName?.charAt(0) ?? ''}`.toUpperCase();

  const renderMessage = ({ item }) => {
    if (item.images) {
      return (
        <View style={[styles.messageContainer, item.type === 'sent' ? styles.sentMessage : styles.receivedMessage, { backgroundColor: 'transparent', elevation: 0 }]}>
          <Text style={styles.time}>{item.time}</Text>
          <View style={styles.imageGrid}>
            {item.images.map((img, index) => (
              <Image key={index} source={img} style={styles.chatImage} />
            ))}
          </View>
        </View>
      );
    }

    return (
      <View>
        <Text style={[styles.time, item.type != 'sent' && { alignSelf: 'flex-start' }]}>{item.time}</Text>
        <View style={[styles.messageContainer, item.type === 'sent' ? styles.sentMessage : styles.receivedMessage]}>
          <Text style={[styles.messageText, item.type != 'sent' && { color: Colors?.black }]}>{item.text}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={Images?.BackIcon} style={styles.backIcon} />
          </TouchableOpacity>

          <View style={styles.profilePicture}>
            <Text style={styles.initialsText}>{initials}</Text>
          </View>
          <Text style={styles.headerTitle}>Kynthia P.</Text>
        </View>
        <TouchableOpacity  >
          <Image source={Images?.CalendarChat} style={styles.CalenderIcon} />
        </TouchableOpacity>
      </View>
      <View style={{
        flex: 1,
        backgroundColor: '#F6EFF9'
      }}>
        <FlatList
          data={messages}
          inverted
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messagesList}
        />
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={selectImage}>
            <Image source={Images?.EmojiIcon} style={styles?.textInputIcon}/>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Write a message..."
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity onPress={sendMessage}>
          <Image source={Images?.AttachmentIcon} style={styles?.textInputIcon}/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors?.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: Colors?.white,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0D0E11',
  },
  messagesList: {
    padding: 16,
  },
  messageContainer: {
    maxWidth: '75%',
    padding: DimensionsConfig?.screenHeight * 0.012,
    paddingHorizontal: DimensionsConfig?.screenHeight * 0.016,
    marginVertical: DimensionsConfig?.screenHeight * 0.008,
    borderRadius: DimensionsConfig?.screenHeight * 0.1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  sentMessage: {
    backgroundColor: Colors?.primary,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0
  },
  receivedMessage: {
    backgroundColor: Colors?.white,
    alignSelf: 'flex-start',
    borderTopLeftRadius: 0
  },
  messageText: {
    color: '#fff',
    fontSize: 15,
  },
  time: {
    fontSize: 11,
    color: '#554F67',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  chatImage: {
    width: DimensionsConfig?.screenHeight * 0.13,
    height: DimensionsConfig?.screenHeight * 0.13,
    borderRadius: 8,
    margin: DimensionsConfig?.screenHeight * 0.001,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: DimensionsConfig?.screenHeight * 0.012,
    marginBottom: DimensionsConfig?.screenHeight * 0.015,
    height: DimensionsConfig?.screenHeight * 0.06,
    width: '94%',
    backgroundColor: Colors?.white,
    alignSelf: 'center',
    borderRadius: 20,
  },
  input: {
    flex: 1,
    height: DimensionsConfig?.screenHeight * 0.06,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  backIcon: {
    width: (DimensionsConfig?.buttonWidth * 5) / 100,
    height: (DimensionsConfig?.buttonWidth * 5) / 100,
  },
  CalenderIcon: {
    width: (DimensionsConfig?.buttonWidth * 8) / 100,
    height: (DimensionsConfig?.buttonWidth * 8) / 100,
  },
  profilePicture: {
    width: (DimensionsConfig?.buttonWidth * 12) / 100,
    height: (DimensionsConfig?.buttonWidth * 12) / 100,
    borderRadius: (DimensionsConfig?.buttonWidth * 6) / 100,
    backgroundColor: '#333', // Placeholder background color
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: (DimensionsConfig?.buttonWidth * 3) / 100
  },
  initialsText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  textInputIcon:{
    width: (DimensionsConfig?.buttonWidth * 6) / 100,
    height: (DimensionsConfig?.buttonWidth * 6) / 100,
  }
});

export default UserChatScreen;
