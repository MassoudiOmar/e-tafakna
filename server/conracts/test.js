// let arr = [
//     {
//         "questions_id": 1,
//         "content": "abcd"
//     },
//     {
//         "questions_id": 2,
//         "content": "efgh"
//     }
// ]
// let fn=(arr)=>{
// let newArray =[]
// newArray = arr.map((e,i)=>{
//     let key = e.questions_id
//     let o = {}
//     o[key] = e.content
//     return o
// })
// return newArray.reduce((acc,e,i)=>{
//     let key = Object.keys(e)[0]
//     let value = Object.values(e)[0]
// acc[key] = value

// return acc
// },{})
// }
// console.log(fn(arr))

import superagent from 'superagent';
import mammoth from 'mammoth';
const Docxtemplater = require("docxtemplater");
const PizZip = require("pizzip");

const url = 'https://res.cloudinary.com/royal-armysrbk/raw/upload/v1653924519/Contrat_de_location_simple_yors7d.docx';

const main = async () => {

  const response = await superagent.get(url)
    .parse(superagent.parse.image)
    .buffer();
    
  const buffer = response.body;
//   console.log('buffer: ', buffer)
//   const text = (await mammoth.extractRawText({ buffer })).value;
//   const lines = text.split('\n');
//   console.log(text)
//   console.log(lines);
const zip = new PizZip(content);

const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
});

// Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
doc.render({
   name: 'amine',
   doc:'omar',
   cin:11368574,
   ar:'أحبك'
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
};

main().catch(error => console.error(error));
// const domainName = (url)=> {
//     let a = []
//  url.startsWith('http://') ? a = url.split('//')[1].split('.')[0] 
//    : url.startsWith('http://www.') ? 
//     a = a = url.split('') : null
//  return a
// }
// console.log(domainName("http://www.google.com"))

