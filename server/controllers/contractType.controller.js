// const db = require("../database-mysql");
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

// Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
doc.render({
   q1: 'amine',
   q2:'omar',
   q3:11368574,
   q4:'23/10/2015',
   q5:'imed',
   q6:'فارس',
   q7:'17/01/1997',
   q8:11259863,
   q9:'15/07/2013',
   q10:'يوسف'
});

const buf = doc.getZip().generate({
    type: "nodebuffer",
    // compression: DEFLATE adds a compression step.
    // For a 50MB output document, expect 500ms additional CPU time
    compression: "DEFLATE",
});

// buf is a nodejs Buffer, you can either write it to a
// file or res.send it with express for example.
fs.writeFileSync("output.docx", buf);

// const insertContractType = (req,res)=>{
//     let {signed_time,time_answering,title_FR,title_AR,description_FR,description_AR,image_url,template_FR,template_AR,country} = req.body;
//     const sql = `INSERT INTO contract_types (signed_time,time_answering,title_FR,title_AR,description_FR,description_AR,image_url,template_FR,template_AR,country) values(?,?,?,?,?,?,?,?,?,?)`
//     db.query(sql,[signed_time,time_answering,title_FR,title_AR,description_FR,description_AR,image_url,template_FR,template_AR,country], (err,contractType)=>{
//         if (err) res.status(500).send(err)
//         if (contractType) res.status(200).send(contractType)
//     })
// }



module.exports = {  };