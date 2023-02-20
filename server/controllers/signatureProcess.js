var db = require("../database-mysql");
const superagent = require("superagent");
const Docxtemplater = require("docxtemplater");
const PizZip = require("pizzip");
const fs = require("fs");
const cloudinary = require("../utils/cloudinary");
const FormData = require("form-data");
const axios = require("axios");

const uploadCin = (req, res) => {
  const { id } = req.params;
  const { carteCinFront, carteCinBack, faceVideo } = req.body;
  const sql = `update users SET carteCinFront = ? , carteCinBack = ? , faceVideo =? WHERE id=?`;
  db.query(sql, [carteCinFront, carteCinBack, faceVideo, id], (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
};

const uploadSignature = (req, res) => {
  const { id } = req.params;
  const { signatureImg } = req.body;
  const sql = `update users SET scanSignature = ? WHERE id =?`;
  db.query(sql, [signatureImg, id], (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
};

const uploadVideo = (req, res) => {
  const { id } = req.params;
  const { faceVideo } = req.body;
  const sql = `update users SET faceVideo = ? WHERE id =?`;
  db.query(sql, [faceVideo, id], (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
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
          dpi: 500,
        },
      })
    );
    formData.append("document", fs.createReadStream(`output${index}.docx`));
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

const fillContract = async (req, res) => {
  let renderObject = {};
  let answersArray = [];
  let template_FR =
    "https://res.cloudinary.com/dew6e8h2m/raw/upload/v1666606027/formulaire_de_certificat_2f_sw0qxl.docx";
  let template_FR2 =
    "https://res.cloudinary.com/dew6e8h2m/raw/upload/v1665937096/formulaire_de_certificat_4_w8jxky.docx";
  let questions_id = [70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80];
  let content = req.body.content;
  let boolean = req.body.boolean;
  answersArray = questions_id.map((element, index) => {
    let key = questions_id[index];
    let object = {};
    object[key] = content[index];
    return object;
  });

  renderObject = answersArray.reduce((acc, e, i) => {
    let key = Object.keys(e)[0];
    let value = Object.values(e)[0];
    acc[key] = value;
    return acc;
  }, {});
  var url = boolean ? template_FR : template_FR2;
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
};

const updateContractImage = async (req, res) => {
  let id = req.params.id;
  var Cmpt = 1;
  var twoPages = false;
  if (twoPages == false) Cmpt = 0;
  for (let i = 0; i <= Cmpt; i++) {
    let uploadDoc = await cloudinary.uploader.upload(`output${i}.docx`, {
      resource_type: "auto",
    });
    var docUrl = uploadDoc.secure_url;
  }
  const updateContract = `UPDATE users set signatureUrl  = ? where id =? `;
  db.query(updateContract, [docUrl, id], (err, result) => {
    err ? console.log(err) : console.log(result);
  });
};

const updateStatus = (req, res) => {
  const { id } = req.params;
  const { string } = req.body;
  const sql = `UPDATE users SET ${string} = 'true' where id = ${id}`;
  db.query(sql, [string, id], (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
};

const sendOtp = async (req, res) => {
  const { certType, userId, idType, authDelivery, phone } = req.body;
  axios
    .post(
      `https://193.95.63.230:8443/tunsign-proxy-webapp/services/rest/tunsign-proxy-admin/aed-send-otp/c638a72d-5324-405e-b664-de94ed3db77c`,
      { certType, userId, idType, authDelivery, phone }
    )
    .then(async (result) => {
      res.send(result.data);
      return;
    })
    .catch((err) => {
      res.send(err, "err");
    });
};
const aedValidateOtp = async (req, res) => {
  const { textId, otp } = req.params;
  const { certType, userId, idType, authDelivery, phone, email } = req.body;
  axios
    .post(
      `https://193.95.63.230:8443/tunsign-proxy-webapp/services/rest/tunsign-proxy-admin/aed-validate-otp/c638a72d-5324-405e-b664-de94ed3db77c/${textId}/${otp}`,
      { certType, userId, idType, authDelivery, phone, email }
    )
    .then(async (result) => {
      res.send(result.data);
      return;
    })
    .catch((err) => {
      res.send(err);
    });
};
////////////////////// third ONE ////// create-digigo-user
const createUser = (req, res) => {
  const { clientId } = req.params;
  const {
    txIdEmail,
    txIdPhone,
    certType,
    country,
    subscriberName,
    subscriberFirstname,
    subscriberBirthdate,
    subscriberIdentityType,
    subscriberId,
    subscriberPhone,
    subscriberEmail,
    subscriberIdentityFile,
    subscriberIdentityFileType,
    screenshot1File,
    screeshot1FileType,
    screenshot2File,
    screeshot2FileType,
    requestSignature,
    urlVideo,
    videoHash,
  } = req.body;
  axios
    .post(
      `https://193.95.63.230:8443/tunsign-proxy-webapp/services/rest/tunsign-proxy-admin/create-digigo-user/c638a72d-5324-405e-b664-de94ed3db77c`,
      {
        txIdEmail,
        txIdPhone,
        certType,
        country,
        subscriberName,
        subscriberFirstname,
        subscriberBirthdate,
        subscriberIdentityType,
        subscriberId,
        subscriberPhone,
        subscriberEmail,
        subscriberIdentityFile,
        subscriberIdentityFileType,
        screenshot1File,
        screeshot1FileType,
        screenshot2File,
        screeshot2FileType,
        requestSignature,
        urlVideo,
        videoHash,
      }
    )
    .then((res) => {
      res.send(res.data, "res");
    })
    .catch((err) => {
      console.log(err);
    });
  };

////////////////////// fifth ONE ////// validate-identity
const validateIdentity = (req, res) => {
  const { clientId } = req.params;
  const {
    requestId,
    timestampIdentityVerification,
    proofFile,
    proofFileType,
    requestSignature,
  } = req.body;
  axios
    .post(
      `https://digigo.tuntrust.tn/tunsign-proxy-webapp/services/rest/tunsign-proxy-admin/validate-identity/${clientId}`,
      {
        requestId,
        timestampIdentityVerification,
        proofFile,
        proofFileType,
        requestSignature,
      }
    )
    .then((res) => {
      res.send(res, "res");
    })
    .catch((err) => {
      res.send(err);
    });
};


const aedRequestStatus = (req, res) => {
  const { clientId, requestId } = req.params;
  axios
    .post(
      `https://digigo.tuntrust.tn/tunsign-proxy-webapp/services/rest/tunsign-proxy-admin/aed-request-status/${clientId}/${requestId}`
    )
    .then((err, response) => {
      if (err) res.send(err);
      res.send(response);
    });
};
const updateDigigoUser = (req, res) => {
  const { clientId, certType, txIdEmail, subscriberEmail } = req.params;
  axios
    .post(
      `https://digigo.tuntrust.tn/tunsign-proxy-webapp/services/rest/tunsign-proxy-admin/update-digigo- user/${clientId}/${certType}/${txIdEmail}/${subscriberEmail}`
    )
    .then((err, response) => {
      if (err) res.send(err);
      else res.send(response);
    });
};

const unlockPin = (req, res) => {
  const { clientId } = req.params;
  const { userId, email, idType, authDelivery } = req.body;
  if (authDelivery == 1) {
    const { txIdPhone } = req.body;
    axios
      .post(
        `https://digigo.tuntrust.tn/tunsign-proxy-webapp/services/rest/tunsign-proxy-admin/unlock-pin/${clientId}`,
        { userId, email, idType, authDelivery, txIdPhone }
      )
      .then((err, response) => {
        if (err) res.send(err);
        else res.send(response);
      });
  } else {
    const { txIdEmail } = req.body;
    axios
      .post(
        `https://digigo.tuntrust.tn/tunsign-proxy-webapp/services/rest/tunsign-proxy-admin/unlock-pin/${clientId}`,
        { userId, email, idType, authDelivery, txIdEmail }
      )
      .then((err, response) => {
        if (err) res.send(err);
        else res.send(response);
      });
  }
};

const approveAffiliation = (req, res) => {
  const { clientId } = req.params;
  const {
    affiliationRqtId,
    idType,
    userId,
    email,
    organisationId,
    affiliationType,
    RequestorIdType,
    requestorId,
    requestorEmail,
    approvalSignature,
  } = req.body;

  axios.post(
    `https://digigo.tuntrust.tn/tunsign-proxy-webapp/services/rest/tunsign-proxy-admin/approve-affiliation/${clientId}`,
    {
      affiliationRqtId,
      idType,
      userId,
      email,
      organisationId,
      affiliationType,
      RequestorIdType,
      requestorId,
      requestorEmail,
      approvalSignature,
    },
    (err, result) => {
      if (err) res.send(err);
      else res.send(result);
    }
  );
};

const aedUserInfo = (req, res) => {
  const { clientId, email } = req.params;
  const { idType, userId, organisationId } = req.body;
  axios.post(
    `https://digigo.tuntrust.tn/tunsign-proxy-webapp/services/rest/tunsign-proxy-admin/aed-user-info/${clientId}/${email}`,
    { idType, userId, organisationId },
    (err, result) => {
      if (err) res.send(err);
      else res.send(result);
    }
  );
};

const changeAffiliation = (req, res) => {
  const { clientId } = req.params;
  const {
    idType,
    userId,
    email,
    organisationId,
    affiliationType,
    RequestorIdType,
    requestorId,
    requestorEmail,
    requestSignature,
  } = req.body;

  axios.post(
    `https://digigo.tuntrust.tn/tunsign-proxy-webapp/services/rest/tunsign-proxy-admin/change-affiliation/${clientId}`,
    idType,
    userId,
    email,
    organisationId,
    affiliationType,
    RequestorIdType,
    requestorId,
    requestorEmail,
    requestSignature,
    (err, result) => {
      if (err) res.send(err);
      else res.send(result);
    }
  );
};

const uploadProof = (req, res) => {
  const { clientId, requestId } = req.params;
  const {
    legalRepresentativeIdentityFile,
    legalRepresentativeIdentityFileType,
    subscriberIdentityFile,
    subscriberIdentityFileType,
    screenshotFile1,
    screenshot1FileType,
    screenshotFile2,
    screenshot2FileType,
    taxIdentifierFile,
    taxIdentifierFileType,
    nationalBusinessRegisterFile,
    nationalBusinessRegisterFileType,
    urlVideo,
    videoHash,
    requestSignature,
  } = req.body;
  if (legalRepresentativeIdentityFile != undefined) {
    if (screenshot1FileType != undefined && screenshot2FileType != undefined)
      axios.post(
        `https:// digigo.tuntrust.tn /tunsign-proxy-webapp/services/rest/tunsign-proxy-admin/upload- proof/${clientId}/${requestId}`,
        {
          legalRepresentativeIdentityFile,
          legalRepresentativeIdentityFileType,
          requestSignature,
          screenshot1FileType,
          screenshot2FileType,
          screenshotFile1,
          screenshotFile2,
        },
        (err, result) => {
          if (err) res.send(err);
          else res.send(result);
        }
      );

    if (urlVideo != undefined) {
      axios.post(
        `https:// digigo.tuntrust.tn /tunsign-proxy-webapp/services/rest/tunsign-proxy-admin/upload- proof/${clientId}/${requestId}`,
        {
          legalRepresentativeIdentityFile,
          legalRepresentativeIdentityFileType,
          requestSignature,
          urlVideo,
          videoHash,
        },
        (err, result) => {
          if (err) res.send(err);
          else res.send(result);
        }
      );
    }
  }

  if (subscriberIdentityFile != undefined) {
    if (screenshot1FileType != undefined && screenshot2FileType != undefined)
      axios.post(
        `https:// digigo.tuntrust.tn /tunsign-proxy-webapp/services/rest/tunsign-proxy-admin/upload- proof/${clientId}/${requestId}`,
        {
          subscriberIdentityFile,
          subscriberIdentityFileType,
          requestSignature,
          screenshot1FileType,
          screenshot2FileType,
          screenshotFile1,
          screenshotFile2,
        },
        (err, result) => {
          if (err) res.send(err);
          else res.send(result);
        }
      );

    if (urlVideo != undefined) {
      axios.post(
        `https:// digigo.tuntrust.tn /tunsign-proxy-webapp/services/rest/tunsign-proxy-admin/upload- proof/${clientId}/${requestId}`,
        {
          subscriberIdentityFile,
          subscriberIdentityFileType,
          requestSignature,
          urlVideo,
          videoHash,
        },
        (err, result) => {
          if (err) res.send(err);
          else res.send(result);
        }
      );
    }
  }

  if (taxIdentifierFile != undefined) {
    if (screenshot1FileType != undefined && screenshot2FileType != undefined)
      axios.post(
        `https:// digigo.tuntrust.tn /tunsign-proxy-webapp/services/rest/tunsign-proxy-admin/upload- proof/${clientId}/${requestId}`,
        {
          taxIdentifierFile,
          taxIdentifierFileType,
          requestSignature,
          screenshot1FileType,
          screenshot2FileType,
          screenshotFile1,
          screenshotFile2,
        },
        (err, result) => {
          if (err) res.send(err);
          else res.send(result);
        }
      );

    if (urlVideo != undefined) {
      axios.post(
        `https:// digigo.tuntrust.tn /tunsign-proxy-webapp/services/rest/tunsign-proxy-admin/upload- proof/${clientId}/${requestId}`,
        {
          taxIdentifierFile,
          taxIdentifierFileType,
          requestSignature,
          urlVideo,
          videoHash,
        },
        (err, result) => {
          if (err) res.send(err);
          else res.send(result);
        }
      );
    }
  }
};

////////////////////// eighth ONE ////// AED-USER-STATUS
const aedUserStatues = (req, res) => {
  const { clientId, userId, idType, email } = req.params;
  axios
    .get(
      `https://digigo.tuntrust.tn/tunsign-proxy-webapp/services/rest/tunsign-proxy-admin/aed-user-status/${clientId}/${userId}/${idType}/${email}`
    )
    .then((res) => {
      res.send(res, "res");
    })
    .catch((err) => {
      res.send(err);
    });
};

////////////////////// tenth ONE ////// revoke-certificate/{clientId}
const revokeCertificate = (req, res) => {
  const { clientId } = req.params;
  const { userId, idType, email, authDel, txIdEmail, revocationReason } =
    req.body;
  axios
    .post(
      `https://digigo.tuntrust.tn/tunsign-proxy-webapp/services/rest/tunsign-proxy-admin/revoke-certificate/${clientId}`,
      {
        userId,
        idType,
        email,
        authDel,
        txIdEmail,
        revocationReason,
      }
    )
    .then((res) => {
      res.send(res, "res");
    })
    .catch((err) => {
      res.send(err);
    });
};

////////////////////// eleventh ONE ////// reqeust-affiliation/{clientId}
const requestAffiliation = (req, res) => {
  const { clientId } = req.params;
  const {
    userId,
    idType,
    email,
    organisationId,
    affiliationType,
    requestorIdType,
    requestorId,
    requestorEmail,
    requestSignature,
  } = req.body;
  axios
    .post(
      `https://digigo.tuntrust.tn/tunsign-proxy-webapp/services/rest/tunsign-proxy-admin/request-affiliation/${clientId}`,
      {
        userId,
        idType,
        email,
        organisationId,
        affiliationType,
        requestorIdType,
        requestorId,
        requestorEmail,
        requestSignature,
      }
    )
    .then((res) => {
      res.send(res, "res");
    })
    .catch((err) => {
      res.send(err);
    });
};

////////////////////// thirteenth ONE //////  get-affiliation/{clientId}/{affiliationRqtId}
const getAffiliation = (req, res) => {
  const { clientId, affiliationRqtId } = req.params;
  axios
    .get(
      `https://digigo.tuntrust.tn/tunsign-proxy-webapp/services/rest/tunsign-proxy-admin/get-affiliation/${clientId}/${affiliationRqtId}`
    )
    .then((res) => {
      res.send(res, "res");
    })
    .catch((err) => {
      res.send(err);
    });
};

////////////////////// fiftheenth ONE //////  cancel-affiliation/{clientId}
const cancelAffiliation = (req, res) => {
  const { clientId } = req.params;
  axios
    .post(
      `https://digigo.tuntrust.tn/tunsign-proxy-webapp/services/rest/tunsign-proxy-admin/cancel-affiliation/${clientId}`,
      {
        userId,
        idType,
        email,
        organisationId,
        requestorIdType,
        requestorId,
        requestorEmail,
        requestSignature,
      }
    )
    .then((res) => {
      res.send(res, "res");
    })
    .catch((err) => {
      res.send(err);
    });
};

////////////////////// thirteenth ONE //////  get-quota/{clientId}
///////////// AED
const getQuotaAed = (req, res) => {
  const { clientId } = req.params;
  axios
    .get(
      ` https://digigo.tuntrust.tn/tunsign-proxy-webapp/services/rest/tunsign-proxy-admin/get-quota/${clientId}`
    )
    .then((res) => {
      res.send(res, "res");
    })
    .catch((err) => {
      res.send(err);
    });
};

///////////// USER
const getQuotaUser = (req, res) => {
  const { clientId, email } = req.params;
  axios
    .get(
      ` https://digigo.tuntrust.tn/tunsign-proxy-webapp/services/rest/tunsign-proxy-admin/get-quota/${clientId}/${email}`
    )
    .then((res) => {
      res.send(res, "res");
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = {
  uploadCin,
  uploadSignature,
  uploadVideo,
  fillContract,
  updateContractImage,
  updateStatus,
  sendOtp,
  createUser,
  validateIdentity,
  aedUserStatues,
  revokeCertificate,
  requestAffiliation,
  getAffiliation,
  cancelAffiliation,
  getQuotaAed,
  getQuotaUser,
  aedValidateOtp,
  aedRequestStatus,
  updateDigigoUser,
  unlockPin,
  approveAffiliation,
  aedUserInfo,
  changeAffiliation,
  uploadProof,
};
