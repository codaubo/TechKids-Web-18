$(document).ready(() => {
  let nextPageToken = '';
  let isLoading = false;
  let timeoutId = undefined;

  $('#keyword').on('input', (event) => {
    event.preventDefault();
    console.log(timeoutId);
    clearTimeout(timeoutId);

    // get value by input
    const searchInput = $('#keyword');
    const keyword = searchInput.val();

    timeoutId = setTimeout(() => {
      $.ajax({
        url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyword}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`,
        type: 'GET',
        success: (data) => {
          console.log(data);
          nextPageToken = data.nextPageToken;
          $('#result-list').html('');

          data.items.forEach((item) => {
            const itemLink = `
              <a class='result col-md-12' href='https://www.youtube.com/watch?v=${item.id.videoId}' target='_blank'>
                <div class='row'>
                  <div class='col-4'>
                    <img src='${item.snippet.thumbnails.medium.url}' />
                  </div>
                  <div class='col-8'>
                    <div class='video-info'>
                      <h2 class='title'>${item.snippet.title}</h2>
                      <p class='description'>${item.snippet.description}</p>
                      <span>View >></span>
                    </div>
                  </div>
                </div>
              </a>
            `;

            $('#result-list').append(itemLink);

            // add scroll event
            $(window).on('scroll', () => {
              if ($(document).height() - $(window).height() - $(window).scrollTop() < 200) {
                if (!isLoading) {
                  isLoading = true;
                  $.ajax({
                    url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=chipu&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pageToken=${nextPageToken}`,
                    type: 'GET',
                    success: (response) => {
                      response.items.forEach((item) => {
                        const itemLink = `
                          <a class='result col-md-12' href='https://www.youtube.com/watch?v=${item.id.videoId}' target='_blank'>
                            <div class='row'>
                              <div class='col-4'>
                                <img src='${item.snippet.thumbnails.medium.url}' />
                              </div>
                              <div class='col-8'>
                                <div class='video-info'>
                                  <h2 class='title'>${item.snippet.title}</h2>
                                  <p class='description'>${item.snippet.description}</p>
                                  <span>View >></span>
                                </div>
                              </div>
                            </div>
                          </a>
                        `;

                        $('#result-list').append(itemLink);

                        isLoading = false;
                      })
                    },
                    error: (_jqXHR, _textStatus, error) => {
                      console.log(error);
                    },
                  });
                }
              } 
            });
          });
        },
        error: (_jqXHR, _textStatus, error) => {
          console.log(error);
        },
      })
    }, 1000);

    // get data from Youtube API
  });
});