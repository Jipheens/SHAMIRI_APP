import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../assets/splash.png')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#11273F',
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default SplashScreen;