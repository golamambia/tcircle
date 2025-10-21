import React, { useState, useEffect, useCallback } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  SafeAreaView,
  Dimensions,
  Modal,
  TouchableOpacity,
  Platform,
  BackHandler,
  Alert,
} from 'react-native';



import InsideFormBg from '../components/InsideFormBg';
import { useFocusEffect } from '@react-navigation/native';
import ListItemTemplate from '../components/ListItemTemplate';
import theme from '../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListItemRow from '../components/ListItemRow';
import { SessionData } from '../constants/common';
import { decryptData, encryptData } from '../reusable/resuableFunctions';
import { useDispatch, useSelector } from 'react-redux';
import CustomerService from '../services/CustomerService';
import ActivityIndicatorLoader from '../components/ActivityIndicatorLoader';
import InfoMsg from '../components/InfoMsg';
import YesNoModal from '../components/YesNoModal';
import PoweredByMJ from '../components/PoweredByMJ';
import { addUserDoNo } from '../store/redux/currentUser';
import ImageLargeModal from '../components/ImageLargeModal';
import { setDashboardData } from '../store/redux/dashboardSlice';
import useSendBookingHandler from '../store/hook/useSendBookingHandler';
import { ArrowRightIcon, CameraIcon, HomeIcon ,ArrowLeftIcon,
  MagnifyingGlassIcon,
  UsersIcon,
  CalendarIcon,
  BellIcon,
  ChevronRightIcon,
} from 'react-native-heroicons/outline';
import Share from "react-native-share";

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const Dashboard = ({ navigation,route  }) => {
  const { sendBookingHandler } = useSendBookingHandler();
  const dispatch = useDispatch();
  const getFullname = useSelector(
    state => state.currentUserDetails.fullName
  );
  //console.log('getFullname ', getFullname);
  const getUserName = useSelector(
    state => state.currentUserDetails.userName
  );
    
  //const { SAPCode, ProductID, LocationID, SourceID } = route.params;
  const [modalSt, setModalSt] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [userName,setUserName]=useState("");
  const [customerDetails, setCustomerDetails] = useState({});
  const [loading,setloading]=useState(false);
const [productID,setProductID]=useState("");
const [locationID,setLocationID]=useState("");
const [sourceID,setSourceID]=useState("");
const [openModal, setOpenModal] = useState(false);
const [modalVisiblePhoto, setModalVisiblePhoto] = useState(false);
const [modalImagePhoto, setmodalImagePhoto] = useState('');
const [dashboardBannerSt, setDashboardBannerSt] = useState('');
  const [referral_id,setreferral_id]=useState("");
 useFocusEffect(
    React.useCallback(() => {
 
AsyncStorage.getItem(SessionData.AUTH_DATA_KEY)
    .then((val) => {
      if (val) {
        const parsed = JSON.parse(val); // parse the string
        console.log("User data:", parsed);

        // Adjust path according to your stored structure
        if (parsed?.data?.user?.referral_id) {
          setreferral_id(parsed.data.user.referral_id);
          console.log("Referral ID:", parsed.data.user.referral_id);
        }
      }
    })
    .catch((error) => {
      console.error("Error reading AsyncStorage:", error);
    });

    

//const decrypted = decryptData(encrypted);
//console.log("Decrypted:", decrypted);

AsyncStorage.getItem(SessionData.AUTH_USERNAME).then(val => {
  //console.log('userName das', val);
  if(val){
  setUserName(val);
  }
});
        AsyncStorage.getItem(SessionData.AUTH_USER_FNAME).then(val => {
          console.log('AUTH_USER_FNAME ', val);
          if (val != null) {
            setCustomerName(val);
          }
        });
      
       
       
         
      },[])
    )
    useEffect(()=>{
     if(getFullname){
      setCustomerName(getFullname);
     }
        
     
        },[getFullname])
   useFocusEffect(
       React.useCallback(() => {
       
      
        //getDetails();
      
          
        },[])
      )
        const getDetails=()=>{
          const payload={
        "SAPCode":getUserName ? getUserName : userName,
        
          }
          setloading(true);
          CustomerService.getDashboard(payload)
                        .then(async res => {
                          const result=res.COALBPSDashBoardResult;
                          console.log('cus res', JSON.stringify(res));
                          setloading(false);
                          if (result.StatusCode=='001' && result.CustCode!='' && result.Msg=='Success') {
                            if(result && result.DONumber){
                              dispatch(addUserDoNo({userDoNo: result.DONumber}));
                              await AsyncStorage.setItem(SessionData.USER_DO_NO, result.DONumber + '');
                            }
                            dispatch(setDashboardData(result));
                            setCustomerDetails(result);
                          }else{
                            setCustomerDetails(result);
                          }
                          
                        })
        }
        function onResponse(res) {
          console.log('res',res);
          if (res == 'yes') {
            BackHandler.exitApp()
          } else {
            setOpenModal(false);
          }
        }
        
        useFocusEffect(
          useCallback(() => {
            const backAction = () => {
              console.log("Back button pressed on Dashboard!");
              setOpenModal(true); // Open modal only on Dashboard
              return true; // Prevent default back behavior
            };
      
            const subscription = BackHandler.addEventListener(
              "hardwareBackPress",
              backAction
            );
      
            return () => subscription.remove(); // Cleanup when leaving Dashboard
          }, [])
        );
      
        const shareApp = async () => {
     try {
    const link = `https://previewwebsite.online/trusted-family-circle/invite?ref=${referral_id}`;

    await Share.open({
      title: "Invite to Trusted Family",
      message: "Join Trusted Family Circle 👨‍👩‍👧‍👦",
      url: link,  
      subject: "Trusted Family Invitation",
    });
  } catch (error) {
    console.error("Error sharing:", error);
  }
  };
        
  return (
    <InsideFormBg headerText={ customerName ? 'Welcome '+ customerName : 'Welcome '+userName} >
<View style={styles.container}>

<ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>


          <View >
          {loading && (
            <ListItemTemplate
          >
                <View style={{marginTop:20,marginBottom:20}}>
                  <ActivityIndicatorLoader />
                </View>
                </ListItemTemplate>
              )}
              {/* {!loading && customerDetails.Balance ==null && (
                 <ListItemTemplate
                 >
     
                   <InfoMsg text={"No Data Available"} />
                   
                   </ListItemTemplate>
                 )} */}

 
 <View>
   
   

          {/* <ListItemTemplate>
          <ListItemRow lefttext={'Customer ID'} rightText={getUserName ? getUserName : userName} />
        
        </ListItemTemplate> */}
        
      
  <View style={{ backgroundColor: "#fff", padding: 0,marginTop:40 }}>
      
 
      {/* Title */}
      {/* <Text
        style={{
          textAlign: "center",
          fontSize: 20,
          fontWeight: "600",
          marginBottom: 24,
          color:'#000'
        }}
      >
        Home
      </Text> */}

      {/* Menu Options */}
      <View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 24,
            borderWidth: 1,
            borderBottomWidth:2.5,
            borderColor: "#ccc",
            borderRadius: 8,
            marginBottom: 12,
              backgroundColor: "rgba(165, 162, 162, 0.05)",
              elevation:1
          }}
          onPress={()=>navigation.navigate('FamilySearch')}
        >
          <MagnifyingGlassIcon size={24} color="black" />
          <Text style={{ marginLeft: 12, fontSize: 18, }}>Search Families</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 24,
            borderWidth: 1,
            borderBottomWidth:2.5,
            borderColor: "#ccc",
            borderRadius: 8,
            marginBottom: 12,
            backgroundColor: "rgba(165, 162, 162, 0.05)",
            elevation:1
          }}
          onPress={()=>navigation.navigate('TrustCircle')}
        >
          <UsersIcon size={24} color="black" />
          <Text style={{ marginLeft: 12, fontSize: 18 }}>My Trust Circle</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 24,
            borderWidth: 1,
           borderBottomWidth:2.5,
            borderColor: "#ccc",
            borderRadius: 8,
            marginBottom: 12,
            backgroundColor: "rgba(165, 162, 162, 0.05)",
            elevation:1
          }}
        >
          <CalendarIcon size={24} color="black" />
          <Text style={{ marginLeft: 12, fontSize: 18 }}>Upcoming Visits</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 24,
            borderWidth: 1,
            borderBottomWidth:2.5,
            borderColor: "#ccc",
            borderRadius: 8,
            backgroundColor: "rgba(165, 162, 162, 0.05)",
            elevation:1,
            marginBottom:12
          }}
          onPress={()=>navigation.navigate('NotificationList')}
        >
          <BellIcon size={24} color="black" />
          <Text style={{ marginLeft: 12, fontSize: 18 }}>Notifications</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 24,
            borderWidth: 1,
            borderBottomWidth:2.5,
            borderColor: "#ccc",
            borderRadius: 8,
            backgroundColor: "rgba(165, 162, 162, 0.05)",
            elevation:1
          }}
          onPress={()=>shareApp()}
        >
          
          <Text style={{ marginLeft: 12, fontSize: 18 }}>Invite Members</Text>
          <Text style={{textAlign:"right",marginLeft:screenWidth*0.33}}><ChevronRightIcon size={24} color="black" /></Text>
        </TouchableOpacity>
      </View>
    </View>
</View>
 
            </View>
            
            {/* <View style={styles.powerBy}>
<PoweredByMJ backgroundColor={false} />
</View>  */}
    </ScrollView>
    
    </View>
    {openModal &&
    <YesNoModal
         heading={'ALERT!'}
         question={'Are you sure you want to exit ?'}
         open={openModal}
         setOpen={setOpenModal}
         onResponse={onResponse}
         yesText={'YES'}
         noText={'No'}
       />
    }
    {modalVisiblePhoto &&
    <ImageLargeModal
          transparent={true}
          isOpen={modalVisiblePhoto}
          setIsOpen={setModalVisiblePhoto}
          headerText={''}
          imageUrl={modalImagePhoto ? modalImagePhoto : ''}
        />
        }
    </InsideFormBg>
  );
};

const styles = StyleSheet.create({
  headerText:{color:theme.colors.primary,fontSize:theme.fontSizes.medium,
    fontWeight:theme.fontsWeight.semiBold,fontFamily:theme.fonts.semiBold,
    lineHeight:19,
    textAlign:'center',
    //paddingTop:8,paddingBottom:8
  },
  powerBy:{position:'absolute',left:0,right:0,alignItems:'center',bottom:screenHeight*0.06,},
  container:{
    paddingHorizontal:theme.paddingHorizontal,
    flex:1,
    // backgroundColor:'blue'
  },
  scrollContainer:{
    position:'relative',
    flex:1,
    //backgroundColor:'red'

  },
  imgBox:{width:35,height:35,},
  backgroundBox:{width:55,height:55,backgroundColor:'#DBE9FC',borderRadius:5,
    justifyContent:'center',alignItems:'center'},
  innerBox:{justifyContent:'center',alignItems:'center'},
  mainBox:{
    marginTop:8,
    marginBottom:8,
    //flex:1,
    flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20},
  img100:{
    width:'100%',
    height:'100%'
  },
  labelText:{fontSize:theme.fontSizes.small,
    fontWeight:theme.fontsWeight.medium,
    fontFamily:theme.fonts.medium,color:'#595858',
  lineHeight:15,
  paddingTop:4
  },
});

export default Dashboard;
