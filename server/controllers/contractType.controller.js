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
const { type } = require("os");

var createDocAndImage = async (str, index, renderObject) => {
  const response = await superagent
    .get(str)
    .parse(superagent.parse.image)
    .buffer();
    console.log(Locale.GERMAN)
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
  console.log(buf, "check buf");
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
          dpi: 500,
        },
      })
    );
    formData.append("document", fs.createReadStream(`output${index}.docx`));
    await axios
      .post("https://api.pspdfkit.com/build", formData, {
        headers: formData.getHeaders({
          Authorization:
            "Bearer pdf_live_wtlDGJdKZJXW8WAIt3nWAii2nhwneGzWfiDCUxoVPYB",
        }),
        responseType: "stream",
      })
      .then((response) => {
        // console.log(response,'response')
        response.data.pipe(fs.createWriteStream(`image${index}.jpg`));
        //  cloudinary.uploader.upload("image.jpg")
        // urlImage = uploadimage.secure_url;
        // console.log(urlImage, "image url");
        // // fs.unlinkSync("image.jpg");
      })
      .catch(async function (e) {
        console.log(e);
        console.log("Test Eroor");
        const errorString = await streamToString(e.response.data);
        console.log(errorString, "from catch");
      });
    function streamToString(stream) {
      const chunks = [];
      return new Promise((resolve, reject) => {
        stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
        stream.on("error", (err) => reject(err));
        stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
      });
    }
    return "added docx and image";
  } catch (error) {
    return "from cloudinary image";
  }
};
const makeFactureOrDevis = async (url, ans) => {
  console.log(ans, "RRR");
  console.log("RR");
  console.log(url);
  const file = fs.createWriteStream("file.xlsx");
  http.get(url, function (response) {
    response.pipe(file);
    file.on("finish", async () => {
      file.close();
      console.log("Download Completed");
      const workbook = new Excel.Workbook();
      await workbook.xlsx.readFile(`file.xlsx`).then(async () => {
        workbook.worksheets[0].getCell("A1").value = ans[0];
        workbook.worksheets[0].getCell("B9").value = ans[1] + " le " + ans[2];
        workbook.worksheets[0].getCell("D12").value = ans[3];
        workbook.worksheets[0].getCell("D13").value = ans[4];
        workbook.worksheets[0].getCell("C17").value += ans[5];
        let sum = 0;
        let j = 8;
        let k = 8 + Math.ceil((ans.length - 12) / 3);
        let r = 8 + Math.ceil(((ans.length - 12) * 2) / 3);

        let length = Math.ceil((ans.length - 12) / 3);
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
        /*
  '93': 'Etafkna',
  '94': 'Gafsa',
  '95': '17/9/2022',
  '97': 'Wajih',
  '98': '1230',
  '99': '23',
  '100': '2022',
  '101': 'Dell',
  '102': '5',
  '103': '5000',
  '104': 'Tunisa/gabes',
  '105': 'Mat client',
  '106': '2120',
  '107': 'Six dinar'
**************************************
Etafakn', 'Tunis', '20/9/2022',
  'Wajih',   '2000',  '12',
  '2022',    '',      'Dell',
  'Hp',      'Asus',  '5',
  '6',       '7',     '1440',
  '1320',    '1500',  'Gafsa',
  '1000',    '2120'
  **********************************



 '93': 'A',
  '94': 'B',
  '95': '17/9/2022',
  '97': 'C',
  '98': 'D',
  '99': 'E',
  '100': 'Dell',
  '101': '5',
  '102': '5',
  '103': '600',
  '104': 'Tunis/gafsa',
  '105': '2130',
  '106': '2120',
  '107': 'Six dinars' 

*/
        workbook.worksheets[0].getCell("E34").value = parseFloat(sum);
        workbook.worksheets[0].getCell("E36").value = (sum * 19) / 100;
        workbook.worksheets[0].getCell("E41").value =
          workbook.worksheets[0].getCell("E36").value +
          workbook.worksheets[0].getCell("E34").value +
          600;
        var arr = workbook.worksheets[0].getCell("D46").value.split(" ");
        arr[arr.length - 1] = ans[ans.length - 1];
        arr = arr.join(" ");
        //Fix it
        workbook.worksheets[0].getCell("D46").value = arr;
        workbook.worksheets[0].getCell("B52").value =
          ans[ans.length - 4] + " et " + ans[ans.length - 2] + ",Tunisie";
        workbook.worksheets[0].getCell("B53").value =
          "MF:" + ans[ans.length - 3];
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
          formData.append("document", fs.createReadStream("output0.xlsx"));

          await axios
            .post("https://api.pspdfkit.com/build", formData, {
              headers: formData.getHeaders({
                Authorization:
                  "Bearer pdf_live_wtlDGJdKZJXW8WAIt3nWAii2nhwneGzWfiDCUxoVPYB",
              }),
              responseType: "stream",
            })
            .then(async (response) => {
              await response.data.pipe(fs.createWriteStream("image0.jpg"));
            });
        } catch (e) {
          const errorString = await streamToString(e.response.data);
          console.log(errorString);
        }
        //A1 => 1 Question
        //B9 => B9 = Question 2 + le , Question 3
        //D12 => Question 4
        // D13 => Question 5
        //C17 => C17+=Question 6
        //From B TO E COl 22 To Number Of product
        //E34 => Sum of all Productions
        //E36 => TVA => sum * 19
        //E41 => E36 + E34 + 0.600
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
const fillContract = async (req, res) => {
  let urlImage = "";
  let docUrl = "";
  let { type } = req.body;

  let { questions } = req.body;
  console.log(questions, "this is the true one");
  console.log(type);
  let renderObject = {};
  let answersArray = [];
  const { id } = req.params;
  const sql = `select template_FR,template_AR,template_EN, questions_id,content from contract_types
  inner join answers on (contract_types.id = answers.contracts_contract_types_id)
  where answers.contracts_id = ?`;
  db.query(sql, [id], async (err, result) => {
    console.log(result);
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
      var url = result[0].template_FR;
      // var urlAR = result[0].template_AR;

      if (type == "facture" || type == "devis") {
        console.log("Welcome");
        Promise.all([makeFactureOrDevis(url, questions)]).then((response) => {
          setTimeout(() => {
            console.log("Hello");
            res.send("facture");
          }, 5000);
        });
      } else {
        console.log(url, "that is the url ");
        var Has_Two_Pages = true;
        if (url.search(",") == -1) {
          var Result = await createDocAndImage(url, 0, renderObject);
          console.log("********************");
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
  console.log(twoPages, " ", typeof twoPages);
  console.log(req.body);
  var twoPages = req.body.twoPages;
  var urlImage = "";
  var Cmpt = 0;
  if (twoPages === true) {
    Cmpt = 1;
  }
  console.log(Cmpt);
  for (let i = 0; i <= Cmpt; i++) {
    if (twoPages == "facture") {
      console.log("I'm Here");
      var uploadDoc = await cloudinary.uploader.upload(`output${i}.xlsx`, {
        resource_type: "auto",
      });
    } else {
      console.log("Baad");
      uploadDoc = await cloudinary.uploader.upload(`output${i}.docx`, {
        resource_type: "auto",
      });
    }
    var docUrl = uploadDoc.secure_url;
    console.log(docUrl, "doc url");
    let uploadImage = await cloudinary.uploader.upload(`image${i}.jpg`, {
      resource_type: "auto",
    });
    console.log(i, "  link ", uploadImage.secure_url);
    urlImage += uploadImage.secure_url;
    if (i < Cmpt) urlImage += ",";
  }
  console.log(urlImage);
  const updateContract = `UPDATE contracts set contract_url = ? , contract_image = ? where id =? `;
  db.query(updateContract, [docUrl, urlImage, id], (err, result) => {
    err ? console.log(err) : console.log(result);
  });
  res.send(urlImage);
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
  console.log(req.body);
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
};
