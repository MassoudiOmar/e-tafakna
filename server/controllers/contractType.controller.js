import React, { useRef, useLayoutEffect } from "react";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import CalendarPicker from "react-native-calendar-picker";
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
  TouchableHighlight
} from "react-native";
import Textarea from "react-native-textarea";
import axios from "axios";
import { useState, useEffect } from "react";
import i18n from "i18n-js";
import { FancyAlert } from "react-native-expo-fancy-alerts";
import Shared from "../../../Shared";
import Feather from "react-native-vector-icons/Feather";
import Fontisto from "react-native-vector-icons/Fontisto";
import DateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from "react-native-vector-icons/Ionicons";
import AwesomeAlert from "react-native-awesome-alerts";
import { colors } from "../../../assets/COLORS/color2";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import PickerModal from "react-native-picker-modal-view";
import data from "./top20.json";
import arrow from "../../../assets/images/arrow.png";
import { set } from "react-native-reanimated";
import { useScrollToTop } from "@react-navigation/native";
import Popup from "./Popup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Container } from "@mui/system";
const Questions = ({ route, navigation }) => {
  let { selected_contract_id, lang, contracts_id, realId  ,Savedanswers  ,choice} = route.params;
  let imageUri = "";
  let language = "";
  if (lang === "Arabe" || choice=="Arabe") {
    language = "content_AR";
  } else if (lang === "Francais" ||choice=="Francais") {
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
  const [userName , setUserName] = useState("")
  const [contractName , setContractName]= useState("") 
const [borderStatus , setBorderStatus] = useState(0)
const [customInput , setCustomInput] = useState("")
  const [questionId, setQuestionId] = useState(null);
  const [questionDate, setQuestionDate] = useState(null);
  const [requireRepeat, setRequireRepeat] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showdataModal, setShowdataModal] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [number1,setNumber1] =useState(0)
  const [checked3, setChecked3] = React.useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [explanation, setExplain] = useState("");
  const [not, setNot] = useState("");
  const [didGoBack , setDidGoBack]=useState(-1)
  const [showAlert, setShowAlert] = useState(null);
  const [showAlert1, setShowAlert1] = useState(false);
  const [nextBtnText, setNextBtnText] = useState(i18n.t("next"));
  const [justText , setJustTest] = useState(1)
  const [errorMessage ,  setErrorMessage] = useState("")
  const [Staty , setStaty] = useState(false)
////States for The Facture contract 
const [name , setName] = useState("")
const [quantity , setQuantity] = useState("")
const [price , setPrice]= useState("")
const [nameArr , setNameArr]= useState([])
const [quantityArr , setQuantityArr]=useState([])
const [priceArr , setPriceArr] =useState([])
/////
const [number ,  setNumber] = useState(0) 
const [showSelecter , setShowSelecter] = useState(false)
const [engagement1,  setEngagement1] = useState("")
const [engagement2,  setEngagement2] = useState("")
const [selectedItem , setselectedItem] = useState("")
const Repeat = useRef(null)
  //date
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [option, setOption] = useState("");
  const [initialQuestionId,  setInitialQuestionId] = useState(-1)
  const [text, setText] = useState(
    `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
  );
  const [textArea, settextArea] = useState("");
  const [borderStatusN , setBorderStatusN] = useState(0)
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
      setUserName(result.data[0].first_name +" "+result.data[0].last_name)
      setNot(result.data[0].notification);
await axios.post(`${Shared}/api/users/getNameOfSpecificContract` , {contractId:selected_contract_id}).then(result=>{
  //alert(lang)
if(lang=="Francais")
setContractName(result.data[0].title_FR)
if(lang=="Arabe")
setContractName(result.data[0].title_AR)
else 
setContractName(result.data[0].title_EN)


})

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
      return ["Marié", "Divorcé", "Celibataire"];
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
      return ["سيدة", "السيد", "Celibataire"];
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
  const getUser = async ()=> { 
    var token = await AsyncStorage.getItem("UsertokenInfo");
    await axios
      .get(`${Shared}/api/users/userInfo`, {
        headers: { token: token },
      })
      .then( async (result) => {
        await getPreComputedAnswer(result.data[0].id)
        setUser_id(result.data[0].id)
      })
  }
 useLayoutEffect( ()=>{
 getUser()
},[])
useEffect(() => {
if(lang==undefined){
  lang=choice
//alert(lang)
}
if(Savedanswers!=undefined &&  Savedanswers.length>0){
setAllAnswer(Savedanswers)
setCurrentQuestionIndex(Savedanswers.length)
    }
    fetchData();
    getQuestion();
  }, []);
  const SearchByid = (arr, n) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id == n) return true;
    }
    return false;
  };
const getPreComputedAnswer = async (user_id)=>{
  await axios.post(`${Shared}/api/users/getAllAnswerOfUser`,{user_id:user_id}).then(response=>{
setComputedAsnwer(response.data)
  })
}
const isExsiste = (question , option ,tag )=>{
  for (let i = 0 ; i< computedAnswers.length ; i ++){ 
if(computedAnswers[i].question.toLowerCase()==question.toLowerCase()){
  if(option=="double") {
    setAnswer(computedAnswers[i].answer) 
  }
else {
  console.log(questions[currentQuestionIndex-1])
  if(tag=="one")
  setAnswer(computedAnswers[i].answer)
  else 
  setCustomInput(computedAnswers[i].answer)

}
}
}
}

const checkInputWithNumber = (str)=> {
for (let i = 0 ; i< str.length; i ++){ 
if(str[i]<'0' || str[i]>'9')
return false  
}
return true 
}
const onDateChange =(date)=>{
setAnswer(date.year()+"/"+(date.month()+1)+"/"+date.dates())
}
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
          l[2].content_FR = "Quel est la date de votre Devis ?";
          l[5].content_FR = "Quel est le numéro de votre Devis ?";
          l[6].content_FR = "Quel est l’année de la Devis ?";
        }
        setQuestions(l);
         if(id== 12 || id==26){
          setRequireRepeat(true)
           }
           console.log(Savedanswers , " this is the Sabed Question ")
if( Savedanswers==undefined  ||Savedanswers.length == 0 ){
           setQuestionId(data.data[0].id);
    setInitialQuestionId(data.data[0].id)
        setQuestionDate(data.data[0].date);
     //   alert(data.data[0].options)
        setOption(data.data[0].options);
        setExplain(data.data[0].explanation);
        settextArea(data.data[0].text_Area);
        if(data.data[0].options=="double"){
          isExsiste(data.data[0].content_FR, "double")
          isExsiste(data.data[1].content_FR," ")  
          }
        else {
        isExsiste(data.data[0].content_FR , data.data[0].options , "one")
       //isExsiste(questions[currentQuestionIndex+2].content_FR, questions[currentQuestionIndex+1].options)
        }
      }else {
          let Length = Savedanswers.length
        //  alert(Length)
         console.log(data.data[Length],"Spposed To Happended")
        setQuestionId(data.data[Length].id);
        setInitialQuestionId(data.data[Length].id)
            setQuestionDate(data.data[Length].date);
            setOption(data.data[Length].options); 
            setExplain(data.data[Length].explanation);
            settextArea(data.data[Length].text_Area);
            if(data.data[Length-1].options=="double"){
              isExsiste(data.data[Length].content_FR, "double")
              isExsiste(data.data[Length+1].content_FR," ")  
              }
            else {
            isExsiste(data.data[Length].content_FR , data.data[Length].options , "one")
    
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
const AddQuestion = async (user_id , question , answer)=>{ 
let ans = computedAnswers.some(item => item.question.toLowerCase()==question.toLowerCase())
if(ans){
//Update 
}
else { 
//ADD 
ans = Const.some(item => item.toLowerCase() == question.toLowerCase())
if(ans && answer.length>0){
await axios.post(`${Shared}/api/users/addAnswer`,{user_id , question , answer}).then(response=> { 
if(response.data=="Added")
console.log("Question Added")
else 
console.log("There is a problem in adding")
})
}
}
}
  const handleNext = async () => {
let Add = questions[currentQuestionIndex].options!=null &&  questions[currentQuestionIndex].options.includes("double") ? 2: 1 
if( number==0&&answer.length==0 && (questions[currentQuestionIndex].text_Area=="nukk" ||questions[currentQuestionIndex].text_Area==null || questions[currentQuestionIndex].text_Area=="null")){
  console.log(questions[currentQuestionIndex] ," this is the ")
  setErrorMessage("input required")
  setBorderStatus(1)
return ;
}
if( number==0&& customInput.length==0 &&  option=="double"){
  //alert("Stopped")
  setErrorMessage("input required")
  setBorderStatusN(1)
return 
}
console.log(questions[currentQuestionIndex])
if(answer.length>0 && (questions[currentQuestionIndex].text_Area=="nukk" ||questions[currentQuestionIndex].text_Area==null || questions[currentQuestionIndex].text_Area=="null") && questions[currentQuestionIndex].options=="number" && !checkInputWithNumber(answer)){
 
  setErrorMessage("input must be only number")
  setBorderStatus(1)
return ; 
}
AddQuestion(user_id,questions[currentQuestionIndex].content_FR,answer)
let  ans1 = false 
if(questions[currentQuestionIndex].date == true||questions[currentQuestionIndex].date=="true" ){
if(answer.length==0){
  console.log("Date Is automaticly")
  ans1=true
  setAnswer(text)
}
}
  if(answer.length==0 && name.length>0 ){
setNameArr(nameArr.concat([name]))
setQuantityArr(quantityArr.concat([number]))
setPriceArr(priceArr.concat([price]))
  setName("")
  setNumber(1)
  setPrice(0)
}else 
   if(customInput.length>0){
  setAllAnswer(prev=>{
  return prev.concat(answer,customInput)
  })
  console.log(allAnswer,"this is all asnwer ")
  
  }else {
        if(selected_contract_id == 8 && questionId == 84   && answer.length>0 || (language!="Francais" && selected_contract_id==8 && questionId==364)){
      alert("fef") 
    
      let T = allAnswer 
     T.push(answer)
     T.push(engagement1)
     T.push(engagement2)
     alert("This is the Question of The Egagement ")
     console.log(T)
     setAllAnswer(T) 
    }
else     
    setAllAnswer(allAnswer.concat([ans1 ? text:answer]))

  }
   console.log(allAnswer ,"What up")
    if(justText>=1)
 setRepeatQuestion(justText)
if(currentQuestionIndex+1 < questions.length -1 ){
if (questions[currentQuestionIndex+1].content_FR=="Quel est votre gouvernorat ?")  {
  setShowSelecter(true)
}
}
if(currentQuestionIndex-1 >0 ){
  if (questions[currentQuestionIndex-1].content_FR=="Quel est votre gouvernorat ?")  { 
    setShowSelecter(false)
  }
  }
  /*
  if (not !== "true") {
    return setShowAlert(true);
 }
*/
if (currentQuestionIndex == questions.length - 1) {
  //alert(contractName)
  setIsDisabled(true)
      setNextBtnText(i18n.t("wait")); //change button text
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
        var res = allAnswer 
        res.push(object.content)
        if(selected_contract_id==12 || realId==26 ){
 for (let i =2 ; i< res.length-1 ; i++)
 res[i] = res[i+1]
res= res.slice(0,res.length-1)
        }
       res= res.concat(nameArr)
        res=res.concat(quantityArr)
        res= res.concat(priceArr)
console.log(object,"hahahahahahahahhaha")
        await axios.post(`${Shared}/api/answers/AddAnswers`, object);
        setQuestionId(questions[currentQuestionIndex].id);
    var Type=  ""
        if(selected_contract_id==12)
          Type = "facture"
          if(realId==25)
          Type= "devis"
          if(selected_contract_id == 37)
          Type = "CIVP"
          if(selected_contract_id==8 )
          Type="engagement"

/***
 * Now When He get To The lsat Question Just Change The   Status In Databse To Archive
 * 
 */
        console.log(object, "hahahahahahahahhaha");
        await axios.post(`${Shared}/api/answers/AddAnswers`, object);
        setQuestionId(questions[currentQuestionIndex].id);
        var twoPages = false;
        await axios
          .post(`${Shared}/api/contractType/fill/${contracts_id}`, {
            type: Type,
            contracts_id: selected_contract_id,
            questions: res,
            lang: lang==undefined ? choice : lang,
          })
          .then((res) => {
            twoPages = res.data;
          });
        let result = await axios.put(
          `${Shared}/api/contractType/updateImage/${contracts_id}`,
          { twoPages: twoPages , user_name:userName  , contractName , contractName:contractName}
        );
        imageUri = result.data;
        console.log(imageUri , " this is the image uri")
        console.log(imageUri, " Image t");
        imageUri = imageUri.split(",");
        navigation.navigate("ViewGeneratedContract", {
          contractName,
          contracts_id,
          imageUri,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
   if(currentQuestionIndex + Add >=questions.length){
Add = 1 
   }
    setCurrentQuestionIndex(currentQuestionIndex + Add );
      setQuestionDate(questions[currentQuestionIndex + Add ].date);
      setOption(questions[currentQuestionIndex + Add ].options);
      setExplain(questions[currentQuestionIndex + Add].explanation);
      settextArea(questions[currentQuestionIndex + Add ].text_Area);
      setIsOptionsDisabled(false);
      setShowNextButton(true);
      setChecked1("");
      setChecked2("");
      setChecked3("");
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
console.log(questionId , " " , questionId-didGoBack , "**** " ,didGoBack , " ****" , allAnswer.length  ," ***" , currentQuestionIndex)
console.log(allAnswer)
 if(allAnswer[currentQuestionIndex]=="***"  ){
  if(currentQuestionIndex >=0&&  questions[currentQuestionIndex].options!=null&&  questions[currentQuestionIndex].options .includes("double") && allAnswer[currentQuestionIndex] == "***" ){
    await  axios.post(`${Shared}/api/answers/updateAnswer` , {content: ans1 ? text:answer , questions_id:initialQuestionId+ (currentQuestionIndex)})
    await  axios.post(`${Shared}/api/answers/updateAnswer` , {content: ans1 ? text:customInput , questions_id:initialQuestionId+ (currentQuestionIndex+1)})
    setQuestionId(questions[currentQuestionIndex + Add].id);
    if(Staty==false ){
    setStaty(true )
    }
    setDidGoBack((prev)=> prev-1)
  } 
  else {
console.log("Test")
  console.log("rere")
if(questions[currentQuestionIndex].options=="doubleNumber"){
let Temp = allAnswer 
Temp.push(number)
Temp.push(number1)
setAllAnswer(Temp)
  await  axios.post(`${Shared}/api/answers/updateAnswer` , {content: number , questions_id:initialQuestionId+ (currentQuestionIndex)})
}
else {
  await  axios.post(`${Shared}/api/answers/updateAnswer` , {content: ans1 ? text:answer , questions_id:initialQuestionId+ (currentQuestionIndex)})
}
setQuestionId(questions[currentQuestionIndex + Add].id);
if(Staty==false ){
setStaty(true )
}
setDidGoBack((prev)=> prev-1)
  }

} else {

  if(questions[currentQuestionIndex].options=="doubleNumber"){

    let object = {
      content: number,
      questions_id: questionId ,
      contracts_id: contracts_id,
      contracts_contract_types_id: selected_contract_id,
    };
    let object1 = {
      content: number1,
      questions_id: questionId+1,
      contracts_id: contracts_id,
      contracts_contract_types_id: selected_contract_id,
    };
      await  axios.post(`${Shared}/api/answers/AddAnswers` , object)
      await  axios.post(`${Shared}/api/answers/AddAnswers` , object1)

      setQuestionId(questions[currentQuestionIndex + Add].id);
    }
    else {  

        let object = {
          content: ans1 ? text:answer,
          questions_id: questionId ,
          contracts_id: contracts_id,
          contracts_contract_types_id: selected_contract_id,
        };
        await axios.post(`${Shared}/api/answers/AddAnswers`, object);
        if(customInput.length>0){
          let object = {
            content: customInput,
            questions_id: questionId+1,
            contracts_id: contracts_id,
            contracts_contract_types_id: selected_contract_id,
          };
          await axios.post(`${Shared}/api/answers/AddAnswers`, object);
        }
        setQuestionId(questions[currentQuestionIndex + Add].id);
      } 
    }

       }
      
      
     catch (error) {
        console.log(error);
      }
    }
    setAnswer("");
    setCustomInput("")
    setBorderStatus(0)
    setNumber1(0)
    setNumber(0)
if(questions[currentQuestionIndex+1].options=="double"){
  //alert("Test")
  console.log(questions[currentQuestionIndex+1] , "********* ", questions[currentQuestionIndex+2])
   isExsiste(questions[currentQuestionIndex+1].content_FR, "double")
   isExsiste(questions[currentQuestionIndex+2].content_FR, questions[currentQuestionIndex+2].options)
}
else {
if(questions[currentQuestionIndex].options =="double"){
  isExsiste(questions[currentQuestionIndex+2].content_FR, "" ,"one")
}
else 
isExsiste(questions[currentQuestionIndex+1].content_FR, "" ,"one")

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
    if (repeateQuestion >= 1 && selected_contract_id == 12) {
      var arr = questions.slice(0, 8);
      var arr1 = [
        {
          content_FR: "Quel est l’adresse de votre société?",
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
          content_FR: "Quel est la Matricule Fiscale de votre société ?",
          date: "n",
          explanation: "n",
          id: 105,
          options: null,
          part2_AR: "n",
          part2_EN: "n",
          part2_FR: "Le fourniseur",
          text_Area: null,
        },
        {
          content_FR: "Quel est la somme de la facture ?",
          date: "n",
          explanation: "n",
          id: 107,
          options: "n",
          part2_AR: "n",
          part2_EN: "n",
          part2_FR:
            "Veuillez écrire le montant total de votre facture En lettres",
          text_Area: null,
        },
      ];
      if (realId == 25)
        arr1[arr1.length - 1].content_FR = "Quel est la somme du Devis ?";
      //Veuillez écrire le montant total de votre devis En lettres
      arr1[arr1.length - 1].part2_FR =
        "Veuillez écrire le montant total de votre devis En lettres";
      console.log(arr1, "Herte");
      for (let i = 0; i < repeateQuestion; i++) {
        arr.push({
          content_FR: `Produit ${i + 1}`,
          date: "n",
          explanation: "n",
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
            title="Explanation !"
            message={explanation}
            closeOnTouchOutside={true}
            showConfirmButton={true}
            confirmText="OK"
            confirmButtonColor="blue"
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

    setCurrentQuestionIndex(currentQuestionIndex - 1);
    setQuestionDate(questions[currentQuestionIndex - 1].date);
    setOption(questions[currentQuestionIndex - 1].options);
    setExplain(questions[currentQuestionIndex - 1].explanation);
    settextArea(questions[currentQuestionIndex - 1].text_Area);
    setAnswer(allAnswer[allAnswer.length-1]) 
  console.log(currentQuestionIndex , " " , allAnswer.length)
    let Temp = allAnswer 
   //  Temp.pop()
   Temp[currentQuestionIndex-1] = "***"
    console.log(Temp)
   setAllAnswer(Temp)
   if(didGoBack==-1)
   setDidGoBack(1)
   else 
   setDidGoBack(didGoBack+1)


/*
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
    }
  };

const customPart2 = ()=>{

  if (language === "content_AR") {
    return questions[currentQuestionIndex]?.part2_AR !== "null" ? (
      <Text style={{
        fontSize: 15,
        color: "grey",
        marginHorizontal: "6%",
        fontFamily: "Gothic",
        paddingBottom:"15%"
    

      }}>
        {questions[currentQuestionIndex]?.part2_AR}
      </Text>
    ) : null;
  } else if (language === "content_FR") {
    return questions[currentQuestionIndex]?.part2_FR !== "null" ? (
      <Text style={{    
        fontSize: 15,
        color: "grey",
        marginHorizontal: "6%",
        fontFamily: "Gothic",
        paddingBottom:"15%"
    }}>
        {questions[currentQuestionIndex]?.part2_FR}
      </Text>
    ) : null;
  } else {
    return questions[currentQuestionIndex]?.part2_EN !== "null" ? (
      <Text style={{    fontSize: 15,
        color: "grey",
        marginHorizontal: "6%",
        fontFamily: "Gothic",
        paddingBottom:"15%"
    }}>
        {questions[currentQuestionIndex]?.part2_EN}
      </Text>
    ) : null;
  }


}

  const renderView = () => {
 if(option=="doubleNumber"){

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
<TouchableOpacity  onPress={()=>{
if(number>1){
setNumber(number-1)  ;
}
}}>
  <View style={{
    position:"static",
marginRight:20,
backgroundColor:"#dbddde",
height:50 , 
width:50  , 
borderRadius:50,
alignItems:"center" , 
justifyContent:"center",
}}>
<Text style={{
  fontSize:20,
  fontWeight:"800",
}} >-</Text>
</View>
</TouchableOpacity>
<Text style={{
fontSize:20,

}}>{number}</Text>
<TouchableOpacity onPress={()=>{
setNumber(number+1)
}}>
<View style={{
marginLeft:20,
backgroundColor:"#dbddde",
height:50 , 
width:50  , 
borderRadius:50,
alignItems:"center" , 
justifyContent:"center",
}}>
<Text style={{
  fontSize:20,
  fontWeight:"800",
  
}}  >+</Text>
</View>
</TouchableOpacity>
</View>
<View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            marginBottom: "10%",
            paddingBottom:"1%"
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
        <Text style={{
    fontSize: 20,
    paddingBottom:"1%",
    color: "black",
    marginHorizontal: "5%",
    fontFamily: "Gothic_Bold",
}}>{questions[currentQuestionIndex+1].content_FR}</Text>
{customPart2()}



<View
            style={{
              marginHorizontal: 20,
              marginVertical: "1%",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              paddingBottom:"9%"
            }}
          >  
<TouchableOpacity  onPress={()=>{
if(number1>1){
setNumber1(number1-1)  ;
}
}}>
  <View style={{
    position:"static",
marginRight:20,
backgroundColor:"#dbddde",
height:50 , 
width:50  , 
borderRadius:50,
alignItems:"center" , 
justifyContent:"center",
}}>
<Text style={{
  fontSize:20,
  fontWeight:"800",
}} >-</Text>
</View>
</TouchableOpacity>
<Text style={{
fontSize:20,
}}>{number1}</Text>
<TouchableOpacity onPress={()=>{
setNumber1(number1+1)
}}>
<View style={{
marginLeft:20,
backgroundColor:"#dbddde",
height:50 , 
width:50  , 
borderRadius:50,
alignItems:"center" , 
justifyContent:"center",
}}>
<Text style={{
  fontSize:20,
  fontWeight:"800",
}}  >+</Text>
</View>
</TouchableOpacity>
</View>
</View> 
)
}
if(selected_contract_id==8 && questionId==84 || ( (language!="Francais" &&questionId==364 ))){
return (
<View stlye={{
}}>
<View style={{
  marginBottom:"10%" , 
 paddingBottom:10 , 
}}>
<TextInput
    style={[{
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor:  "black",
    padding: 5,
    fontSize: 20,
    borderRadius: 10,
    marginVertical: "1%",
    position: "relative",
    fontFamily: "Gothic",
    borderBottomColor:borderStatus>0 ? "red" :  "black" , 
    }]}
     onFocus={()=>{
   if(borderStatus>0)
   setBorderStatus(0)
              }}
    onChangeText={(content) => {
    setAnswer(content)}}
    value={answer}
    placeholder={lang=="Francais" ? i18n.t("engagementFr") : i18n.t("engagementAr") }
            />
<Text style={{
display : borderStatus>0 ? "flex" : "none" , 
marginLeft:"10%", 
fontFamily: "Gothic_Bold",
color:"red"
}}>{errorMessage}</Text>
</View>
<View style={{
  marginBottom:"10%" , 
  paddingBottom:10 , 
}}>
<TextInput
    style={[{
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor:  "black",
    padding: 5,
    fontSize: 20,
    borderRadius: 10,
    marginVertical: "1%",
    position: "relative",
    fontFamily: "Gothic",
    borderBottomColor:  "black" , 
    }]}
     onFocus={()=>{
   if(borderStatus>0)
   setBorderStatus(0)
              }}
    onChangeText={(content) => {
    setEngagement1(content)}}
    value={engagement1}
    placeholder={lang=="Francais" ? i18n.t("engagementFr") : i18n.t("engagementAr") }
            />
<Text style={{
display : borderStatus>0 ? "flex" : "none" , 
marginLeft:"10%", 
fontFamily: "Gothic_Bold",
color:"red"
}}></Text>
</View>


<View style={{
 paddingBottom:30 , 

}}>
<TextInput
    style={[{
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor:  "black",
    padding: 5,
    fontSize: 20,
    borderRadius: 10,
    marginVertical: "1%",
    position: "relative",
    fontFamily: "Gothic",
    borderBottomColor:borderStatus>0 ? "red" :  "black" , 
    }]}
     onFocus={()=>{
   if(borderStatus>0)
   setBorderStatus(0)
              }}
    onChangeText={(content) => {
    setEngagement2(content)}}
    value={engagement2}
    placeholder={lang=="Francais" ? i18n.t("engagementFr") : i18n.t("engagementAr")  }
            />
<Text style={{
display : borderStatus>0 ? "flex" : "none" , 
marginLeft:"10%", 
fontFamily: "Gothic_Bold",
color:"red"
}}></Text>
</View>
</View>
)
}
    if (
      questions[currentQuestionIndex]?.special == 1 &&
      selected_contract_id == 12
    ) {
      console.log("We made it");
      return (
        <View style={{ justifyContent: "center", marginTop: 10 }}>

          
          <Text style={{ marginLeft: 20, fontSize: 20, color: "black" }}>
            Nom du Produit{" "}
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={(content) => setName(content)}
            value={name}
            placeholder={i18n.t("typeHere")}
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
<TouchableOpacity onPress={()=>{
if(number>1){
setNumber(number-1)  ;
}
}}>
  <View style={{
    position:"static",
marginRight:20,
backgroundColor:"#dbddde",
height:50 , 
width:50  , 
borderRadius:50,
alignItems:"center" , 
justifyContent:"center",
}}>
<Text style={{
  fontSize:20,
  fontWeight:"800",
}} >-</Text>
</View>
</TouchableOpacity>
<Text style={{
fontSize:20,

}}>{number}</Text>
<TouchableOpacity onPress={()=>{
setNumber(number+1)
}}>
<View style={{
marginLeft:20,
backgroundColor:"#dbddde",
height:50 , 
width:50  , 
borderRadius:50,
alignItems:"center" , 
justifyContent:"center",
}}>
<Text style={{
  fontSize:20,
  fontWeight:"800",
  
}}  >+</Text>
</View>
</TouchableOpacity>
</View>
  <Text style={{ marginLeft:20, fontSize: 20, color: "black" }} >Prix du Produit  </Text>
  <TextInput
        style={styles.input}
        onChangeText={(content) => setPrice(content)}
        value={price}
        placeholder={i18n.t("typeHere")}
      />
</View> 
)
}

/***
 * 
TODO: 
*Separete the two input int double option
*make the Backend Function convert to true forme 
*PopUp in Share Contract
- Fix the function that add answer automatecly 
 */
if(option != null&& option=="doubleReverse"){
return (
<View style={{
flex:1 , 
justifyContent:"center" , 
alignContent:"center",
marginTop:-60
}}>
<View>
<TextInput
    style={[{
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor:  "red",
    padding: 5,
    fontSize: 20,
    borderRadius: 10,
    marginVertical: "1%",
    position: "relative",
    fontFamily: "Gothic",
    borderBottomColor:borderStatus>0 ? "red" :  "black" , 
    }]}
     onFocus={()=>{
   if(borderStatus>0)
   setBorderStatus(0)
              }}
    onChangeText={(content) => {
    setAnswer(content)}}
    value={answer}
    placeholder={i18n.t("typeHere")}
            />
  <Text style={{
    display : borderStatus>0 ? "flex" : "none" , 
marginLeft:"10%", 
fontFamily: "Gothic_Bold",
color:"red"
}}>{errorMessage}</Text>
</View>
 <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            marginBottom: "10%",
            paddingBottom:"5%"
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
              borderRadius: 40,
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
              borderRadius: 40,
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
              borderRadius: 40,
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
)
}
if( option !=null &&option.includes("double")){
return (
<View style={{
flex:1 , 
justifyContent:"center" , 
alignContent:"center",
marginTop:-40
}}>
{
option=="doubleInput" ? 
 (
<View>
<TextInput
    style={[{
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor:  "red",
    padding: 5,
    fontSize: 20,
    borderRadius: 10,
    marginVertical: "1%",
    position: "relative",
    fontFamily: "Gothic",
    borderBottomColor:borderStatus>0 ? "red" :  "black" , 
    }]}
     onFocus={()=>{
   if(borderStatus>0)
   setBorderStatus(0)
              }}
    onChangeText={(content) => {
    setAnswer(content)}}
    value={answer}
    placeholder={i18n.t("typeHere")}
            />
  <Text style={{
    display : borderStatus>0 ? "flex" : "none" , 
marginLeft:"10%", 
fontFamily: "Gothic_Bold",
color:"red"
}}>{errorMessage}</Text>
</View>
) :( 
<View> 
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
            <TouchableOpacity  style={{
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
            }}>
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
<Text style={{
    fontSize: 20,
    color: "black",
    marginHorizontal: "5%",
    fontFamily: "Gothic_Bold",
}}>{questions[currentQuestionIndex+1].content_FR}</Text>
            <TextInput
              style={[styles.input, {
                borderBottomColor:borderStatusN>0 ? "red" :  "black" , 
              }]}
              onFocus={()=>{
   if(borderStatusN>0)
   setBorderStatusN(0)
              }}
              onChangeText={(content) => {
                setCustomInput(content)}}
              value={customInput}              placeholder={i18n.t("typeHere")}
            />
<Text style={{
  display : borderStatusN>0 ? "flex" : "none" , 
  bottom:29,
marginLeft:"10%", 
fontFamily: "Gothic_Bold",
color:"red"
}}>{errorMessage}</Text>
  </View>
)
}  
    if (option === "civilite") {
      return (
        <View style={{flex:1,justifyContent:'center',alignItems:"center",flexDirection:"column",marginTop:-30 }}>
          <TouchableOpacity
            style={{
              borderWidth: 3,
              borderColor: checked1 ? "#00C851" : "#1E90FF" + "40",
              backgroundColor: "#1E90FF" + "20",
              height: 60,
              borderRadius: 40,
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
              borderRadius: 40,
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
    } else if (option == "status") {
      return (
        <View style={{ alignItems: "center", marginTop: -30 }}>
          <TouchableOpacity
            style={{
              borderWidth: 3,
              borderColor: checked1 ? "#00C851" : "#1E90FF" + "40",
              backgroundColor: "#1E90FF" + "20",
              height: 60,
              borderRadius: 40,
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
              borderRadius: 40,
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
              borderRadius: 40,
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
    } else if (option == "form") {
      return (
        <View style={{ alignItems: "center", marginTop: -30 }}>
          <TouchableOpacity
            style={{
              borderWidth: 3,
              borderColor: checked1 ? "#00C851" : "#1E90FF" + "40",
              backgroundColor: "#1E90FF" + "20",
              height: 60,
              borderRadius: 40,
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
              borderRadius: 40,
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
              borderRadius: 40,
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
              borderRadius: 40,
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
              borderRadius: 40,
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
              borderRadius: 40,
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
              borderRadius: 40,
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
              borderRadius: 40,
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
              borderRadius: 40,
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
              borderRadius: 40,
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
              borderRadius: 40,
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
            <CalendarPicker
              startFromMonday={true}
              allowRangeSelection={false}
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
              todayTextStyle={{ color: "#8FBC8F" }}
              todayBackgroundColor={{ color: "white" }}
              selectedDayTextColor="white"
              selectedDayStyle={{ backgroundColor: "grey" }}
              scaleFactor={375}
              scrollable={true}
              textStyle={{
                fontFamily: "Gothic_Bold",
                color: "#191970",
              }}
              onDateChange={onDateChange}
            />
          </SafeAreaView>

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
              borderRadius: 40,
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
              borderRadius: 40,
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
              borderRadius: 40,
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
    } else {
      return (
        <View style={{ justifyContent: "center" }}>
          {
          textArea=="selector" ? 
          (
            <View style={{
              flex: 1,
              
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 15 , 
              paddingBottom:20,
            }}>
         <PickerModal
                  renderSelectView={(disabled, selected, showModal) =>      
        <TouchableOpacity onPress={showModal}>
         <View style={{
          alignItems:"center",
        width:300 , 
        height:50 , 
        borderWidth:1, 
        borderRadius:10,
        flexDirection:"row"
         }}>
        <Text style={{
        fontSize:15,
        marginBottom:3,
        marginLeft:10,
        color:"#9aa3b1",
        }}>{selectedItem=="" ? "Select votre Governat": selectedItem.Name }</Text>
        <Image style={{
          position:"absolute",
        width:20 , 
        height:20, 
        left:255,
        zIndex:5,
        }} source={arrow} />
        </View>
        </TouchableOpacity>
                  }
                  onSelected={(selected)=>{
                    //        setAnswer(selected.Name)  
        setselectedItem(selected)
        setAllAnswer((prev)=>{
         return prev.concat(selected.Name)
        })
        console.log(selected.Name)
                  }}
                  items={data}
                  sortingLanguage={'tr'}
                  showToTopButton={true}
                  selected={selectedItem}
                  autoGenerateAlphabeticalIndex={true}
                  showAlphabeticalIndex={true}
                  selectPlaceholderText={'Choose one...'}
                  onEndReached={() => console.log('list ended...')}
                  searchPlaceholderText={'Search...'}
                  requireSelection={false}
                  autoSort={false}
                />
            </View>
          )
          :
          explanation !== "null" ? (
            <Text
              style={{ marginLeft: "87%", position: "relative" }}
              onPress={() => setShowAlert1(true)}
            >
              <Ionicons
                name="information-circle-outline"
                size={24}
                color="blue"
              />
            </Text>
          ) : null}
          {textArea == "nukk" || textArea==null || textArea=='NULL' || textArea=="null" ? (
          <View>
            <TextInput
              style={[styles.input, {
                borderBottomColor:borderStatus>0 ? "red" :  "black" , 
              }]}
              onFocus={()=>{
                if(borderStatus>0)
   setBorderStatus(0)
              }}
              onChangeText={(content) => setAnswer(content)}
              value={answer}
              placeholder={i18n.t("typeHere")}
            />
<Text style={{
  display : borderStatus>0 ? "flex" : "none" , 
  bottom:20,
marginLeft:"10%", 
fontFamily: "Gothic_Bold",
color:"red"
}}>{errorMessage}</Text>
            </View>
          ) : requireRepeat && textArea=="product" ? 
          <View style={{
            flex: 1,
 justifyContent:"center" , 
 alignItems:"center" ,
          }}>
            <Text style={{
    paddingBottom:20,
    fontSize:20,
            }}>{justText}</Text>
          {slider()}
          </View>
          : textArea=="big" ?(
            <View style={styles.textcontainer}>
              <Textarea
                containerStyle={styles.textareaContainer}
                style={styles.textarea}
                onChangeText={(content) => setAnswer(content)}
                defaultValue={answer}
                maxLength={950}
                placeholder={i18n.t("typeHere")}
                placeholderTextColor={"#c7c7c7"}
                underlineColorAndroid={"transparent"}
              />
            </View>
          ) : null}
          <Feather
            onPress={() => {
              setAnswer("");
            }}
            name="x"
            size={showSelecter || textArea=="selector" ? 0 : 20}
            color="gray"
            style={{ position: "absolute", right: 30 }}
          ></Feather>
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
                fontSize: 18,
                letterSpacing: 1.5,
                textAlign: "center",
                position: "relative",
                fontFamily: "Gothic_Bold",
                color: "black",
              }}
            >
              BACK
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
            backgroundColor: isDisabled ? "#4987e9"  : "#1C6AE4" ,
            elevation: 10,
            shadowColor: "#1C6AE4",

          }}
        >
          <Text
            style={{
              fontSize: 18,
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

<View style={{  display :currentQuestionIndex==0 ?"flex" : "none" ,   heigh: 20, width: 50, marginLeft: 5  }}>
<TouchableHighlight
  underlayColor={colors.touch}
  style={{
    borderRadius: 20,
    padding: 7,
    marginTop: 2,

  }}
  onPress={() => {
console.log("Clicked")

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
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
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
            {i18n.t("signUpSuccess")}
          </Text>
          <Text style={{ fontSize: 25, marginTop: -16, marginBottom: 32 }}>
            {i18n.t("checkValidation")}
          </Text>
        </FancyAlert>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  input: {
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor:  "black",
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
    marginTop: "-20%",
  },
  textareaContainer: {
    height: 200,
    padding: 5,
    width:300,
    backgroundColor: "#F5FCFF",
  },
  textarea: {
    textAlignVertical: "top", // hack android
    height: 170,
    fontSize: 20,
    color: "#333",
  },
});
export default Questions;