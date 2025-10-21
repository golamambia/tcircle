import React, { useState, useEffect, useCallback } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import theme from '../constants/theme';
import InsideFormBg from '../components/InsideFormBg';
import { ScrollView } from 'react-native-gesture-handler';
import { ArrowDownRightIcon, BellIcon, CalendarIcon, ChevronRightIcon, MagnifyingGlassIcon, UsersIcon } from 'react-native-heroicons/outline';
import Share from "react-native-share";
import { useFocusEffect } from '@react-navigation/native';
import { SessionData } from '../constants/common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from 'react-native-toast-notifications';
import ButtonNormal from '../components/ButtonNormal';
import InputField from '../components/InputField';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const UpdateProfile=({navigation,route})=> {
    const toast = useToast();
  
  const [check, setCheck] = useState(1);
  const [mob, setMob] = useState('');
  const [loginVia, setLoginVia] = useState(false);
  const [customerID, setCustomerID] = useState('');
  const [loading, setloading] = useState(false);
  const [pin, setPin] = useState('');
  const [otp, setOTP] = useState('');
  const [submitBTN, setSubmitBTN] = useState(false);
  const [otpST, setOtpST] = useState(false);
  const [verifyOTP, setVerifyOTP] = useState(false);
 const [openModal, setOpenModal] = useState(false);
 const [uniqueId, setUniqueId] = useState('');
 
 
 
const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [referrerReferralId, setReferrerReferralId] = useState("");

  // Family info
  const [familyName, setFamilyName] = useState("");
  const [familyBio, setFamilyBio] = useState("");

  // Preferences
  const [languages, setLanguages] = useState(""); // comma-separated input
  const [meals, setMeals] = useState("");
  const [dailyRoutineFood, setDailyRoutineFood] = useState("");
  const [weekendSpecialFood, setWeekendSpecialFood] = useState("");

  // Location
  const [village, setVillage] = useState("");
  const [town, setTown] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [airport, setAirport] = useState("");

  // Extra details
  const [culturalInterest, setCulturalInterest] = useState("");
  const [nearestPoliceStation, setNearestPoliceStation] = useState("");
  const [hospitalDetails, setHospitalDetails] = useState("");

  // Background / Community
  const [backgroundCheck, setBackgroundCheck] = useState(true);
  const [communityEndorsement, setCommunityEndorsement] = useState(false);

  // Members (example: one member input — can be extended to dynamic list)
 const [members, setMembers] = useState([
    { name: "", type: "", age: "", education: "" },
  ]);
 
const addMember = () => {
    console.log(1234);
    setMembers([...members, { name: "", type: "", age: "", education: "" }]);
  };

  // Remove member row
  const removeMember = (index) => {
    const updated = [...members];
    updated.splice(index, 1);
    setMembers(updated);
  };

  // Update member field
  const updateMember = (index, field, value) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };
   const resetFields = () => {
  // Reset validation counter
  setCheck(0);

  // Basic info
  setName("");
  setEmail("");
  setPassword("");
  setPasswordConfirmation("");
  setReferrerReferralId("");

  // Family info
  setFamilyName("");
  setFamilyBio("");

  // Preferences
  setLanguages("");
  setMeals("");
  setDailyRoutineFood("");
  setWeekendSpecialFood("");

  // Location
  setVillage("");
  setTown("");
  setCity("");
  setState("");
  setCountry("");
  setAirport("");

  // Extra details
  setCulturalInterest("");
  setNearestPoliceStation("");
  setHospitalDetails("");

 

  // Family members back to initial state
  setMembers([{ name: "", type: "", age: "", education: "" }]);

  // (If you still have mob, customerID, otp, pin in this screen)
  setMob("");
  setCustomerID("");
  setOTP("");
  setPin("");
};

 const signInHandler = () => {
   // console.log('jjjjjjjjjjjj');
  // Trigger validation display
  setCheck(p => p + 1);
try{
  // Block submit if required fields are empty
  if (!email || !password) {
    return;
  }

  setloading(true);

  const payload = {
    name,
    email,
    password,
    password_confirmation: passwordConfirmation,
    referrer_referral_id: referrerReferralId,
    family_name: familyName,
    family_bio: familyBio,
    languages: languages.split(",").map((lang) => lang.trim()),
    meals,
    daily_routine_food: dailyRoutineFood,
    weekend_special_food: weekendSpecialFood,
    location: {
      village,
      town,
      city,
      state,
      country,
      airport,
    },
    cultural_interest: culturalInterest,
    nearest_police_station: nearestPoliceStation,
    hospital_details: hospitalDetails,
    background_check: backgroundCheck,
    community_endorsement: communityEndorsement,
    members: members.map((m) => ({
      name: m.name,
      type: m.type,
      age: Number(m.age),
      education: m.education,
    })),
  };

  console.log(payload);

  RegistrationService.register(payload)
    .then(res => {
      console.log('Registration res', JSON.stringify(res));
      setloading(false);

      if (res.success && res.access_token) {
        toast.show('', {
          data: {
            isSuccess: true,
            heading: 'Registration Successful',
            describe: 'You have successfully registered with Trusted Circle',
          },
        });
        resetFields();
      } else {
        toast.show('', {
          data: {
            isSuccess: false,
            heading: 'Registration failed!',
            describe: res.message || 'Something went wrong',
          },
        });
      }
    })
    .catch(err => {
      console.error("Registration error", err);
      setloading(false);
    });

    } catch (error) {
    console.log("error", error);
    setloading(false);
  }finally{
    setloading(false);
  }
};
  
    return(
        <InsideFormBg headerText={'Update Profile'} back={true}>


<ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>


          <View style={styles.container}>
          
          <View style={{width:'100%'}}>
   

           <InputField fieldName="Name" required={true} value={name} setValue={setName} check={check} />
<InputField fieldName="Email" required={true} value={email} setValue={setEmail} check={check} />

{/* <InputField fieldName="Password" required={true} value={password} setValue={setPassword} check={check} />
<InputField fieldName="Confirm Password" required={true} value={passwordConfirmation} setValue={setPasswordConfirmation} check={check} />
<InputField fieldName="Referrer Referral ID" required={true} value={referrerReferralId} setValue={setReferrerReferralId} check={check} /> */}

<InputField fieldName="Family Name" required={true} value={familyName} setValue={setFamilyName} check={check} />
<InputField fieldName="Family Bio" value={familyBio} setValue={setFamilyBio}  />
<InputField fieldName="Languages" required={true} value={languages} setValue={setLanguages} check={check} />
<InputField fieldName="Meals" value={meals} setValue={setMeals}  />
<InputField fieldName="Daily Routine Food" value={dailyRoutineFood} setValue={setDailyRoutineFood}  />
<InputField fieldName="Weekend Special Food" value={weekendSpecialFood} setValue={setWeekendSpecialFood} />

{/* Location block */}
<InputField fieldName="Village" required={true} value={village} setValue={setVillage} check={check} />
<InputField fieldName="Town" required={true} value={town} setValue={setTown} check={check} />
<InputField fieldName="City" required={true} value={city} setValue={setCity} check={check} />
<InputField fieldName="State" required={true} value={state} setValue={setState} check={check} />
<InputField fieldName="Country" required={true} value={country} setValue={setCountry} check={check} />
<InputField fieldName="Nearest Airport" required={true} value={airport} setValue={setAirport} check={check} />

{/* Extra details */}
<InputField fieldName="Cultural Interest" value={culturalInterest} setValue={setCulturalInterest}  />
<InputField fieldName="Nearest Police Station" value={nearestPoliceStation} setValue={setNearestPoliceStation}  />
<InputField fieldName="Hospital Details" value={hospitalDetails} setValue={setHospitalDetails}  />

 

{/* Family Members block */}
 
           <View style={{marginBottom:16}}>
      <Text style={{paddingBottom:8,fontWeight:700}}>Family Members</Text>
      {members.map((member, index) => (
        <View
          key={index}
          style={{
             borderColor:theme.colors.inputBoxBorderColor,
             borderWidth:1,
            borderRadius:8,
            padding: 12,
            marginBottom: 10,
            //marginHorizontal:8,
          }}
        >
          <InputField
            fieldName="Member Name"
            value={member.name}
            setValue={(val) => updateMember(index, "name", val)}
           check={check} 
           required={true}
          />
          <InputField
            fieldName="Member Type"
            value={member.type}
            setValue={(val) => updateMember(index, "type", val)}
            check={check} 
            required={true}
          />
          <InputField
            fieldName="Member Age"
            value={member.age}
            setValue={(val) => updateMember(index, "age", val)}
            
          />
          <InputField
            fieldName="Member Education"
            value={member.education}
            setValue={(val) => updateMember(index, "education", val)}
             
          />
 {index>0 &&
          <TouchableOpacity
  style={styles.removeBtn}
  onPress={() => removeMember(index)}
>
  <Text style={styles.removeText}>❌</Text>
</TouchableOpacity>}
        </View>
      ))}

<TouchableOpacity 
  style={styles.addBtn} 
  onPress={addMember}
>
  <Text style={styles.addText}>➕ Add More</Text>
</TouchableOpacity>
      
 </View> 
  
           
                        
          </View> 
          
            <View style={{marginTop:8}}>
               <ButtonNormal disabled={loading}  onPress={() => ''} loading={loading}>
              Update
              </ButtonNormal>
 
             
  
            </View>
 
            </View>
            
             
    </ScrollView>
    
    
    
     
    </InsideFormBg>
    )

}
const styles=StyleSheet.create({
    
  container:{
    paddingHorizontal:theme.paddingHorizontal,
    flex:1,
    marginBottom:screenHeight*0.09,
    marginTop:screenHeight*0.03
    // backgroundColor:'blue'
  },
  scrollContainer:{
    position:'relative',
    //flex:1,
    //backgroundColor:'red'

  },
  imgBox:{width:35,height:35,},
  removeBtn: {
  marginTop:-8,
  marginBottom:16,
    backgroundColor: "#f8d7da",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignSelf: "flex-end", // keeps button small
  },
  removeText: {
    color: "#721c24",
    fontSize: 12,
    fontWeight: "bold",
  },
  addBtn: {
    backgroundColor: "#d4edda",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginTop: 6,
  },
  addText: {
    color: "#155724",
    fontSize: 10,
    fontWeight: "bold",
  },
  
})
export default UpdateProfile