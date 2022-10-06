const db = require("../database-mysql");
const superagent = require("superagent");
const Docxtemplater = require("docxtemplater");
const PizZip = require("pizzip");
const fs = require("fs");
const cloudinary = require("../utils/cloudinary");
const FormData = require("form-data");
const axios = require("axios");



var createDocAndImage= async (str , index, renderObject)=>{


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
formData.append("document", fs.createReadStream(`output${index}.docx`));
await axios
  .post("https://api.pspdfkit.com/build", formData, {
    headers: formData.getHeaders({
      Authorization:
        "Bearer pdf_live_fb8AX9Q5L2Fl7CyxFwdBnRYH1AD1YJcV8onNMpBNkfO",
    }),
    responseType: "stream",
  })
  .then((response) => {
    // console.log(response,'response')
    response.data.pipe(fs.createWriteStream(`image${index}.jpg`))
    //  cloudinary.uploader.upload("image.jpg")
    // urlImage = uploadimage.secure_url;
    // console.log(urlImage, "image url");
    // // fs.unlinkSync("image.jpg");
  })
  .catch(async function (e) {
    console.log(e);
    console.log("Test Eroor")
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
  return ('added docx and image')  
} catch (error) {
  return ("from cloudinary image");
}
}


const fillContract = async (req, res) => {
  let urlImage = "";
  let docUrl = "";
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
      }, {} );
      // res.send(result);
      console.log(renderObject, "check obj before rendeer");      
      var url = result[0].template_FR;
   var Has_Two_Pages = true 
      if(url.search(",")==-1){
   var Result  = await createDocAndImage(url ,0,renderObject)  
  Has_Two_Pages = false ; 
   res.send(Has_Two_Pages)
  }
  else 
  { 
    url = url.split(",")
for (let i = 0 ; i< url.length  ; i ++){
var Result = await createDocAndImage(url[i] , i,renderObject) 


if(Result == "from cloudinary image")
res.send(err)
}
res.send(Has_Two_Pages)
  }    
          //  fs.unlink("output.docx")      
      // { resource_type: "auto" }, async (err, result) => {
      //   if (err) {
      //     console.log(err, "err");
      //   } else {
      //     urlImage = result.secure_url;
      //     console.log(urlImage, "url");
      //     res.send(urlImage);
      //     const updateContract = `UPDATE contracts set contract_url = ? , contract_image = ? where id =? `
      //     db.query(updateContract,[docUrl,urlImage,id],(err,result)=>{
      //       err ? console.log(err) : console.log(result)
      //     })
      //     // fs.unlinkSync("output.docx", (err) => {
      //     //   if (err) {
      //     //     console.error(err);
      //     //     return;
      //     //   }

      //     //   // file removed
      //     // });
      //     // fs.unlinkSync("image.jpg", (err) => {
      //     //   if (err) {
      //     //     console.error(err);
      //     //     return;
      //     //   }

      //     //   // file removed
      //     // });
      //   }
      // });

      // buf is a nodejs Buffer, you can either write it to a
      // file or res.send it with express for example.
    }
  });
};

const updateContractImage = async (req,res)=>{
  const { id , twoPages } = req.params;
  console.log(req.body) 
 var urlImage = ""
 var Cmpt = 1
 if(twoPages==false)
 Cmpt=0 ; 
  console.log(Cmpt,"Compteur")
 for (let i = 0 ; i <=Cmpt ; i ++){ 
    let uploadDoc = await cloudinary.uploader.upload(`output${i}.docx`, {
      resource_type: "auto",
    });
  var  docUrl = uploadDoc.secure_url;
    console.log(docUrl, "doc url");
    let uploadImage = await cloudinary.uploader.upload(`image${i}.jpg`, {
      resource_type: "auto",
    });
    console.log(i ,"  link " , uploadImage.secure_url)
    urlImage+=uploadImage.secure_url;
    if(i<Cmpt)
    urlImage+=','
  }
console.log(urlImage)
  res.send(urlImage)
  const updateContract = `UPDATE contracts set contract_url = ? , contract_image = ? where id =? `;
    db.query(updateContract, [docUrl, urlImage, id], (err, result) => {
      err ? console.log(err) : console.log(result);
    });


}

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
  updateContractImage
};