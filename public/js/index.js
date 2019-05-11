$(".submitBtn").on("click", function () {
    var id = $(this).attr("data-id");
    var note = $("#" + id).val();
   
    console.log(note);
    $.ajax({
        method: "POST",
        url: "/notes/" + id,
        data: {
            note: note
        }

    })
        .then(function (data) {
            console.log(data);

         
        });

    $("#addNote").val("");

});
