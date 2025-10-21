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
  FlatList,
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
} from 'react-native-heroicons/outline';


const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const TrustCircle = ({ navigation,route  }) => {
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
  const [customerDetails, setCustomerDetails] = useState([]);
  const [customerDetailsFour, setCustomerDetailsFour] = useState([]);
  const [loading,setloading]=useState(false);
const [productID,setProductID]=useState("");
const [locationID,setLocationID]=useState("");
const [sourceID,setSourceID]=useState("");
const [openModal, setOpenModal] = useState(false);
const [modalVisiblePhoto, setModalVisiblePhoto] = useState(false);
const [modalImagePhoto, setmodalImagePhoto] = useState('');
const [dashboardBannerSt, setDashboardBannerSt] = useState('');

  useFocusEffect(
    React.useCallback(() => {

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
       
      
        getUserlist();
      
          
        },[])
      )
        const getUserlist=()=>{
          const payload={
        "SAPCode":'',
        
          }
          setloading(true);
          CustomerService.getCircleList(payload)
                        .then(async res => {
                          const result=res;
                          console.log('cus res', JSON.stringify(res));
                          
                          setloading(false);
                          if (result.status==true && result.data.id!='') {
                             const flatList = flattenTree(result.data);
                             console.log('flatList',flatList);
                             const firstFour = flatList.slice(0, 3);
                            const rest = flatList.slice(3);  
                            setCustomerDetailsFour(firstFour)
                            setCustomerDetails(rest);
                          }else{
                            setCustomerDetails([]);
                            setCustomerDetailsFour([])
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
      
        const bellIconFun=()=>{
          navigation.navigate("UnreadMessage");
         
          //setmodalImagePhoto('https://uatcoalpsms.mjunction.in/Banner/image001.jpg');
          //setModalVisiblePhoto(true);
        }
        function flattenTree(node) {
  // always return an array
  return [
    { id: node.id, name: node.name, email: node.email },
    ...(node.children || []).map(flattenTree).flat()
  ];
}

const renderItem = ({ item, index }) => (
    <View
      style={{
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#E5E5E5",
        borderRadius: 8,
        backgroundColor: "#FAFAFA",
        padding: 4,
        paddingBottom: 8,
        marginBottom: 4,
      }}
    >
      {/* Left Avatar with Rank */}
      <View style={{ flex: 0.75, alignItems: "center", paddingTop: 4 }}>
        <View
          style={{
            borderRadius: 9999,
            position: "relative",
            width: 40,
            height: 40,
            backgroundColor: "#007bff", // primaryColor
            marginLeft: 16,
          }}
        >
          {/* Profile Image */}
          <View
            style={{
              position: "absolute",
              top: 3.5,
              left: 3.5,
            }}
          >
            <Image
              style={{
                borderRadius: 9999,
                width: 33,
                height: 33,
                alignItems: "center",
              }}
              source={require("./../assets/Images/image-46.png")}
            />
          </View>

          {/* Rank Number (if you want to show index+1) */}
          {/* <View
            style={{
              position: "absolute",
              top: 10,
              left: -18,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "600", color: "black" }}>
              {index + 1}
            </Text>
          </View> */}
        </View>
      </View>

      {/* Right Content */}
      <View style={{ flex: 3 }}>
        <View style={{ paddingTop: 5, paddingLeft: 5, position: "relative" }}>
          {/* Name */}
          <Text style={{ fontSize: 15, fontWeight: "600", color: "#000" }}>
            {item.name}
          </Text>

          {/* Email */}
          <Text
            style={{
              fontSize: 11,
              fontWeight: "600",
              paddingTop: 4,
              color: "rgba(0,0,0,0.5)",
            }}
          >
            Email:{" "}
            <Text
              style={{
                fontWeight: "700",
                color: "rgba(29,36,54,0.85)",
              }}
            >
              {item.email}
            </Text>
          </Text>

          {/* Points / ID */}
          <View
            style={{
              position: "absolute",
              right: 8,
              top: 4,
              alignItems: "flex-end",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500", color: "#333" }}>
              {item.id}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <InsideFormBg headerText={ customerName ? 'Welcome '+ customerName : 'Welcome '+userName} >

<ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
<View style={styles.container}>


         <View  >
          {loading && (
            <ListItemTemplate
          >
                <View style={{marginTop:20,marginBottom:20}}>
                  <ActivityIndicatorLoader />
                </View>
                </ListItemTemplate>
              )}
              {!loading && customerDetailsFour.length ==0 && (
                 <ListItemTemplate
                 >
     
                   <InfoMsg text={"No Data Available"} />
                   
                   </ListItemTemplate>
                 )}

 
 <View >
   
  
        
      
  {!loading && customerDetailsFour.length >0 &&
  (<View style={{ backgroundColor: "#fff", padding: 0 }}>
      
  <View style={{   marginTop: 16 }}>
      {/* Top 3 Users */}
      <View style={{ flexDirection: "row" }}>
        {/* Left User */}
         {customerDetailsFour && customerDetailsFour[1]&&
         <View style={{ flex: 1 }}>
          <View style={{ marginTop: 64, alignItems: "center" }}>
            <View
              style={{
                borderRadius: 9999,
                position: "relative",
                width: 80,
                height: 80,
                backgroundColor: "#007bff", // primaryColor
                alignItems: "center",
              }}
            >
              {/* <View
                style={{
                  position: "absolute",
                  top: -23,
                  left: 0,
                  right: 0,
                  alignItems: "center",
                }}
              >
                <Image source={require("./../assets/Images/mukut.png")} />
              </View> */}

              <View
                style={{
                  position: "absolute",
                  top: 5,
                  left: 5,
                  right: 0,
                  bottom: 0,
                }}
              >
                <Image
                  style={{
                    borderRadius: 9999,
                    width: 70,
                    height: 70,
                    alignItems: "center",
                  }}
                  source={require("./../assets/Images/image-46.png")}
                />
              </View>

              {/* <View
                style={{
                  width: 25,
                  height: 25,
                  position: "absolute",
                  borderRadius: 9999,
                  backgroundColor: "#007bff",
                  bottom: -10,
                  left: 30,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 15, fontWeight: "600", color: "white" }}>3</Text>
              </View> */}
            </View>

            <View style={{ alignItems: "center", marginTop: 8 }}>
              <Text style={{ fontSize: 12, fontWeight: "600", color: "#000", textTransform: "capitalize" }}>
                {customerDetailsFour[1].name}
              </Text>

              <View
                style={{
                  position: "relative",
                  paddingHorizontal: 14,
                  paddingTop: 8,
                  paddingBottom: 4,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "#FF1933",
                  marginTop: 12,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(255,25,51,0.1)",
                }}
              >
                <Text style={{ fontSize: 9, fontWeight: "600", color: "#000" }}>
                  {customerDetailsFour[1].email}
                </Text>
                <View
                  style={{
                    position: "absolute",
                    top: -9,
                    paddingHorizontal: 12,
                    paddingVertical: 2,
                    borderRadius: 9999,
                    borderWidth: 1,
                    borderColor: "#FF1933",
                    backgroundColor: "#007bff",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 8, fontWeight: "800", color: "#fff" }}>{customerDetailsFour[1].id}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>}

        {/* Center User */}
        {customerDetailsFour && customerDetailsFour[0]&& <View style={{ flex: 1 }}>
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                borderRadius: 9999,
                position: "relative",
                width: 100,
                height: 100,
                backgroundColor: "#007bff",
                alignItems: "center",
              }}
            >
              {/* <View
                style={{
                  position: "absolute",
                  top: -23,
                  left: 0,
                  right: 0,
                  alignItems: "center",
                }}
              >
                <Image source={require("./../assets/Images/mukut.png")} />
              </View> */}

              <View
                style={{
                  position: "absolute",
                  top: 5,
                  left: 5,
                  right: 0,
                  bottom: 0,
                }}
              >
                <Image
                  style={{
                    borderRadius: 9999,
                    width: 90,
                    height: 90,
                    alignItems: "center",
                  }}
                  source={require("./../assets/Images/image-46.png")}
                />
              </View>

              {/* <View
                style={{
                  width: 30,
                  height: 30,
                  position: "absolute",
                  borderRadius: 9999,
                  backgroundColor: "#007bff",
                  bottom: -10,
                  left: 35,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 15, fontWeight: "600", color: "white" }}>1</Text>
              </View> */}
            </View>

            <View style={{ alignItems: "center", marginTop: 8 }}>
              <Text style={{ fontSize: 12, fontWeight: "600", color: "#000", textTransform: "capitalize" }}>
                {customerDetailsFour[0].name}
              </Text>

              <View
                style={{
                  position: "relative",
                  paddingHorizontal: 14,
                  paddingTop: 8,
                  paddingBottom: 4,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "#FF1933",
                  marginTop: 12,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(255,25,51,0.1)",
                }}
              >
                <Text style={{ fontSize: 9, fontWeight: "600", color: "#000" }}>
                  {customerDetailsFour[0].email}
                </Text>
                <View
                  style={{
                    position: "absolute",
                    top: -9,
                    paddingHorizontal: 12,
                    paddingVertical: 2,
                    borderRadius: 9999,
                    borderWidth: 1,
                    borderColor: "#FF1933",
                    backgroundColor: "#007bff",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 8, fontWeight: "800", color: "#fff" }}>{customerDetailsFour[0].id}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>}

        {/* Right User (same as left user, repeat or extract component) */}
         {customerDetailsFour && customerDetailsFour[2]&& <View style={{ flex: 1 }}>
  <View style={{ marginTop: 64, alignItems: "center" }}>
    <View
      style={{
        borderRadius: 9999,
        position: "relative",
        width: 80,
        height: 80,
        backgroundColor: "#007bff", // primaryColor
        alignItems: "center",
      }}
    >
      {/* Crown */}
      {/* <View
        style={{
          position: "absolute",
          top: -23,
          left: 0,
          right: 0,
          alignItems: "center",
        }}
      >
        <Image source={require("./../assets/Images/mukut.png")} />
      </View> */}

      {/* Profile Image */}
      <View
        style={{
          position: "absolute",
          top: 5,
          left: 5,
          right: 0,
          bottom: 0,
        }}
      >
        <Image
          style={{
            borderRadius: 9999,
            width: 70,
            height: 70,
            alignItems: "center",
          }}
          source={require("./../assets/Images/image-46.png")}
        />
      </View>

      {/* Rank Number */}
      {/* <View
        style={{
          width: 25,
          height: 25,
          position: "absolute",
          borderRadius: 9999,
          backgroundColor: "#007bff",
          bottom: -10,
          left: 30,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "600", color: "white" }}>2</Text>
      </View> */}
    </View>

    {/* Username + Store */}
    <View style={{ alignItems: "center", marginTop: 8 }}>
      <Text
        style={{
          fontSize: 12,
          fontWeight: "600",
          color: "#000",
          textTransform: "capitalize",
        }}
      >
        {customerDetailsFour[2].name}
      </Text>

      {/* Store & Points Card */}
      <View
        style={{
          position: "relative",
          paddingHorizontal: 14,
          paddingTop: 8,
          paddingBottom: 4,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: "#FF1933",
          marginTop: 12,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(255,25,51,0.1)",
        }}
      >
        <Text style={{ fontSize: 9, fontWeight: "600", color: "#000" }}>
         {customerDetailsFour[2].email}
        </Text>

        {/* Points Badge */}
        <View
          style={{
            position: "absolute",
            top: -9,
            paddingHorizontal: 12,
            paddingVertical: 2,
            borderRadius: 9999,
            borderWidth: 1,
            borderColor: "#FF1933",
            backgroundColor: "#007bff",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 8, fontWeight: "800", color: "#fff" }}>
            {customerDetailsFour[2].id}
          </Text>
        </View>
      </View>
    </View>
  </View>
            </View>}

</View>
 





      
    </View>


{customerDetails.length >0 &&
(<View
  style={{
    //flex: 1,
    //margin: 4,
    marginTop: 28,
    padding: 8,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    backgroundColor: "#fff",
     
  }}
>
 <FlatList
      data={customerDetails}
      renderItem={renderItem}
      keyExtractor={(item) => item.id} // must be unique
      //showsVerticalScrollIndicator={false}
      scrollEnabled={false}
    />



</View>)}


    </View>)
    }
</View>
 
            </View>
            
            {/* <View style={styles.powerBy}>
<PoweredByMJ backgroundColor={false} />
</View>  */}
    </View>
    </ScrollView>
    
    
    
    
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
   // paddingHorizontal:theme.paddingHorizontal,
    //flex:1,
     //backgroundColor:'blue',
     marginTop:screenHeight*0.01,
   marginBottom:screenHeight*0.08
   
  },
  scrollContainer:{
  //   position:'relative',
  //  flex:1,
    //backgroundColor:'red',
 //marginBottom:screenHeight*0.09
 paddingBottom: screenHeight*0.08, 
 flexGrow: 1,
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

export default TrustCircle;
