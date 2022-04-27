$(document).ready(function() {
 console.log('Working');
 $("#tweet-text").on('keypress', function(){
   console.log(140-$(this).val().length);
   //make sure youre accessing correct element
   console.log($(this));
   console.log($(this).children(".counter"));
 console.log($(this).parent()); //.children(".counter")); // access selector like you would in css, eg . for class, # for id, etc.
 // see how you can access the value in the element
 
  })
}
);



// Form  for today's activities
// Find the form-input field with jquery ( or vanillaJS)
// Add event listner that is able 
//to run on every letter typed in
// use that to get the output of what was 
// typed in
// 140 - what was typed in = how many characters are left
// display that number on the webpage