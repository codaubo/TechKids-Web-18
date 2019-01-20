$(document).ready(function () {
    let questionId =-1;

    $.ajax({
        url: "/question",
        type: "GET",
        success: function(data){
            const question = data.question;
            console.log(question.content)
            $("h1").text(question.content);
            questionId = question.id;
        }
    });

    $(".choose-no").on('click',function () {
        console.log("Vote no");
        $.ajax({
            url: "/vote",
            type: "POST",
            data: {
                'questionId': questionId,
                'vote': 0
            },
            success: function(){
               window.open(`/question/${questionId}`, "_self");
            },
            error: function(error){
                console.log(error);
            }
        });
    });

    $(".choose-yes").on('click',function () {
        $.ajax({
            url: "/vote",
            type: "POST",
            data: {
                'questionId': questionId,
                'vote': 1
            },
            success: function(){
                window.open(`/question/${questionId}`, "_self");
            },
            error: function(error){
                console.log(error);
            }
        });
    });

    $(".result-button").on('click', function(){
        window.open(`/question/${questionId}`,"_self");
    });
});