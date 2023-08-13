//Frame works required 
var convertapi = require("convertapi")("MK85H7rYV8qiA2VA", {
  conversionTimeout: 60,
  uploadTimeout: 60,
  downloadTimeout: 200,
});
const express = require("express");
const app = express();
const multer = require("multer");
const fs = require("fs");

//Used to store ppt in local system
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Presentation/ppt"); // Specify the directory to which the file will be uploaded
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Set the filename as the original name of the uploaded file
  },
});

const upload = multer({ storage: storage });
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(__dirname + "/Upload"));

//Home page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/Upload/upload.html");
});


app.post("/", upload.single("myFile"), (req, res) => {
  // Access the uploaded file using req.file
  console.log(req.file);
  console.log(req.file.originalname);

  // Coverts ppt to png form
  convertapi
    .convert("png", {
      File: "D:/Mini-Project/Presentation/ppt/" + req.file.originalname,
    })
    .then(function (result) {
      //get converted file url
     console.log("Converted file url: " + result.file.url);

       //save to file
      result
        .saveFiles("D:/Mini-Project/Presentation/png")
        .then(function (files) {
          console.log("Files saved: " + files);

          //To write the pngs location into DATA.txt
          fs.writeFile('./Presentation/DATA.txt', JSON.stringify(files), function (err) {
           if (err) throw err;
           console.log('File is created successfully.');
         });
        
        });
    })

    .catch(function (e) {
      console.error(e.toString());
    });

//When submit button is clicked goes to loading state
return res.redirect("/loading");
});


 
//loading
app.get("/loading",(req,res)=>{
  //Buffering for 5 sec
  setTimeout(() => {
    //Goes to presentation page
    return res.redirect("/presentation");
  }, 5000);
})

app.use("/presentation", express.static(__dirname + "/Presentation"));
//Presentation Page
app.get("/presentation", (req, res) => {
  res.sendFile(__dirname + "/Presentation/presentation.html");
});

//Listens to port 3000 where the site exists
app.listen(3000 || process.env.PORT, () => {
  console.log("Server is running on port 3000");
});


