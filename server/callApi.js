const request = require("request-promise");

const getDataFromApi = async (req, res) => {
    try {
        const options = {
            method: "GET",
            url: "https://www.mocky.io/v2/5d889c8a3300002c0ed7da42",
            headers: {},
            json: true,
        };
        const response = await request(options);
        console.log(response);
        res.status(200).json(response.items);
    } catch (err) {
        console.log(err.message);
    }
};

module.exports = { getDataFromApi };
