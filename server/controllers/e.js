const fn =async()=>{
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "Etafakna.startup@gmail.com",
          pass: "wjdcnxmaiglkufmv",
        },
      });
      const resetCode = Math.floor(10000 + Math.random() * 90000);
      const salt = await bcrypt.genSalt();
      const hashedCode = await bcrypt.hash(resetCode.toString(), salt);
      //  const check = await bcrypt.compare(resetCode.toString(), hashedCode.toString())
      var mailOptions = {
        from: "Etafakna.startup@gmail.com",
        to: "massoudiomar54321@gmail.com",
        subject: "Hi! this this your verifying code",
        text: `${resetCode}`,
      };
    
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.send(error);
        } else {
          res.send({
            message: "email has been send",
            resetToken: hashedCode,
          });
        }
      });
};