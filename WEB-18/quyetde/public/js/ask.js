$(document).ready(() => {
  $('.ask').on('submit', (event) => {
    event.preventDefault();

    console.log($('#question').val());

    $.ajax({
      url: '/api/questions',
      type: 'POST',
      data: {
        questionContent: $('#question').val(),
      },
      success: (data) => {
        window.location.href = `/answer/${data.data._id}`;
      },
      error: (_xhr, _statusCode, error) => {
        console.log(error);
      },
    });
  });
});