const { PDFDocument, StandardFonts, rgb } =require('pdf-lib')
const fs = require('fs');
const { PDFSigner, Certificate } = require('pkijs');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);

const getstarted =async()=>{

    // Create a new PDFDocument
    const pdfDoc = await PDFDocument.create();
    
    // Embed the Times Roman font
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
    
// Add a blank page to the document
const page = pdfDoc.addPage([612, 792]);

// Get the width and height of the page
const { width, height } = page.getSize()
const privateKey = fs.readFileSync('../helpers/key.js');
const certificate = fs.readFileSync('../helpers/key.pub');

// Draw a string of text toward the top of the page
const fontSize = 30
page.drawText('Creating PDFs in JavaScript is awesome!', {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0.53, 0.71),
})
const certificateObject = new Certificate();
await certificateObject.init(PDFSigner.bufferToBuffer(certificate));

// Serialize the PDFDocument to bytes (a Uint8Array)
const pdfBytes = await pdfDoc.save()
fs.writeFileSync(`output.pdf`, pdfBytes);
}
getstarted()