const router= require("express").Router() 
const sendSms= require ("../controllers/SmsControllers")
router.post("/api/sendSms",sendSms.sendSms)
module.exports={smsRouter:router}