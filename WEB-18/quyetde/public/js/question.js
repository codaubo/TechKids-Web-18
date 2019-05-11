$(document).ready(() => {
  const questionId = window.location.pathname.split('/')[2];

    $.ajax({
      url: `/api/questions/getQuestionById/${questionId}`,
      type: 'GET',
      success: (data) => {
        // display question
        $('.question-content').text(data.content);
        $('.result').click('click', () => {
          window.location.href = `/answer/${data._id}`;
        });
  
        // handle vote yes
        $('.vote-yes').on('click', () => {
          $.ajax({
            url: '/api/questions',
            type: 'PUT',
            data: {
              questionId: data._id,
              vote: 'yes'
            },
            success: (voteYesdata) => {
              console.log(voteYesdata);
              window.location.href = `/answer/${data._id}`;
            },
            error: (_xhr, _statusCode, error) => {
              console.log(error);
            },
          });
        });
  
        // handle vote no
        $('.vote-no').on('click', () => {
          $.ajax({
            url: '/api/questions',
            type: 'PUT',
            data: {
              questionId: data._id,
              vote: 'no'
            },
            success: (voteNodata) => {
              console.log(voteNodata);
              window.location.href = `/answer/${data._id}`;
            },
            error: (_xhr, _statusCode, error) => {
              console.log(error);
            },
          });
        });
      },
      error: (_xhr, _statusCode, error) => {
        console.log(error);
      },
    });
  });