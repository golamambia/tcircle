import React from 'react';
import { ActivityIndicator, Modal, View, StyleSheet } from 'react-native';
import { useLoader } from './LoaderContext';


const Loader = () => {
  const { loading } = useLoader();

  if (!loading) return null;

  return (
    <Modal transparent={true} animationType="fade" visible={loading}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#DA1D1F" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
