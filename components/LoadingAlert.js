import React from 'react';
import { Modal, View, Text, ActivityIndicator } from 'react-native';

const LoadingAlert = ({ visible }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {}} // You can handle this as needed
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent black background
        }}
      >
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
          <ActivityIndicator size="large" color="#0000ff" />
          {/* <Text style={{ marginTop: 10 }}>Loading...</Text> */}
        </View>
      </View>
    </Modal>
  );
};

export default LoadingAlert;
