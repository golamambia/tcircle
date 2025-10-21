import React, {useState} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';


const SearchableDropdown = ({fieldName, required, data, searchable, value, setValue, check}) => {

    // const [value, setValue] = useState(value);
    const [isFocus, setIsFocus] = useState(false);

    const isRequired = () => {
        if(required===true){
            return (
                <Text className="text-red-600">{" "}*</Text>
          )
        }
        
    }

    const checking = (value, check) => {
      if(value){
        return {
            borderColor:'#4BB543',
            borderWidth: 1
            }
        // return " border-green-500"
        }
        console.log()
        if(check > 1){
            return {
                borderColor:'#F21616',
                borderWidth: 1
            }
            // return " border-red-500"
        }

        // return " border-slate-300"
    }

  return (
    <View style={styles.container} className="mb-3">
        <Text className="mb-2 text-sm text-[#1E1E1E] font-normal text-[16px]" style={styles.fontFamily}>{fieldName}{isRequired()}</Text>
        <Dropdown
          className={"py-2 px-2 border rounded-sm border-slate-300 relative text-black"}
          style={checking(value, check)}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          itemTextStyle={styles.fontStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search={searchable}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
        />
         {check>1 && !value && <Text className="absolute text-[#ED2F2F] tracking-widest -bottom-5">{`${fieldName} is mandatory`}</Text>}
      </View>
  )
}

export default SearchableDropdown

const styles = StyleSheet.create({
    container: {
  
    },
    dropdown: {
    //   height: 50,
    //   borderColor: 'gray',
    //   borderWidth: 0.5,
    //   borderRadius: 8,
    //   paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
      color: '#222'
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    fontStyle: {
      color: '#222'
    }
  });