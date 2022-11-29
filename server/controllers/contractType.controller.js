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
var convertapi = require("convertapi")("6kbycyAmQnMjjQ6w");

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

    return "added docx and image";
  } catch (error) {
    return "from cloudinary image";
  }
};

const makeFactureOrDevis = async (url, ans, type) => {
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

        workbook.worksheets[0].getCell("C17").value =
          type.toUpperCase() + " N° /";

        workbook.worksheets[0].getCell("A1").value = ans[0];
        workbook.worksheets[0].getCell("B9").value = ans[1] + " le " + ans[2];
        workbook.worksheets[0].getCell("D12").value = ans[3];
        workbook.worksheets[0].getCell("D13").value = ans[4];
        workbook.worksheets[0].getCell("C17").value += ans[5];
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
        workbook.worksheets[0].getCell("E36").value = (sum * 19) / 100;
        workbook.worksheets[0].getCell("E41").value =
          workbook.worksheets[0].getCell("E36").value +
          workbook.worksheets[0].getCell("E34").value +
          600;
        var arr = workbook.worksheets[0].getCell("D46").value.split(" ");
        arr[arr.length - 1] = ans[f - 1];
        arr = arr.join(" ");
        //Fix it
        workbook.worksheets[0].getCell("D46").value = arr;
        workbook.worksheets[0].getCell("B52").value = ans[f - 3];
        workbook.worksheets[0].getCell("B53").value = "MF:" + ans[f - 2];
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
          const errorString = await streamToString(e.response.data);
            console.log("Eroor IS for omar");
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
const fillContract = async (req, res) => {
  let urlImage = "";
  let docUrl = "";
  let { type, lang } = req.body;
console.log(type,'tyyyyyyyyyyyyyyyype')
  let { questions } = req.body;
  console.log(questions, "this is the true one");
  console.log(type , " Waaaaaaaaaaaaaaajiiiiiiiiiiiiiiiiiiiiiiiiihhhhhhhhhhhhh");
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
      var url = "";
      if (lang === "Arabe") {
        url = result[0].template_AR;
      } else if (lang === "Francais") {
        url = result[0].template_FR;
      } else {
        url = result[0].template_EN;
      }

      if (type == "facture" || type == "devis") {
        console.log("Welcome");
        Promise.all([makeFactureOrDevis(url, questions, type)]).then(
          (response) => {
            setTimeout(() => {
              res.send("facture");
            }, 5000);
          }
        );
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
    var x = twoPages=="facture" ? "xlsx" : "  "
    convertapi
      .convert(
        "jpg",
        {
          File: docUrl,
        },
        twoPages =="facture" ? "xlsx" : "docx"
      )
     .then(async function (result) {
        console.log(result.file.url, "doc");
        if (i <= Cmpt - 1) urlImage += result.file.url + ",";
        else urlImage += result.file.url;
        const updateContract = `UPDATE contracts set contract_url = ? , contract_image = ? where id =?`;
        db.query(updateContract, [docUrl, urlImage, id], (err, result) => {
          err ? console.log(err) : console.log(result);
        });
        console.log(urlImage, "Imagaeeeee");
        res.send(urlImage);

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
