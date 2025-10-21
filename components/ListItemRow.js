import { StyleSheet, Text, View, Pressable, Dimensions, Image } from 'react-native'
import React from 'react'
import theme from '../constants/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons' 
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
const ListItemRow = ({lefttext,rightText='', status='',leftBold=false,fullText=false}) => {
     function bgColor(st){
        const status=st.toLowerCase();
        switch(status){
            case "approved":
                return <MaterialCommunityIcons name="checkbox-marked-circle" size={15} color="#90DEA9"  />
            case "pending":
                return <Image style={{width:14,height:14,}} source={require("./../assets/Images/pending.png")} />
            case "cancelled":
                return <MaterialCommunityIcons name="close-circle" size={15} color="#EF0D15"  />
            case "rejected":
                return <MaterialCommunityIcons name="close-circle" size={15} color="#EF0D15"  />
                case "open":
                  return <MaterialCommunityIcons name="checkbox-marked-circle" size={15} color="#90DEA9"  />
                case "closed":
                return <Image style={{width:14,height:14,}} source={require("./../assets/Images/pending.png")} />
        }
    }

  return (
    <View style={{flexDirection:'row',}}>
      
          <View style={{width:'50%'}}>
            <Text style={leftBold?styles.leftTextBold:styles.leftText} >
              {/* {getLabelLanguage(selLang, 'transaction_id')} */}
              {lefttext}
            </Text>
          </View>
          <View style={{width:'50%',}}>
           

<View>
    <Text style={styles.rightText} >
    {status && <Text>{bgColor(status)}</Text>} {rightText}
           
            </Text>
            </View>
            </View>

          
        </View>
  )
}

export default ListItemRow

const styles = StyleSheet.create({
  leftText:{color:'#595858',fontSize:theme.fontSizes.fontSize14,fontWeight:theme.fontsWeight.medium,fontFamily:theme.fonts.medium,},
  leftTextBold:{color:'#595858',fontSize:theme.fontSizes.fontSize14,fontWeight:theme.fontsWeight.semiBold,fontFamily:theme.fonts.semiBold,},
  rightText:{position:'relative',textAlign:'right',color:'#707274',fontSize:theme.fontSizes.fontSize14,fontWeight:theme.fontsWeight.regular,fontFamily:theme.fonts.regular},
})