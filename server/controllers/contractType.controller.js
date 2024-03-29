const db = require("../database-mysql");
const superagent = require("superagent");
const Docxtemplater = require("docxtemplater");
const PizZip = require("pizzip");
const http = require("https");
const fs = require("fs");
const cloudinary = require("../utils/cloudinary");
const FormData = require("form-data");
const axios = require("axios");
const Excel = require("exceljs");
var convertapi = require("convertapi")("sEkLKXrXWNU0GXLS");
const cheerio = require("cheerio");
const https = require("https");
/***
 *
 *
 * TODO:
 * Function For When user Accept Change The Picture Of it  (With Some Optimization)
 * USE:
 * https://www.npmjs.com/package/node-html-to-image
 *
 */

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
  n = ("000000000" + num)
    .substr(-9)
    .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return;
  var str = "";
  str +=
    n[1] != 0
      ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "milliard "
      : "";
  str +=
    n[2] != 0
      ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "million "
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
  return str.substring(0, 2) == "Un" ? str.slice(3) : str;
}
function inWordsThreeDigits(num) {
  if (num < 0 || num > 999) {
    return "Invalid input. Please enter a number between 0 and 999.";
  }

  var result = "";

  if (num >= 100) {
    result += a[Math.floor(num / 100)] + "cent ";
    num %= 100;
  }

  if (num >= 20) {
    result += b[Math.floor(num / 10)] + " ";
    num %= 10;
  }

  if (num > 0 || result === "") {
    result += a[num];
  }

  return result.trim();
}
// numberToWords(1425800) + " millimes"

const getCount = (req, res) => {
  console.log("test");
  const lang = req.params.lang;

  db.query(
    `select count(*) as count ,  c.${lang} from contracts t inner join contract_types c on (c.id = t.contract_types_id) GROUP BY c.${lang}`,
    (err, rez) => {
      if (err) res.send(err);
      else res.send(rez);
    }
  );
};

var ChangeStatusInContract = async (req, res) => {
  const { image_url, user_name, tag } = req.body;
  const output = fs.createWriteStream("test.html");
  db.query(
    `SELECT * from contracts where contract_image='${image_url}'`,
    async (err, result) => {
      if (err) {
        console.log(err);
        res.send("Check the Url ");
      } else
        await convertapi
          .convert(
            "html",
            {
              File: result[0].contract_url,
            },
            "docx"
          )
          .then(function ({ file }) {
            https.get(file.url, async (response) => {
              response.pipe(output);
              output.on("finish", () => {
                fs.readFile(
                  "./test.html",
                  { encoding: "utf-8" },
                  (err, res1) => {
                    if (err) {
                      console.log(err);
                    }
                    let data = res1;
                    let arr = data.split("\n");
                    for (let i = 0; i < arr.length; i++) {
                      for (let j = 0; j < arr[i].length; j++) {
                        var str = arr[i].substring(j, "Signature".length + j);
                        if (str == "Signature") {
                          let final = arr[i].split("Signature");
                          let Final =
                            final[0] + `Signer Par ${user_name} ` + final[1];
                          arr[i] = Final;
                          fs.writeFile("Final.html", arr.join("\n"), (err) => {
                            if (err) console.log(err);
                            else {
                              convertapi
                                .convert(
                                  "docx",
                                  {
                                    File: "Final.html",
                                  },
                                  "html"
                                )
                                .then(function (result3) {
                                  convertapi
                                    .convert(
                                      "png",
                                      {
                                        File: result3.file.url,
                                      },
                                      "docx"
                                    )
                                    .then(function (result4) {
                                      db.query(
                                        `UPDATE contracts set contract_image="${result4.file.url}" where contract_image="${image_url}"`,
                                        (err, resultF) => {
                                          if (err) {
                                            console.log(err);
                                          } else {
                                            /**
                                             * FIXME:
                                             * Chnage The HTML TO DOCX Then TO PNG to get the correct Format
                                             *
                                             *
                                             *
                                             */
                                            res.send(resultF);
                                          }
                                        }
                                      );
                                    });
                                });
                            }
                          });
                        }
                      }
                    }
                  }
                );
              });
            });
          });
    }
  );
};
var createDocAndImage = async (str, index, renderObject) => {
  const response = await superagent
    .get(str)
    .parse(superagent.parse.image)
    .buffer();
  const buffer = response.body;
  const zip = new PizZip(buffer);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });
  doc.render(renderObject);
  const buf = doc.getZip().generate({
    type: "nodebuffer",
    // compression: DEFLATE adds a compression step.
    // For a 50MB output document, expect 500ms additional CPU time
    compression: "DEFLATE",
  });
  fs.writeFileSync(`output${index}.docx`, buf);
  try {
    const formData = new FormData();
    formData.append(
      "instructions",
      JSON.stringify({
        parts: [
          {
            file: "document",
          },
        ],
        output: {
          type: "image",
          format: "jpg",
          dpi: 50000,
        },
      })
    );
    return "added docx and image";
  } catch (error) {
    return "from cloudinary image";
  }
};
const makeFactureOrDevis = async (url, ans, type, language) => {
  console.log(ans, "ans ::11111");
  console.log(type, "ans ::type");
  console.log(url, "ans ::url");
  const file = fs.createWriteStream("file.xlsx");
  http.get(url, function (response) {
    response.pipe(file);
    file.on("finish", async () => {
      file.close();
      let t = "";
      if (language == "fr") t = "le " + ans[2];
      else {
        t = " و " + ans[2];
      }
      const workbook = new Excel.Workbook();
      await workbook.xlsx.readFile(`file.xlsx`).then(async () => {
        workbook.worksheets[0].getCell("B39").numFmt = "0.000";
        workbook.worksheets[0].getCell("B39").value = "0.600";
        workbook.worksheets[0].getCell("C17").value =
          " /° N " + type.toUpperCase();
        workbook.worksheets[0].getCell("A1").value = ans[0];
        workbook.worksheets[0].getCell("B9").value = ans[1] + t;
        workbook.worksheets[0].getCell("B12").value = ans[3];
        let Temp = ans[4];
        workbook.worksheets[0].getCell("B13").value = parseInt(ans[4]);
        workbook.worksheets[0].getCell("B13").numFmt = "0";
        workbook.worksheets[0].getCell("C17").value =
          ans[5] + workbook.worksheets[0].getCell("C17").value;
        let sum = 0;
        let length = Math.ceil((ans.length - 12) / 3);
        let j = ans.length - length * 3;
        let f = j;
        let k = j + length;
        let r = k + length;
        for (let i = 22; i < 22 + length; i++) {
          sum += parseFloat(ans[k]) * parseFloat(ans[r]);
          workbook.worksheets[0].getCell(`E${i}`).value = ans[j++];
          workbook.worksheets[0].getCell(`D${i}`).value = ans[k++];
          workbook.worksheets[0].getCell(`C${i}`).value = ans[r++];
          workbook.worksheets[0].getCell(`B${i}`).value =
            parseFloat(ans[k - 1]) * parseFloat(ans[r - 1]);
        }
        workbook.worksheets[0].getCell("B34").value = parseFloat(sum);
        workbook.worksheets[0].getCell("B37").value = (sum * 19) / 100;
        workbook.worksheets[0].getCell("B41").value =
          workbook.worksheets[0].getCell("B37").value +
          workbook.worksheets[0].getCell("B34").value +
          0.6;
        workbook.worksheets[0].getCell("B41").numFmt = "0.000";
        var arr = workbook.worksheets[0]
          .getCell("D46")
          .value.split("..................................................:");
        arr[0] = ans[f - 1];
        let temp = arr[0];
        arr[0] = arr[1];
        arr[1] = temp;
        arr = arr.join(" ");
        //Fix it
        workbook.worksheets[0].getCell("D46").value = arr;
        workbook.worksheets[0].getCell("B52").value = ans[f - 3];
        workbook.worksheets[0].getCell("B53").value =
          ans[f - 2] + " : الدليل الجبائي للحريف";
        await workbook.xlsx.writeFile("output0.xlsx");
        try {
          const formData = new FormData();
          formData.append(
            "instructions",
            JSON.stringify({
              parts: [
                {
                  file: "document",
                },
              ],
              output: {
                type: "image",
                format: "jpg",
                dpi: 500,
              },
            })
          );
        } catch (e) {
          const errorString = await streamToString(e.response.data);
        }
      });
      function streamToString(stream) {
        const chunks = [];
        return new Promise((resolve, reject) => {
          stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
          stream.on("error", (err) => reject(err));
          stream.on("end", () =>
            resolve(Buffer.concat(chunks).toString("utf8"))
          );
        });
      }
    });
  });
  return "Hi";
};
let makeFactureOrDevisFr = (url, ans, type, language) => {
  const file = fs.createWriteStream("file.xlsx");
  https.get(url, function (response) {
    response.pipe(file);
    file.on("finish", async () => {
      file.close();
      console.log("Download Completed");
      const workbook = new Excel.Workbook();
      await workbook.xlsx.readFile(`file.xlsx`).then(async () => {
        workbook.worksheets[0].getCell("C17").value =
          type.toUpperCase() + " N ° \\";
        workbook.worksheets[0].getCell("A1").value = ans[0];
        workbook.worksheets[0].getCell("B9").value = ans[1] + " le " + ans[2];
        workbook.worksheets[0].getCell("D12").value = ans[3];
        let Temp = ans[4];
        workbook.worksheets[0].getCell("D14").font = {
          bold: false,
        };
        workbook.worksheets[0].getCell("D14").value = ans[5];
        workbook.worksheets[0].getCell("D13").value = ans[4];
        workbook.worksheets[0].getCell("D13").numFmt = "0";
        workbook.worksheets[0].getCell("C17").value =
          workbook.worksheets[0].getCell("C17").value + ans[6];
        (workbook.worksheets[0].getCell("E38").value = 1), 000;
        let sum = 0;
        let length = Math.ceil((ans.length - 12) / 3);
        let j = ans.length - length * 3;
        let f = j;
        let k = j + length;
        let r = k + length;
        console.log("The length is ", length);
        for (let i = 22; i < 22 + length; i++) {
          workbook.worksheets[0].getCell(`B${i}`).font = {
            bold: false,
          };
          console.log(" The loop for j  is ", ans[j]);
          console.log(" The loop for k  is ", ans[k]);
          console.log(" The loop for r  is ", ans[r]);
          sum += parseFloat(ans[k]) * parseFloat(ans[r]);
          workbook.worksheets[0].getCell(`B${i}`).value = ans[j++];
          workbook.worksheets[0].getCell(`C${i}`).value = ans[k++];
          workbook.worksheets[0].getCell(`D${i}`).value = ans[r++];
          workbook.worksheets[0].getCell(`E${i}`).value =
            parseFloat(ans[k - 1]) * parseFloat(ans[r - 1]);
          console.log("This is the sum so far ", sum);
        }
        workbook.worksheets[0].getCell("E34").value = parseFloat(sum);
        workbook.worksheets[0].getCell("E36").value =
          (parseInt(workbook.worksheets[0].getCell("E34").value) * 19) / 100;
        console.log(parseInt(workbook.worksheets[0].getCell("E36").value));
        console.log(workbook.worksheets[0].getCell("E34").value);
        workbook.worksheets[0].getCell("E41").value =
          workbook.worksheets[0].getCell("E36").value +
          workbook.worksheets[0].getCell("E34").value +
          1.0;
        //workbook.worksheets[0].getCell("E41").numFmt= "0.000"
        var arr = workbook.worksheets[0].getCell("D46").value.split(" ");
        console.log(arr);
        console.log(f);
        arr[1] = type == "devis" ? "le" : "la";
        var lastFive = inWordsThreeDigits(parseInt(workbook.worksheets[0].getCell("E41").value.substr(value.length -3)))
        //fares.substr(fares.length - 3)
        arr[arr.length - 1] =
          inWords(parseInt(workbook.worksheets[0].getCell("E41").value)) + lastFive
          "Dinars";
        arr[3] = type;
        arr = arr.join(" ");
        //Fix it
        workbook.worksheets[0].getCell("D46").value = arr;
        workbook.worksheets[0].getCell("B52").value = ans[f - 2];
        workbook.worksheets[0].getCell("B53").value = "MF:" + ans[f - 1];
        console.log("We are Here ");
        await workbook.xlsx.writeFile("output0.xlsx");
        try {
          const formData = new FormData();
          formData.append(
            "instructions",
            JSON.stringify({
              parts: [
                {
                  file: "document",
                },
              ],
              output: {
                type: "image",
                format: "jpg",
                dpi: 500,
              },
            })
          );
          console.log("Here");
        } catch (e) {
          console.log(e);
          const errorString = await streamToString(e.response.data);
        }
      });
      function streamToString(stream) {
        const chunks = [];
        return new Promise((resolve, reject) => {
          stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
          stream.on("error", (err) => reject(err));
          stream.on("end", () =>
            resolve(Buffer.concat(chunks).toString("utf8"))
          );
        });
      }
    });
  });
  return "Hi";
};
const verify = (arr) => {
  if (arr[8].length == 0 && arr[9].length > 0) {
    arr[8] = arr[9];
    arr[9] = "";
  }
  return arr;
};
const verifyAr = (arr) => {
  if (arr[5].length == 0 && arr[6].length > 0) {
    arr[5] = arr[6];
    arr[6] = "";
  }
  return arr;
};
var makeEgagement = async (url, question, idBegin, length) => {
  let renderedDoc = {};
  let Minis = 0;
  question = verify(question);
  if (question[8].length == 0) Minis = 2;
  else if (question[9].length == 0) Minis = 1;
  for (let i = 0; i < 3; i++) {
    renderedDoc[(840 + i * 10).toString()] = "-";
  }
  if (Minis > 0) {
    if (Minis == 1) {
      renderedDoc["860"] = "";
    }
    if (Minis == 2) {
      renderedDoc["850"] = "";
      renderedDoc["860"] = "";
    }
  }
  for (let i = idBegin; i <= 88; i++) {
    renderedDoc[i.toString()] = question[i - idBegin];
  }
  const response = await superagent
    .get(url)
    .parse(superagent.parse.image)
    .buffer();
  const buffer = response.body;
  const zip = new PizZip(buffer);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });
  doc.render(renderedDoc);
  const buf = doc.getZip().generate({
    type: "nodebuffer",
    // compression: DEFLATE adds a compression step.
    // For a 50MB output document, expect 500ms additional CPU time
    compression: "DEFLATE",
  });
  fs.writeFileSync(`output${0}.docx`, buf);
  try {
    const formData = new FormData();
    formData.append(
      "instructions",
      JSON.stringify({
        parts: [
          {
            file: "document",
          },
        ],
        output: {
          type: "image",
          format: "jpg",
          dpi: 500,
        },
      })
    );
    return "added docx and image";
  } catch (error) {
    return "from cloudinary image";
  }
};
var makeEgagementAr = async (url, question, idBegin, length) => {
  let renderedDoc = {};
  let Minis = 0;
  question = verifyAr(question);
  if (question[5].length == 0) Minis = 2;
  else if (question[6].length == 0) Minis = 1;
  for (let i = 0; i < 3; i++) {
    renderedDoc[3640 + i * 10] = "-";
  }
  if (Minis > 0) {
    if (Minis == 1) {
      renderedDoc["3660"] = "";
    }
    if (Minis == 2) {
      renderedDoc["3650"] = "";
      renderedDoc["3660"] = "";
    }
  }
  for (let i = idBegin; i <= 368; i++) {
    renderedDoc[i.toString()] = question[i - idBegin];
  }
  const response = await superagent
    .get(url)
    .parse(superagent.parse.image)
    .buffer();
  const buffer = response.body;
  const zip = new PizZip(buffer);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });
  doc.render(renderedDoc);
  const buf = doc.getZip().generate({
    type: "nodebuffer",
    // compression: DEFLATE adds a compression step.
    // For a 50MB output document, expect 500ms additional CPU time
    compression: "DEFLATE",
  });
  fs.writeFileSync(`output${0}.docx`, buf);
  try {
    const formData = new FormData();
    formData.append(
      "instructions",
      JSON.stringify({
        parts: [
          {
            file: "document",
          },
        ],
        output: {
          type: "image",
          format: "jpg",
          dpi: 500,
        },
      })
    );
    return "added docx and image";
  } catch (error) {
    return "from cloudinary image";
  }
};
let QuestionIdForMin = [
  4, 23, 41, 45, 100, 107, 157, 161, 164, 166, 167, 170, 171, 186, 230, 250,
  261, 273, 280, 290, 297, 298, 344, 359, 360, 361, 357, 360, 365, 352,
];
const addAnswersToAnswerTable = async (req, res) => {
  const {
    question,
    initialQuestionId,
    contracts_id,
    contract_types_id,
    questionsLength,
  } = req.body;
  console.log(questionsLength, " * ", question.length);
  if (
    initialQuestionId == -1 ||
    questionsLength - 1 == question.length ||
    question.length == 0
  ) {
    console.log("Here");
    res.end("Error Id");
  } else {
    console.log(question);
    console.log(initialQuestionId);
    console.log(contracts_id);
    console.log(contract_types_id);
    console.log(questionsLength);
    question.map((element, index) => {
      db.query(
        `INSERT INTO answers (content,contracts_id,contracts_contract_types_id,questions_id) VALUES ('${element}',${contracts_id},${contract_types_id},${
          initialQuestionId + index
        })`,
        (err, result) => {
          if (err) {
            console.log(err);
            res.send(err);
          } else {
            console.log(
              ` question id  :${
                initialQuestionId + index
              } with content ${element} has been added`
            );
            console.log(index, "***", question.length);
            if (index == question.length - 1)
              res.send(question.length.toString());
          }
        }
      );
    });
  }
};
let Existe = (begin, end) => {
  let Temp = [];
  for (let i = 0; i < QuestionIdForMin.length; i++) {
    if (QuestionIdForMin[i] >= begin && QuestionIdForMin[i] <= end) {
      Temp.push(QuestionIdForMin[i]);
    }
  }
  return Temp;
};
let makeMin = (question, id) => {
  let begin = id;
  let end = question.length + id;
  let Result = Existe(begin, end);
  for (let i = 0; i < Result.length; i++) {
    question[Result[i] - id] = question[Result[i] - id].toLowerCase();
  }
  return question;
};

const fillContract = async (req, res) => {
  let urlImage = "";
  let docUrl = "";
  let { type, lang, initialQuestionId } = req.body;
  let { questions } = req.body;
  questions = makeMin(questions, initialQuestionId);
  if (type == "devis") {
    questions = questions
      .slice(0, 5)
      .concat(questions.slice(5, 8).reverse())
      .concat(questions.slice(8));
    console.log(questions, "this is after reversing..");
    //  [questions[6],questions[7]] = [questions[7],questions[6]]
    let t = questions[5];
    questions[5] = questions[7];
    questions[7] = t;
    let x = questions[6];
    questions[6] = questions[7];
    questions[7] = x;

    let y = questions[5];
    questions[5] = questions[6];
    questions[6] = y;
    console.log(questions, "this is after swapping ");
  }

  let renderObject = {};
  let answersArray = [];
  const { id } = req.params;
  const sql = `select template_FR,template_AR,template_EN   from contract_types
  where contract_types.id = ?`;
  db.query(sql, [id], async (err, result) => {
    if (err) res.send(err);
    else {
      answersArray = questions.map((element, index) => {
        let key = initialQuestionId + index;
        let object = {};
        object[key] = element;
        return object;
      });
      renderObject = answersArray.reduce((acc, e, i) => {
        let key = Object.keys(e)[0];
        let value = Object.values(e)[0];
        acc[key] = value;
        return acc;
      }, {});
      // res.send(result);
      var url = "";
      if (lang === "Arabe") {
        url = result[0].template_AR;
      } else if (lang === "Francais") {
        url = result[0].template_FR;
      } else {
        url = result[0].template_EN;
      }
      if (type == "engagement") {
        if (lang == "Francais")
          var result = await makeEgagement(
            "https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/raw/upload/v1674724193/fff_mutfxc_2_u1bwbk.docx",
            questions,
            77,
            13
          );
        else
          var result = await makeEgagementAr(
            "https://res.cloudinary.com/dn6kxvylo/raw/upload/v1674637277/engagementArabeV2_peu5it.docx",
            questions,
            360,
            13
          );
        res.send(false);
      }
      //Demande Officiale
      else if (type == "facture" || type == "devis") {
        if (lang == "Arabe") {
          Promise.all([makeFactureOrDevis(url, questions, type)]).then(
            (response) => {
              setTimeout(() => {
                res.send("facture");
              }, 5000);
            }
          );
        } else {
          Promise.all([makeFactureOrDevisFr(url, questions, type)]).then(
            (response) => {
              setTimeout(() => {
                res.send("facture");
              }, 9000);
            }
          );
        }
      } else {
        var Has_Two_Pages = true;
        if (url.search(",") == -1) {
          var Result = await createDocAndImage(url, 0, renderObject);
          Has_Two_Pages = false;
          res.send("0");
        } else {
          url = url.split(",");
          for (let i = 0; i < url.length; i++) {
            var Result = await createDocAndImage(url[i], i, renderObject);
            if (Result == "from cloudinary image") res.send(err);
          }
          res.send((url.length - 1).toString());
        }
      }
    }
  });
};
const updateContractImage = async (req, res) => {
  const { id } = req.params;
  var twoPages = req.body.twoPages;
  let { user_name, contractName } = req.body;
  if (twoPages == "facture" || twoPages == "devis") contractName = twoPages;

  console.log(contractName);

  var urlImage = "";
  var Cmpt = 0;
  if (!isNaN(twoPages)) {
    Cmpt = twoPages;
  } else Cmpt = 0;
  let Temp = [];
  for (let i = 0; i <= Cmpt; i++) {
    if (twoPages == "facture22") {
      var uploadDoc = await cloudinary.uploader.upload(`output${i}.xlsx`, {
        resource_type: "auto",
      });
    } else {
      /*
      uploadDoc = await cloudinary.uploader.upload(`output${i}.docx`, {
        resource_type: "auto",
      });
    */
    }
    //var docUrl = uploadDoc.secure_url;
    let ArrNumber = [];
    let T = twoPages == "facture" || twoPages == "devis" ? "xlsx" : "docx";
    let T2 =
      twoPages == "facture" || twoPages == "devis"
        ? `output${i}.xlsx`
        : `output${i}.docx`;
    await convertapi
      .convert(
        "jpg",
        {
          File: T2,
          ImageResolutionH: "1000",
          ImageResolutionV: "1000",
        },
        T
      )
      .then(async function (result) {
        let number = Math.floor(Math.random() * 1000000);
        ArrNumber.push(number);
        await SaveImageIntoStorage(
          contractName,
          user_name,
          result,
          (type = "jpg"),
          number
        );
        if (i <= Cmpt - 1) {
          Temp.push({
            id: i,
            image: `https://
e-tafakna-back.com/uploads/${contractName}/${user_name}/E-Tafakna/${contractName}.${user_name}${number}.jpg`,
          });
          urlImage +=
            `https://
e-tafakna-back.com/uploads/${contractName}/${user_name}/E-Tafakna/${contractName}.${user_name}${number}.jpg` +
            ",";
        } else {
          Temp.push({
            id: i,
            image: `https://
e-tafakna-back.com/uploads/${contractName}/${user_name}/E-Tafakna/${contractName}.${user_name}${number}.jpg`,
          });
          urlImage += `https://
e-tafakna-back.com/uploads/${contractName}/${user_name}/E-Tafakna/${contractName}.${user_name}${number}.jpg`;
          const updateContract = `UPDATE contracts set contract_url = ? , contract_image = ? where id =?`;
          db.query(updateContract, [urlImage, urlImage, id], (err, result) => {
            err ? console.log(err) : console.log(result);
          });
          Temp = [];
          let NurlImage = "";
          let T3 =
            twoPages == "facture" || twoPages == "devis"
              ? `output${i}.xlsx`
              : `output${i}.docx`;

          for (let j = 0; j <= Cmpt; j++) {
            let T3 =
              twoPages == "facture" || twoPages == "devis"
                ? `output${j}.xlsx`
                : `output${j}.docx`;

            await convertapi
              .convert(
                "pdf",
                {
                  File: T3,
                },
                T
              )
              .then(async function (result) {
                let number = Math.floor(Math.random() * 1000000);
                console.log(
                  "Received POST request with the following parameters: first func"
                );
                console.log(`contractName: ${contractName}`);
                console.log(`user_name: ${user_name}`);
                console.log(`type: ${type}`);
                console.log(`number: ${number}`);
                await SaveImageIntoStorage(
                  contractName,
                  user_name,
                  result,
                  (type = "pdf"),
                  number
                );

                if (j <= Cmpt - 1) {
                  Temp.push({
                    id: j,
                    image: `https://
e-tafakna-back.com/uploads/${contractName}/${user_name}/E-Tafakna/${contractName}.${user_name}${number}.pdf`,
                  });

                  NurlImage +=
                    `https://
e-tafakna-back.com/uploads/${contractName}/${user_name}/E-Tafakna/${contractName}.${user_name}${number}.pdf` +
                    ",";
                } else {
                  Temp.push({
                    id: j,
                    image: `https://
e-tafakna-back.com/uploads/${contractName}/${user_name}/E-Tafakna/${contractName}.${user_name}${number}.pdf`,
                  });
                  NurlImage += `https://
e-tafakna-back.com/uploads/${contractName}/${user_name}/E-Tafakna/${contractName}.${user_name}${number}.pdf`;
                  const updateContract1 = `UPDATE contracts set pdfContractImage =? where id =?`;
                  db.query(updateContract1, [NurlImage, id], (err, result) => {
                    err ? console.log(err) : console.log(result);
                  });
                }
              });
          }
          res.send(urlImage + "|" + NurlImage);
          console.log(urlImage + "|" + NurlImage);
          //    res.send(urlImage);
        }
      })
      .catch((error) => {
        res.send(error.message);
      });
  }
};
const insertContractType = (req, res) => {
  let {
    signed_time,
    time_answering,
    title_FR,
    title_AR,
    description_FR,
    description_AR,
    image_url,
    template_FR,
    template_AR,
    country,
  } = req.body;
  const sql = `INSERT INTO contract_types (signed_time,time_answering,title_FR,title_AR,description_FR,description_AR,image_url,template_FR,template_AR,country) values(?,?,?,?,?,?,?,?,?,?)`;
  db.query(
    sql,
    [
      signed_time,
      time_answering,
      title_FR,
      title_AR,
      description_FR,
      description_AR,
      image_url,
      template_FR,
      template_AR,
      country,
    ],
    (err, contractType) => {
      if (err) res.send(err);
      if (contractType) res.send(contractType);
    }
  );
};
// getAllContractType

const getAllContractType = (req, res) => {
  let query = `SELECT * FROM contract_types`;
  db.query(query, (err, contracts) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(contracts);
    }
  });
};
const getDataById = (req, res) => {
  let { id } = req.params;
  let query = `SELECT 
    signed_time, time_answering, title_FR,title_AR,title_EN, image_url
   FROM contract_types WHERE id = ?`;
  db.query(query, [id], (err, contracts) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(contracts);
    }
  });
};
const getByIdContractType = (req, res) => {
  let { id, lang } = req.params;
  let column = "";
  lang === "Arabe" ? (column = "description_AR") : (column = "description_FR");
  let query = `SELECT ${column} FROM contract_types WHERE id = ?`;
  db.query(query, [id], (err, contracts) => {
    if (err) {
      res.status(500).send(err);
    } else {
      // console.log(contracts,"Log")
      res.json(contracts);
    }
  });
};
const UpdateSignedTime = (req, res) => {
  var title_FR = req.body.title_FR;
  const signed_time = req.params.signed_time;
  const sql = `UPDATE contract_types SET signed_time = ? WHERE title_FR = ?`;
  db.query(sql, [signed_time, title_FR], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};
const deleteContractById = (req, res) => {
  let id = req.params.id;
  let query = `DELETE FROM contract_types WHERE id = ?`;
  db.query(query, [id], (err, contracts) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(contracts);
    }
  });
};
require("sharp/package.json"); // sharp is a peer dependency.  npm i sharp join-images
var mergeImg = require("merge-img");
const { render } = require("react-dom");
const PDFMerger = require("pdf-merger-js");

const concatImages = (req, response) => {
  var merger = new PDFMerger();
  let n = Math.floor(Math.random() * 1000000);
  const { nElement, images, contractName, user_name } = req.body;
  let arrayOfImages = [];
  if (images.indexOf(",") != -1) arrayOfImages = images.split(",");
  else arrayOfImages = [images];
  if (nElement == 1) {
    const File = fs.createWriteStream(
      `./uploads/${contractName}/${user_name}/E-Tafakna/result${n}.pdf`
    );
    https.get(arrayOfImages[0], (res) => {
      res.pipe(File);
      File.on("finish", async () => {
        File.close();
        response.send(
          `https://e-tafakna-back.com/uploads/${contractName}/${user_name}/E-Tafakna/result${n}.pdf`
        );
      });
    });
  }
  if (nElement == 2) {
    const File = fs.createWriteStream("image1.pdf");
    const File1 = fs.createWriteStream("image2.pdf");
    https.get(arrayOfImages[0], (res) => {
      res.pipe(File);
      File.on("finish", async () => {
        File.close();
        https.get(arrayOfImages[1], (res1) => {
          res1.pipe(File1);
          File1.on("finish", async () => {
            File1.close();
            await merger.add("image1.pdf"); //merge all pages. parameter is the path to file and filename.
            await merger.add("image2.pdf"); // merge only page 2
            await merger
              .save(
                `./uploads/${contractName}/${user_name}/E-Tafakna/result${n}.pdf`
              )
              .then(async (res) => {
                response.send(
                  `https://e-tafakna-back.com/uploads/${contractName}/${user_name}/E-Tafakna/result${n}.pdf`
                );
              }); //save under given name and reset the internal document
            // Export the merged PDF as a nodejs Buffer
            // const mergedPdfBuffer = await merger.saveAsBuffer();
            // fs.writeSync('merged.pdf', mergedPdfBuffer);
          });
        });
      });
    });
  } else if (nElement == 3) {
    const File = fs.createWriteStream("image1.pdf");
    const File1 = fs.createWriteStream("image2.pdf");
    const File2 = fs.createWriteStream("image3.pdf");
    https.get(arrayOfImages[0], (res) => {
      res.pipe(File);
      File.on("finish", async () => {
        File.close();
        https.get(arrayOfImages[1], (res1) => {
          res1.pipe(File1);
          File1.on("finish", async () => {
            File1.close();
            https.get(arrayOfImages[2], (res2) => {
              res2.pipe(File2);
              File2.on("finish", async () => {
                File2.close();
                await merger.add("image1.pdf"); //merge all pages. parameter is the path to file and filename.
                await merger.add("image2.pdf"); // merge only page 2
                await merger.add("image3.pdf"); // merge the pages 1 and 3
                await merger
                  .save(
                    `./uploads/${contractName}/${user_name}/E-Tafakna/result${n}.pdf`
                  )
                  .then(async (res) => {
                    response.send(
                      `https://e-tafakna-back.com/uploads/${contractName}/${user_name}/E-Tafakna/result${n}.pdf`
                    );
                  }); //se under given name and reset the internal document
                // Export the merged PDF as a nodejs Buffer
                // const mergedPdfBuffer = await merger.saveAsBuffer();
                // fs.writeSync('merged.pdf', mergedPdfBuffer);
              });
            });
          });
        });
      });
    });
  } else if (nElement == 4) {
    const File = fs.createWriteStream("image1.pdf");
    const File1 = fs.createWriteStream("image2.pdf");
    const File2 = fs.createWriteStream("image3.pdf");
    const File3 = fs.createWriteStream("image4.pdf");
    https.get(arrayOfImages[0], (res) => {
      res.pipe(File);
      File.on("finish", async () => {
        File.close();
        https.get(arrayOfImages[1], (res1) => {
          res1.pipe(File1);
          File1.on("finish", async () => {
            File1.close();
            https.get(arrayOfImages[2], (res2) => {
              res2.pipe(File2);
              File2.on("finish", async () => {
                File2.close();
                https.get(arrayOfImages[3], (res3) => {
                  res3.pipe(File3);
                  File3.on("finish", async () => {
                    File3.close();
                    await merger.add("image1.pdf"); //merge all pages. parameter is the path to file and filename.
                    await merger.add("image2.pdf"); // merge only page 2
                    await merger.add("image3.pdf"); // merge the pages 1 and 3
                    await merger.add("image4.pdf"); // merge the pages 1 and 3
                    await merger
                      .save(
                        `./uploads/${contractName}/${user_name}/E-Tafakna/result${n}.pdf`
                      )
                      .then(async (res) => {
                        response.send(
                          `https://
e-tafakna-back.com/uploads/${contractName}/${user_name}/E-Tafakna/result${n}.pdf`
                        );
                      }); //s//save under given name and reset the internal document
                    // Export the merged PDF as a nodejs Buffer
                    // const mergedPdfBuffer = await merger.saveAsBuffer();
                    // fs.writeSync('merged.pdf', mergedPdfBuffer);
                  });
                });
              });
            });
          });
        });
      });
    });
  }
};
const SaveImageIntoStorage = async (
  contractName,
  user_name,
  request,
  type,
  number
) => {
  if (!fs.existsSync("./uploads")) fs.mkdirSync("./uploads");
  if (!fs.existsSync(`./uploads/${contractName}`)) {
    fs.mkdirSync(`./uploads/${contractName} `, { recursive: true });
  }
  if (!fs.existsSync(`./uploads/${contractName}/${user_name}`)) {
    fs.mkdirSync(`./uploads/${contractName}/${user_name} `, {
      recursive: true,
    });
    fs.mkdirSync(`./uploads/${contractName}/${user_name}/E-Tafakna`, {
      recursive: true,
    });
  }
  request.saveFiles(
    `./uploads/${contractName}/${user_name}/E-Tafakna/${contractName}.${user_name}${number}.${type}`
  );
};

module.exports = {
  insertContractType,
  getAllContractType,
  getByIdContractType,
  getDataById,
  deleteContractById,
  fillContract,
  updateContractImage,
  ChangeStatusInContract,
  concatImages,
  addAnswersToAnswerTable,
  UpdateSignedTime,
  getCount,
};