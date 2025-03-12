const { generateContent } = require('../services/ai.service');


const getReview = async (req, res) => {
    // console.log(req.body);
    const code = req.body.code;
    // console.log(code);

    if (!code) {
        return res.status(400).send("Prompt is Required");
    }

    try {
        const response = await generateContent(code);
        res.send(response);
    } catch (error) {
        res.status(500).send("Error processing request");
    }
};


module.exports = { getReview };

