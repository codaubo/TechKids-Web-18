$(document).ready(() => {
  const questionId = window.location.pathname.split('/')[2];

  $.ajax({
    url: `/api/questions/getQuestionById/${questionId}`,
    type: 'GET',
    success: (data) => {
      let yesPercent = 50;
      let noPercent = 50;
      if (Number(data.yes) + Number(data.no) > 0) {
        yesPercent = (Number(data.yes) / (Number(data.yes) + Number(data.no)) * 100).toFixed(2);
        noPercent = 100 - yesPercent;
      }

      // display question
      $('.question-content').text(data.content);
      $('.total-vote').text(`${Number(data.yes) + Number(data.no)} votes`);

      $('.yes-percent').css('width', `${yesPercent}%`);
      $('.yes-percent').text(`${yesPercent}%`);

      $('.no-percent').css('width', `${noPercent}%`);
      $('.no-percent').text(`${noPercent}%`);

      // other question button
      $('.other-question').on('click', () => {
        window.location.href = '/';
      });
    },
    error: (_xhr, _statusCode, error) => {
      console.log(error);
    },
  });
});