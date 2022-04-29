// All functions and function calls are declared within document.ready function

$(document).ready(function() {

  // Escape to bar XSS <script> tags
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // fetches tweets from the tweets page
  const loadTweets = function() {
    $.get("/tweets", function(response) {
      renderTweets(response);
    })
      .fail(function(error) {
        alert(error.status + ": " + error.statusText);
      });
  };

  // Call load tweets function to get the tweets to load upon page load
  loadTweets();


  // listener for button click of write a new tweet text / down arrow logo at the righthand side of nav bar. Redirects focus to tweet-text area.
  $(".write-new-tweet").on("click", function(event) {
    $("#tweet-text").focus();
  });


  //function takes in tweet object as input, and outputs tweet article with HTML structure
  const createTweetElement = function(tweetObj) {
    const safeText = `<p>${escape(tweetObj.content.text)}</p>`;
    let $tweet = $(`<section class="tweet">
      <header class="user-data">
        <div class="lefthand">
          <img src='${tweetObj.user.avatars}'class="avatar"></img>
          <div class="name">${tweetObj.user.name}</div>
        </div>
      <div class="handle">${tweetObj.user.handle}</div>
    </header>
    <article class="tweet-post">${safeText}</article>
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
  };

  // Takes in tweets object, loops through each tweet, and prepends to the #tweets-container
  const renderTweets = function(tweets) {
    $("#tweets-container").empty(); // remove duplicated tweets
    for (let tweet of tweets) {
      $("#tweets-container").prepend(createTweetElement(tweet));
    }
  };

  // Function for error message to present custom error text, slide down, and add styling if user types in incorrect character count
  const errorMessage = function(errorText) {
    $(".error-message").html(`<i class="fa-solid fa-circle-exclamation"></i><div class="error-text-content">${errorText}</div><i class="fa-solid fa-circle-exclamation"></i>`);
    $(".error-message").slideDown().addClass("error-styling");
  };

  // listener for submission of tweet form that posts the tweet text
  $(".tweet-form").on("submit", function(event) {
    event.preventDefault(); // prevents default form submission behaviour

    if ($(".error-message").hasClass("error-styling")) { // if error message is still showing from previous post attempt, have the error message go away when someone submits again
      $(".error-message").slideUp().removeClass("error-styling");
    }

    const tweetText = $("#tweet-text").val(); // setting variable to value of tweet text to use for if statements
    if (tweetText.length > 140) {
      return errorMessage("It looks like your tweet is too long. Please enter 140 characters or less in the text field!"); // Implementing errorMessage function with custom text
    }
    if (tweetText.length === 0 || tweetText === undefined) {
      return errorMessage("It looks like you didn't write any content. Make sure to enter at least 1 character in the text field!"); // Implementing errorMessage function with custom text
    }
    const serialData = $("#tweet-text").serialize(); // if the tweet text doesn't bring these errors, serialize the form data
    $.post("/tweets", serialData, function() { 
      $("#tweet-text").val(''); // clear the form once the tweets are rendered and loaded
      $("#counter").text(140); // resets the counter to show as 140 again once the tweet is posted
      loadTweets(); // load tweets on the page
    })
  });
});