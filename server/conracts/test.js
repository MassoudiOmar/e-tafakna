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

const url = 'http://www.ojk.ee/sites/default/files/respondus-docx-sample-file_0.docx';

const main = async () => {

  const response = await superagent.get(url)
    .parse(superagent.parse.image)
    .buffer();

  const buffer = response.body;

  const text = (await mammoth.extractRawText({ buffer })).value;
  const lines = text.split('\n');

  console.log(lines);
};

main().catch(error => console.error(error));