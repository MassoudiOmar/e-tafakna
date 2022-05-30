const db = require("../database-mysql");
const Docxtemplater = require("docxtemplater");
const PizZip = require("pizzip");
const fs = require("fs");
const path = require("path");

// Load the docx file as binary content
const content = fs.readFileSync(
  path.resolve(__dirname, "Contrat de location simple.docx"),
  "binary"
);

const zip = new PizZip(content);

const doc = new Docxtemplater(zip, {
  paragraphLoop: true,
  linebreaks: true,
});



const fillContract = (req,res) =>{
  let renderObject = {}
  let answersArray = []
  const { id } = req.params;
  const sql = `SELECT questions_id,content  FROM answers where contracts_id=1`;
  db.query(sql, [id], async (err, result) => {
    console.log(result)
    if (err) res.send(err);
    else {
      answersArray = result.map((element,index)=>{
        let key = element.questions_id
        let object = {}
        object[key] = element.content
        return object
      })
      renderObject = answersArray.reduce((acc,e,i)=>{
        let key = Object.keys(e)[0]
        let value = Object.values(e)[0]
    acc[key] = value
    
    return acc
    },{})
      res.send(renderObject);
      console.log(renderObject,'check obj before rendeer')
      doc.render(renderObject)
      const buf = doc.getZip().generate({
        type: "nodebuffer",
        // compression: DEFLATE adds a compression step.
        // For a 50MB output document, expect 500ms additional CPU time
        compression: "DEFLATE",
      });
      console.log(buf,'check buf')
      // buf is a nodejs Buffer, you can either write it to a
      // file or res.send it with express for example.
      fs.writeFileSync("output.docx", buf);
    }
  });
  
  // console.log(response,"response from fill contract methode")
  // res.send('aaa')
  // console.log('aaaaaaaa')
}



// Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
// doc.render({
//   q1: "amine",
//   q2: "omar",
//   q3: 11368574,
//   q4: "23/10/2015",
//   q5: "imed",
//   q6: "فارس",
//   q7: "17/01/1997",
//   q8: 11259863,
//   q9: "15/07/2013",
//   q10: "يوسف",
// });

// const buf = doc.getZip().generate({
//   type: "nodebuffer",
//   // compression: DEFLATE adds a compression step.
//   // For a 50MB output document, expect 500ms additional CPU time
//   compression: "DEFLATE",
// });

// // buf is a nodejs Buffer, you can either write it to a
// // file or res.send it with express for example.
// fs.writeFileSync("output.docx", buf);

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
      if (err) res.status(500).send(err);
      if (contractType) res.status(200).send(contractType);
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
    signed_time, time_answering, title_FR
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

module.exports = {
  insertContractType,
  getAllContractType,
  getByIdContractType,
  getDataById,
  fillContract
};
