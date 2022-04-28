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
      <div>${timeago.format(tweetObj.created_at)}</div> 
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
    $("#tweets-container").prepend(createTweetElement(tweet));
  }
};

// fetches tweets from the tweets page
const loadTweets = function () {
  $.get("/tweets", function (response) {
  console.log(response);
  renderTweets(response);
  })
  .fail(function (error) {
   alert(error.status + ": " + error.statusText);
   })
};

// listener for submission of tweet form
$(".tweet-form").on("submit", function (event) {
  event.preventDefault(); // prevents default form submission behaviour
  const tweetText = $("#tweet-text").val();
  if(tweetText.length > 140) {
    return alert("It looks like your tweet is too long. Please enter 140 characters or less in the tweet field.");
  }
  if(tweetText.length === 0 || tweetText === undefined) {
    return alert("It looks like your tweet content is not present. Make sure to enter at least 1 character in the tweet field!");
  }
  const serialData = $("#tweet-text").serialize(); // if the tweet text doesn't bring these errors, serialize the form data
  $.post("/tweets", serialData, function () { // $.post (URL, Data, callback) // when I googled ajax post I found this but unsure if I should do .ajax?
    console.log("successful post");
    $("#tweet-text").val(''); // clear the form once the tweets are rendered and loaded
    loadTweets(); // load tweets on the page
  })
})


loadTweets();

}); //end of document.ready function