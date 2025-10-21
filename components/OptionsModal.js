import React, {useState, useEffect, useCallback} from 'react';
import {getLocalStorageItem, setLocalStorageItem} from '../store/localStore';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Modal,
  FlatList,
  ScrollView,
  Dimensions,
  TextInput,
  Alert,
  StatusBar,
} from 'react-native';
import {
  XCircleIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
} from 'react-native-heroicons/outline';
import ButtonRounded from './ButtonRounded';
import ButtonGradient from './ButtonGradient';
import {
  ADANI_COLOR_PALATE,
  ADANI_ICON,
  DARK_GREEN,
  GAME_QUIZ_ICON,
  IMAGE_BASE_URL,
  LIGHT_PURPLE,
  NO_IMAGE,
} from '../constants/common';
import SearchBar from './SearchBar';
import EncryptedStorage from 'react-native-encrypted-storage';
import getLabelLanguage from '../lang';

import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InfoMsg from './InfoMsg';
import theme from '../constants/theme';
import InputField from './InputField';
import ButtonNormal from './ButtonNormal';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const OptionsModal = ({
  open,
  setOpen,
  modalOptions = [],
  setSelectedItem,
  heading,
  icon,
  useImageForDisplay = false,
  showImage = false,
  highlightImageIcon = false,
  searchBar = true,
  closeButton = true,
  selectedItem,
  showSelectedOptionAtTop = true,
  confirmField=false,

  fieldName
}) => {
  const [selected, setSelected] = useState({id: '', title: ''});
  const [searchQuery, setSearchQuery] = useState('');
  const [selLang, setSelLang] = useState('');
  const [check, setCheck] = useState(1);
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
   const [errorMsg, setErrorMsg]= useState('');
  const bgColor = title => {
    return selected.id == title ? '#F3FFFF' : 'white';
  };

  function bgColorSelect(id) {
    if (id == selected.id) {
      return {
        //backgroundColor: 'red',
        borderColor: '#4BB543',
        borderWidth: 1,
      };
    }
    return {backgroundColor: '#fff'};
  }
  // console.log('modal--------------------->', modalOptions);

  if (modalOptions.length > 0) {
    modalOptions = modalOptions.filter(item =>
      item.title?.toLowerCase()?.includes(searchQuery.toLowerCase()),
    );
  }

  if (showSelectedOptionAtTop && selectedItem.id) {
    let newOps = [];
    newOps = modalOptions.filter(item => item.id !== selectedItem.id);
    modalOptions = [selectedItem, ...newOps];
  }

  // const continueBtn = () => {
  //   setSelectedItem(selected);
  //   if (selected.id != '') {
  //     setOpen(p => !p);
  //   }
  // };

  const continueBtn = useCallback(() => {
    setSelectedItem(selected);

    if (selected.id != '') {
      
      setOpen(p => !p);
    }
  }, [selected]);

  const continueBtnnw =() => {
    
    console.log("hhjhjjj",value1)
    setCheck(p => p + 1);
    if (value1 != '' && value2!='') {
      //setSelectedItem(value1);
      setSelectedItem({id: value1, title: value1});
     if(value1==value2){
      setValue1("");
      setValue2("");
      setCheck(1);
      setOpen(p => !p);
      setErrorMsg("");
     }else{
      //Alert.alert("Data is mismatch!");
      //setErrorMsg('Data is mismatch!');
     }
      
    }
  };

  useEffect(() => {
   // console.log('selected-----------------', selectedItem);
    if (selectedItem?.id == '') {
      setSelected({id: '', title: ''});
    }
  }, [selectedItem]);

  useFocusEffect(
    useCallback(() => {
      EncryptedStorage.getItem('lang').then(lang => {
        setSelLang(lang);
      });
    }, []),
  );

  useEffect(() => {
    if (selected.id) {
      continueBtn();
    }
  }, [selected]);
  function resetHandler() {
    setSelected({id: '', title: ''});
    setSelectedItem({id: '', title: ''});
    setSearchQuery('');
    setOpen(false);
  }
  //console.log('modalOptions',modalOptions);border-t-1 border-gray-300
  const Item = ({item}) => {
    if (!highlightImageIcon) {
      return (
        <Pressable
          onPress={() => setSelected({...item})}
          className={' flex-row justify-start items-center py-1 '}
          style={{
            ...bgColorSelect(item.id),
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingVertical: 2,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderBottomColor:
              selected.id == item.id
                ? theme.colors.activeColor
                : theme.colors.inputBoxBorderColor,
            borderBottomWidth: selected.id == item.id ? 1 : 1,
            borderTopColor:
              selected.id == item.id
                ? theme.colors.activeColor
                : theme.colors.inputBoxBorderColor,
            borderTopWidth: selected.id == item.id ? 1 : 1,
            borderRadius: 5,
          }}>
          {!useImageForDisplay && <View style={{marginLeft: 8}}>{icon}</View>}
          <View style={{flexDirection: 'column', gap: 4, width: '98%'}}>
            <View
              style={{
                flexDirection: 'row',
                width: '90%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              {!useImageForDisplay && (
                <Text
                  style={{
                    paddingHorizontal: 8,
                    paddingVertical: 8,
                    color: theme.colors.inputLabelColor,
                    letterSpacing: 1,
                    fontSize: theme.fontSizes.fontSize14,
                    fontWeight: theme.fontsWeight.regular,
                    fontFamily: theme.fonts.regular,
                    width: '92%',
                  }}>
                  {item.title}
                </Text>
              )}

              {!useImageForDisplay && selected.id == item.id && (
                // <CheckCircleIcon
                //   size={30}
                //   style={{zIndex: 10, position: 'absolute', right: 0}}
                //   // color={'#fff'}
                //   // fill={ADANI_COLOR_PALATE[0]}
                //   color={'#4BB543'}
                //   fill={'#fff'}
                // />
                <XCircleIcon
                  onPress={resetHandler}
                  size={30}
                  style={{zIndex: 10, position: 'absolute', right: 0}}
                  // color={'#fff'}
                  // fill={ADANI_COLOR_PALATE[0]}
                  color={'#ff0000'}
                  fill={'#fff'}
                />
              )}
            </View>
            {!useImageForDisplay && !!item.description && (
              <Text
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  marginTop: 16,
                  color: '#333',
                  fontSize: 15,
                  letterSpacing: 16,
                }}
                className="px-4 py-2 mt-4 text-[#333] tracking-widest text-[15px]">
                {item.description}
              </Text>
            )}
          </View>

          {useImageForDisplay && (
            <Image source={item.image} style={styles.imageOption} />
          )}
        </Pressable>
      );
    } else {
      return (
        <Pressable
          onPress={() => setSelected({...item})}
          style={{
            backgroundColor: bgColor(item.id),
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 50,
            borderColor: selected.id == item.id ? DARK_GREEN : '#fff',
            borderWidth: selected.id == item.id ? 1 : 1,
            borderRadius: 10,
            paddingHorizontal: 18,
          }}>
          {useImageForDisplay && (
            <Image
              source={item.image}
              style={{...styles.imageOptionHighlight}}
            />
          )}
        </Pressable>
      );
    }
  };

  return (
    <View style={styles.centeredView}>
      {/* <StatusBar backgroundColor='rgba(0,0,0,0.2)' barStyle={"dark-content"} /> */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={open}
        onRequestClose={() => {
          setSearchQuery('');
          setOpen(!open);
        }}>
        <Pressable
          onPress={() => {
            setSearchQuery('');
            setOpen(p => !p);
          }}
          style={{
            flex: 1,
            // paddingBottom: screenHeight*0.05,
            backgroundColor: 'rgba(0,0,0,0.2)',
          }}>
          <View
            className=""
            style={{
              // height: `${(modalOptions.length*11)+15}%`,
              maxHeight: `80%`,
              width: '98%',
              opacity: 1,
              marginTop: 'auto',
              borderTopLeftRadius: 13,
              borderTopRightRadius: 13,
              // borderBottomLeftRadius: 13,
              // borderBottomRightRadius: 13,
              backgroundColor: '#fff',
              alignSelf: 'center',
              paddingVertical: 15,
              elevation: 10,
            }}>
            <View style={{paddingHorizontal: 16}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontWeight: '700',
                    fontFamily: theme.fonts.bold,
                    text: theme.fontSizes.fontSize18,
                    color: '#333',
                  }}>
                  {heading}
                </Text>
                {closeButton && (
                  <Pressable
                    onPress={() => {
                      setSearchQuery('');
                      setOpen(p => !p);
                    }}>
                    <XCircleIcon color="#444" size={30} />
                  </Pressable>
                )}
              </View>
                {confirmField &&
              <View style={{maxHeight: '100%', paddingVertical: 16}}>
              <InputField fieldName={fieldName} required={true} value={value1} setValue={setValue1} check={check}  />
              <InputField fieldName={'Confirm '+fieldName} required={true} value={value2} setValue={setValue2} check={check}  />
              
              {(value1 && value2) && (value1!=value2) &&<Text style={styles.textRequiredMsg}>{'Data is mismatch!'}</Text>}
              <View >
                <ButtonNormal
                  onPress={() => {
                    continueBtnnw();
                  }}
                  //disabled={(value1 != '' && value2!='') ? false : true}
                  >
                  continue
                </ButtonNormal>
              </View>
              </View>
                }
                                {!confirmField &&
              <View style={{maxHeight: '100%', paddingVertical: 16}}>
              

                {searchBar && (
                  <SearchBar
                    placeholder={'Search by title / name'}
                    inputText={searchQuery}
                    setInputText={setSearchQuery}
                    //keyboardType="number-pad"
                  />
                )}
                {modalOptions.length === 0 && (
                  <InfoMsg text={`Sorry, no data available`} />
                )}

                {!showImage && !highlightImageIcon && (
                  <FlatList
                    data={modalOptions}
                    renderItem={({item}) => <Item item={item} />}
                    keyExtractor={item => item.id}
                  />
                )}

                {!showImage && highlightImageIcon && (
                  // <View className="flex-col justify-center items-center h-[400px]"> </View><Item item={item} />

                  <FlatList
                    numColumns={2}
                    data={modalOptions}
                    renderItem={({item}) => (
                      <Pressable
                        style={{...styles.item, ...bgColorSelect(item.id)}}
                        onPress={() => setSelected({...item})}>
                        {selected.id == item.id && (
                          <ShieldCheckIcon
                            size={33}
                            style={{
                              position: 'absolute',
                              zIndex: 10,
                              left: 5,
                              top: 2,
                            }}
                            color={'#fff'}
                            fill={'#75479C'}
                          />
                        )}
                        {!!item.image ? (
                          <Image
                            style={{
                              height: screenHeight * 0.2,
                              width: screenWidth * 0.4,
                              resizeMode: 'contain',
                            }}
                            source={item.image}
                            // source={GAME_QUIZ_ICON}
                          />
                        ) : (
                          <Image
                            style={{
                              height: screenHeight * 0.2,
                              width: screenWidth * 0.4,
                              resizeMode: 'contain',
                            }}
                            source={NO_IMAGE}
                            // source={GAME_QUIZ_ICON}
                          />
                        )}
                        <Text
                          style={[
                            styles.itemText,
                            {
                              paddingHorizontal: 16,
                              paddingVertical: 4,
                              color: '#3C3C3C',
                              fontSize: theme.fontSizes.fontSize14,
                              fontFamily: theme.fonts.medium,
                              fontWeight: '500',
                            },
                          ]}>
                          {item.title}
                        </Text>
                      </Pressable>
                    )}
                    keyExtractor={item => item.id}
                  />
                )}

                {showImage && (
                  <FlatList
                    numColumns={2}
                    data={modalOptions}
                    renderItem={({item}) => (
                      <Pressable
                        style={{...styles.item, ...bgColorSelect(item.id)}}
                        onPress={() => setSelected({...item})}>
                        {selected.id == item.id && (
                          <ShieldCheckIcon
                            size={33}
                            style={{
                              position: 'absolute',
                              zIndex: 10,
                              left: 5,
                              top: 2,
                            }}
                            color={'#fff'}
                            fill={'#75479C'}
                          />
                        )}
                        {!!item.image ? (
                          <Image
                            style={{
                              height: screenHeight * 0.2,
                              width: screenWidth * 0.4,
                              resizeMode: 'contain',
                            }}
                            source={{uri: item.image}}
                            // source={GAME_QUIZ_ICON}
                          />
                        ) : (
                          <Image
                            style={{
                              height: screenHeight * 0.2,
                              width: screenWidth * 0.4,
                              resizeMode: 'contain',
                            }}
                            source={NO_IMAGE}
                            // source={GAME_QUIZ_ICON}
                          />
                        )}
                        <Text
                          style={[
                            styles.itemText,
                            {
                              paddingHorizontal: 16,
                              paddingVertical: 4,
                              textAlign: 'center',
                              color: 'black',
                              letterSpacing: '0.05em',

                              fontWeight: '500',
                              fontSize: theme.fontSizes.fontSize14,
                              fontFamily: theme.fonts.medium,
                            },
                          ]}>
                          {item.title}
                        </Text>
                      </Pressable>
                    )}
                    keyExtractor={item => item.id}
                  />
                )}
              </View>
}
              {/* <View className="absolute w-full -bottom-12 left-[5%]">
                <ButtonGradient
                  onPress={() => {
                    continueBtn();
                  }}
                  disabled={selected.id != '' ? false : true}>
                  {getLabelLanguage(selLang, 'continue')}
                </ButtonGradient>
              </View> */}
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  textRequiredMsg: {
    //position: 'absolute',
    color: theme.colors.error,
    //bottom: -16,
    paddingLeft: 2,
    fontSize: theme.fontSizes.small,
    textTransform: 'capitalize',
    marginBottom:12
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: '#000',
  },
  adaniBold: {
    fontFamily: 'Adani-Bold',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  fontFamily: {
    fontFamily: 'Adani-Regular',
  },
  imageOption: {
    width: screenWidth * 0.18,
    height: screenWidth * 0.08,
  },
  imageOptionHighlight: {
    width: screenWidth * 0.3,
    height: screenWidth * 0.15,
    borderWidth: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    overflow: 'hidden',
  },
  item: {
    width: '48%', // is 50% of container width
    display: 'flex',
    alignItems: 'center',
    padding: 6,
    paddingVertical: 4,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#d2d2d2',
    margin: 2,
    backgroundColor: 'rgba(165, 162, 162, 0.05)',
    // backgroundColor: 'rgba(255, 162, 162, 0.25)',
  },
  itemText: {},
  fontFamily: {
    fontFamily: 'Adani-Regular',
  },
});

export default OptionsModal;
