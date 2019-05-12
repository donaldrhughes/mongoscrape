$("#btn-scrape").on("click", function () {

    $.ajax({
        method: "GET",
        url: "/scrape"

    })
        .then(function (data) {
            window.location.href = "/";
            console.log(data);

        });

});

$("#btn-remove").on("click", function () {

    $.ajax({
        method: "GET",
        url: "/removeall"
       
    })
        .then(function (data) {
            window.location.href = "/";
            console.log(data);

        });

});
