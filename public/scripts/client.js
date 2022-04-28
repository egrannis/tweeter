/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  //takes in tweet object as input, and outputs tweet article with HTML structure
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
      <div>${tweetObj.created_at}</div> 
      <div class="icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </section>`);
return $tweet;
}

// Takes in tweets object, loops through each tweet, and appends to the #tweets-container
const renderTweets = function(tweets) {
  for(let tweet of tweets) {
    $('#tweets-container').append(createTweetElement(tweet));
  }
};

// Example Data to test renderTweets function
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1650931475287
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1651017875287
  }
]

renderTweets(data);

// // Test / driver code (temporary). Eventually will get this from the server.
// const tweetData = {
//   "user": {
//     "name": "Newton",
//     "avatars": "https://i.imgur.com/73hZDYK.png",
//       "handle": "@SirIsaac"
//     },
//   "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//   "created_at": 1461116232227
// }

// const $tweet = createTweetElement(tweetData);

// // Test / driver code (temporary)
// console.log('$tweet: ', $tweet); // to see what it looks like
// $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

}); //end of document.ready function