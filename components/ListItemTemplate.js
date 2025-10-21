import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native'
import React from 'react'
import { Shadow } from 'react-native-shadow-2'
import theme from '../constants/theme';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
const ListItemTemplate = ({children,headingText='', onPress}) => {
  const splitText = headingText.split('/n');
 
  return (
    <View style={{marginTop:10,}}>
      
            <Shadow
        distance={2}
        startColor={'#0000000A'}
        endColor={'#fff'}
        radius={8}
        offset={[2,3]}
        //sides={'bottom'}
        style={{ borderRadius: 8,borderLeftColor:'#0000000A',borderRightColor:'#0000000A',borderTopColor:'#0000000A',
          borderLeftWidth:2,borderRightWidth:2,borderTopWidth:2,width:'100%',}}
      >
       
        <View
          style={{
            //width:100,
            //height:80,
            padding:10,
            backgroundColor: '#fff',
            borderRadius: 8,
            
            //borderBottomRightRadius:20
           
          }}
        >
          {headingText &&
          <View>
          <Text style={styles.headerText}>
         {splitText[0]}
            </Text>
            {splitText[1] &&
                      <Text style={styles.headerText}>
                        {splitText[1]}
                      </Text>
              }
          </View>
          }
          {children}
        </View>
      </Shadow>
     
    </View>
  )
}

export default ListItemTemplate

const styles = StyleSheet.create({
  bookingStBox:{flexDirection:'row',justifyContent:'space-between',
    backgroundColor:theme.colors.primary,
    borderRadius:2,
    paddingHorizontal:4,
    //marginHorizontal:4
  },
  bookingLabel: {
    paddingVertical: 12,
    color: theme.colors.white,
    fontSize: theme.fontSizes.medium,
    fontWeight: theme.fontsWeight.semiBold,
    fontFamily: theme.fonts.semiBold,
    lineHeight:20
  },
  headerText:{color:'#323030',fontSize:theme.fontSizes.fontSize18,fontWeight:theme.fontsWeight.bold,fontFamily:theme.fonts.bold,lineHeight:17,paddingTop:2,paddingBottom:6},

})