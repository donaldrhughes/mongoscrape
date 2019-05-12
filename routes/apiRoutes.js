var db = require("../models/Article");
var cheerio = require("cheerio");
var axios = require("axios");

module.exports = function (app) {
    app.get("/articles", function (req, res) {

        db.find({})
            .then(function (dbArticle) {

                res.json(dbArticle);
            })
            .catch(function (err) {

                res.json(err);
            });
    });


    app.get("/scrape", function (req, res) {
        //Create URL for Axios request
        var responseURL = "https://www.npr.org/sections/news/";
        var articles = [];

        //Axios request
        axios.get(responseURL).then(function (response, err) {
            if (err) { throw err } else {
                //Load HTML to cheerio
                var $ = cheerio.load(response.data);

                //all api info for request URL
                $("article").each(function (i, element) {
                    var articleObj = {
                        id: "",
                        aText: "",
                        aSummary: "",
                        aUrl: "",
                        note: ""

                    };
                    var headline = $(element).find("h2").text()

                    var url = $(element).find("a").attr("href")

                    var teaser = $(element).find("p.teaser").find("a").text()

                    articleObj.id = i;
                    articleObj.aText = headline;
                    articleObj.aSummary = teaser;
                    articleObj.aUrl = url;

                    articles.push(articleObj);


                    db.create(articleObj)
                        .then(function (dbArticle) {

                            console.log("Article Created")
                        })
                        .catch(function (err) {
                            // If an error occurred, log it
                            console.log(err);
                        });
                })

                res.send(articles);
            }
        });

    });

    app.get("/removeall", function (req, res) {


        db.deleteMany({})
        .then(function (results) {

            console.log(results + "Deleted")
          res.render("index")
        })
        .catch(function (err) {
            // If an error occurred, log it
            console.log(err);
        });
    });

}

