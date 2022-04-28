/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//input: tweet object. output: tweet article with HTML structure
$(document).ready(function() {
  
  const createTweetElement = function(tweetObj) {
    let $tweet = $(`<section class="tweet">
      <header class="user-data">
        <div class="lefthand">
          <img src='${tweetObj.user.avatars}'class="avatar"></img>
          <div class="name">${tweetObj.user.name}</div>
        </div>
      <div class="handle">${tweetObj.user.handle}</div>
    </header>
    <article class="tweet-post">${tweetObj.content.text}</article>
    <footer>
      <div>${tweetObj.created_at}</div> // how to convert this date properly?
      <div class="icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </section>`);
  }
return $tweet;
//do something to get this to populate?
});
