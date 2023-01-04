import React, { useEffect, useState } from "react";
import { StyleSheet, Image, Pressable, TouchableOpacity } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
// import { fr, ar, en } from "./languages/localizations";
// import * as Localization from "expo-localization";
// i18n.fallbacks = true;
import Icon from "react-native-vector-icons/AntDesign";
import { useTranslation } from "react-i18next";
const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "ar", label: "Arabic" },
];

const ChangeLang = () => {
  const { t, i18n } = useTranslation();
  const selectedLanguageCode = i18n.language;
  console.log(selectedLanguageCode, "dddddddddd");
  const setLanguage = (code) => {
    i18n.changeLanguage(code);
    move();
    console.log(
      i18n.changeLanguage(code),
      "ddddddddddddddddddddddddddddddddddd"
    )
     
  };
  const move = () => {
    navigation.navigate("OnboardingIndex");
  }
  //   const [locale, setLocale] = useState(Localization.locale);

  //   i18n.translations = { fr, ar, en };

  const navigation = useNavigation();

  const insets = useSafeArea();

  const [langue, setLangue] = useState("");
  const [checkIcon1, setCheckIcon1] = useState(false);
  const [checkIcon2, setCheckIcon2] = useState(false);
  const [checkIcon3, setCheckIcon3] = useState(false);

  const getLangue = (value) => {
    i18n.locale = value;
    setLangue(() => value);
    storeLangue(value);
    // console.log(value)
  };

  const storeLangue = async (value) => {
    await AsyncStorage.getItem("user-language", value);
  };

  const showIcon1 = () => {
    checkIcon1 == false
      ? setCheckIcon1(true) + setCheckIcon2(false) + setCheckIcon3(false)
      : false;
    navigation.navigate("OnboardingIndex");
  };
  const showIcon2 = () => {
    checkIcon2 == false
      ? setCheckIcon2(true) + setCheckIcon1(false) + setCheckIcon3(false)
      : false;
    navigation.navigate("OnboardingIndex");
  };
  const showIcon3 = () => {
    checkIcon3 == false
      ? setCheckIcon3(true) + setCheckIcon1(false) + setCheckIcon2(false)
      : false;
    navigation.navigate("OnboardingIndex");
  };
  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
    });
  }, [navigation]);
  return (
    <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: "white" }}>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          top: "4%",
        }}
      >
        <Image
          style={styles.tinyLogo}
          source={require("../../assets/images/logoSimple.png")}
        />
        <View style={{ marginBottom: "10%" }}>
          <Text
            style={{
              color: "#1C6AE4",
              fontFamily: "Gothic_Bold",
              fontSize: 27,
            }}
          >
            {t("common:SetLang")}
          </Text>
        </View>
        {LANGUAGES.map((language) => {
          const selectedLanguage = language.code === selectedLanguageCode;
          return (
            <TouchableOpacity
              key={language.code}
              style={styles.itemView1}
              disabled={selectedLanguage}
              onPress={() => setLanguage(language.code)}
            >
              <Text style={styles.languageText}>{language.label}</Text>
            </TouchableOpacity>
          );
        })}
        {/* <TouchableOpacity
          style={styles.itemView1}
          onPress={() => {
            
            showIcon1();
          }}
        >
          <Text style={styles.languageText}>English</Text>
          {checkIcon1 ? (
            <Icon
              style={{ position: "absolute", right: "10%" }}
              name="check"
              size={25}
              color="#fff"
            />
          ) : null}
        </TouchableOpacity> */}
      </View>
      {/* <View style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
        <Text style={styles.title}>{i18n.t("SetLang")}</Text>
      </View> */}
    </View>
    // <View style={styles.container}>
    //   <Image
    //       style={styles.tinyLogo}
    //       source={require("../../assets/images/logoSimple.png")}
    //     />
    //   <View style={styles.row}>
    //     <Text style={styles.title}>{t("common:skip")}</Text>
    //     {/* <Ionicons color='#444' size={28} name='ios-language-outline' /> */}
    //   </View>
    //   {LANGUAGES.map((language) => {
    //     const selectedLanguage = language.code === selectedLanguageCode;

    //     return (
    //       <Pressable
    //         key={language.code}
    //         style={styles.buttonContainer}
    //         disabled={selectedLanguage}
    //         onPress={() => setLanguage(language.code)}
    //       >
    //         <Text
    //           style={[selectedLanguage ? styles.selectedText : styles.text]}
    //         >
    //           {language.label}
    //         </Text>
    //       </Pressable>
    //     );
    //   })}
    // </View>
  );
};

export default ChangeLang;

const styles = StyleSheet.create({
  tinyLogo: {
    height: "35%",
    width: "40%",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    bottom: "10%",
  },
  logo: {
    height: "30%",
    width: "20%",
  },
  title: {
    color: "black",
    fontSize: 22,
    paddingVertical: "5%",
    paddingHorizontal: 10,
    fontFamily: "Gothic_Bold",
  },
  options: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    marginTop: "30%",
    width: "80%",
    borderRadius: 15,
    elevation: 10,
    shadowColor: "gray",
    shadowRadius: 7,
    shadowOpacity: 0.5,
    shadowOffset: { width: 10, height: 10 },
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "white",
  },
  languageText: {
    fontWeight: "500",
    fontSize: 20,
    color: "black",
    fontFamily: "Gothic",
    textAlign: "center",
  },
  itemView1: {
    justifyContent: "center",
    width: "80%",
    backgroundColor: "white",
    height: 50,
    marginBottom: 20,
    borderRadius: 50,
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
  },
  itemView2: {
    justifyContent: "center",
    width: "80%",
    backgroundColor: "white",
    height: 50,
    marginBottom: 20,
    borderRadius: 50,
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
  },
  itemView3: {
    justifyContent: "center",
    width: "80%",
    backgroundColor: "white",
    height: 50,
    marginBottom: 20,
    borderRadius: 50,
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
  },
});
