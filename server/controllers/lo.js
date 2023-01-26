import {
    View,
    Text,
    Pressable,
    StyleSheet,
    SafeAreaView,
    Dimensions,
    ScrollView,
    Image,
    ActivityIndicator
  } from "react-native";
  import { useTranslation } from "react-i18next";
  import { FlatList } from "react-native-gesture-handler";
  import axios from "axios";
  import { useNavigation } from "@react-navigation/native";
  import { useEffect, useState } from "react";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { LinearGradient } from "expo-linear-gradient";
  import Shared from "../../../../Shared";
  import moment from "moment";
  // import { FlashList } from "@shopify/flash-list";
  const windowWidth = Dimensions.get("window").width;
  
  export default function DraftScreen() {
    const [draftContracts, setdraftcontracts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
  
  
  
    const [contractId, setContractID] = useState();
    const [questionsAnswers, setquestionsAnswers] = useState([]);
    const [selected_contract_id, setContractId] = useState("");
    const [Savedanswers, setSavedAnswers] = useState([]);
    const navigation = useNavigation();
    const { t } = useTranslation();
    useEffect(() => {
      draftContract();
    }, [currentPage]);
    const draftContract = async () => {
      setIsLoading(true);
      var token = await AsyncStorage.getItem("UsertokenInfo");
      await axios
        .get(`${Shared}/api/users/userInfo`, {
          headers: { token: token },
        })
        .then((result) => {
          setContractId(result.data[0].id);
          return result.data[0].id;
        })
        .then((idUser) => {
          axios
            .get(`${Shared}/api/contracts/draft/${idUser}/?page=${currentPage}&resultPerPage=8`)
            .then((contracts) => {
              setdraftcontracts([...draftContracts,...contracts.data]);
              setIsLoading(false);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    };
    
    const renderLoader = () => {
      return (
        isLoading ?
          <View style={styles.loaderStyle}>
            <ActivityIndicator size="large" color="#aaa" />
          </View> : null
      );
    };
    const loadMoreItem = () => {
      setCurrentPage(currentPage + 1);
    };
  
    let choice = "Francais";
    const renderedItem = ({ item, index }) => (
      <View key={`${index}`}>
        <Pressable
          style={styles.card}
          onPress={async () => {
            let contracts_id = item.contracts_id;
            let selected_contract_id = item.contract_types_id;
            try {
              const answers = await axios.get(
                `${Shared}/api/answers/${contracts_id}`
              );
              if (answers) {
                setSavedAnswers(answers.data);
                navigation.navigate("Questions", {
                  contracts_id,
                  choice,
                  selected_contract_id,
                  Savedanswers: answers.data,
                });
              }
            } catch (error) {
              console.log("there is an error while getting the answers", error);
            }
          }}
        >
          <View
            style={{ position: "absolute", top: 10, paddingHorizontal: "10%" }}
          >
            <View
              style={{
                display: "flex",
                flexWrap: "wrap",
                
                flexShrink: 1,
                flexDirection: "column",
              }}
            >
              <View style={{width:150}}>
                <Text style={styles.tex} numberOfLines={2}>
                  {item.title_FR}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    display: "flex",
                    top:10,
                    fontSize: 11,
                    flexWrap: "wrap",
                    color: "#aaaeb1",
                  }}
                >
           {moment.utc(item.created_at).format('MM/DD/YYYY')}
                </Text>
              </View>
            </View>
          </View>
  
          <View style={styles.bottomCardView}>
            <View style={styles.status}>
              <Text style={styles.text}>{t("common:draft")}</Text>
            </View>
          </View>
        </Pressable>
      </View>
    );
    return (
      <View style={styles.container}>
        <ScrollView>
          {/* <View>
            <Text style={styles.title}>{t("common:draftContracts")}</Text>
          </View> */}
          <View style={{ marginTop: 50 }}>
            <FlatList
              numColumns={2}
              style={{ height: "100%" }}
              data={draftContracts}
              onEndReached={loadMoreItem}
              ListFooterComponent={renderLoader}
              renderItem={renderedItem}
              onEndReachedThreshold={0}
              key={(item) => `key-${item.id}`}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    image: {
      width: "100%",
      height: "100%",
    },
    title: {
      width: "80%",
      marginHorizontal: "10%",
      marginVertical: 10,
      color: "black",
      fontFamily: "Gothic_Bold",
      fontSize: 26,
      paddingBottom: 10,
    },
    card: {
      height: 200,
      width: "90%",
      backgroundColor: "white",
      marginHorizontal: "5%",
      marginVertical: "5%",
      padding: "20%",
      borderRadius: 15,
      backgroundColor: "white",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 3,
    },
    bottomCardView: {
      display: "flex",
      flexDirection: "row",
      position: "absolute",
      bottom: "3%",
      paddingHorizontal: "10%",
    },
    status: {
      width: 80,
      height: 30,
      backgroundColor: "#1C6AE4",
      borderRadius: 9,
      padding: 5,
      margin: 5,
      textAlign: "center",
      alignItems: "center",
      fontWeight: "500",
      color: "#fff",
    },
    name: {
      width: 40,
      height: 40,
      backgroundColor: "grey",
      borderRadius: 100,
      borderWidth: 3,
      borderColor: "#1C6AE4",
      padding: 5,
      margin: 5,
      textAlign: "center",
      bottom: "4%",
      fontWeight: "500",
      fontSize: 10,
      color: "#fff",
    },
    text: {
      color: "#fff",
      fontFamily: "Gothic",
    },
    tex: {
      fontSize: 14,
      fontFamily: "Gothic_Bold",
    },
  });
  