import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Linking,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { updateLoginStatus } from '../store/redux/currentUser';
import PoweredByMJ from '../components/PoweredByMJ';
import theme from '../constants/theme';
import { SessionData } from '../constants/common';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const getProductID = useSelector(
    state => state.currentUserDetails.productID
  );
  useFocusEffect(
    React.useCallback(() => {
      
      navigation.getParent('parentDrawer').setOptions({
        headerShown: false,
      });

      const checkLoginStatus = async () => {
        try {
          const initialUrl = await Linking.getInitialURL();
        console.log("Initial URL:", initialUrl);

        if (initialUrl) {
          if (initialUrl.includes("/invite") || initialUrl.startsWith("tcircle://invite")) {
            // Extract referral code
            const url = new URL(initialUrl);
            const referralCode = url.searchParams.get("ref");

            // Navigate directly to SignUp screen with referral param
            navigation.replace("SignUp", { ref: referralCode });
            return; // Stop further login check
          }
        }
          const token = await AsyncStorage.getItem(SessionData.AUTH_TOKEN);
          console.log('Token retrieved:', token);

          setTimeout(() => {
            if (token) {
              dispatch(updateLoginStatus({ isLoggedIn: true }));
              //navigation.replace('CustomerDetail');
               
                navigation.replace('Dashboard');
               
            } else {
              dispatch(updateLoginStatus({ isLoggedIn: false }));
              navigation.replace('PreSignIn');
            }
          }, 1000); // Reduced duration for better user experience
        } catch (error) {
          console.error('Error reading token:', error);
          navigation.replace('PreSignIn');
        }
      };

      checkLoginStatus();

      return () => {
        // Cleanup (if needed)
      };
    }, [navigation, dispatch])
  );

  return (
    <ImageBackground
      source={require('../assets/Images/splash.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
      {/* <View style={{width:screenWidth,height:222}}>
                       <Image style={styles.img100} source={require("./../assets/Images/splash-top.png")} resizeMode="cover" />
                       </View> */}
        {/* <View style={styles.coalimg}>
                       <Image style={styles.img100} source={require("./../assets/Images/coaleng.png")} resizeMode="contain" />
                       </View> */}
                       
                       {/* <View style={{width:'100%',alignItems:'center',marginTop:-20}}>
                                  <View style={[styles.tataimg]}>
                                  <Image style={styles.img100} source={require("./../assets/Images/tata-steel.png")} resizeMode="contain" />
                                  </View>
                                  <View style={[styles.ibmdimg]}>
                                  <Image style={styles.img100} source={require("./../assets/Images/ibmdlogo.png")} resizeMode="contain" />
                                  </View>
                                  </View> */}
                                 
      </View>
      {/* <View style={{bottom:10,right:0,left:0,paddingTop:4}}>
              <Text style={styles.textPowerby}>Powered By © Mjunction Services Ltd.</Text>
          </View> */}
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  textPowerby:{
           
    fontSize:theme.fontSizes.fontSize14,lineHeight:17,
    fontWeight:400,fontFamily:theme.fonts.regular,
    textAlign:'center',color:'#595858',
    //marginBottom:11
},
  img100:{height:'100%',width:'100%'},
  // .62coalimg:{width:screenWidth * 0.70,height:screenHeight * 0.30, alignSelf: "center"},
  coalimg:{
    width:screenWidth*0.75,
    height:screenHeight * 0.40, 
    //alignSelf: "center"
    marginTop:screenHeight * 0.06
  },
  tataimg:{
    width:screenWidth * 0.45,
    height:screenHeight * 0.075,
    marginBottom:20
  },
  ibmdimg:{
    width: screenWidth * 0.32, 
    height:screenHeight * 0.07, 
    //marginTop:20
  },
  backgroundImage: {
    flex: 1,
    width: screenWidth,
    height: screenHeight,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});
