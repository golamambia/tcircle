import React, {useState, useEffect, useLayoutEffect, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Pressable,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const AccordionItem=({ children, title,dateTime,type,points })=>{
    const [ expanded, setExpanded ] = useState(false);
  
    const toggleItem=() =>{
      setExpanded(!expanded);
    }
  
    const body = <View style={styles.accordBody}  className="border-b-[1.5px] border-t-[1.5px] border-[#E5E5E5]" >{ children }</View>;
    const textColor = type === 'minus' ? '#FF0000' : '#13A180';
    return (
      <View style={styles.accordContainer}  className={` ${expanded === true ? '' : 'border-b-[1.5px] border-[#E5E5E5]'}`}>
        <TouchableOpacity style={styles.accordHeader} onPress={ toggleItem }>
          <View>
          <Text style={styles.accordTitle}>{ title }</Text>
          <Text  className="text-[#555555] font-normal text-[12px] font-sans">{dateTime}</Text>
          </View>
         <View className="flex-row">
         <Text style={{ color: textColor }} className="font-medium text-14 font-sans pr-4">{ type=='plus' ? '+' : '-' }{points}</Text>
         <Icon name={ expanded ? 'chevron-up' : 'chevron-down' }  size={14} color="#1E1E1E" />
         </View>
          
              
        </TouchableOpacity>
        { expanded && body }
        
      </View>
    );
  }
  export default AccordionItem;
  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    accordContainer: {
      paddingBottom: 4
    },
    accordHeader: {
      padding: 12,
      //backgroundColor: '#666',
      color: '#eee',
      flex: 1,
      flexDirection: 'row',
      justifyContent:'space-between'
    },
    accordTitle: {
      fontSize: 14,
      fontWeight:'600',
      color:'#1E1E1E'
    },
    accordBody: {
      padding: 12,
      backgroundColor:'rgba(165, 162, 162, 0.05)'
    },
    textSmall: {
      fontSize: 16
    },
    seperator: {
      height: 12
    }
  });