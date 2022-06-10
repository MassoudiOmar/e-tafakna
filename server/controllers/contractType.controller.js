const db = require("../database-mysql");
const superagent = require("superagent");
const Docxtemplater = require("docxtemplater");
const PizZip = require("pizzip");
const fs = require("fs");
const cloudinary = require("../utils/cloudinary");
const FormData = require("form-data");
const axios = require("axios");

const fillContract = async (req, res) => {
  let urlImage =''
  let docUrl = ''
  let renderObject = {};
  let answersArray = [];
  const { id } = req.params;
  const sql = `select template_FR, questions_id,content from contract_types
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
      console.log(renderObject, "check obj before rendeer");

      const url = result[0].template_FR;
      console.log(url)
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
      doc.render(renderObject);
      const buf = doc.getZip().generate({
        type: "nodebuffer",
        // compression: DEFLATE adds a compression step.
        // For a 50MB output document, expect 500ms additional CPU time
        compression: "DEFLATE",
      });
      console.log(buf, "check buf");
      fs.writeFileSync("output.docx", buf);
      

      
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
      formData.append("document", fs.createReadStream("output.docx"));
      axios
        .post("https://api.pspdfkit.com/build", formData, {
          headers: formData.getHeaders({
            Authorization:
              "Bearer pdf_live_vdeFKKEIpJQPRS7Mll8nRmA4K4YbAZ57Cnxj2yCc9np",
          }),
          responseType: "stream",
        })
        .then((response) => {
          response.data.pipe(fs.createWriteStream("image.jpg"));
        })
        .catch(async function (e) {
          console.log(e);
          const errorString = await streamToString(e.response.data);
          console.log(errorString, "from catch");
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
      try {

        await cloudinary.uploader.upload(
          "output.docx",
          { resource_type: "auto" },
         async (err, result) => {
            if (err) {
              console.log(err);
            } else {
              docUrl = result.secure_url;
              console.log(docUrl, "url docx");
              
  
              await cloudinary.uploader.upload("image.jpg",
              { resource_type: "auto" }, (err, result) => {
                if (err) {
                  console.log(err, "err"); 
                } else {
                  urlImage = result.secure_url;
                  console.log(urlImage, "url"); 
                  res.send(urlImage);
                  const updateContract = `UPDATE contracts set contract_url = ? , contract_image = ? where id =? `
                  db.query(updateContract,[docUrl,urlImage,id],(err,result)=>{
                    err ? console.log(err) : console.log(result)
                  })
                  fs.unlinkSync("output.docx", (err) => {
                    if (err) {
                      console.error(err);
                      return;
                    }
            
                    // file removed
                  });
                  fs.unlinkSync("image.jpg", (err) => {
                    if (err) {
                      console.error(err);
                      return;
                    }
            
                    // file removed
                  });
                }
              });
            }
          }
        );
      }
      catch(err){
        console.log(err , 'catch for cloudinary')
      }

    
      

      // buf is a nodejs Buffer, you can either write it to a
      // file or res.send it with express for example.
    }
  });
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
  console.log(req.body)
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
      if (err) res.send(err
      );
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
    signed_time, time_answering, title_FR, image_url
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
};
