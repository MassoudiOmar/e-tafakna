const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";
require("dotenv").config();

const { G_CLIENT_ID, G_CLIENT_SECRET, G_REFRESH_TOKEN, ADMIN_EMAIL } =
  process.env;

const oauth2client = new OAuth2(
  G_CLIENT_ID,
  G_CLIENT_SECRET,
  G_REFRESH_TOKEN,
  OAUTH_PLAYGROUND
);

const sendEmailRegister = (to, url, text,user) => {
  oauth2client.setCredentials({
    refresh_token: G_REFRESH_TOKEN,
  });
  const accessToken = oauth2client.getAccessToken();
  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: ADMIN_EMAIL,
      clientId: G_CLIENT_ID,
      clientSecret: G_CLIENT_SECRET,
      refreshToken: G_REFRESH_TOKEN,
      accessToken,
    },
  });

  const mailOptions = {
    from: ADMIN_EMAIL,
    to: to,
    subject: "ACTIVATE YOUR ACCOUNT",
    html: `
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap"
      rel="stylesheet"
    />
    <title>Passioncorners | Account Activation</title>
    <style>
      body {
        background-color: #333333;
        height: 100vh;
        font-family: "Roboto", sans-serif;
        color: #fff;
        position: relative;
        text-align: center;
      }
      .container {
        max-width: 700px;
        width: 100%;
        height: 100%;
        margin: 0 auto;
      }
      .wrapper {
        padding: 0 15px;
      }
      .card {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
      }
      span {
        color: #ffc107;
      }
      button {
        padding: 1em 6em;
        border-radius: 5px;
        border: 0;
        background-color: hsl(45, 100%, 51%);
        transition: all 0.3s ease-in;
        cursor: pointer;
      }
      button:hover {
        background-color: hsl(45, 70%, 51%);
        transition: all 0.3s ease-in;
      }
      .spacing {
        margin-top: 5rem;
      }
      #id{
        font-size:40px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="wrapper">
        <div class="card">
        <h1>From:E-Tafakna</h1>
        <h1><span> ${user} Welcome to E-Tafakna!</span> This email is confirmation that you are now registred on E-Tafakna with this Email : ${to}</h1>‏
          <p>Before you start using E-Tafakna , please confirm your account by copying this code below  to the App🙂 👇🏻 :</p>
          <div id="id" >${url}</div>
          <p> Thank you for Registring  !</p>
          <p>E-Tafakna.com</p>‏
          <br>
          <br>
          <h1><span>  ${user} Bien venue à E-Tafakna! Votre compte est maintenant créé
          </span> Cet e-mail est la confirmation que vous êtes maintenant inscrit à E-Tafakna avec cet Email : ${to}</h1>
          <p>Avant de commencer à utiliser E-Tafakna, veuillez confirmer votre compte en copiant ce code ci-dessous vers l'application🙂 👇🏻 :</p>
          <div>${url}</div>
          <br>
          <br>
          <p> Merci pour votre confiance  !</p>
          <br>
          <br>
          <p>E-Tafakna.com</p>
        </div>
      </div>
    </div>
  </body> 
</html>
  `,
  };

  smtpTransport.sendMail(mailOptions, (err, info) => {
    if (err) return { err };
    return info;
  });
};

// const sendEmailReset = (to, url, text, name) => {
//   oauth2client.setCredentials({
//     refresh_token: G_REFRESH_TOKEN,
//   });
//   const accessToken = oauth2client.getAccessToken();
//   const smtpTransport = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       type: "OAuth2",
//       user: ADMIN_EMAIL,
//       clientId: G_CLIENT_ID,
//       clientSecret: G_CLIENT_SECRET,
//       refreshToken: G_REFRESH_TOKEN,
//       accessToken,
//     },
//   });

//   const mailOptions = {
//     from: ADMIN_EMAIL,
//     to: to,
//     subject: "RESET PASSWORD",
//     html: `
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8" />
//       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//       <link
//         href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap"
//         rel="stylesheet"
//       />
//       <title>Passioncorners | Account Activation</title>
//       <style>
//         body {
//           background-color: #333333;
//           height: 100vh;
//           font-family: "Roboto", sans-serif;
//           color: #fff;
//           position: relative;
//           text-align: center;
//         }
//         .container {
//           max-width: 700px;
//           width: 100%;
//           height: 100%;
//           margin: 0 auto;
//         }
//         .wrapper {
//           padding: 0 15px;
//         }
//         .card {
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%);
//           width: 100%;
//         }
//         span {
//           color: #ffc107;
//         }
//         button {
//           padding: 1em 6em;
//           border-radius: 5px;
//           border: 0;
//           background-color: hsl(45, 100%, 51%);
//           transition: all 0.3s ease-in;
//           cursor: pointer;
//         }
//         button:hover {
//           background-color: hsl(45, 70%, 51%);
//           transition: all 0.3s ease-in;
//         }
//         .spacing {
//           margin-top: 5rem;
//         }
//       </style>
//     </head>
//     <body>
//       <div class="container">
//         <div class="wrapper">
//           <div class="card">
//             <h1><span>Hey</span> ${name}</h1>
//             <p>Please click the button below to reset your password. 🙂</p>
//             <a href=${url}><button>${text}</button></a>
//             <p class="spacing">
//               If the button above does not work, please navigate to the link
//               provided below 👇🏻
//             </p>
//             <div>${url}</div>
//           </div>
//         </div>
//       </div>
//     </body>
//     </html>
//   `,
//   };

//   smtpTransport.sendMail(mailOptions, (err, info) => {
//     if (err) return { err };
//     return info;
//   });
// };

module.exports = {
  sendEmailRegister,
  // sendEmailReset
};
