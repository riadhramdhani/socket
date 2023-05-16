const router= require("express").Router() 
const nodemaile= require("../controllers/mailcontroller")
router.post("/api/sendmail",nodemaile.nodemaile)
module.exports={mailrouter:router}