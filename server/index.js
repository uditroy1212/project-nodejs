var express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { isEmpty } = require("lodash");

const User = require("./models/user");
var app = express();
var PORT = 9000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/project-node-react");

app.post("/getDetailsFromId", async (req, res) => {
    try {
        const { id = "" } = req.body;
        if (!isEmpty(id)) {
            const findUser = await User.findOne({ _id: id }).lean();
            if (!isEmpty(findUser)) {
                res.status(200).json({ userDetails: findUser });
            } else {
                res.status(400).json({ error: "User not found" });
            }
        }
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

app.post("/updateCompanyRecords", async (req, res) => {
    try {
        const {
            strength = null,
            website = "",
            companyCode = "",
            emailId = "",
            companyName = "",
            operation = "",
        } = req.body;

        if (!isEmpty(companyName) && !isEmpty(emailId) && operation === "create") {
            const userDetails = {
                companyName: companyName,
                emailId: emailId,
                companyCode: companyCode,
                website: website,
                strength: strength,
            };
            const createUser = await User.create(userDetails);
            if (createUser) {
                res.status(200).json({ message: "user created successfully" });
            } else {
                res.status(400).json({ message: "User Not Created" });
            }
            console.log(createUser);
        } else if (operation === "update") {
            const updateUser = await User.findOneAndUpdate(
                { emailId: emailId },
                {
                    $set: {
                        companyName: companyName,
                        emailId: emailId,
                        companyCode: companyCode,
                        website: website,
                        strength: strength,
                    },
                },
                { strict: false, new: true }
            );
            if (updateUser) {
                res.status(200).json({ message: "updated Successfully" });
            } else {
                res.status(400).json({ message: "Not updated Successfully" });
            }
        } else {
            const deleteUser = await User.findOneAndDelete({ emailId: emailId });
            if (deleteUser) {
                res.status(200).json({ message: "Delete Successfully" });
            } else {
                res.status(400).json({ message: "Not deleted Successfully" });
            }
        }
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

app.get("/getCompanyRecords", async (req, res) => {
    try {
        const perPage = 10;
        const page = 1;
        const paginate = await User.find({})
            .skip(perPage * page)
            .limit(perPage);
        if (paginate) {
            res.status(200).json({ data: paginate });
        } else {
            res.status(400).json({ message: "some error occurred" });
        }
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
