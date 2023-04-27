const Quote = require("../models/Quote");
const router = require("express").Router();
const cron = require('node-cron');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

var task = cron.schedule('0 0 * * *', async function() { // runs every midnight
    console.log("quote cron job executing!")
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = async function() {
        if (this.readyState == 4 && this.status == 200) {
            // Access the result here
            const quoteJSON = JSON.parse(this.responseText)
            try {
                /*const quoteObj = await Quote.findOne({ quote_id: "daily_quote" });
                if (!quoteObj) {
                    const newDailyQuote = new Quote({
                        quote_id: "daily_quote",
                        quote_text: text,
                        quote_author: author
                    });
                    await newDailyQuote.save();
                }
                else {*/
                    await Quote.findOneAndUpdate(
                        {
                            quote_id: "daily_quote"
                        },
                        { 
                            quote_text: quoteJSON.contents.quotes[0].quote,
                            quote_author: quoteJSON.contents.quotes[0].author
                        }
                    );
                //}
            }
            catch(err) {
                return res.status(500).json(err);
            }
        }
    };
    xhttp.open("GET", "https://quotes.rest/qod?category=life", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    //xhttp.setRequestHeader("X-Theysaidso-Api-Secret", "w2VZ7JbuNO54jUa8vBd18zGCu3wCdFpXNJHvFB7c");
    xhttp.setRequestHeader("X-Theysaidso-Api-Secret", "248Ebf9vcbmFwVhklLYZFoBbQaVnG7gbtFtuFgND");
    xhttp.send();
});

router.get("/fetchDailyQuote", async (req, res) => {
    try {
		const quoteObj = await Quote.findOne({ quote_id: "daily_quote" });
		res.status(200).json(quoteObj);
	} catch (err) {
		res.status(500).json(err);
	}
})

module.exports = router