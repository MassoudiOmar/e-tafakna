const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')

const formData = new FormData()
formData.append('instructions', JSON.stringify({
  parts: [
    {
      file: "document"
    }
  ],
  output: {
    type: "image",
    format: "jpg",
    dpi: 500
  }
}))
formData.append('document', fs.createReadStream('output.docx'))

;(async () => {
  try {
    const response = await axios.post('https://api.pspdfkit.com/build', formData, {
      headers: formData.getHeaders({
          'Authorization': 'Bearer pdf_live_rMidCXXZtyxm6alf3YwkDAtkrG1PZbuiBfjIGOZefLJ'
      }),
      responseType: "stream"
    })

    response.data.pipe(fs.createWriteStream("image.jpg"))
  } catch (e) {
    const errorString = await streamToString(e.response.data)
    console.log(errorString)
  }
})()

function streamToString(stream) {
  const chunks = []
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)))
    stream.on("error", (err) => reject(err))
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")))
  })
}
