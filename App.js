import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';

const App = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [otp, setOtp] = useState('');
  const [voiceResult, setVoiceResult] = useState('');
  const [doorStatus, setDoorStatus] = useState('');


  // Generate OTP
  const generateOTP = async () => {
    Alert.alert('Thông báo', 'Đã sinh ra OTP cho bạn');
    try {
      const response = await fetch('http://192.168.85.239:5000/generate-otp');
      const data = await response.json();
      if (data.otp) {
        setOtp(`OTP: ${data.otp} (Expires in ${data.expires_in} seconds)`);
      } else {
        setOtp('Failed to generate OTP.');
      }
    } catch (error) {
      console.error('Error generating OTP:', error);
      setOtp('Error generating OTP');
    }
  };

  // Trigger voice command
  const triggerVoiceCommand = async () => {
    Alert.alert('Thông báo', 'Xin mời nhận diện');
    try {
      const response = await fetch('http://192.168.85.239:5000/voice-command');
      const data = await response.json();
      if (data.command) {
        // setVoiceResult(`Command: ${data.command}`);
      } else {
        setVoiceResult('No command detected.');
      }
    } catch (error) {
      console.error('Error with voice command:', error);
      // setVoiceResult('Error with voice command.');
    }
  };

  // Open door app
  const openDoorApp = async () => {
    Alert.alert('Thông báo', 'Mở cửa tự động');
    try {
      const response = await fetch('http://192.168.85.239:5000/open-door', {
        method: 'POST',
      });
      const data = await response.json();
      if (response.ok) {
        setDoorStatus(data.success);
      } else {
        setDoorStatus('Failed to open the door.');
      }
    } catch (error) {
      console.error('Error with opening the door:', error);
      setDoorStatus('Error with opening the door.');
    }
  };

    // Open light app
    const openLightApp = async () => {
      Alert.alert('Thông báo', 'Bật đèn tự động');
      try {
        const response = await fetch('http://192.168.85.239:5000/open-light', {
          method: 'POST',
        });
        const data = await response.json();
        if (response.ok) {
          setDoorStatus(data.success);
        } else {
          setDoorStatus('Failed to open the light.');
        }
      } catch (error) {
        console.error('Error with opening the light:', error);
        setDoorStatus('Error with opening the light.');
      }
    };


  return (
    <View style={styles.container}>
     <Text style={styles.imageManagementTitle}>Nhà Thông Minh</Text>

      {/* Open Door Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Mở cửa</Text>
        <Button title="Mở cửa" onPress={openDoorApp} color="#27ae60" />
        {/* {doorStatus ? <Text style={styles.result}>{doorStatus}</Text> : null} */}
      </View>



        {/* Open Light Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Bật đèn</Text>
        <Button title="Bật đèn" onPress={openLightApp} color="#f1c40f" />
        {/* {doorStatus ? <Text style={styles.result}>{doorStatus}</Text> : null} */}
      </View>



      {/* OTP Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Sinh ra OTP</Text>
        <Button title="Sinh OTP" onPress={generateOTP}   color="#3498db" />
        {otp ? <Text style={styles.result}>{otp}</Text> : null}
      </View>

      {/* Voice Command Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Nhận diện giọng nói</Text>
        <Button title="Nhận diện" onPress={triggerVoiceCommand}  color="#e74c3c"  />
        {/* {voiceResult ? <Text style={styles.result}>{voiceResult}</Text> : null} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8f9fa' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
  card: { backgroundColor: '#fff', padding: 16, marginBottom: 16, borderRadius: 8 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  imageItem: { padding: 8, backgroundColor: '#eaeaea', marginBottom: 4 },
  selectedImage: { backgroundColor: '#d4edda' },
  result: { marginTop: 8, fontSize: 16, fontWeight: 'bold' },

  imageManagementTitle: { 
    marginTop: 50, 
    textAlign: 'center', 
    color: 'red', // Thêm dòng này
    fontSize: 30, // Thêm dòng này
  },

});

export default App;
