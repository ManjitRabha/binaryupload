const formidable = require("formidable");
const fs = require("fs");
const Upload = require("../models/upload");

exports.getAllUpload = (req, res) => {
  Upload.find({})
    .sort({ date: -1 })
    .exec((err, data) => {
      if (err) throw err;
      res.render("home", { data: data });
    });
};

// POST all upload
exports.createUpload = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem  with image",
      });
    }
    // destructure the fields
    const { name, email } = fields;

    // Restriction on product fields
    if (!name || !email) {
      return res.status(400).json({
        error: "Please include all fields",
      });
    }
    let upload = new Upload(fields);

    // handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size is too large!",
        });
      }
      upload.photo.data = fs.readFileSync(file.photo.path);
      upload.photo.contentType = file.photo.type;
    }

    // save to the DB
    upload.save((err, upload) => {
      if (err) {
        res.status(400).json({
          error: "Saving Tshirt in db failed",
        });
      }
      res.redirect("/");
      console.log(upload);
    });
  });
};
