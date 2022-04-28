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


// listener for submission of tweet form
$(".tweet-form").on("submit", function (event) {
  event.preventDefault(); // prevents default form submission behaviour
  const serialData = $("#tweet-text").serialize(); // serialize the form data

  //submit a post request that sends the serialized data to the server
  //BIG question for line 95. Did I do this wrong? Do I need to do $.ajax (url, method: POST, etc??) This is a shorthand Ajax function, which is equivalent to:
  /* $.ajax({
  url: url,
  data: data,
  success: success,
  dataType: dataType
}); */

  $.post("/tweets", serialData, function () { // $.post (URL, Data, callback) // when I googled ajax post I found this but unsure if I should do .ajax?
    console.log("successful post")
  })
})

// fetches tweets from the tweets page
const loadTweets = function () {
  $.get("/tweets", serialData, function () {
    console.log('It works?')
  })
}

// unsure if this below is better than on line 108
const loadTweets = function () {
  $.ajax("/tweets", { method: 'GET'})
  .then(renderTweets)
  .then(console.log("Help"));

}); //end of document.ready function