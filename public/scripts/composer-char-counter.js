$(document).ready(function() {
  $("#tweet-text").on('keyup', function() {
    const counter = 140;
    let count = this.value.length;
    $("#counter").text(counter - count);
    if ((counter - count) < 0) {
      $("#counter").addClass("red");
    } else {
      $("#counter").removeClass("red");
    }
  });
});

// CLEAN UP LATER - KEEP FOR NOW
// Form  for today's activities
// Find the form-input field with jquery ( or vanillaJS)
// Add event listner that is able
//to run on every letter typed in
// use that to get the output of what was
// typed in
// 140 - what was typed in = how many characters are left
// display that number on the webpage

// using this - and then traversing - return to???
//make sure youre accessing correct element
//    console.log($(this));
//    console.log($(this).children(".counter"));
//  console.log($(this).parent()); //.children(".counter")); // access selector like you would in css, eg . for class, # for id, etc.
// see how you can access the value in the element