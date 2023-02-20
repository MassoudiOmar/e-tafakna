import React, {
    useRef,
    useLayoutEffect,
    useReducer,
    useMemo,
    useContext,
  } from "react";
  import CalendarPicker from "react-native-calendar-picker";
  import moment from "moment";
  import { BackHandler } from "react-native";
  
  import DateTimePickerModal from "react-native-modal-datetime-picker";
  import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    Image,
    TouchableOpacity,
    Modal,
    Animated,
    TextInput,
    StyleSheet,
    ImageBackground,
    Pressable,
    Platform,
    ScrollView,
    TouchableHighlight,
    Button,
    ActivityIndicator,
  } from "react-native";
  import Textarea from "react-native-textarea";
  import axios from "axios";
  import { useState, useEffect, useCallback } from "react";
  import { useTranslation } from "react-i18next";
  import { FontAwesome } from "@expo/vector-icons";
  // import { FancyAlert } from "react-native-expo-fancy-alerts";
  import Shared from "../../../../Shared";
  import Spinner from "react-native-loading-spinner-overlay";
  import Feather from "react-native-vector-icons/Feather";
  import Ionicons from "react-native-vector-icons/Ionicons";
  import AntDesign from "react-native-vector-icons/AntDesign";
  import AwesomeAlert from "react-native-awesome-alerts";
  import { FlatList } from "react-native-gesture-handler";
  import { colors } from "../../../../assets/COLORS/color2";
  import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
  import MultiSlider from "@ptomasroos/react-native-multi-slider";
  import PickerModal from "react-native-picker-modal-view";
  import data from "./top20.json";
  import arrow from "../../../../assets/images/arrow.png";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import Gouv from "./Gouv.json";
  import GouvArab from "./GouvArab.json";
  import Country from "./CountryFra.json";
  import CountryAra from "./countryNameAra.json";
  import carBrand from "./CarBrand.json";
import carMarque from "./CarMarque.json";

  import CustomisableAlert, {
    showAlert,
    closeAlert,
  } from "react-native-customisable-alert";
  import { fabClasses } from "@mui/material";
  import { DataContext } from "../../Context/DataContext";
  const Questions = ({ route, navigation }) => {
    const { t } = useTranslation();
    let {
      selected_contract_id,
      lang,
      contracts_id,
      realId,
      Savedanswers,
      choice,
      saveIt,
      TestL,
    } = route.params;
    console.log(route.params, "this is the params");
    let imageUri = "";
    let language = "";
    if (lang === "Arabe" || choice == "Arabe") {
      language = "content_AR";
    } else if (lang === "Francais" || choice == "Francais") {
      language = "content_FR";
    } else {
      language = "content_EN";
    }
    const [user_id, setUser_id] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    console.log(currentQuestionIndex, "quenr");
    const [computedAnswers, setComputedAsnwer] = useState([]);
    const [allAnswer, setAllAnswer] = useState([]);
    const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
    const [repeateQuestion, setRepeatQuestion] = useState(0);
    const [answer, setAnswer] = React.useState("");
    console.log(answer, "this is the answer");
    const [selectedDatee, setSelectedDatee] = useState();
    console.log(
      questionDate === "true"
        ? moment(answer).format("DD/MM/YYYY")
        : moment(answer).format("DD/MM/YYYY"),
      "answerrrrrrrr"
    );
    // const [userName, setUserName] = useState("");
    // *** Using Context For Draft/
    const { userNameofContract } = useContext(DataContext);
    const [userName, setUserName] = userNameofContract;
    console.log(draftContracts, "this is the draft ");
    const [contractName, setContractName] = useState("");
    const [borderStatus, setBorderStatus] = useState(0);
    const [customInput, setCustomInput] = useState("");
    const [search, setSearch] = useState([]);
    const [search1, setSearch1] = useState([]);
    const [questionId, setQuestionId] = useState(null);
    console.log("====================================");
    console.log(
      questionId,
      "ATTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT"
    );
    console.log("====================================");
    const [questionDate, setQuestionDate] = useState(null);
    const [requireRepeat, setRequireRepeat] = useState(false);
    const [showNextButton, setShowNextButton] = useState(false);
    const [showdataModal, setShowdataModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedId1, setSelectedId1] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [visible, setVisible] = React.useState(false);
    const [checked1, setChecked1] = React.useState(false);
    const [checked2, setChecked2] = React.useState(false);
    const [number1, setNumber1] = useState(0);
    const [checked3, setChecked3] = React.useState(false);
    const [checked4, setChecked4] = React.useState(false);
  
    const [isDisabled, setIsDisabled] = useState(false);
    const [explanation, setExplain] = useState("");
    const [not, setNot] = useState("");
    const [didGoBack, setDidGoBack] = useState(-1);
    const [showAlert, setShowAlert] = useState(null);
    const [showAlert1, setShowAlert1] = useState(false);
    const [nextBtnText, setNextBtnText] = useState(t("common:next"));
    const [justText, setJustTest] = useState(1);
    const [errorMessage, setErrorMessage] = useState("");
    console.log(errorMessage);
    const [Staty, setStaty] = useState(false);
    ////States for The Facture contract
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [nameArr, setNameArr] = useState([]);
    const [quantityArr, setQuantityArr] = useState([]);
    const [priceArr, setPriceArr] = useState([]);
    const [step, setStep] = useState(1);
    /////
    const [number, setNumber] = useState(0);
    const [showSelecter, setShowSelecter] = useState(false);
    const [engagement1, setEngagement1] = useState("");
    const [engagement2, setEngagement2] = useState("");
    const [selectedItem, setselectedItem] = useState("");
    const Repeat = useRef(null);
    const numberRef = useRef(null);
    //date
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [option, setOption] = useState("");
    const [initialQuestionId, setInitialQuestionId] = useState(-1);
    const [text, setText] = useState(
      `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    );
    // *** Using Context For Draft/
    const { draft } = useContext(DataContext);
    const [draftContracts, setdraftcontracts] = draft;
    console.log(draftContracts, "this is the draft ");
    // **/
    const { contract_id_draft } = useContext(DataContext);
    const [selected_contract_idd, setContractId] = contract_id_draft;
    // **/
    const { pageCurrent } = useContext(DataContext);
    const [currentPage, setCurrentPage] = pageCurrent;
    console.log("Qpage:", currentPage);
    // *****************/
    // **/
    const { imagesende } = useContext(DataContext);
    const [imagesend, setsendImagesend] = imagesende;
    // *****************/
    // **/
    const { imagesharee } = useContext(DataContext);
    const [imageshare, setsendImageshare] = imagesharee;
    // *****************/
    const [textArea, settextArea] = useState("");
    const [borderStatusN, setBorderStatusN] = useState(0);
  
    var Const = ["Nom et prénom", "lieu de naissance", "Numéro de CIN"];
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === "ios");
      setDate(currentDate);
      let tempDate = new Date(currentDate);
      let fDate =
        tempDate.getDate() +
        "/" +
        tempDate.getMonth() +
        "/" +
        tempDate.getFullYear();
      setText(fDate);
      setAnswer(fDate);
      // console.log(fDate + " (" + fTime + ")");
    };
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
    ////////////////////
    function backButtonHandler() {
      navigation.navigate("drawer");
      console.log("Testyyy");
      setSpinner(true);
      return false;
    }
    const slider = () => {
      return (
        <MultiSlider
          values={[1]}
          sliderLength={200}
          onValuesChange={(event) => {
            console.log(event);
            setJustTest(event);
            console.log(Repeat);
          }}
          min={1}
          max={10}
          step={1}
          selectedStyle={{
            backgroundColor: "blue",
          }}
          customMarker={() => {
            return (
              <View
                style={{
                  height: 15,
                  width: 15,
                  backgroundColor: "blue",
                  borderRadius: 50,
                }}
              ></View>
            );
          }}
        />
      );
    };
  
    const DATA = [
      { id: 0, value: "Audi" },
      { id: 1, value: "Chevrolet" },
      { id: 2, value: "Cadillac" },
      { id: 3, value: "Acura" },
      { id: 4, value: "BMW" },
      { id: 5, value: "Chrysler" },
      { id: 6, value: "Ford" },
      { id: 7, value: "Buick" },
      { id: 8, value: "INFINITI" },
      { id: 9, value: "GMC" },
      { id: 10, value: "Honda" },
      { id: 11, value: "Hyundai" },
      { id: 12, value: "Jeep" },
      { id: 13, value: "Genesis" },
      { id: 14, value: "Dodge" },
      { id: 15, value: "Jaguar" },
      { id: 16, value: "Kia" },
      { id: 17, value: "Land Rover" },
      { id: 18, value: "Lexus" },
      { id: 19, value: "Mercedes-Benz" },
      { id: 20, value: "Mitsubishi" },
      { id: 21, value: "Lincoln" },
      { id: 22, value: "MAZDA" },
      { id: 23, value: "Nissan" },
      { id: 24, value: "MINI" },
      { id: 25, value: "Porsche" },
      { id: 26, value: "Ram" },
      { id: 27, value: "Subaru" },
      { id: 28, value: "Toyota" },
      { id: 29, value: "Volkswagen" },
      { id: 30, value: "Volvo" },
      { id: 31, value: "Alfa Romeo" },
      { id: 32, value: "FIAT" },
      { id: 33, value: "Freightliner" },
      { id: 34, value: "Maserati" },
      { id: 35, value: "Tesla" },
      { id: 36, value: "Aston Martin" },
      { id: 37, value: "Bentley" },
      { id: 38, value: "Ferrari" },
      { id: 39, value: "Lamborghini" },
      { id: 40, value: "Lotus" },
      { id: 41, value: "McLaren" },
      { id: 42, value: "Rolls-Royce" },
      { id: 43, value: "smart" },
      { id: 44, value: "Scion" },
      { id: 45, value: "SRT" },
      { id: 46, value: "Suzuki" },
      { id: 47, value: "Fisker" },
      { id: 48, value: "Maybach" },
      { id: 49, value: "Mercury" },
      { id: 50, value: "Saab" },
      { id: 51, value: "HUMMER" },
      { id: 52, value: "Pontiac" },
      { id: 53, value: "Saturn" },
      { id: 54, value: "Isuzu" },
      { id: 55, value: "Panoz" },
      { id: 56, value: "Oldsmobile" },
      { id: 57, value: "Daewoo" },
      { id: 58, value: "Plymouth" },
      { id: 59, value: "Eagle" },
      { id: 60, value: "Geo" },
      { id: 61, value: "Daihatsu" },
    ];
    const DATA1 = [
      { id: 0, value: "Coupé" },
      { id: 1, value: "Berline" },
      { id: 2, value: "Compacte" },
      { id: 3, value: "Citadine" },
      { id: 4, value: "Cabriolet" },
      { id: 5, value: "Monospace" },
      { id: 6, value: "Utilitaire" },
      { id: 7, value: "SUV" },
      { id: 8, value: "Pick-up" },
      { id: 9, value: "Mini-fourgonnette" },
      { id: 10, value: "Roadster" },
    ];
    const filteredPosts = () => {
      if (search.length) {
        return DATA.filter((post) =>
          post.value.toUpperCase().includes(search.toUpperCase())
        );
      }
    };
    const Item = ({ title, onPress }) => (
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.item}>{title}</Text>
      </TouchableOpacity>
    );
    const renderItem = ({ item, index }) => (
      <View
        style={{
          borderRadius: 10,
          borderBottomWidth: 0.7,
          borderBottomColor: "grey",
        }}
      >
        <Item
          onPress={() => {
            setSelectedId(item.value),
              setSearch(item.value),
              setAnswer(item.value);
          }}
          title={item.value}
        />
      </View>
    );
    const filteredPosts1 = () => {
      if (search1.length) {
        return DATA1.filter((post) =>
          post.value.toUpperCase().includes(search1.toUpperCase())
        );
      }
    };
    const Item1 = ({ title, onPress }) => (
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.item}>{title}</Text>
      </TouchableOpacity>
    );
    const renderItem1 = ({ item, index }) => (
      <View
        style={{
          borderRadius: 10,
          borderBottomWidth: 0.7,
          borderBottomColor: "#fff",
          shadowColor: "#000",
        }}
      >
        <Item1
          onPress={() => {
            setSelectedId1(item.value),
              setSearch1(item.value),
              setAnswer(item.value);
          }}
          title={item.value}
        />
      </View>
    );
    const renderQuestio = () => {
      if (language === "content_AR") {
        return questions[currentQuestionIndex]?.part2_AR !== "null" ? (
          <Text style={styles.part2}>
            {questions[currentQuestionIndex]?.part2_AR}
          </Text>
        ) : null;
      } else if (language === "content_FR") {
        return questions[currentQuestionIndex]?.part2_FR !== "null" ? (
          <Text style={styles.part2}>
            {questions[currentQuestionIndex]?.part2_FR}
          </Text>
        ) : null;
      } else {
        return questions[currentQuestionIndex]?.part2_EN !== "null" ? (
          <Text style={styles.part2}>
            {questions[currentQuestionIndex]?.part2_EN}
          </Text>
        ) : null;
      }
    };
    const fetchData = async () => {
      var token = await AsyncStorage.getItem("UsertokenInfo");
      try {
        const result = await axios.get(`${Shared}/api/users/userInfo`, {
          headers: { token: token },
        });
        setUserName(
          (
            result.data[0].first_name.trim() +
            "_" +
            result.data[0].last_name.trim()
          ).trim()
        );
        setNot(result.data[0].notification);
        await axios
          .post(`${Shared}/api/users/getNameOfSpecificContract`, {
            contractId: selected_contract_id,
          })
          .then((result) => {
            //alert(lang)
            if (lang == "Francais")
              setContractName(
                result.data[0].title_FR.split(" ").join("_").trim()
              );
            else if (lang == "Arabe")
              setContractName(
                result.data[0].title_AR.split(" ").join("_").trim()
              );
            else
              setContractName(
                result.data[0].title_EN.split(" ").join("_").trim()
              );
          });
      } catch (error) {
        console.error(error, "lol");
      }
    };
  
    const rendercheckbox = () => {
      if (language === "content_AR") {
        return ["السيدة", "السيد"];
      } else if (language === "content_FR") {
        return ["Madame", "Monsieur"];
      } else if (language === "content_EN") {
        return ["madam", "sir"];
      }
    };
    const rendercheckbox1 = () => {
      if (language === "content_AR") {
        return ["سيدة", "السيد", "Celibataire"];
      } else if (language === "content_FR") {
        return ["Marié", "Divorcé", "Célibataire"];
      } else if (language === "content_EN") {
        return ["Marié", "Divorcé", "Celibataire"];
      }
    };
    const rendercheckbox2 = () => {
      if (language === "content_AR") {
        return ["SARL", "SUARL ", "SA"];
      } else if (language === "content_FR") {
        return ["SARL", "SUARL ", "SA"];
      } else if (language === "content_EN") {
        return ["Marié", "Divorcé", "Celibataire"];
      }
    };
    const rendercheckbox3 = () => {
      if (language === "content_AR") {
        return ["تبرعات", "خدمات"];
      } else if (language === "content_FR") {
        return ["Gratuit", "Payant"];
      } else if (language === "content_EN") {
        return ["Marié", "Divorcé", "Celibataire"];
      }
    };
    const rendercheckbox4 = () => {
      if (language === "content_AR") {
        return ["سيدة", "السيد", "Celibataire"];
      } else if (language === "content_FR") {
        return ["Villa", "Appartement", "Chambre"];
      } else if (language === "content_EN") {
        return ["Marié", "Divorcé", "Célibataire"];
      }
    };
    const rendercheckbox5 = () => {
      if (language === "content_AR") {
        return ["سيدة", "السيد", "Celibataire"];
      } else if (language === "content_FR") {
        return ["Locataire", "Propriétaire"];
      } else if (language === "content_EN") {
        return ["Marié", "Divorcé", "Celibataire"];
      }
    };
    const rendercheckbox6 = () => {
      if (language === "content_AR") {
        return ["سيدة", "السيد", "Celibataire"];
      } else if (language === "content_FR") {
        return ["Journalière", "Mensuelle", "Annuelle"];
      } else if (language === "content_EN") {
        return ["Marié", "Divorcé", "Celibataire"];
      }
    };
    const rendercheckbox7 = () => {
      if (language === "content_AR") {
        return ["الغازولين", "ديزل", "كهرباء", "هجين"];
      } else if (language === "content_FR") {
        return ["Essence", "Diesel", "Eléctrique", "Hybride"];
      } else if (language === "content_EN") {
        return ["Gasoline", "Diesel", "Electricity", "Hydrogen"];
      }
    };
    const rendercheckbox8 = () => {
      if (language === "content_AR") {
        return ["تجاري", "إداري"];
      } else if (language === "content_FR") {
        return ["Commercial", "Administratif"];
      } else if (language === "content_EN") {
        return ["Commercial", "Administrative"];
      }
    };
    const rendercheckbox9 = () => {
      if (language === "content_AR") {
        return ["فيلا", "غرفة", "شقة"];
      } else if (language === "content_FR") {
        return ["Villa", "Appartement", "Chambre"];
      } else if (language === "content_EN") {
        return ["Villa", "Apartment", "Room"];
      }
    };
    const rendercheckbox10 = () => {
      if (language === "content_AR") {
        return ["تجاري", "إداري"];
      } else if (language === "content_FR") {
        return [
          "Don (en matériel)",
          "Versement (en argent)",
          "Prestation de service",
        ];
      } else if (language === "content_EN") {
        return ["Don", "Payment", "Service delivery"];
      }
    };
    const getUser = async () => {
      var token = await AsyncStorage.getItem("UsertokenInfo");
      await axios
        .get(`${Shared}/api/users/userInfo`, {
          headers: { token: token },
        })
        .then(async (result) => {
          await getPreComputedAnswer(result.data[0].id);
          setUser_id(result.data[0].id);
        });
    };
    useLayoutEffect(() => {
      if (lang == undefined) {
        lang = choice;
        //alert(lang)
      }
      if (Savedanswers != undefined && Savedanswers.length > 0) {
        let Temp = [];
        Temp = Savedanswers.map((element) => {
          return element.content;
        });
        setAllAnswer(Temp);
        setCurrentQuestionIndex(Savedanswers.length);
      }
      getUser();
      fetchData();
      getQuestion();
    }, []);
    const SaveAnswser = (e) => {
      console.log(allAnswer, "this is the answers will be saved in database");
      console.log(currentQuestionIndex, "this is the current question ");
      console.log(initialQuestionId, "this is the id , ***");
      console.log(currentQuestionIndex, "this is the length of questions ");
      console.log(step, " **");
      e.preventDefault();
      axios
        .post(`${Shared}/api/contractType/addAnswersToAnswerTable`, {
          question: allAnswer,
          initialQuestionId: initialQuestionId,
          contracts_id: contracts_id,
          contract_types_id: selected_contract_id,
          questionsLength: questions.length,
        })
        .then((res) => {
          if (spinner == true || initialQuestionId == -1) {
            setSpinner(false);
            setTimeout(() => {}, 100);
            if (navigation.canGoBack()) {
              navigation.dispatch(e.data.action);
              draftContract();
            } else {
              navigation.navigate("drawer");
              draftContract();
            }
          }
        });
    };
    const draftContract = async () => {
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
          axios.get(`${Shared}/api/contracts/draft/${idUser}`).then((res) => {
            setdraftcontracts(res.data);
          });
        })
        .catch((error) => {
          console.error(error);
        });
    };
    useMemo(() => {
      BackHandler.addEventListener("hardwareBackPress", backButtonHandler);
      navigation.addListener("beforeRemove", SaveAnswser);
    }, [spinner]);
    useEffect(() => {
      return () => {
        navigation.removeListener("beforeRemove", () => {});
        BackHandler.removeEventListener("hardwareBackPress", () => {});
      };
    }, [navigation, initialQuestionId, allAnswer, spinner]);
    const SearchByid = (arr, n) => {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id == n) return true;
      }
      return false;
    };
    const getPreComputedAnswer = async (user_id) => {
      await axios
        .post(`${Shared}/api/users/getAllAnswerOfUser`, { user_id: user_id })
        .then((response) => {
          setComputedAsnwer(response.data);
        });
    };
    const isExsiste = (question, option, tag) => {
      for (let i = 0; i < computedAnswers.length; i++) {
        if (computedAnswers[i].question.toLowerCase() == question.toLowerCase()) {
          if (option == "double") {
            setAnswer(computedAnswers[i].answer);
          } else {
            console.log(questions[currentQuestionIndex - 1]);
            if (tag == "one") setAnswer(computedAnswers[i].answer);
            else setCustomInput(computedAnswers[i].answer);
          }
        }
      }
    };
  
    var a = [
      "",
      "Un ",
      "Deux ",
      "Trois ",
      "Quatre ",
      "Cinq ",
      "Six ",
      "Sept ",
      "Huit ",
      "Neuf ",
      "Dix ",
      "Onze ",
      "Douze ",
      "Treize ",
      "Quatorze ",
      "Quinze ",
      "Seize ",
      "Dix-sept",
      "Dix-huit",
      "Dix-neuf",
    ];
    var b = [
      "",
      "",
      "Vingt",
      "Trente",
      "Quarante",
      "Cinquante",
      "Soixante",
      "Soixante-dix",
      "Quatre-vingts",
      "Quatre-vingt-dix",
    ];
  
    function inWords(num) {
      if ((num = num.toString()).length > 9) return "overflow";
      let n = ("000000000" + num)
        .substr(-9)
        .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
      if (!n) return;
      var str = "";
      str +=
        n[1] != 0
          ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "crore "
          : "";
      str +=
        n[2] != 0
          ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "lakh "
          : "";
      str +=
        n[3] != 0
          ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "mille "
          : "";
      str +=
        n[4] != 0
          ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "cents "
          : "";
      str +=
        n[5] != 0
          ? (str != "" ? "et " : "") +
            (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) +
            ""
          : "";
      return str;
    }
  
    const zed = (content) => {
      setAnswer(inWords(content) + "dinars (" + content.toString() + " DT )");
    };
  
    const checkInputWithNumber = (str) => {
      for (let i = 0; i < str.length; i++) {
        if (str[i] < "0" || str[i] > "9") return false;
      }
      return true;
    };
    //Date
    const [selectedDate, setSelectedDate] = useState();
    console.log(selectedDate, "ddddddddddddddddddddddddddddddd");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
    const handleConfirm = (date) => {
      setSelectedDatee(date);
      setAnswer(moment(date).format("DD/MM/YYYY"));
      console.log(setSelectedDate(date), "The real Date ");
      hideDatePicker();
    };
    const onDateChange = () => {
      setAnswer(date.dates() + "/" + (date.month() + 1) + "/" + date.year());
    };
    const getQuestion = async () => {
      var id = selected_contract_id;
      try {
        const data = await axios.get(
          `${Shared}/api/contractTypeQuestions/${id}/${lang}`
        );
        if (data) {
          var l = data.data;
          console.log(l, "this is the questions");
          if (realId == 25) {
            l[2].content_FR = "Quelle est la date de votre Devis ?";
            l[5].content_FR = "Quel est le numéro de votre Devis ?";
            l[5].part2_FR = "";
            l[5].options = "number";
            l[7].content_FR = "Quelle est l’adresse du siége de votre client ?";
            l[7].part2_FR = "Rue, Gouvernorat, Code postal";
            l[7].options = "";
            l[6].content_FR = "Quelle est l’année du Devis ?";
          }
          setQuestions(l);
          if (id == 10 || id == 25) {
            setRequireRepeat(true);
          }
          console.log(Savedanswers, " this is the Sabed Question ");
          if (Savedanswers == undefined || Savedanswers.length == 0) {
            setQuestionId(data.data[0].id);
            setInitialQuestionId(data.data[0].id);
            console.log("Id Changed For The First Quetstion");
            setQuestionDate(data.data[0].date);
            //   alert(data.data[0].options)
            setOption(data.data[0].options);
            setExplain(data.data[0].explanation);
            settextArea(data.data[0].text_Area);
            if (data.data[0].options == "double") {
              isExsiste(data.data[0].content_FR, "double");
              isExsiste(data.data[1].content_FR, " ");
            } else {
              isExsiste(data.data[0].content_FR, data.data[0].options, "one");
              //isExsiste(questions[currentQuestionIndex+2].content_FR, questions[currentQuestionIndex+1].options)
            }
          } else {
            let Length = Savedanswers.length;
            //  alert(Length)
            console.log(data.data, "Spposed To Happended");
            console.log(data.data[Length], "Spposed To Happended");
            setQuestionId(data.data[Length].id);
            setInitialQuestionId(data.data[Length].id);
            setQuestionDate(data.data[Length].date);
            setOption(data.data[Length].options);
            setExplain(data.data[Length].explanation);
            settextArea(data.data[Length].text_Area);
  
            if (data.data[Length - 1].options == "double") {
              isExsiste(data.data[Length].content_FR, "double");
              isExsiste(data.data[Length + 1].content_FR, " ");
            } else {
              isExsiste(
                data.data[Length].content_FR,
                data.data[Length].options,
                "one"
              );
            }
          }
        }
      } catch (error) {
        console.log("there is an error while getting the questions", error);
      }
    };
    const generateContract = async () => {
      await axios.post(`${Shared}/api/contractType/fill/${contracts_id}`, {
        questions: questions,
      });
    };
    const AddQuestion = async (user_id, question, answer) => {
      let ans = computedAnswers.some(
        (item) => item.question.toLowerCase() == question.toLowerCase()
      );
      if (ans) {
        //Update
      } else {
        //ADD
        ans = Const.some((item) => item.toLowerCase() == question.toLowerCase());
        if (ans && answer.length > 0) {
          await axios
            .post(`${Shared}/api/users/addAnswer`, { user_id, question, answer })
            .then((response) => {
              if (response.data == "Added") console.log("Question Added");
              else console.log("There is a problem in adding");
            });
        }
      }
    };
  
    const dd = () => {
      // {selectedItem == ""
      // ? t("common:Gouv")
      // : t("common:Gouve")}
  
      // if ( selectedItem == "" && questionId == 18 || 129 || 114 || 132) {
      //   return t("common:Gouv")
      // } else
      // return t("common:Gouve")
  
      if (
        (selectedItem == "" && questionId == 18) ||
        questionId == 129 ||
        questionId == 114 ||
        questionId == 132
      ) {
        console.log("1");
        return t("common:pays");
      } else {
        console.log("2");
        return t("common:Gouv");
      }
  
      // {selectedItem == ""
      // ? questionId == 18 || 129 || 114 || 132
      //   ? t("common:pays")
      //   : t("common:Gouv")
      // : questionId == 18 || 129 || 114 || 132
      // ? t("common:pay")
      // : t("common:Gouve")}
    };
    const handleNext = async () => {
      setStep((prev) => prev + 1);
      let Add =
        questions[currentQuestionIndex].options != null &&
        questions[currentQuestionIndex].options.includes("double")
          ? 2
          : 1;
  
      if (
        number == 0 &&
        answer.length == 0 &&
        (questions[currentQuestionIndex].text_Area == "nukk" ||
          questions[currentQuestionIndex].text_Area == null ||
          questions[currentQuestionIndex].text_Area == "null")
      ) {
        console.log(questions[currentQuestionIndex], " this is the ");
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        setErrorMessage(t("common:errorm"));
        setBorderStatus(1);
        return;
      }
      if (number == 0 && customInput.length == 0 && option == "double") {
        //alert("Stopped")
        setErrorMessage(t("common:errorm"));
        console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC");
        setBorderStatusN(1);
        return;
      }
      if (!selectedItem && option == "selector") {
        console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
        setErrorMessage(t("common:errorm"));
        setBorderStatusN(1);
      }
      if (
        answer.length > 0 &&
        (questions[currentQuestionIndex].text_Area == "nukk" ||
          questions[currentQuestionIndex].text_Area == null ||
          questions[currentQuestionIndex].text_Area == "null") &&
        questions[currentQuestionIndex].options == "number" &&
        !checkInputWithNumber(answer)
      ) {
        setErrorMessage(t("common:onlynumbers"));
        setBorderStatus(1);
        return;
      }
      AddQuestion(user_id, questions[currentQuestionIndex].content_FR, answer);
      let ans1 = false;
      if (
        questions[currentQuestionIndex].date == true ||
        questions[currentQuestionIndex].date == "true"
      ) {
        if (answer.length == 0) {
          ans1 = true;
          setAnswer(text);
        }
      }
      if (answer.length == 0 && name.length > 0) {
        setNameArr(nameArr.concat([name]));
        setQuantityArr(quantityArr.concat([number]));
        setPriceArr(priceArr.concat([price]));
        setName("");
        setNumber(1);
        setPrice(0);
      } else if (customInput.length > 0) {
        setAllAnswer((prev) => {
          return prev.concat(answer, customInput);
        });
      } else {
        if (
          (selected_contract_id == 8 && questionId == 84 && answer.length > 0) ||
          (language != "Francais" &&
            selected_contract_id == 8 &&
            questionId == 364)
        ) {
          let T = allAnswer;
          T.push(answer);
          T.push(engagement1);
          T.push(engagement2);
  
          setAllAnswer(T);
        } else setAllAnswer(allAnswer.concat([ans1 ? text : answer]));
      }
      if (justText >= 1) setRepeatQuestion(justText);
      if (currentQuestionIndex + 1 < questions.length - 1) {
        if (
          questions[currentQuestionIndex + 1].content_FR ==
          "Quel est votre gouvernorat ?"
        ) {
          setShowSelecter(true);
        }
      }
      if (currentQuestionIndex - 1 > 0) {
        if (
          questions[currentQuestionIndex - 1].content_FR ==
          "Quel est votre gouvernorat ?"
        ) {
          setShowSelecter(false);
        }
      }
      /*
    if (not !== "true") {
      return setShowAlert(true);
   }
  */
  
      if (currentQuestionIndex == questions.length - 1) {
        //alert(contractName)
        setIsDisabled(true);
        setNextBtnText(<ActivityIndicator size="large" color="#fff" />); //change button text
        Animated.timing(progress, {
          toValue: currentQuestionIndex + 1,
          duration: 1000,
          useNativeDriver: false,
        }).start();
        xxx;
        try {
          let object = {
            content: ans1 ? text : answer,
            questions_id: questionId,
            contracts_id: contracts_id,
            contracts_contract_types_id: selected_contract_id,
          };
          var res = allAnswer;
          res.push(object.content);
          res = res.concat(nameArr);
          res = res.concat(quantityArr);
          res = res.concat(priceArr);
          //await axios.post(`${Shared}/api/answers/AddAnswers`, object);
          setQuestionId(questions[currentQuestionIndex].id);
          var Type = "";
          if (selected_contract_id == 10) Type = "facture";
          if (realId == 25) Type = "devis";
          if (selected_contract_id == 8) Type = "engagement";
          /***
           * Now When He get To The lsat Question Just Change The   Status In Databse To Archive
           *
           */
          var twoPages = false;
          console.log(allAnswer, " this is all Answer");
          console.log(res, "this is result");
          await axios
            .post(`${Shared}/api/contractType/fill/${selected_contract_id}`, {
              type: Type,
              initialQuestionId: initialQuestionId,
              contracts_id: selected_contract_id,
              questions: res,
              lang: lang == undefined ? choice : lang,
            })
            .then((res) => {
              twoPages = res.data;
            });
          let result = await axios.put(
            `${Shared}/api/contractType/updateImage/${contracts_id}`,
            {
              twoPages: Type == "" ? parseInt(twoPages) : Type,
              user_name: userName,
              contractName:
                Type == "facture" || Type == "devis"
                  ? Type
                  : contractName == "Achat / Vente"
                  ? "Achat_Vente"
                  : contractName,
            }
          );
          imageUri = result.data;
  
          console.log(imageUri, "this is the image uri");
          let pdfImage = imageUri.split("|")[1].split(",");
          setsendImageshare(pdfImage);
          imageUri = imageUri.split("|")[0].split(",");
          // setsendImagesend(imageUri)
          console.log(contractName, "COMP", userName, "QUESSTIOn");
          navigation.navigate("ViewGeneratedContract", {
            contractName,
            contracts_id,
            imageUri,
            pdfImage,
            user_name: userName,
            imageshare,
            imagesend,
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        if (currentQuestionIndex + Add >= questions.length) {
          Add = 1;
        }
        if (option == "singleNumber") {
          let temp = allAnswer;
          temp.push(number);
          setAllAnswer(temp);
        }
        setCurrentQuestionIndex(currentQuestionIndex + Add);
        setQuestionDate(questions[currentQuestionIndex + Add].date);
        setOption(questions[currentQuestionIndex + Add].options);
        setExplain(questions[currentQuestionIndex + Add].explanation);
        settextArea(questions[currentQuestionIndex + Add].text_Area);
        setIsOptionsDisabled(false);
        setShowNextButton(true);
        setChecked1("");
        setChecked2("");
        setChecked3("");
        setChecked4("");
        Animated.timing(progress, {
          toValue: currentQuestionIndex + 1,
          duration: 1000,
          useNativeDriver: false,
        }).start();
        /*
  use allAnswer When You pop Of something you just if this defined then means he want to change it 
  keep varible to tag the first id of the question ; 
  */
        try {
          console.log(
            questionId,
            " ",
            questionId - didGoBack,
            "**** ",
            didGoBack,
            " ****",
            allAnswer.length,
            " ***",
            currentQuestionIndex
          );
          console.log(allAnswer);
          if (
            (questions[currentQuestionIndex].options == "double" ||
              questions[currentQuestionIndex].options == "doubleReverse" ||
              questions[currentQuestionIndex].options == "doubleInput") &&
            allAnswer[currentQuestionIndex] != "***"
          ) {
            let Temp = allAnswer;
            Temp.push(answer);
            setAllAnswer(Temp);
          }
          if (allAnswer[currentQuestionIndex] == "***") {
            if (
              currentQuestionIndex >= 0 &&
              questions[currentQuestionIndex].options != null &&
              questions[currentQuestionIndex].options.includes("double") &&
              allAnswer[currentQuestionIndex] == "***"
            ) {
              setQuestionId(questions[currentQuestionIndex + Add].id);
              let Temp = allAnswer;
              Temp[currentQuestionIndex] = answer;
              Temp[currentQuestionIndex + 1] = customInput;
              setAllAnswer(Temp);
            } else {
              if (questions[currentQuestionIndex].options == "doubleNumber") {
                let Temp = allAnswer;
                Temp.push(number);
                Temp.push(number1);
                setAllAnswer(Temp);
                /*
                await axios.post(`${Shared}/api/answers/updateAnswer`, {
                  content: number,
                  questions_id: initialQuestionId + currentQuestionIndex,
                });
                */
              } else {
                /*
                await axios.post(`${Shared}/api/answers/updateAnswer`, {
                  content: ans1 ? text : answer,
                  questions_id: initialQuestionId + currentQuestionIndex,
                });
                */
                let Temp = allAnswer;
                Temp.pop();
                Temp.push(answer);
                setAllAnswer(Temp);
              }
              setQuestionId(questions[currentQuestionIndex + Add].id);
              if (Staty == false) {
                setStaty(true);
              }
              setDidGoBack((prev) => prev - 1);
            }
          } else {
            if (questions[currentQuestionIndex].options == "doubleNumber") {
              let object = {
                content: number,
                questions_id: questionId,
                contracts_id: contracts_id,
                contracts_contract_types_id: selected_contract_id,
              };
              let object1 = {
                content: number1,
                questions_id: questionId + 1,
                contracts_id: contracts_id,
                contracts_contract_types_id: selected_contract_id,
              };
              //await axios.post(`${Shared}/api/answers/AddAnswers`, object);
              //await axios.post(`${Shared}/api/answers/AddAnswers`, object1);
              let Temp = allAnswer;
              Temp.push(number);
              setQuestionId;
              Temp.push(number1);
              setAllAnswer(Temp);
              setQuestionId(questions[currentQuestionIndex + Add].id);
            } else {
              let object = {
                content: ans1 ? text : answer,
                questions_id: questionId,
                contracts_id: contracts_id,
                contracts_contract_types_id: selected_contract_id,
              };
              if (textArea == "selector")
                object.content = allAnswer[allAnswer.length - 1];
              //await axios.post(`${Shared}/api/answers/AddAnswers`, object);
              if (customInput.length > 0) {
                let object = {
                  content: customInput,
                  questions_id: questionId + 1,
                  contracts_id: contracts_id,
                  contracts_contract_types_id: selected_contract_id,
                };
                let Temp = allAnswer;
                Temp.push(customInput);
                setAllAnswer(Temp);
  
                //await axios.post(`${Shared}/api/answers/AddAnswers`, object);
              }
              setQuestionId(questions[currentQuestionIndex + Add].id);
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
      setAnswer("");
      setCustomInput("");
      setBorderStatus(0);
      setNumber1(0);
      setNumber(0);
      setselectedItem("");
      if (questions[currentQuestionIndex + 1].options == "double") {
        console.log(
          questions[currentQuestionIndex + 1],
          "********* ",
          questions[currentQuestionIndex + 2]
        );
        isExsiste(questions[currentQuestionIndex + 1].content_FR, "double");
        isExsiste(
          questions[currentQuestionIndex + 2].content_FR,
          questions[currentQuestionIndex + 2].options
        );
      } else {
        if (questions[currentQuestionIndex].options == "double") {
          isExsiste(questions[currentQuestionIndex + 2].content_FR, "", "one");
        } else
          isExsiste(questions[currentQuestionIndex + 1].content_FR, "", "one");
      }
      Animated.timing(progress, {
        toValue: currentQuestionIndex + 1,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    };
    const xxx = () => {
      /* 
  when he chose the number of product i wiil push special caractere to the 
  array to mark if im at that caractere then put the page that has name
  and quantity and producy
  */
      if (repeateQuestion >= 1 && selected_contract_id == 10) {
        var arr = questions.slice(0, 9);
        var arr1 = [
          {
            content_FR: "Quelle lle est l’adresse de votre société?",
            date: "n",
            explanation: "n",
            id: 104,
            options: null,
            part2_AR: "n",
            part2_EN: "n",
            part2_FR: "Rue, gouvernorat et code postal",
            text_Area: null,
          },
          {
            content_FR: "Quelle est la Matricule Fiscale de votre société ?",
            date: "n",
            explanation: "n",
            id: 105,
            options: null,
            part2_AR: "n",
            part2_EN: "n",
            part2_FR: "Le fourniseur",
            text_Area: null,
          },
        ];
        // if (realId == 25)
        //   arr1[arr1.length - 1].content_FR = "Quel est la somme du Devis ?";
        //Veuillez écrire le montant total de votre devis En lettres
        arr1[arr1.length - 1].part2_FR = "";
        console.log(arr1, "Herte");
        for (let i = 0; i < repeateQuestion; i++) {
          arr.push({
            content_FR: `Produit ${i + 1}`,
            date: "n",
            explanation: "",
            id: 108 + i,
            options: null,
            part2_AR: "n",
            part2_EN: "n",
            part2_FR: null,
            text_Area: "null",
            special: 1,
          });
        }
        /*
  for (let i = 0 ; i< repeateQuestion  ; i++){
  arr.push({
      "content_FR": "Insérez le nom de votre produit "+ (i+1).toString() + " ?",
      "date": "n",
      "explanation": "n",
      "id": 108+i,
      "options": null,
      "part2_AR": "n",
      "part2_EN": "n",
      "part2_FR": "n",
      "text_Area": "null",
  })
  }
  for (let i = 0 ; i< repeateQuestion  ; i++){
    arr.push({
      "content_FR": "Insérez la quantité de ce produit "+ (i+1).toString() + " ?",
        "date": "n",
        "explanation": "n",
        "id": 108+repeateQuestion+i,
        "options": null,
        "part2_AR": "n",
        "part2_EN": "n",
        "part2_FR": "n",
        "text_Area": "null",
    })
    }
    for (let i = 0 ; i< repeateQuestion  ; i++){
      arr.push({
        "content_FR": "Insérez le prix du produit "+ (i+1).toString() + " ?",
          "date": "n",
          "explanation": "n",
          "id": 108+(repeateQuestion*2)+i,
          "options": null,
          "part2_AR": "n",
          "part2_EN": "n",
          "part2_FR": "n",
          "text_Area": "null", 
      })
      }
      */
        arr = arr.concat(arr1);
        setRepeatQuestion(0);
        setQuestions(arr);
      }
      if (language === "content_AR") {
        return questions[currentQuestionIndex]?.content_AR;
      } else if (language === "content_FR") {
        return questions[currentQuestionIndex]?.content_FR;
      } else {
        return questions[currentQuestionIndex]?.content_EN;
      }
    };
    const renderQuestion = () => {
      return (
        <View
          style={{
            marginVertical: 40,
          }}
        >
          {/* Question Counter */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              marginBottom: "10%",
            }}
          >
            <Text
              style={{
                color: "blue",
                fontSize: 20,
                opacity: 0.6,
                marginRight: 2,
                marginTop: 20,
                marginLeft: 20,
                fontFamily: "Gothic",
              }}
              ref={numberRef}
            >
              {currentQuestionIndex + 1}
            </Text>
            <Text
              style={{
                color: "#1C6AE4",
                fontSize: 15,
                opacity: 0.6,
                fontFamily: "Gothic",
              }}
            >
              / {questions.length}
            </Text>
          </View>
          {/* Question */}
          <Text style={styles.question}>{xxx()}</Text>
          <Text style={styles.part2}>{renderQuestio()} </Text>
          <Text></Text>
          <Text>
            <AwesomeAlert
              show={showAlert1}
              showProgress={false}
              messageStyle={{ textAlign: "center" }}
              title={t("common:Explanation")}
              message={explanation}
              closeOnTouchOutside={true}
              showConfirmButton={true}
              confirmText="OK"
              confirmButtonColor="#1C6AE4"
              onConfirmPressed={() => {
                setShowAlert1(false);
              }}
            />
          </Text>
        </View>
      );
    };
    const clearAnswers = () => {
      setAnswer("");
      setDate("--/--/----");
      setOption("");
      settextArea("");
    };
    const goBack = () => {
      /****
       * TODO:
       * Check if the prev-1 question is double is true then pop twice and -2 to all States
       *
       *
       */
      if (questions[currentQuestionIndex - 1]?.special == 1) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        setQuestionDate(questions[currentQuestionIndex - 1].date);
        setOption(questions[currentQuestionIndex - 1].options);
        setExplain(questions[currentQuestionIndex - 1].explanation);
        settextArea(questions[currentQuestionIndex - 1].text_Area);
        setAnswer(allAnswer[allAnswer.length - 1]);
        let Temp = nameArr;
        let Temp1 = quantityArr;
        let Temp2 = priceArr;
        Temp.pop();
        Temp1.pop();
        Temp2.pop();
        setNameArr(Temp);
        setQuantityArr(Temp1);
        setPriceArr(Temp2);
      }
      if (
        currentQuestionIndex - 2 >= 0 &&
        questions[currentQuestionIndex - 2].options != null &&
        questions[currentQuestionIndex - 2].options.includes("double")
      ) {
        setCurrentQuestionIndex(currentQuestionIndex - 2);
        setQuestionDate(questions[currentQuestionIndex - 2].date);
        setOption(questions[currentQuestionIndex - 2].options);
        setExplain(questions[currentQuestionIndex - 2].explanation);
        settextArea(questions[currentQuestionIndex - 2].text_Area);
        setAnswer(allAnswer[allAnswer.length - 2]);
        console.log(currentQuestionIndex, " ", allAnswer.length);
        let Temp = allAnswer;
        //  Temp.pop()
        Temp.pop();
        Temp.pop();
  
        console.log(Temp);
        setAllAnswer(Temp);
        if (didGoBack == -1) setDidGoBack(1);
        else setDidGoBack(didGoBack + 1);
      } else {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        setQuestionDate(questions[currentQuestionIndex - 1].date);
        setOption(questions[currentQuestionIndex - 1].options);
        setExplain(questions[currentQuestionIndex - 1].explanation);
        settextArea(questions[currentQuestionIndex - 1].text_Area);
        setAnswer(allAnswer[allAnswer.length - 1]);
        console.log(currentQuestionIndex, " ", allAnswer.length);
        let Temp = allAnswer;
        //  Temp.pop()
        Temp.pop();
        console.log(Temp);
        setAllAnswer(Temp);
        if (didGoBack == -1) setDidGoBack(1);
        else setDidGoBack(didGoBack + 1);
      } /*
  GoBack means That I will Change My First Answer Right  
  I have TwO Choiches 
  */
      setShowNextButton(true);
      Animated.timing(progress, {
        toValue: currentQuestionIndex - 1,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    };
    const oneclick = () => {
      if (checked1) {
        setChecked1(!checked1);
      } else if (checked2) {
        setChecked2(!checked2);
      } else if (checked3) {
        setChecked3(!checked3);
      } else if (checked4) {
        setChecked4(!checked4);
      }
    };
  
    const customPart2 = () => {
      if (language === "content_AR") {
        return questions[currentQuestionIndex]?.part2_AR !== "null" ? (
          <Text
            style={{
              fontSize: 15,
              color: "grey",
              marginHorizontal: "6%",
              fontFamily: "Gothic",
              paddingBottom: "15%",
            }}
          >
            {questions[currentQuestionIndex]?.part2_AR}
          </Text>
        ) : null;
      } else if (language === "content_FR") {
        return questions[currentQuestionIndex]?.part2_FR !== "null" ? (
          <Text
            style={{
              fontSize: 15,
              color: "grey",
              marginHorizontal: "6%",
              fontFamily: "Gothic",
              paddingBottom: "15%",
            }}
          >
            {questions[currentQuestionIndex]?.part2_FR}
          </Text>
        ) : null;
      } else {
        return questions[currentQuestionIndex]?.part2_EN !== "null" ? (
          <Text
            style={{
              fontSize: 15,
              color: "grey",
              marginHorizontal: "6%",
              fontFamily: "Gothic",
              paddingBottom: "15%",
            }}
          >
            {questions[currentQuestionIndex]?.part2_EN}
          </Text>
        ) : null;
      }
    };
  
    const renderView = () => {
      if (textArea == "words") {
        return (
          <View>
            <TextInput
              style={[
                styles.input,
                {
                  borderBottomColor: borderStatus > 0 ? "red" : "black",
                },
              ]}
              onFocus={() => {
                if (borderStatus > 0) setBorderStatus(0);
              }}
              onChangeText={(content) => zed(content)}
              placeholder={t("common:typeHere")}
            />
          </View>
        );
      }
  
      if (option == "singleNumber") {
        return (
          <View style={{ justifyContent: "center", marginTop: -30 }}>
            <View
              style={{
                marginHorizontal: -3,
                marginVertical: "1%",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (number > 1) {
                    setNumber(number - 1);
                  }
                }}
              >
                <View
                  style={{
                    position: "static",
                    marginRight: 20,
                    backgroundColor: "#1C6AE4",
                    height: 50,
                    width: 50,
                    borderRadius: 50,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "800",
                    }}
                  >
                    -
                  </Text>
                </View>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 20,
                }}
              >
                {number}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setNumber(number + 1);
                }}
              >
                <View
                  style={{
                    marginLeft: 20,
                    backgroundColor: "#1C6AE4",
                    height: 50,
                    width: 50,
                    borderRadius: 50,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "800",
                    }}
                  >
                    +
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        );
      }
  
      if (option == "doubleNumber") {
        return (
          <View style={{ justifyContent: "center", marginTop: -30 }}>
            <View
              style={{
                marginHorizontal: -3,
                marginVertical: "1%",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (number > 1) {
                    setNumber(number - 1);
                  }
                }}
              >
                <View
                  style={{
                    position: "static",
                    marginRight: 20,
                    backgroundColor: "#dbddde",
                    height: 50,
                    width: 50,
                    borderRadius: 50,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "800",
                    }}
                  >
                    -
                  </Text>
                </View>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 20,
                }}
              >
                {number}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setNumber(number + 1);
                }}
              >
                <View
                  style={{
                    marginLeft: 20,
                    backgroundColor: "#dbddde",
                    height: 50,
                    width: 50,
                    borderRadius: 50,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "800",
                    }}
                  >
                    +
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                marginBottom: "10%",
                paddingBottom: "1%",
              }}
            >
              <Text
                style={{
                  color: "blue",
                  fontSize: 20,
                  opacity: 0.6,
                  marginRight: 2,
                  marginTop: 20,
                  marginLeft: 20,
                  fontFamily: "Gothic",
                }}
              >
                {currentQuestionIndex + 2}
              </Text>
              <Text
                style={{
                  color: "#1C6AE4",
                  fontSize: 15,
                  opacity: 0.6,
                  fontFamily: "Gothic",
                }}
              >
                / {questions.length}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 20,
                paddingBottom: "1%",
                color: "black",
                marginHorizontal: "5%",
                fontFamily: "Gothic_Bold",
              }}
            >
              {questions[currentQuestionIndex + 1].content_FR}
            </Text>
            {customPart2()}
  
            <View
              style={{
                marginHorizontal: 20,
                marginVertical: "1%",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                paddingBottom: "9%",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (number1 > 1) {
                    setNumber1(number1 - 1);
                  }
                }}
              >
                <View
                  style={{
                    position: "static",
                    marginRight: 20,
                    backgroundColor: "#dbddde",
                    height: 50,
                    width: 50,
                    borderRadius: 50,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "800",
                    }}
                  >
                    -
                  </Text>
                </View>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 20,
                }}
              >
                {number1}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setNumber1(number1 + 1);
                }}
              >
                <View
                  style={{
                    marginLeft: 20,
                    backgroundColor: "#dbddde",
                    height: 50,
                    width: 50,
                    borderRadius: 50,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "800",
                    }}
                  >
                    +
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        );
      }
  
      if (
        (selected_contract_id == 8 && questionId == 84) ||
        (language != "Francais" && selected_contract_id == 8 && questionId == 364)
      ) {
        return (
          <View stlye={{}}>
            <View
              style={{
                marginBottom: "10%",
                paddingBottom: 10,
              }}
            >
              <TextInput
                style={[
                  {
                    marginHorizontal: 20,
                    borderBottomWidth: 1,
                    borderBottomColor: "black",
                    padding: 5,
                    fontSize: 20,
                    borderRadius: 10,
                    marginVertical: "1%",
                    position: "relative",
                    fontFamily: "Gothic",
                    borderBottomColor: borderStatus > 0 ? "red" : "black",
                  },
                ]}
                onFocus={() => {
                  if (borderStatus > 0) setBorderStatus(0);
                }}
                onChangeText={(content) => {
                  setAnswer(content);
                }}
                value={answer}
                placeholder={
                  lang == "Francais"
                    ? t("common:engagementFr")
                    : t("common:engagementAr")
                }
              />
              <Text
                style={{
                  display: borderStatus > 0 ? "flex" : "none",
                  marginLeft: "10%",
                  fontFamily: "Gothic_Bold",
                  color: "red",
                }}
              >
                {errorMessage}
              </Text>
            </View>
            <View
              style={{
                marginBottom: "10%",
                paddingBottom: 10,
              }}
            >
              <TextInput
                style={[
                  {
                    marginHorizontal: 20,
                    borderBottomWidth: 1,
                    borderBottomColor: "black",
                    padding: 5,
                    fontSize: 20,
                    borderRadius: 10,
                    marginVertical: "1%",
                    position: "relative",
                    fontFamily: "Gothic",
                    borderBottomColor: "black",
                  },
                ]}
                onFocus={() => {
                  if (borderStatus > 0) setBorderStatus(0);
                }}
                onChangeText={(content) => {
                  setEngagement1(content);
                }}
                value={engagement1}
                placeholder={
                  lang == "Francais"
                    ? t("common:engagementFr")
                    : t("common:engagementAr")
                }
              />
              <Text
                style={{
                  display: borderStatus > 0 ? "flex" : "none",
                  marginLeft: "10%",
                  fontFamily: "Gothic_Bold",
                  color: "red",
                }}
              ></Text>
            </View>
  
            <View
              style={{
                paddingBottom: 30,
              }}
            >
              <TextInput
                style={[
                  {
                    marginHorizontal: 20,
                    borderBottomWidth: 1,
                    borderBottomColor: "black",
                    padding: 5,
                    fontSize: 20,
                    borderRadius: 10,
                    marginVertical: "1%",
                    position: "relative",
                    fontFamily: "Gothic",
                    borderBottomColor: borderStatus > 0 ? "red" : "black",
                  },
                ]}
                onFocus={() => {
                  if (borderStatus > 0) setBorderStatus(0);
                }}
                onChangeText={(content) => {
                  setEngagement2(content);
                }}
                value={engagement2}
                placeholder={
                  lang == "Francais"
                    ? t("common:engagementFr")
                    : t("common:engagementAr")
                }
              />
              <Text
                style={{
                  display: borderStatus > 0 ? "flex" : "none",
                  marginLeft: "10%",
                  fontFamily: "Gothic_Bold",
                  color: "red",
                }}
              ></Text>
            </View>
          </View>
        );
      }
      if (
        questions[currentQuestionIndex]?.special == 1 &&
        selected_contract_id == 10
      ) {
        console.log("We made it");
        return (
          <View style={{ justifyContent: "center", marginTop: -70 }}>
            <Text style={{ marginLeft: 20, fontSize: 20, color: "black" }}>
              Nom du Produit{" "}
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={(content) => setName(content)}
              value={name}
              placeholder={t("common:typeHere")}
            />
            <Text style={{ marginLeft: 20, fontSize: 20, color: "black" }}>
              Quantité du produit{" "}
            </Text>
  
            <View
              style={{
                marginHorizontal: 20,
                marginVertical: "10%",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (number > 1) {
                    setNumber(number - 1);
                  }
                }}
              >
                <View
                  style={{
                    position: "static",
                    marginRight: 20,
                    backgroundColor: "#1C6AE4",
                    height: 50,
                    width: 50,
                    borderRadius: 50,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "800",
                    }}
                  >
                    -
                  </Text>
                </View>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 20,
                }}
              >
                {number}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setNumber(number + 1);
                }}
              >
                <View
                  style={{
                    marginLeft: 20,
                    backgroundColor: "#1C6AE4",
                    height: 50,
                    width: 50,
                    borderRadius: 50,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "800",
                    }}
                  >
                    +
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <Text style={{ marginLeft: 20, fontSize: 20, color: "black" }}>
              Prix du Produit{" "}
            </Text>
            <Text style={[styles.part2, { marginRight: 10 }]}>
              {" "}
              Prix unitaire HT
            </Text>
  
            <TextInput
              style={styles.input}
              onChangeText={(content) => setPrice(content)}
              value={price}
              placeholder={t("common:typeHere")}
            />
          </View>
        );
      }
  
      /***
   * 
  TODO: 
  *Separete the two input int double option
  *make the Backend Function convert to true forme 
  *PopUp in Share Contract
  - Fix the function that add answer automatecly 
   */
      if (option != null && option == "doubleReverse") {
        return (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignContent: "center",
              marginTop: -60,
            }}
          >
            <View>
              <TextInput
                style={[
                  {
                    marginHorizontal: 20,
                    borderBottomWidth: 1,
                    borderBottomColor: "red",
                    padding: 5,
                    fontSize: 20,
                    borderRadius: 10,
                    marginVertical: "1%",
                    position: "relative",
                    fontFamily: "Gothic",
                    borderBottomColor: borderStatus > 0 ? "red" : "black",
                  },
                ]}
                onFocus={() => {
                  if (borderStatus > 0) setBorderStatus(0);
                }}
                onChangeText={(content) => {
                  setAnswer(content);
                }}
                value={answer}
                placeholder={t("common:typeHere")}
              />
              <Text
                style={{
                  display: borderStatus > 0 ? "flex" : "none",
                  marginLeft: "10%",
                  fontFamily: "Gothic_Bold",
                  color: "red",
                }}
              >
                {errorMessage}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                marginBottom: "10%",
                paddingBottom: "5%",
              }}
            >
              <Text
                style={{
                  color: "blue",
                  fontSize: 20,
                  opacity: 0.6,
                  marginRight: 2,
                  marginTop: 20,
                  marginLeft: 20,
                  fontFamily: "Gothic",
                }}
              >
                {currentQuestionIndex + 2}
              </Text>
              <Text
                style={{
                  color: "#1C6AE4",
                  fontSize: 15,
                  opacity: 0.6,
                  fontFamily: "Gothic",
                }}
              >
                / {questions.length}
              </Text>
            </View>
            <View style={{ alignItems: "center", marginTop: -30 }}>
              <TouchableOpacity
                style={{
                  borderWidth: 3,
                  borderColor: checked1 ? "#00C851" : "#1E90FF" + "40",
                  backgroundColor: "#1E90FF" + "20",
                  height: 60,
                  borderRadius: 10,
                  width: "90%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 20,
                  marginVertical: 10,
                }}
                onPress={() => {
                  setChecked1(!checked1);
                  setCustomInput(rendercheckbox2()[0]);
                  oneclick();
                }}
              >
                <Text style={{ fontSize: 20, color: "black" }}>
                  {rendercheckbox2()[0]}
                </Text>
                {checked1 ? (
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 30 / 2,
                      backgroundColor: "#00C851",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <MaterialCommunityIcons
                      name="check"
                      style={{
                        color: "#fff",
                        fontSize: 20,
                      }}
                    />
                  </View>
                ) : null}
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderWidth: 3,
                  borderColor: checked2 ? "#00C851" : "#1E90FF" + "40",
                  backgroundColor: "#1E90FF" + "20",
                  height: 60,
                  borderRadius: 10,
                  width: "90%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 20,
                  marginVertical: 10,
                }}
                onPress={() => {
                  setChecked2(!checked2);
                  setCustomInput(rendercheckbox2()[1]);
                  oneclick();
                }}
              >
                <Text style={{ fontSize: 20, color: "black" }}>
                  {rendercheckbox2()[1]}
                </Text>
                {checked2 ? (
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 30 / 2,
                      backgroundColor: "#00C851",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <MaterialCommunityIcons
                      name="check"
                      style={{
                        color: "#fff",
                        fontSize: 20,
                      }}
                    />
                  </View>
                ) : null}
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderWidth: 3,
                  borderColor: checked3 ? "#00C851" : "#1E90FF" + "40",
                  backgroundColor: "#1E90FF" + "20",
                  height: 60,
                  borderRadius: 10,
                  width: "90%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 20,
                  marginVertical: 10,
                }}
                onPress={() => {
                  setChecked3(!checked3);
                  setCustomInput(rendercheckbox2()[2]);
                  oneclick();
                }}
              >
                <Text style={{ fontSize: 20, color: "black" }}>
                  {rendercheckbox2()[2]}
                </Text>
                {checked3 ? (
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 30 / 2,
                      backgroundColor: "#00C851",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <MaterialCommunityIcons
                      name="check"
                      style={{
                        color: "#fff",
                        fontSize: 20,
                      }}
                    />
                  </View>
                ) : null}
              </TouchableOpacity>
            </View>
          </View>
        );
      }
      if (option != null && option.includes("double")) {
        return (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignContent: "center",
              marginTop: -40,
            }}
          >
            {option == "doubleInput" ? (
              <View>
                <TextInput
                  style={[
                    {
                      marginHorizontal: 20,
                      borderBottomWidth: 1,
                      borderBottomColor: "red",
                      padding: 5,
                      fontSize: 20,
                      borderRadius: 10,
                      marginVertical: "1%",
                      position: "relative",
                      fontFamily: "Gothic",
                      borderBottomColor: borderStatus > 0 ? "red" : "black",
                    },
                  ]}
                  onFocus={() => {
                    if (borderStatus > 0) setBorderStatus(0);
                  }}
                  onChangeText={(content) => {
                    setAnswer(content);
                  }}
                  value={answer}
                  placeholder={t("common:typeHere")}
                />
                <Text
                  style={{
                    display: borderStatus > 0 ? "flex" : "none",
                    marginLeft: "10%",
                    fontFamily: "Gothic_Bold",
                    color: "red",
                  }}
                >
                  {errorMessage}
                </Text>
              </View>
            ) : (
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  style={{
                    borderWidth: 3,
                    borderColor: checked1 ? "#00C851" : "#1E90FF" + "40",
                    backgroundColor: "#1E90FF" + "20",
                    height: 60,
                    borderRadius: 10,
                    width: "87%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                    marginVertical: 10,
                  }}
                  onPress={() => {
                    setChecked1(!checked1);
                    setAnswer(rendercheckbox()[0]);
                    oneclick();
                  }}
                >
                  <Text style={{ fontSize: 20, color: "black" }}>
                    {rendercheckbox()[0]}
                  </Text>
  
                  {checked1 ? (
                    <View
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 30 / 2,
                        backgroundColor: "#00C851",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <MaterialCommunityIcons
                        name="check"
                        style={{
                          color: "#fff",
                          fontSize: 20,
                        }}
                      />
                    </View>
                  ) : null}
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderWidth: 3,
                    borderColor: checked2 ? "#00C851" : "#1E90FF" + "40",
                    backgroundColor: "#1E90FF" + "20",
                    height: 60,
                    borderRadius: 10,
                    width: "87%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                    marginVertical: 10,
                  }}
                  onPress={() => {
                    setChecked2(!checked2);
                    setAnswer(rendercheckbox()[1]);
                    oneclick();
                  }}
                >
                  <Text style={{ fontSize: 20, color: "black" }}>
                    {rendercheckbox()[1]}
                  </Text>
                  {checked2 ? (
                    <View
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 30 / 2,
                        backgroundColor: "#00C851",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <MaterialCommunityIcons
                        name="check"
                        style={{
                          color: "#fff",
                          fontSize: 20,
                        }}
                      />
                    </View>
                  ) : null}
                </TouchableOpacity>
              </View>
            )}
            {/* Question Counter */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                marginBottom: "10%",
              }}
            >
              <Text
                style={{
                  color: "blue",
                  fontSize: 20,
                  opacity: 0.6,
                  marginRight: 2,
                  marginTop: 20,
                  marginLeft: 20,
                  fontFamily: "Gothic",
                }}
              >
                {currentQuestionIndex + 2}
              </Text>
              <Text
                style={{
                  color: "#1C6AE4",
                  fontSize: 15,
                  opacity: 0.6,
                  fontFamily: "Gothic",
                }}
              >
                / {questions.length}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 20,
                color: "black",
                marginHorizontal: "5%",
                fontFamily: "Gothic_Bold",
              }}
            >
              {questions[currentQuestionIndex + 1].content_FR}
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderBottomColor: borderStatusN > 0 ? "red" : "black",
                },
              ]}
              onFocus={() => {
                if (borderStatusN > 0) setBorderStatusN(0);
              }}
              onChangeText={(content) => {
                setCustomInput(content);
              }}
              value={customInput}
              placeholder={t("common:typeHere")}
            />
            <Text
              style={{
                display: borderStatusN > 0 ? "flex" : "none",
                bottom: 29,
                marginLeft: "10%",
                fontFamily: "Gothic_Bold",
                color: "red",
              }}
            >
              {errorMessage}
            </Text>
          </View>
        );
      }
      if (option === "civilite") {
        return (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginTop: -30,
            }}
          >
            <TouchableOpacity
              style={{
                borderWidth: 3,
                borderColor: checked1 ? "#00C851" : "#1E90FF" + "40",
                backgroundColor: "#1E90FF" + "20",
                height: 60,
                borderRadius: 10,
                width: "90%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginVertical: 10,
              }}
              onPress={() => {
                setChecked1(!checked1);
                setAnswer(rendercheckbox()[0]);
                oneclick();
              }}
            >
              <Text style={{ fontSize: 20, color: "black" }}>
                {rendercheckbox()[0]}
              </Text>
              {checked1 ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    backgroundColor: "#00C851",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="check"
                    style={{
                      color: "#fff",
                      fontSize: 20,
                    }}
                  />
                </View>
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderWidth: 3,
                borderColor: checked2 ? "#00C851" : "#1E90FF" + "40",
                backgroundColor: "#1E90FF" + "20",
                height: 60,
                borderRadius: 10,
                width: "90%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginVertical: 10,
              }}
              onPress={() => {
                setChecked2(!checked2);
                setAnswer(rendercheckbox()[1]);
                oneclick();
              }}
            >
              <Text style={{ fontSize: 20, color: "black" }}>
                {rendercheckbox()[1]}
              </Text>
              {checked2 ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    backgroundColor: "#00C851",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="check"
                    style={{
                      color: "#fff",
                      fontSize: 20,
                    }}
                  />
                </View>
              ) : null}
            </TouchableOpacity>
          </View>
        );
      } else if (
        selected_contract_id == 14 &&
        questionId == 4 &&
        language === "Francais"
      ) {
      } else if (option == "demande") {
        return (
          <>
            <TextInput
              onFocus={() => {
                if (borderStatus > 0) setBorderStatus(0);
              }}
              value={search1}
              placeholder="Demande de "
              style={styles.input}
              shadowColor="#282828"
              onChangeText={(newText) => setAnswer(newText)}
            />
          </>
        );
      } else if (option === "cartype") {
        return (
            <>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
  
                paddingHorizontal: 15,
                paddingBottom: 20,
              }}
            >
              <PickerModal
                renderSelectView={(disabled, selected, showModal) => (
                  <>
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity
                          onPress={showModal}
                          style={{
                            marginTop: "3%",
                            height: 90,
                            width: "96%",
                            backgroundColor: "black",
                            marginBottom: "10%",
                            padding: 20,
                            borderRadius: 15,
                            backgroundColor: "#fff",
                            borderColor: selectedItem == "" ? "#fff" : "#1C6AE4",
                            borderWidth: selectedItem == "" ? 1 : 1,
                            justifyContent: "center",
                            alignItems: "center",
                            shadowColor: "#1C6AE4",
                            shadowOffset: {
                              width: 0,
                              height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 2,
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              marginLeft: "5%",
                              marginRight: "5%",
                              width: "40%",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <View style={{ top: selectedItem == "" ? 2 : 7 }}>
                              <MaterialCommunityIcons
                                name="car"
                                size={30}
                                color="#1C6AE4"
                              />
                            </View>
                            <View
                              style={{
                                flexDirection: "column",
                                marginLeft: 10,
                              }}
                            >
                              <Text
                                style={{
                                  color: "black",
                                  fontFamily: "Gothic_Bold",
                                  fontSize: 15,
                                  color: "#1C6AE4",
                                  width: 150,
                                }}
                              >
                                {t("common:cartype")}
                              </Text>
                              <Text
                                style={{
                                  color: "black",
                                  fontFamily: "Gothic_Bold",
                                  fontSize: 15,
                                }}
                              >
                                {selectedItem ? selectedItem.Name : null}
                              </Text>
                            </View>
                            <View style={{ marginLeft: "40%" }}>
                              {selectedItem == "" ? (
                                <AntDesign
                                  name={"down"}
                                  color={"#1C6AE4"}
                                  size={25}
                                />
                              ) : (
                                <AntDesign
                                  name={"up"}
                                  color={"#1C6AE4"}
                                  size={25}
                                />
                              )}
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </>
                )}
                onSelected={(selected) => {
                  //        setAnswer(selected.Name)
  
                  setselectedItem(selected);
                  setAnswer(selected.Name);
  
                  console.log(selected.Name);
                }}
                items={carMarque}
                sortingLanguage={"tr"}
                showToTopButton={true}
                selected={selectedItem}
                autoGenerateAlphabeticalIndex={true}
                showAlphabeticalIndex={true}
                selectPlaceholderText={"Choose one..."}
                onEndReached={() => console.log("list ended...")}
                searchPlaceholderText={t("common:Search")}
                requireSelection={false}
                autoSort={false}
              />
            </View>
            <Text
              style={{
                display: borderStatus > 0 ? "flex" : "none",
                marginLeft: "10%",
                fontFamily: "Gothic_Bold",
                color: "red",
              }}
            >
              {errorMessage}
            </Text>
          </>
        );
      } else if (option == "marque") {
        return (
            <>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
  
                paddingHorizontal: 15,
                paddingBottom: 20,
              }}
            >
              <PickerModal
                renderSelectView={(disabled, selected, showModal) => (
                  <>
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity
                          onPress={showModal}
                          style={{
                            marginTop: "3%",
                            height: 90,
                            width: "96%",
                            backgroundColor: "black",
                            marginBottom: "10%",
                            padding: 20,
                            borderRadius: 15,
                            backgroundColor: "#fff",
                            borderColor: selectedItem == "" ? "#fff" : "#1C6AE4",
                            borderWidth: selectedItem == "" ? 1 : 1,
                            justifyContent: "center",
                            alignItems: "center",
                            shadowColor: "#1C6AE4",
                            shadowOffset: {
                              width: 0,
                              height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 2,
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              marginLeft: "5%",
                              marginRight: "5%",
                              width: "40%",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <View style={{ top: selectedItem == "" ? 2 : 7 }}>
                              <MaterialCommunityIcons
                                name="car"
                                size={30}
                                color="#1C6AE4"
                              />
                            </View>
                            <View
                              style={{
                                flexDirection: "column",
                                marginLeft: 10,
                              }}
                            >
                              <Text
                                style={{
                                  color: "black",
                                  fontFamily: "Gothic_Bold",
                                  fontSize: 15,
                                  color: "#1C6AE4",
                                  width: 150,
                                }}
                              >
                                {t("common:carBrand")}
                              </Text>
                              <Text
                                style={{
                                  color: "black",
                                  fontFamily: "Gothic_Bold",
                                  fontSize: 15,
                                }}
                              >
                                {selectedItem ? selectedItem.Name : null}
                              </Text>
                            </View>
                            <View style={{ marginLeft: "40%" }}>
                              {selectedItem == "" ? (
                                <AntDesign
                                  name={"down"}
                                  color={"#1C6AE4"}
                                  size={25}
                                />
                              ) : (
                                <AntDesign
                                  name={"up"}
                                  color={"#1C6AE4"}
                                  size={25}
                                />
                              )}
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </>
                )}
                onSelected={(selected) => {
                  //        setAnswer(selected.Name)
  
                  setselectedItem(selected);
                  setAnswer(selected.Name);
  
                  console.log(selected.Name);
                }}
                items={carBrand}
                sortingLanguage={"tr"}
                showToTopButton={true}
                selected={selectedItem}
                autoGenerateAlphabeticalIndex={true}
                showAlphabeticalIndex={true}
                selectPlaceholderText={"Choose one..."}
                onEndReached={() => console.log("list ended...")}
                searchPlaceholderText={t("common:Search")}
                requireSelection={false}
                autoSort={false}
              />
            </View>
            <Text
              style={{
                display: borderStatus > 0 ? "flex" : "none",
                fontFamily: "Gothic_Bold",
                marginLeft: "10%",
                color: "red",
              }}
            >
              {errorMessage}
            </Text>
          </>
        );
      } else if (option === "formePartenariat") {
        return (
          <View style={{ alignItems: "center", marginTop: -30 }}>
            <TouchableOpacity
              style={{
                borderWidth: 3,
                borderColor: checked1 ? "#00C851" : "#1E90FF" + "40",
                backgroundColor: "#1E90FF" + "20",
                height: 60,
                borderRadius: 10,
                width: "90%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginVertical: 10,
              }}
              onPress={() => {
                setChecked1(!checked1);
                setAnswer(rendercheckbox10()[0]);
                oneclick();
              }}
            >
              <Text style={{ fontSize: 20, color: "black" }}>
                {rendercheckbox10()[0]}
              </Text>
              {checked1 ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    backgroundColor: "#00C851",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="check"
                    style={{
                      color: "#fff",
                      fontSize: 20,
                    }}
                  />
                </View>
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderWidth: 3,
                borderColor: checked2 ? "#00C851" : "#1E90FF" + "40",
                backgroundColor: "#1E90FF" + "20",
                height: 60,
                borderRadius: 10,
                width: "90%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginVertical: 10,
              }}
              onPress={() => {
                setChecked2(!checked2);
                setAnswer(rendercheckbox10()[1]);
                oneclick();
              }}
            >
              <Text style={{ fontSize: 20, color: "black" }}>
                {rendercheckbox10()[1]}
              </Text>
              {checked2 ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    backgroundColor: "#00C851",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="check"
                    style={{
                      color: "#fff",
                      fontSize: 20,
                    }}
                  />
                </View>
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderWidth: 3,
                borderColor: checked3 ? "#00C851" : "#1E90FF" + "40",
                backgroundColor: "#1E90FF" + "20",
                height: 60,
                borderRadius: 10,
                width: "90%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginVertical: 10,
              }}
              onPress={() => {
                setChecked3(!checked3);
                setAnswer(rendercheckbox10()[2]);
                oneclick();
              }}
            >
              <Text style={{ fontSize: 20, color: "black" }}>
                {rendercheckbox10()[2]}
              </Text>
              {checked3 ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    backgroundColor: "#00C851",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="check"
                    style={{
                      color: "#fff",
                      fontSize: 20,
                    }}
                  />
                </View>
              ) : null}
            </TouchableOpacity>
          </View>
        );
      } else if (option === "CommercialCase") {
        return (
          <View style={{ alignItems: "center", marginTop: -30 }}>
            <TouchableOpacity
              style={{
                borderWidth: 3,
                borderColor: checked1 ? "#00C851" : "#1E90FF" + "40",
                backgroundColor: "#1E90FF" + "20",
                height: 60,
                borderRadius: 10,
                width: "90%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginVertical: 10,
              }}
              onPress={() => {
                setChecked1(!checked1);
                setAnswer(rendercheckbox8()[0]);
                oneclick();
              }}
            >
              <Text style={{ fontSize: 20, color: "black" }}>
                {rendercheckbox8()[0]}
              </Text>
              {checked1 ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    backgroundColor: "#00C851",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="check"
                    style={{
                      color: "#fff",
                      fontSize: 20,
                    }}
                  />
                </View>
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderWidth: 3,
                borderColor: checked2 ? "#00C851" : "#1E90FF" + "40",
                backgroundColor: "#1E90FF" + "20",
                height: 60,
                borderRadius: 10,
                width: "90%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginVertical: 10,
              }}
              onPress={() => {
                setChecked2(!checked2);
                setAnswer(rendercheckbox8()[1]);
                oneclick();
              }}
            >
              <Text style={{ fontSize: 20, color: "black" }}>
                {rendercheckbox8()[1]}
              </Text>
              {checked2 ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    backgroundColor: "#00C851",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="check"
                    style={{
                      color: "#fff",
                      fontSize: 20,
                    }}
                  />
                </View>
              ) : null}
            </TouchableOpacity>
          </View>
        );
      } else if (option == "typeproprite") {
        return (
          <View style={{ alignItems: "center", marginTop: -30 }}>
            <TouchableOpacity
              style={{
                borderWidth: 3,
                borderColor: checked1 ? "#00C851" : "#1E90FF" + "40",
                backgroundColor: "#1E90FF" + "20",
                height: 60,
                borderRadius: 10,
                width: "90%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginVertical: 10,
              }}
              onPress={() => {
                setChecked1(!checked1);
                setAnswer(rendercheckbox9()[0]);
                oneclick();
              }}
            >
              <Text style={{ fontSize: 20, color: "black" }}>
                {rendercheckbox9()[0]}
              </Text>
              {checked1 ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    backgroundColor: "#00C851",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="check"
                    style={{
                      color: "#fff",
                      fontSize: 20,
                    }}
                  />
                </View>
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderWidth: 3,
                borderColor: checked2 ? "#00C851" : "#1E90FF" + "40",
                backgroundColor: "#1E90FF" + "20",
                height: 60,
                borderRadius: 10,
                width: "90%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginVertical: 10,
              }}
              onPress={() => {
                setChecked2(!checked2);
                setAnswer(rendercheckbox9()[1]);
                oneclick();
              }}
            >
              <Text style={{ fontSize: 20, color: "black" }}>
                {rendercheckbox9()[1]}
              </Text>
              {checked2 ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    backgroundColor: "#00C851",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="check"
                    style={{
                      color: "#fff",
                      fontSize: 20,
                    }}
                  />
                </View>
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderWidth: 3,
                borderColor: checked3 ? "#00C851" : "#1E90FF" + "40",
                backgroundColor: "#1E90FF" + "20",
                height: 60,
                borderRadius: 10,
                width: "90%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginVertical: 10,
              }}
              onPress={() => {
                setChecked3(!checked3);
                setAnswer(rendercheckbox9()[2]);
                oneclick();
              }}
            >
              <Text style={{ fontSize: 20, color: "black" }}>
                {rendercheckbox9()[2]}
              </Text>
              {checked3 ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    backgroundColor: "#00C851",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="check"
                    style={{
                      color: "#fff",
                      fontSize: 20,
                    }}
                  />
                </View>
              ) : null}
            </TouchableOpacity>
          </View>
        );
      } else if (option == "status") {
        return (
          <View style={{ alignItems: "center", marginTop: -30 }}>
            <TouchableOpacity
              style={{
                borderWidth: 3,
                borderColor: checked1 ? "#00C851" : "#1E90FF" + "40",
                backgroundColor: "#1E90FF" + "20",
                height: 60,
                borderRadius: 10,
                width: "90%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginVertical: 10,
              }}
              onPress={() => {
                setChecked1(!checked1);
                setAnswer(rendercheckbox1()[0]);
                oneclick();
              }}
            >
              <Text style={{ fontSize: 20, color: "black" }}>
                {rendercheckbox1()[0]}
              </Text>
              {checked1 ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    backgroundColor: "#00C851",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="check"
                    style={{
                      color: "#fff",
                      fontSize: 20,
                    }}
                  />
                </View>
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderWidth: 3,
                borderColor: checked2 ? "#00C851" : "#1E90FF" + "40",
                backgroundColor: "#1E90FF" + "20",
                height: 60,
                borderRadius: 10,
                width: "90%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginVertical: 10,
              }}
              onPress={() => {
                setChecked2(!checked2);
                setAnswer(rendercheckbox1()[1]);
                oneclick();
              }}
            >
              <Text style={{ fontSize: 20, color: "black" }}>
                {rendercheckbox1()[1]}
              </Text>
              {checked2 ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    backgroundColor: "#00C851",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="check"
                    style={{
                      color: "#fff",
                      fontSize: 20,
                    }}
                  />
                </View>
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderWidth: 3,
                borderColor: checked3 ? "#00C851" : "#1E90FF" + "40",
                backgroundColor: "#1E90FF" + "20",
                height: 60,
                borderRadius: 10,
                width: "90%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginVertical: 10,
              }}
              onPress={() => {
                setChecked3(!checked3);
                setAnswer(rendercheckbox1()[2]);
                oneclick();
              }}
            >
              <Text style={{ fontSize: 20, color: "black" }}>
                {rendercheckbox1()[2]}
              </Text>
              {checked3 ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    backgroundColor: "#00C851",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="check"
                    style={{
                      color: "#fff",
                      fontSize: 20,
                    }}
                  />
                </View>
              ) : null}
            </TouchableOpacity>
          </View>
        );
      } else if (option === "energy") {
        return (
          <View style={{ alignItems: "center", marginTop: -30 }}>
            <TouchableOpacity
              style={{
                borderWidth: 3,
                borderColor: checked1 ? "#00C851" : "#1E90FF" + "40",
                backgroundColor: "#1E90FF" + "20",
                height: 60,
                borderRadius: 10,
                width: "90%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginVertical: 10,
              }}
              onPress={() => {
                setChecked1(!checked1);
                setAnswer(rendercheckbox7()[0]);
                oneclick();
              }}
            >
              <Text style={{ fontSize: 20, color: "black" }}>
                {rendercheckbox7()[0]}
              </Text>
              {checked1 ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    backgroundColor: "#00C851",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="check"
                    style={{
                      color: "#fff",
                      fontSize: 20,
                    }}
                  />
                </View>
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderWidth: 3,
                borderColor: checked2 ? "#00C851" : "#1E90FF" + "40",
                backgroundColor: "#1E90FF" + "20",
                height: 60,
                borderRadius: 10,
                width: "90%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginVertical: 10,
              }}
              onPress={() => {
                setChecked2(!checked2);
                setAnswer(rendercheckbox7()[1]);
                oneclick();
              }}
            >
              <Text style={{ fontSize: 20, color: "black" }}>
                {rendercheckbox7()[1]}
              </Text>
              {checked2 ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    backgroundColor: "#00C851",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="check"
                    style={{
                      color: "#fff",
                      fontSize: 20,
                    }}
                  />
                </View>
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderWidth: 3,
                borderColor: checked3 ? "#00C851" : "#1E90FF" + "40",
                backgroundColor: "#1E90FF" + "20",
                height: 60,
                borderRadius: 10,
                width: "90%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginVertical: 10,
              }}
              onPress={() => {
                setChecked3(!checked3);
                setAnswer(rendercheckbox7()[2]);
                oneclick();
              }}
            >
              <Text style={{ fontSize: 20, color: "black" }}>
                {rendercheckbox7()[2]}
              </Text>
              {checked3 ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    backgroundColor: "#00C851",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="check"
                    style={{
                      color: "#fff",
                      fontSize: 20,
                    }}
                  />
                </View>
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderWidth: 3,
                borderColor: checked4 ? "#00C851" : "#1E90FF" + "40",
                backgroundColor: "#1E90FF" + "20",
                height: 60,
                borderRadius: 10,
                width: "90%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginVertical: 10,
              }}
              onPress={() => {
                setChecked4(!checked4);
                setAnswer(rendercheckbox7()[3]);
                oneclick();
              }}
            >
              <Text style={{ fontSize: 20, color: "black" }}>
                {rendercheckbox7()[3]}
              </Text>
              {checked4 ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    backgroundColor: "#00C851",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="check"
                    style={{
                      color: "#fff",
                      fontSize: 20,
                    }}
                  />
                </View>
              ) : null}
            </TouchableOpacity>
          </View>
        );
      } else if (option == "form") {
        return (
          <View style={{ alignItems: "center", marginTop: -30 }}>
            {explanation !== "null" &&
            explanation !== null &&
            explanation.length ? (
              <Text
                style={{ marginLeft: "87%", position: "relative" }}
                onPress={() => setShowAlert1(true)}
              >
                <Ionicons
                  name="information-circle-outline"
                  size={24}
                  color="#1C6AE4"
                />
              </Text>
            ) : null}
            <TouchableOpacity
              style={{
                borderWidth: 3,
                borderColor: checked1 ? "#00C851" : "#1E90FF" + "40",
                backgroundColor: "#1E90FF" + "20",
                height: 60,
                borderRadius: 10,
                width: "90%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginVertical: 10,
              }}
              onPress={() => {
                setChecked1(!checked1);
                setAnswer(rendercheckbox2()[0]);
                oneclick();
              }}
            >
              <Text style={{ fontSize: 20, color: "black" }}>
                {rendercheckbox2()[0]}
              </Text>
              {checked1 ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    backgroundColor: "#00C851",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="check"
                    style={{
                      color: "#fff",
                      fontSize: 20,
                    }}
                  />
                </View>
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderWidth: 3,
                borderColor: checked2 ? "#00C851" : "#1E90FF" + "40",
                backgroundColor: "#1E90FF" + "20",
                height: 60,
                borderRadius: 10,
                width: "90%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginVertical: 10,
              }}
              onPress={() => {
                setChecked2(!checked2);
                setAnswer(rendercheckbox2()[1]);
                oneclick();
              }}
            >
              <Text style={{ fontSize: 20, color: "black" }}>
                {rendercheckbox2()[1]}
              </Text>
              {checked2 ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    backgroundColor: "#00C851",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="check"
                    style={{
                      color: "#fff",
                      fontSize: 20,
                    }}
                  />
                </View>
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderWidth: 3,
                borderColor: checked3 ? "#00C851" : "#1E90FF" + "40",
                backgroundColor: "#1E90FF" + "20",
                height: 60,
                borderRadius: 10,
                width: "90%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginVertical: 10,
              }}
              onPress={() => {
                setChecked3(!checked3);
                setAnswer(rendercheckbox2()[2]);
                oneclick();
              }}
            >
              <Text style={{ fontSize: 20, color: "black" }}>
                {rendercheckbox2()[2]}
              </Text>
              {checked3 ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    backgroundColor: "#00C851",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="check"
                    style={{
                      color: "#fff",
                      fontSize: 20,
                    }}
                  />
                </View>
              ) : null}
            </TouchableOpacity>
          </View>
        );
      } else if (option == "titre") {
        return (
          <View style={{ alignItems: "center", marginTop: -30 }}>
            <TouchableOpacity
              style={{
                borderWidth: 3,
                borderColor: checked1 ? "#00C851" : "#1E90FF" + "40",
                backgroundColor: "#1E90FF" + "20",
                height: 60,
                borderRadius: 10,
                width: "90%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginVertical: 10,
              }}
              onPress={() => {
                setChecked1(!checked1);
                setAnswer(rendercheckbox3()[0]);
                oneclick();
              }}
            >
              <Text style={{ fontSize: 20, color: "black" }}>
                {rendercheckbox3()[0]}
              </Text>
              {checked1 ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    backgroundColor: "#00C851",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="check"
                    style={{
                      color: "#fff",
                      fontSize: 20,
                    }}
                  />
                </View>
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderWidth: 3,
                borderColor: checked2 ? "#00C851" : "#1E90FF" + "40",
                backgroundColor: "#1E90FF" + "20",
                height: 60,
                borderRadius: 10,
                width: "90%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginVertical: 10,
              }}
              onPress={() => {
                setChecked2(!checked2);
                setAnswer(rendercheckbox3()[1]);
                oneclick();
              }}
            >
              <Text style={{ fontSize: 20, color: "black" }}>
                {rendercheckbox3()[1]}
              </Text>
              {checked2 ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    backgroundColor: "#00C851",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="check"
                    style={{
                      color: "#fff",
                      fontSize: 20,
                    }}
                  />
                </View>
              ) : null}
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={{
                borderWidth: 3,
                borderColor: checked3 ? "#00C851" : "#1E90FF" + "40",
                backgroundColor: "#1E90FF" + "20",
                height: 60,
                borderRadius: 10,
                width: "90%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginVertical: 10,
              }}
              onPress={() => {
                setChecked3(!checked3);
                setAnswer(rendercheckbox3()[2]);
                oneclick();
              }}
            >
              <Text style={{ fontSize: 20, color: "black" }}>
                {rendercheckbox3()[1]}
              </Text>
              {checked3 ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    backgroundColor: "#00C851",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="check"
                    style={{
                      color: "#fff",
                      fontSize: 20,
                    }}
                  />
                </View>
              ) : null}
            </TouchableOpacity> */}
          </View>
        );
      } else if (option == "typeproprite") {
        return (
          <View style={{ alignItems: "center", marginTop: -30 }}>
            <TouchableOpacity
              style={{
                borderWidth: 3,
                borderColor: checked1 ? "#00C851" : "#1E90FF" + "40",
                backgroundColor: "#1E90FF" + "20",
                height: 60,
                borderRadius: 10,
                width: "90%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginVertical: 10,
              }}
              onPress={() => {
                setChecked1(!checked1);
                setAnswer(rendercheckbox4()[0]);
                oneclick();
              }}
            >
              <Text style={{ fontSize: 20, color: "black" }}>
                {rendercheckbox4()[0]}
              </Text>
              {checked1 ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    backgroundColor: "#00C851",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="check"
                    style={{
                      color: "#fff",
                      fontSize: 20,
                    }}
                  />
                </View>
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderWidth: 3,
                borderColor: checked2 ? "#00C851" : "#1E90FF" + "40",
                backgroundColor: "#1E90FF" + "20",
                height: 60,
                borderRadius: 10,
                width: "90%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginVertical: 10,
              }}
              onPress={() => {
                setChecked2(!checked2);
                setAnswer(rendercheckbox4()[1]);
                oneclick();
              }}
            >
              <Text style={{ fontSize: 20, color: "black" }}>
                {rendercheckbox4()[1]}
              </Text>
              {checked2 ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    backgroundColor: "#00C851",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="check"
                    style={{
                      color: "#fff",
                      fontSize: 20,
                    }}
                  />
                </View>
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderWidth: 3,
                borderColor: checked3 ? "#00C851" : "#1E90FF" + "40",
                backgroundColor: "#1E90FF" + "20",
                height: 60,
                borderRadius: 10,
                width: "90%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginVertical: 10,
              }}
              onPress={() => {
                setChecked3(!checked3);
                setAnswer(rendercheckbox4()[2]);
                oneclick();
              }}
            >
              <Text style={{ fontSize: 20, color: "black" }}>
                {rendercheckbox4()[2]}
              </Text>
              {checked3 ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    backgroundColor: "#00C851",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="check"
                    style={{
                      color: "#fff",
                      fontSize: 20,
                    }}
                  />
                </View>
              ) : null}
            </TouchableOpacity>
          </View>
        );
      } else if (option == "locprop") {
        return (
          <View style={{ alignItems: "center", marginTop: -30 }}>
            <TouchableOpacity
              style={{
                borderWidth: 3,
                borderColor: checked1 ? "#00C851" : "#1E90FF" + "40",
                backgroundColor: "#1E90FF" + "20",
                height: 60,
                borderRadius: 10,
                width: "90%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginVertical: 10,
              }}
              onPress={() => {
                setChecked1(!checked1);
                setAnswer(rendercheckbox5()[0]);
                oneclick();
              }}
            >
              <Text style={{ fontSize: 20, color: "black" }}>
                {rendercheckbox5()[0]}
              </Text>
              {checked1 ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    backgroundColor: "#00C851",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="check"
                    style={{
                      color: "#fff",
                      fontSize: 20,
                    }}
                  />
                </View>
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderWidth: 3,
                borderColor: checked2 ? "#00C851" : "#1E90FF" + "40",
                backgroundColor: "#1E90FF" + "20",
                height: 60,
                borderRadius: 10,
                width: "90%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginVertical: 10,
              }}
              onPress={() => {
                setChecked2(!checked2);
                setAnswer(rendercheckbox5()[1]);
                oneclick();
              }}
            >
              <Text style={{ fontSize: 20, color: "black" }}>
                {rendercheckbox5()[1]}
              </Text>
              {checked2 ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    backgroundColor: "#00C851",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="check"
                    style={{
                      color: "#fff",
                      fontSize: 20,
                    }}
                  />
                </View>
              ) : null}
            </TouchableOpacity>
          </View>
        );
      } else if (questionDate === "true") {
        return (
          <View>
            <SafeAreaView>
              {/* <CalendarPicker
                weekdays={
                  lang === "en"
                    ? ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"]
                    : lang === "Arabe"
                    ? [
                        "الاثنين",
                        "الثلاثاء",
                        "الأربعاء",
                        "الخميس",
                        "الجمعة",
                        "السبت",
                        "الأحد",
                      ]
                    : ["Lun", "Mar", "Mer", "Jeu", "Vend", "Sam", "Dim"]
                }
                months={
                  lang === "Englais"
                    ? [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                      ]
                    : lang === "Arabe"
                    ? [
                        "جانفي",
                        "فيفري",
                        "مارس",
                        "أفريل",
                        "ماي",
                        "جوان",
                        "جويلية",
                        "أوت",
                        "سبتمبر",
                        "أكتوبر",
                        "نوفمبر",
                        "ديسمبر",
                      ]
                    : [
                        "Janvier",
                        "Février",
                        "Mars",
                        "Avril",
                        "May",
                        "Juin",
                        "Juilliet",
                        "Aout",
                        "Septembre",
                        "Octobre",
                        "Novembre",
                        "Decembre",
                      ]
                }
                previousTitle={
                  lang === "Englais"
                    ? "Prev"
                    : lang === "Arabe"
                    ? "السابق"
                    : "préc"
                }
                nextTitle={
                  lang === "Englais"
                    ? "Next"
                    : lang === "Arabe"
                    ? "التالي"
                    : "Suiv"
                }
                onDateChange={onDateChange}
                selectedDayStyle={{ backgroundColor: "#ADD8E6" }}
              /> */}
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    onPress={showDatePicker}
                    style={{
                      marginTop: "3%",
                      height: 90,
                      width: "90%",
                      backgroundColor: "black",
                      marginBottom: "10%",
  
                      borderRadius: 15,
                      backgroundColor: "#fff",
                      borderColor: answer ? "#1C6AE4" : null,
                      borderWidth: answer ? 1 : null,
                      justifyContent: "center",
                      alignItems: "center",
                      shadowColor: "#1C6AE4",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 2,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        marginLeft: "5%",
                        marginRight: "5%",
                        width: "70%",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <View style={{ top: 7 }}>
                        <FontAwesome name="calendar" size={25} color="#1C6AE4" />
                      </View>
                      <View style={{ flexDirection: "column", marginLeft: 10 }}>
                        <Text
                          style={{
                            color: "black",
                            fontFamily: "Gothic_Bold",
                            fontSize: 15,
                            color: "#1C6AE4",
                          }}
                        >
                          {t("common:PickDate")}
                        </Text>
                        <Text
                          style={{
                            color: "black",
                            fontFamily: "Gothic_Bold",
                            fontSize: 15,
                          }}
                        >
                          {selectedDatee
                            ? moment(selectedDatee).format("DD/MM/YYYY")
                            : null}
                        </Text>
                      </View>
                      <View style={{ marginLeft: "40%", top: 7 }}>
                        {answer ? (
                          <AntDesign name={"down"} color={"#1C6AE4"} size={25} />
                        ) : (
                          <AntDesign name={"up"} color={"#1C6AE4"} size={25} />
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
  
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                style={{ backgroundColor: "black" }}
              />
            </SafeAreaView>
            <Text
            style={{
              display: borderStatus > 0 ? "flex" : "none",
              marginLeft: "10%",
              fontFamily: "Gothic_Bold",
              color: "red",
            }}
          >
            {errorMessage}
          </Text>
          </View>
        );
      } else if (option == "jour") {
        return (
          <View style={{ alignItems: "center", marginTop: -30 }}>
            <TouchableOpacity
              style={{
                borderWidth: 3,
                borderColor: checked1 ? "#00C851" : "#1E90FF" + "40",
                backgroundColor: "#1E90FF" + "20",
                height: 60,
                borderRadius: 10,
                width: "90%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginVertical: 10,
              }}
              onPress={() => {
                setChecked1(!checked1);
                setAnswer(rendercheckbox6()[0]);
                oneclick();
              }}
            >
              <Text style={{ fontSize: 20, color: "black" }}>
                {rendercheckbox6()[0]}
              </Text>
              {checked1 ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    backgroundColor: "#00C851",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="check"
                    style={{
                      color: "#fff",
                      fontSize: 20,
                    }}
                  />
                </View>
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderWidth: 3,
                borderColor: checked2 ? "#00C851" : "#1E90FF" + "40",
                backgroundColor: "#1E90FF" + "20",
                height: 60,
                borderRadius: 10,
                width: "90%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginVertical: 10,
              }}
              onPress={() => {
                setChecked2(!checked2);
                setAnswer(rendercheckbox6()[1]);
                oneclick();
              }}
            >
              <Text style={{ fontSize: 20, color: "black" }}>
                {rendercheckbox6()[1]}
              </Text>
              {checked2 ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    backgroundColor: "#00C851",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="check"
                    style={{
                      color: "#fff",
                      fontSize: 20,
                    }}
                  />
                </View>
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderWidth: 3,
                borderColor: checked3 ? "#00C851" : "#1E90FF" + "40",
                backgroundColor: "#1E90FF" + "20",
                height: 60,
                borderRadius: 10,
                width: "90%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginVertical: 10,
              }}
              onPress={() => {
                setChecked3(!checked3);
                setAnswer(rendercheckbox6()[2]);
                oneclick();
              }}
            >
              <Text style={{ fontSize: 20, color: "black" }}>
                {rendercheckbox6()[2]}
              </Text>
              {checked3 ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    backgroundColor: "#00C851",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="check"
                    style={{
                      color: "#fff",
                      fontSize: 20,
                    }}
                  />
                </View>
              ) : null}
            </TouchableOpacity>
          </View>
        );
      } else if (option == "number") {
        return (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignContent: "center",
              marginTop: -60,
            }}
          >
            {explanation !== "null" &&
            explanation !== null &&
            explanation.length ? (
              <Text
                style={{ marginLeft: "87%", position: "relative" }}
                onPress={() => setShowAlert1(true)}
              >
                <Ionicons
                  name="information-circle-outline"
                  size={24}
                  color="#1C6AE4"
                />
              </Text>
            ) : null}
            <TextInput
              keyboardType="numeric"
              style={[
                {
                  marginTop: "30%",
                  marginBottom: "10%",
                  marginHorizontal: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: "red",
                  padding: 5,
                  fontSize: 20,
                  borderRadius: 10,
                  marginVertical: "1%",
                  position: "relative",
                  fontFamily: "Gothic",
                  borderBottomColor: borderStatus > 0 ? "red" : "black",
                },
              ]}
              onChangeText={(content) => setAnswer(content)}
              value={answer}
              placeholder={t("common:typeHere")}
            />
            <Text
              style={{
                display: borderStatus > 0 ? "flex" : "none",
                marginLeft: "10%",
                fontFamily: "Gothic_Bold",
                color: "red",
              }}
            >
              {errorMessage}
            </Text>
          </View>
        );
      } else {
        return (
          <View style={{ justifyContent: "center" }}>
            {textArea == "selector" ? (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
  
                  paddingHorizontal: 15,
                  paddingBottom: 20,
                }}
              >
                <PickerModal
                  renderSelectView={(disabled, selected, showModal) => (
                    <>
                      <View
                        style={{ justifyContent: "center", alignItems: "center" }}
                      >
                        <View style={{ flexDirection: "row" }}>
                          <TouchableOpacity
                            onPress={showModal}
                            style={{
                              marginTop: "3%",
                              height: 90,
                              width: "96%",
                              backgroundColor: "black",
                              marginBottom: "10%",
                              padding: 20,
                              borderRadius: 15,
                              backgroundColor: "#fff",
                              borderColor:
                                selectedItem == "" ? "#fff" : "#1C6AE4",
                              borderWidth: selectedItem == "" ? 1 : 1,
                              justifyContent: "center",
                              alignItems: "center",
                              shadowColor: "#1C6AE4",
                              shadowOffset: {
                                width: 0,
                                height: 2,
                              },
                              shadowOpacity: 0.25,
                              shadowRadius: 3.84,
                              elevation: 2,
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                marginLeft: "5%",
                                marginRight: "5%",
                                width: "40%",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <View style={{ top: selectedItem == "" ? 2 : 7 }}>
                                <MaterialCommunityIcons
                                  name="town-hall"
                                  size={30}
                                  color="#1C6AE4"
                                />
                              </View>
                              <View
                                style={{
                                  flexDirection: "column",
                                  marginLeft: 10,
                                }}
                              >
                                <Text
                                  style={{
                                    color: "black",
                                    fontFamily: "Gothic_Bold",
                                    fontSize: 15,
                                    color: "#1C6AE4",
                                    width: 150,
                                  }}
                                >
                                  {/* {selectedItem == ""
                                    ? t("common:Gouv")
                                    : t("common:Gouve")} */}
                                  {selectedItem == ""
                                    ? questionId == 18 ||
                                      questionId == 129 ||
                                      questionId == 114 ||
                                      questionId == 132 ||
                                      (questionId == 27 &&
                                        language === "content_AR") ||
                                      (questionId == 49 &&
                                        language === "content_AR") ||
                                      (questionId == 61 &&
                                        language === "content_AR") ||
                                      (questionId == 66 &&
                                        language === "content_AR") ||
                                      (questionId == 105 &&
                                        language === "content_AR") ||
                                      (questionId == 121 &&
                                        language === "content_AR") ||
                                      (questionId == 126 &&
                                        language === "content_AR") ||
                                      (questionId == 141 &&
                                        language === "content_AR") ||
                                      (questionId == 146 &&
                                        language === "content_AR") ||
                                      (questionId == 181 &&
                                        language === "content_AR") ||
                                      (questionId == 203 &&
                                        language === "content_AR") ||
                                      (questionId == 209 &&
                                        language === "content_AR") ||
                                      (questionId == 218 &&
                                        language === "content_AR") ||
                                      (questionId == 223 &&
                                        language === "content_AR") ||
                                      (questionId == 240 &&
                                        language === "content_AR") ||
                                      (questionId == 276 &&
                                        language === "content_AR") ||
                                      (questionId == 300 &&
                                        language === "content_AR") ||
                                      (questionId == 305 &&
                                        language === "content_AR") ||
                                      (questionId == 315 &&
                                        language === "content_AR") ||
                                      (questionId == 320 &&
                                        language === "content_AR")
                                      ? t("common:pays")
                                      : t("common:Gouv")
                                    : questionId == 18 ||
                                      questionId == 129 ||
                                      questionId == 114 ||
                                      questionId == 132 ||
                                      (questionId == 27 &&
                                        language === "content_AR") ||
                                      (questionId == 49 &&
                                        language === "content_AR") ||
                                      (questionId == 61 &&
                                        language === "content_AR") ||
                                      (questionId == 66 &&
                                        language === "content_AR") ||
                                      (questionId == 105 &&
                                        language === "content_AR") ||
                                      (questionId == 121 &&
                                        language === "content_AR") ||
                                      (questionId == 126 &&
                                        language === "content_AR") ||
                                      (questionId == 141 &&
                                        language === "content_AR") ||
                                      (questionId == 146 &&
                                        language === "content_AR") ||
                                      (questionId == 181 &&
                                        language === "content_AR") ||
                                      (questionId == 203 &&
                                        language === "content_AR") ||
                                      (questionId == 209 &&
                                        language === "content_AR") ||
                                      (questionId == 218 &&
                                        language === "content_AR") ||
                                      (questionId == 223 &&
                                        language === "content_AR") ||
                                      (questionId == 240 &&
                                        language === "content_AR") ||
                                      (questionId == 276 &&
                                        language === "content_AR") ||
                                      (questionId == 300 &&
                                        language === "content_AR") ||
                                      (questionId == 305 &&
                                        language === "content_AR") ||
                                      (questionId == 315 &&
                                        language === "content_AR") ||
                                      (questionId == 320 &&
                                        language === "content_AR")
                                    ? t("common:pay")
                                    : t("common:Gouve")}
                                </Text>
                                <Text
                                  style={{
                                    color: "black",
                                    fontFamily: "Gothic_Bold",
                                    fontSize: 15,
                                  }}
                                >
                                  {selectedItem ? selectedItem.Name : null}
                                </Text>
                              </View>
                              <View style={{ marginLeft: "40%" }}>
                                {selectedItem == "" ? (
                                  <AntDesign
                                    name={"down"}
                                    color={"#1C6AE4"}
                                    size={25}
                                  />
                                ) : (
                                  <AntDesign
                                    name={"up"}
                                    color={"#1C6AE4"}
                                    size={25}
                                  />
                                )}
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </>
                  )}
                  onSelected={(selected) => {
                    //        setAnswer(selected.Name)
  
                    setselectedItem(selected);
                    setAnswer(selected.Name);
  
                    console.log(selected.Name);
                  }}
                  items={
                    questionId == 18 ||
                    questionId == 114 ||
                    questionId == 132 ||
                    (questionId == 129 && lang != "Arabe")
                      ? Country
                      : (questionId == 27 && language === "content_AR") ||
                        (questionId == 49 && language === "content_AR") ||
                        (questionId == 61 && language === "content_AR") ||
                        (questionId == 66 && language === "content_AR") ||
                        (questionId == 105 && language === "content_AR") ||
                        (questionId == 121 && language === "content_AR") ||
                        (questionId == 126 && language === "content_AR") ||
                        (questionId == 141 && language === "content_AR") ||
                        (questionId == 146 && language === "content_AR") ||
                        (questionId == 181 && language === "content_AR") ||
                        (questionId == 203 && language === "content_AR") ||
                        (questionId == 209 && language === "content_AR") ||
                        (questionId == 218 && language === "content_AR") ||
                        (questionId == 223 && language === "content_AR") ||
                        (questionId == 240 && language === "content_AR") ||
                        (questionId == 276 && language === "content_AR") ||
                        (questionId == 300 && language === "content_AR") ||
                        (questionId == 305 && language === "content_AR") ||
                        (questionId == 315 && language === "content_AR") ||
                        (questionId == 320 && language === "content_AR")
                      ? CountryAra
                      : lang != "Arabe"
                      ? Gouv
                      : GouvArab
                  }
                  sortingLanguage={"tr"}
                  showToTopButton={true}
                  selected={selectedItem}
                  autoGenerateAlphabeticalIndex={true}
                  showAlphabeticalIndex={true}
                  selectPlaceholderText={"Choose one..."}
                  onEndReached={() => console.log("list ended...")}
                  searchPlaceholderText={t("common:Search")}
                  requireSelection={false}
                  autoSort={false}
                />
              </View>
            ) : explanation !== "null" &&
              explanation !== null &&
              explanation.length ? (
              <Text
                style={{ marginLeft: "87%", position: "relative" }}
                onPress={() => setShowAlert1(true)}
              >
                <Ionicons
                  name="information-circle-outline"
                  size={24}
                  color="#1C6AE4"
                />
              </Text>
            ) : null}
            {textArea == "nukk" ||
            textArea == null ||
            textArea == "NULL" ||
            textArea == "null" ? (
              <View>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderBottomColor: borderStatus > 0 ? "red" : "black",
                    },
                  ]}
                  onFocus={() => {
                    if (borderStatus > 0) setBorderStatus(0);
                  }}
                  onChangeText={(content) => setAnswer(content)}
                  value={answer}
                  placeholder={t("common:typeHere")}
                />
                <Text
                  style={{
                    display: borderStatus > 0 ? "flex" : "none",
                    bottom: 20,
                    marginLeft: "10%",
                    fontFamily: "Gothic_Bold",
                    color: "red",
                  }}
                >
                  {errorMessage}
                </Text>
              </View>
            ) : requireRepeat && textArea == "product" ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    paddingBottom: 20,
                    fontSize: 20,
                  }}
                >
                  {justText}
                </Text>
                {slider()}
              </View>
            ) : textArea == "big" ? (
              <View style={styles.textcontainer}>
                <Textarea
                  containerStyle={styles.textareaContainer}
                  style={styles.textarea}
                  onChangeText={(content) => setAnswer(content)}
                  defaultValue={answer}
                  maxLength={950}
                  placeholder={t("common:typeHere")}
                  placeholderTextColor={"#c7c7c7"}
                  underlineColorAndroid={"transparent"}
                />
              </View>
            ) : null}
            {/* <Feather
              onPress={() => {
                setAnswer("");
              }}
              name="x"
              size={showSelecter || textArea == "selector" ? 0 : 20}
              color="gray"
              style={{ position: "absolute", right: 30 }}
            ></Feather> */}
          </View>
        );
      }
    };
    const renderNextButton = () => {
      return (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {currentQuestionIndex > 0 ? (
            // <Ionicons
            //   style={{ marginLeft: "9%" }}
            //   onPress={goBack}
            //   name="arrow-back"
            //   size={29}
            //   color="blue"
            // />
            <TouchableOpacity onPress={goBack} style={styles.touchBack}>
              <Text
                style={{
                  fontSize: 17,
                  letterSpacing: 1.5,
                  textAlign: "center",
                  position: "relative",
                  fontFamily: "Gothic_Bold",
                  color: "black",
                }}
              >
                {t("common:pre")}
              </Text>
            </TouchableOpacity>
          ) : null}
  
          <TouchableOpacity
            disabled={isDisabled}
            onPress={handleNext}
            style={{
              width: "45%",
              textAlign: "center",
              paddingVertical: 14,
              marginHorizontal: "25%",
              borderRadius: 15,
              marginTop: 10,
              backgroundColor: isDisabled ? "#4987e9" : "#1C6AE4",
              elevation: 10,
              shadowColor: "#1C6AE4",
            }}
          >
            <Text
              style={{
                fontSize: 17,
                letterSpacing: 1.5,
                textAlign: "center",
                position: "relative",
                fontFamily: "Gothic_Bold",
                color: "#fff",
              }}
            >
              {nextBtnText}
            </Text>
          </TouchableOpacity>
        </View>
      );
    };
  
    // progress bar depends on the questions and the length of the question
    const [progress, setProgress] = useState(new Animated.Value(0));
    console.log(progress, "progress");
    const progressAnim = progress.interpolate({
      inputRange: [0, questions.length],
      outputRange: ["0%", "100%"],
    });
  
    // working on the progress bar
    const renderProgressBar = () => {
      return (
        <View>
          <View
            style={{
              display: currentQuestionIndex == 0 ? "flex" : "none",
              heigh: 20,
              width: 50,
              marginLeft: 5,
            }}
          >
            <TouchableHighlight
              underlayColor={colors.touch}
              style={{
                borderRadius: 20,
                padding: 7,
                marginTop: 2,
              }}
              onPress={() => {
                console.log("Clicked");
              }}
            >
              <Feather name="arrow-left" size={25} color={colors.darkGray} />
            </TouchableHighlight>
          </View>
          <View
            style={{
              width: "90%",
              marginHorizontal: "5%",
              borderRadius: 20,
              backgroundColor: "#00000020",
              marginTop: "1%",
            }}
          >
            <Animated.View
              style={[
                {
                  height: 5,
                  borderRadius: 20,
                  backgroundColor: "#1C6AE4",
                },
                {
                  width: progressAnim,
                },
              ]}
            ></Animated.View>
          </View>
        </View>
      );
    };
    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={{
          flex: 1,
          backgroundColor: "#fff",
        }}
      >
        <Spinner
          visible={spinner}
          textContent={t("common:Loding")}
          textStyle={styles.spinnerTextStyle}
          color={"blue"}
        />
  
        <StatusBar barStyle="light-content" backgroundColor="transparent" />
        <View
          style={{
            flex: 1,
            paddingVertical: 50,
            paddingHorizontal: 10,
            backgroundColor: "#FFFFFF",
            position: "relative",
          }}
        >
          <ImageBackground style={styles.image}>
            {/* ProgressBar */}
            {renderProgressBar()}
  
            {/* Question */}
            {renderQuestion()}
  
            {/* Options */}
            {renderView()}
  
            {/* Next Button */}
            {renderNextButton()}
  
            {/* Score Modal */}
  
            <Modal
              animationType="slide"
              transparent={true}
              visible={showdataModal}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#37b9c4",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#fff",
                    width: "90%",
                    borderRadius: 20,
                    padding: 20,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{ fontSize: 30, fontWeight: "bold", color: "#171717" }}
                  >
                    {"Your answers has been added succesfely!"}
                  </Text>
  
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      marginVertical: 20,
                    }}
                  ></View>
                  {/* Retry Quiz button */}
                  <TouchableOpacity
                    /// with this press we are going to restarted to the first optioon
                    /// this option it will be changed because the button will let us move to the next step
                    onPress={() => {
                      generateContract();
                      navigation.navigate("ViewGeneratedContract");
                    }}
                    style={{
                      backgroundColor: "#3498db",
                      padding: 20,
                      width: "100%",
                      borderRadius: 20,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "#fff",
                        fontSize: 20,
                      }}
                    >
                      See your contract
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </ImageBackground>
          {/*
           <FancyAlert
            visible={visible}
            icon={
              <View
                style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "green",
                  borderRadius: 50,
                  width: "100%",
                }}
              >
                <Text style={{ color: "black", fontSize: 30 }}>✓</Text>
              </View>
            }
            style={{ backgroundColor: "white" }}
          >
            <Text style={{ marginTop: -16, marginBottom: 32 }}>
              {t("common:signUpSuccess")}
            </Text>
            <Text style={{ fontSize: 25, marginTop: -16, marginBottom: 32 }}>
              {t("common:checkValidation")}
            </Text>
          </FancyAlert> 
          
          */}
        </View>
      </ScrollView>
    );
  };
  const styles = StyleSheet.create({
    input: {
      marginHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: "black",
      padding: 10,
      fontSize: 20,
      borderRadius: 10,
      marginVertical: "10%",
      position: "relative",
      fontFamily: "Gothic",
    },
    checkbox: {
      flexWrap: "wrap",
      alignItems: "flex-start",
      flexDirection: "row",
    },
    words: {
      paddingBottom: "10px",
    },
    part2: {
      fontSize: 15,
      color: "grey",
      marginHorizontal: "5%",
      fontFamily: "Gothic",
    },
    question: {
      fontSize: 20,
      color: "black",
      marginHorizontal: "5%",
      fontFamily: "Gothic_Bold",
    },
    checkboxx: {
      fontSize: 15,
      color: "black",
      marginHorizontal: "5%",
    },
    image: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },
    appButtonText: {
      fontSize: 18,
      color: "white",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase",
    },
    touch: {
      width: "45%",
      textAlign: "center",
      paddingVertical: 14,
      marginHorizontal: "25%",
      borderRadius: 15,
      marginTop: 10,
      backgroundColor: "#1C6AE4",
      elevation: 10,
      shadowColor: "#1C6AE4",
    },
    touchBack: {
      width: "45%",
      textAlign: "center",
      paddingVertical: 14,
      marginHorizontal: "25%",
      borderRadius: 15,
      marginTop: 10,
      backgroundColor: "#fff",
      elevation: 10,
      shadowColor: "lightgray",
    },
    dateText: {
      fontSize: 20,
      fontFamily: "Gothic",
      marginVertical: 20,
      borderBottomWidth: 0.5,
      paddingBottom: 10,
      marginHorizontal: "10%",
      textAlign: "center",
      width: "80%",
      letterSpacing: 4,
    },
    dateBtn: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingBottom: 20,
    },
    textcontainer: {
      flex: 1,
      padding: 30,
      justifyContent: "center",
      alignItems: "center",
    },
    textareaContainer: {
      height: 200,
      padding: 5,
      width: 300,
      backgroundColor: "#F5FCFF",
    },
    textarea: {
      textAlignVertical: "top", // hack android
      height: 170,
      fontSize: 20,
      color: "#333",
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
      backgroundColor: "#fff",
    },
  });
  export default Questions;
  