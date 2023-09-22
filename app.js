import express from "express";
import QRCodePNG from "qrcode";

const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let date = new Date().getFullYear();
app.get("/", function (req, res) {
  res.render("index", {date:date});
});

app.post("/generate", function (req, res) {
  const url = req.body.url;
  const options = {
    width:300,
    height:300
  }
   QRCodePNG.toDataURL(url, options, (err, qrCode) => {
    if (err) {
      console.error(err);
      res.render("index", {
        errorMessage: "An error occurred while generating the QR code."
      });
     
   } else {
    res.render("index" , {codePNG:qrCode, message:url, date:date})
   }
  });
});



app.listen(port, () => {
  console.log("Server started on port 3000");
});
