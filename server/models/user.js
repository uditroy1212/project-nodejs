const mongoose = require("mongoose");

const User = new mongoose.Schema(
    {
        companyName: { type: "string", required: true },
        emailId: { type: "string", required: true },
        companyCode: { type: "string", unique: true },
        website: { type: "string" },
        strength: { type: Number },
        createdAt: { type: Date, required: true, default: Date.now },
    },
    { collation: { locale: "en_US", strength: 1 } }
);

const model = mongoose.model("userData", User);

module.exports = model;
