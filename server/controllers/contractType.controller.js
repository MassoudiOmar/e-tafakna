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
var convertapi = require("convertapi")("SorUGMzOHtX3eeMJ");
//const cheerio = require('cheerio');
const https = require("https");
/***
 *
 *
 * TODO:
 * Function For When user Accept Change The Picture Of it  (With Some Optimization)
 * USE:
 * https://www.npmjs.com/package/node-html-to-image
 *
 *
 *
 */
var ChangeStatusInContract = async (req, res) => {
  const { image_url, user_name, tag } = req.body;
  const output = fs.createWriteStream("test.html");
  db.query(
    `SELECT * from contracts where contract_image='${image_url}'`,
    async (err, result) => {
      console.log(result);
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
                              console.log(image_url);
                              convertapi
                                .convert(
                                  "docx",
                                  {
                                    File: "Final.html",
                                  },
                                  "html"
                                )
                                .then(function (result3) {
                                  console.log(result3.file.url);
                                  convertapi
                                    .convert(
                                      "png",
                                      {
                                        File: result3.file.url,
                                      },
                                      "docx"
                                    )
                                    .then(function (result4) {
                                      console.log(
                                        result4.file.url,
                                        " this is the final picture"
                                      );
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
const makeFactureOrDevis = async (url, ans, type ,language) => {
  console.log(ans)
  
    const file = fs.createWriteStream("file.xlsx");
    http.get(url, function (response) {
      response.pipe(file);
      file.on("finish", async () => {
        file.close();
        console.log("Download Completed");
      let t = ""
   if(language=="fr")
   t = "le " + ans[2]
   else { 
  t=  " و " + ans[2] 
  
   }
      
  
        const workbook = new Excel.Workbook();
        await workbook.xlsx.readFile(`file.xlsx`).then(async () => {
          workbook.worksheets[0].getCell("B39").numFmt="0.000"
          workbook.worksheets[0].getCell("B39").value="0.600"
  
          workbook.worksheets[0].getCell("C17").value =
          " /° N " + type.toUpperCase()  ;
          workbook.worksheets[0].getCell("A1").value = ans[0];
          workbook.worksheets[0].getCell("B9").value =  ans[1] + t 
          workbook.worksheets[0].getCell("B12").value = ans[3] 
  let Temp = ans[4]
  
  workbook.worksheets[0].getCell("B13").value = parseInt(ans[4])
  workbook.worksheets[0].getCell("B13").numFmt= "0"
  
          workbook.worksheets[0].getCell("C17").value= ans[5] + workbook.worksheets[0].getCell("C17").value;
          let sum = 0;
          let length = Math.ceil((ans.length - 12) / 3);
          let j = ans.length - length * 3;
          let f = j;
          let k = j + length;
          let r = k + length;
          console.log("The length is ", length);
          for (let i = 22; i < 22 + length; i++) {
            console.log(" The loop for j  is ", ans[j]);
            console.log(" The loop for k  is ", ans[k]);
            console.log(" The loop for r  is ", ans[r]);
            sum += parseFloat(ans[k]) * parseFloat(ans[r]);
            workbook.worksheets[0].getCell(`E${i}`).value = ans[j++];
            workbook.worksheets[0].getCell(`D${i}`).value = ans[k++];
            workbook.worksheets[0].getCell(`C${i}`).value = ans[r++];
            workbook.worksheets[0].getCell(`B${i}`).value =
              parseFloat(ans[k - 1]) * parseFloat(ans[r - 1]);
            console.log("This is the sum so far ", sum);
          }
  
          workbook.worksheets[0].getCell("B34").value = parseFloat(sum);
          workbook.worksheets[0].getCell("B37").value = (sum * 19) / 100;
          workbook.worksheets[0].getCell("B41").value =
            parseInt(workbook.worksheets[0].getCell("B37").value) +
            parseInt(workbook.worksheets[0].getCell("B34").value) +
            0.600;
            workbook.worksheets[0].getCell("B41").numFmt= "0.000"
  
          var arr = workbook.worksheets[0].getCell("D46").value.split("..................................................:");
          console.log(arr)
          arr[0] = ans[f - 1];
          let temp = arr[0] 
          arr[0] = arr[1]
          arr[1]=temp 
          arr = arr.join(" ");
          //Fix it
          workbook.worksheets[0].getCell("D46").value = arr;
          workbook.worksheets[0].getCell("B52").value = ans[f-3];
          workbook.worksheets[0].getCell("B53").value =  ans[f - 2] + " : الدليل الجبائي للحريف" ;
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
            console.log("Here")
          } catch (e) {
            console.log(e)
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
  
  
   let  makeFactureOrDevisFr = (url, ans, type ,language)=>{
    console.log(ans)
    const file = fs.createWriteStream("file.xlsx");
    http.get(url, function (response) {
      response.pipe(file);
      file.on("finish", async () => {
        file.close();
        console.log("Download Completed");
  
      
  
        const workbook = new Excel.Workbook();
        await workbook.xlsx.readFile(`file.xlsx`).then(async () => {
          workbook.worksheets[0].getCell("C17").value =
            type.toUpperCase() + ' N ° \\' 
          workbook.worksheets[0].getCell("A1").value = ans[0];
          workbook.worksheets[0].getCell("B9").value =   ans[1]+ "le "+ans[2] 
          workbook.worksheets[0].getCell("D12").value = ans[3] 
  let Temp = ans[4]
  
  workbook.worksheets[0].getCell("D13").value = parseInt(ans[4])
  workbook.worksheets[0].getCell("D13").numFmt= "0"
  
          workbook.worksheets[0].getCell("C17").value=   workbook.worksheets[0].getCell("C17").value + ans[5] 
          let sum = 0;
          let length = Math.ceil((ans.length - 12) / 3);
          let j = ans.length - length * 3;
          let f = j;
          let k = j + length;
          let r = k + length;
          console.log("The length is ", length);
          for (let i = 22; i < 22 + length; i++) {
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
          workbook.worksheets[0].getCell("E36").value = parseInt(workbook.worksheets[0].getCell("E34").value) *19 /100
          console.log(parseInt(workbook.worksheets[0].getCell("E36").value))
          console.log((workbook.worksheets[0].getCell("E34").value))
  
          workbook.worksheets[0].getCell("E41").value =
            parseInt(workbook.worksheets[0].getCell("E36").value) +
            parseInt(workbook.worksheets[0].getCell("E34").value) +
            0.600;
            //workbook.worksheets[0].getCell("E41").numFmt= "0.000"
  
          var arr = workbook.worksheets[0].getCell("D46").value.split(" ");
          console.log(arr)
          console.log(f)
          arr[arr.length-1] = ans[f - 1];
          arr = arr.join(" ");
          //Fix it
          workbook.worksheets[0].getCell("D46").value = arr;
          workbook.worksheets[0].getCell("B52").value = ans[f-3]
          workbook.worksheets[0].getCell("B53").value = "MF:"+ans[f - 2] 
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
            console.log("Here")
          } catch (e) {
            console.log(e)
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
  
  
  }


  const verify =  (arr)=>{
    console.log(arr , " ***/*/")
     if(arr[8].length==0 && arr[9].length>0)
     { 
     arr[8] = arr[9]
      arr[9]=""
     }
     console.log(arr)
     return arr 
   }
   
   const verifyAr =(arr)=>{
     console.log(arr , " ***/*/")
     if(arr[5].length==0 && arr[6].length>0)
     { 
     arr[5] = arr[6]
      arr[6]=""
     }
     console.log(arr)
     return arr 
   
   
   
   
   
   }
   
   var makeEgagement = async (url , question , idBegin , length)=>{
    console.log("this is the url ", url)
    console.log("francais****************")
   let renderedDoc = {}
   let Minis = 0 
   question=verify(question) 
   if(question[8].length==0 )
   Minis=2
   else    
   if(question[9].length==0)
   Minis=1 
   console.log(idBegin , " **** " , 88-Minis)
   for (let i =0 ; i<3 ; i ++){
   renderedDoc[(840 +((i) * 10)).toString()]="-"
   }
   console.log(renderedDoc)
   if(Minis>0){
   if(Minis==1){
   renderedDoc["860"]=""
   }
   if(Minis==2){
   renderedDoc["850"]=""
   renderedDoc["860"]=""
   }
   }
   console.log(renderedDoc)
   for (let i = idBegin  ; i<=88 ;  i++){
    renderedDoc[i.toString()]=question[i-idBegin]
   }
   console.log(renderedDoc)
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
   }
   
   var makeEgagementAr = async (url , question , idBegin , length)=>{
     let renderedDoc = {}
     let Minis = 0 
     question=verifyAr(question) 
     if(question[5].length==0 )
     Minis=2
     else    
     if(question[6].length==0)
     Minis=1 
     for (let i =0 ; i<3 ; i ++){
     renderedDoc[3640 +((i) * 10)]="-"
     }
     console.log(renderedDoc)
     if(Minis>0){
     if(Minis==1){
     renderedDoc["3660"]=""
     }
     if(Minis==2){
     renderedDoc["3650"]=""
     renderedDoc["3660"]=""
     }
     }
     console.log(renderedDoc)
     for (let i = idBegin  ; i<=368 ;  i++){
      renderedDoc[i.toString()]=question[i-idBegin]
     }
     console.log(renderedDoc)
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
     }
     

  const fillContract = async (req, res) => {
  let urlImage = "";
  let docUrl = "";
  let { type, lang } = req.body;

  let { questions } = req.body;
  let renderObject = {};
  let answersArray = [];
  const { id } = req.params;
  const sql = `select template_FR,template_AR,template_EN, questions_id,content from contract_types
  inner join answers on (contract_types.id = answers.contracts_contract_types_id)
  where answers.contracts_id = ?`;
  db.query(sql, [id], async (err, result) => {
    if (err) res.send(err);
    else {
      answersArray = result.map((element, index) => {
        let key = element.questions_id;
        let object = {};
        object[key] = element.content;
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
      console.log(url);
      if(type=="engagement"){
        console.log("Gere")
        if(lang=="Francais")
        var result =  await makeEgagement("https://res.cloudinary.com/dn6kxvylo/raw/upload/v1671452515/fff_mutfxc.docx" , questions , 77  , 13 ) 
        else 
        var result = await makeEgagementAr("https://res.cloudinary.com/dn6kxvylo/raw/upload/v1672304046/engagementArabe_lojghh_gyvyw3.docx" , questions, 360 , 13)
res.end(false)

      } 
        //Demande Officiale
      
      if (type == "facture" || type == "devis") {
        if(lang=="Arabe"){
console.log("Arabe")
          Promise.all([makeFactureOrDevis(url, questions, type)]).then(
            (response) => {
              setTimeout(() => {
                res.send("facture");
              }, 5000);
            }
          )  
        }
        else  {
          console.log("Drancaiss")
        Promise.all([makeFactureOrDevisFr(url, questions, type)]).then(
          (response) => {
            setTimeout(() => {
              res.send("facture");
            }, 5000);
          }
        );
      }
      } else {
        var Has_Two_Pages = true;
        if (url.search(",") == -1) {
          var Result = await createDocAndImage(url, 0, renderObject);

          Has_Two_Pages = false;
          res.send(Has_Two_Pages);
        } else {
          url = url.split(",");
          for (let i = 0; i < url.length; i++) {
            var Result = await createDocAndImage(url[i], i, renderObject);
            if (Result == "from cloudinary image") res.send(err);
          }
          res.send(Has_Two_Pages);
        }
      }
    }
  });
};

const updateContractImage = async (req, res) => {
  const { id } = req.params;
  var twoPages = req.body.twoPages;
  var urlImage = "";
  var Cmpt = 0;

  if (twoPages == "civp") Cmpt = 3;
  else if (twoPages === true) {
    Cmpt = 1;
  }

  console.log(Cmpt, "cmpt");
  let Temp = [];
  for (let i = 0; i <= Cmpt; i++) {
    if (twoPages == "facture") {
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
    console.log(twoPages);
    await convertapi
      .convert(
        "jpg",
        {
          File: twoPages == "facture" ? `output${i}.xlsx` : `output${i}.docx`,
          ImageResolutionH: '900',
    ImageResolutionV: '900',
    ScaleImage: 'true'

        },
        twoPages == "facture" ?"xlsx" :"docx"
      )
      .then(async function (result) {
        if (i <= Cmpt - 1) {
          Temp.push({
            id: i,
            image: result.file.url,
          });

          urlImage += result.file.url + ",";
        } else {
          Temp.push({
            id: i,
            image: result.file.url,
          });

          urlImage += result.file.url;
          console.log(Temp);
          const updateContract = `UPDATE contracts set contract_url = ? , contract_image = ? where id =?`;
          db.query(updateContract, [urlImage, urlImage, id], (err, result) => {
            err ? console.log(err) : console.log(result);
          });
          res.send(urlImage);
        }
        console.log(urlImage, "urll imagee");
      })
      .catch((error) => {
        console.log(error.message);
        res.send({ message: error });
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
      res.json(contracts);
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

module.exports = {
  insertContractType,
  getAllContractType,
  getByIdContractType,
  getDataById,
  deleteContractById,
  fillContract,
  updateContractImage,
  ChangeStatusInContract,
};
