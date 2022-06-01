// const superagent = require('superagent');
// const Docxtemplater = require("docxtemplater");
// const PizZip = require("pizzip");


// const fs = require("fs");
// const path = require("path");

// const url = 'https://res.cloudinary.com/royal-armysrbk/raw/upload/v1654049778/Contrat_de_location_simple_d8tgjz.docx';
// const main = async () => {

    const response = await superagent.get(url)
      .parse(superagent.parse.image)
      .buffer();
      
//     const buffer = response.body;
//   //   console.log('buffer: ', buffer)
//   //   const text = (await mammoth.extractRawText({ buffer })).value;
//   //   const lines = text.split('\n');
//   //   console.log(text)
//   //   console.log(lines);
  const zip = new PizZip(buffer);
  
//   const doc = new Docxtemplater(zip, {
//       paragraphLoop: true,
//       linebreaks: true,
//   });
  
//   // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
//   doc.render({
//      name: 'alooo',
//      doc:'alooo',
//      cin:11368574,
//      ar:'أحبك'
//   });
  
//   const buf = doc.getZip().generate({
//       type: "nodebuffer",
//       // compression: DEFLATE adds a compression step.
//       // For a 50MB output document, expect 500ms additional CPU time
//       compression: "DEFLATE",
//   });
  
//   // buf is a nodejs Buffer, you can either write it to a
//   // file or res.send it with express for example.
//   fs.writeFileSync("output.docx", buf);
//   };
  
//   main().catch(error => console.error(error));