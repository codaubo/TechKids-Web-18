import React from 'react';

export const ListItem = (props) => {
  return (
    <a class='result col-md-12' href={`https://www.youtube.com/watch?v=${props.item.id.videoId}`} target='_blank'>
      <div class='row'>
        <div class='col-4'>
          <img src={`${props.item.snippet.thumbnails.medium.url}`} />
        </div>
        <div class='col-8'>
          <div class='video-info'>
            <h2 class='title'>{`${props.item.snippet.title}`}</h2>
            <p class='description'>{`${props.item.snippet.description}`}</p>
            <span>View >></span>
          </div>
        </div>
      </div>
    </a>
  );
};