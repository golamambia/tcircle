import React, {useState} from 'react'
import {View, Text, TouchableOpacity, Modal, StyleSheet, TextInput, Pressable} from 'react-native';

import { CalendarDaysIcon, XMarkIcon } from 'react-native-heroicons/outline';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import Feather from 'react-native-vector-icons/Feather';
import theme from '../constants/theme';

const CustomDatePicker = ({fieldText, value, setValue, check, required, isDob=false, editable=true, futureDate=false, placholder="", showBorder=true, onPressCross=()=>{}, purpose, pastDays=0,todayVisible=true, }) => {

    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() - parseInt(pastDays));
    //console.log('minDate',minDate);
    // const startDates = getFormatedDate(today.setDate(today.getDate()+1), 'YYYY/MM/DD')
    const [open, setOpen] = useState(false);
    // const [date, setDate] = useState();

    function handleOnPress() {
        setOpen((p) => !p)
    }

    function handleChange(propDate) {
        const dateTimeString = JSON.stringify(propDate);
        const [datePart, timePart] = dateTimeString.split("T");
//console.log('ooo1 ',datePart);

const [year, month, day] = datePart.split("-").map(part => part.replace(/["\\]/g, ""));

const formattedDate = `${year}-${month}-${day}`;
 

        //const tempDate = propDate.split("T");
        
        setValue(formattedDate)
        handleOnPress()
    }


    const checking = (value, check) => {
        if(showBorder && value){
          return {
              //borderColor:'#4BB543',
              borderWidth: 1
              }
          // return " border-green-500"
          }
          //console.log()
          if(showBorder && check > 1){
              return {
                 // borderColor:'#F21616',
                  borderWidth: 1
              }
              // return " border-red-500"
          } else if(!showBorder){
            // intentionally kept blank
          }
  
          // return " border-slate-300"
      }

      const isRequired = () => {
        if(required===true){
            return (
                <Text style={{color:'red'}}>{" "}*</Text>
          )
        }
        
    }

    const displayDateFormat = () => {
        if (value) {
          //  console.log("Date value", value)
            const tempDate = value.split('/');
            //return `${tempDate[2]}/${tempDate[1]}/${tempDate[0]}`;
            return `${tempDate[0]}`;
        }
        return '';
    };

    function dateNow(){
        const today = new Date();
        let dd = today.getDate();
        let mm = parseInt(today.getMonth());
        let yyyy = today.getFullYear()
        mm++;
        mm+=""
        if (mm.length < 2) 
            mm = '0' + mm;
        if (dd.length < 2) 
            dd = '0' + dd;
        // console.log(`todays date ${yyyy}-${mm}-${dd}`)
        return `${yyyy}-${mm}-${dd}`
    }

    function monthYearChangeHandler(monthYear){
        console.log("month year => ", monthYear)
    }
    const getYesterday = () => {
        let today = new Date();
        let yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1); // Move to the previous day
        return yesterday;
      };
     return (
        <View style={styles.mainDiv} >
            {!!fieldText &&<View style={{zIndex:99999,top:-2,}}><Text  style={styles.textLabel} >{fieldText}{isRequired()}</Text></View>}
            <Pressable onPress={()=>editable?setOpen(true):''} style={styles.calendarIcon}>
                <CalendarDaysIcon size={24} color={"#666"} />
            </Pressable>
            <Text style={[styles.textField,{...checking(value, check), color: displayDateFormat()?theme.colors.inputTextColor:theme.colors.inputTextColor, backgroundColor: editable ? "#fff":"rgb(241 245 249)"}]}>{displayDateFormat() ? displayDateFormat() : placholder}</Text>
            {check>1 && !value && <Text style={styles.textRequiredMsg} >{`${fieldText} is required`}</Text>}
            
            <DateTimePickerModal
            isVisible={open}
            mode="date"
            onConfirm={handleChange}
            onCancel={handleOnPress}
            
            minimumDate={parseInt(pastDays)>0?minDate:new Date(1970, 1, 1)}
            maximumDate={futureDate?undefined:todayVisible?today:getYesterday()}
          />
        </View>
      )

 
}

export default CustomDatePicker

const styles = StyleSheet.create({
    calendarIcon:{position:'absolute',right:8,top:'42%',paddingLeft:8,borderLeftWidth:1,borderColor:'#738088',zIndex:10},
    mainDiv:{overflow:'visible',position:'relative',marginBottom:20,marginTop:2},
    textRequiredMsg:{position:'absolute',color:theme.colors.error,bottom:-16,paddingLeft:2,fontSize:theme.fontSizes.small,textTransform:'capitalize'},
    textLabel:{paddingLeft:2,color:theme.colors.inputLabelColor,fontSize:theme.fontSizes.fontSize14,fontWeight:theme.fontsWeight.medium,fontFamily:theme.fonts.medium},
    textField:{paddingVertical:8,paddingTop:8,paddingHorizontal:8,
        paddingLeft:10,borderWidth:1,
        borderColor:theme.colors.inputBoxBorderColor,
        borderRadius:5,fontSize:theme.fontSizes.fontSize14,color:theme.colors.inputTextColor,
        fontWeight:theme.fontsWeight.regular,
        fontFamily:theme.fonts.regular
    },
    centeredView: { 
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
        // marginTop:22
    },
    modalView: {
        margin:20,
        backgroundColor: '#fff',
        borderRadius:16,
        width:'94%',
        padding:0,
        alignItems:'center',
        shadowColor:'#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        borderWidth:1,
        borderColor:'#BD3881',

    },

})