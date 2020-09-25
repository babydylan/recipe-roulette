// $(document).ready(function() {
//     M.updateTextFields();
//   });
// global variable 
var cuisine = "";
// Hides recipe results until user clicks submit 
function hide(){
  $("section").hide();
};
hide();

// cuisine type value

$("li").on("click", function(){
  
  var userCuisineType = $(this).text();
  cuisine = userCuisineType;
  var dropDownarrow = $("<i>" + "expand_more" + "</i>").addClass("material-icons right");
  $(".dropdown-button")
  .text(userCuisineType)
  .append(dropDownarrow);

});



 
// function below builds URL to retrieve recipe data

function fetchCuisineRecipe() {
  // query variable obtains user input
  var query= $("#ingredient_1")
    .val()
    .toLowerCase()
    .trim();

  var apiKey = "ff436b868e184aa8b285a0654110973b";
  
  var spoonacularUrl = "https://api.spoonacular.com/recipes/complexSearch?apiKey=" + apiKey + "&query=" + query + "&cuisine=" + cuisine;
  console.log(spoonacularUrl);

  $.ajax({
    url: spoonacularUrl,
    method: "GET",
  }).then(function (data) {
    console.log(data);
    var newDiv = $(".box");

    newDiv.text(title);

    // For loop below creates a new li, h3, and img tag for each available recipe
    for (var i = 0; i < data.results.length; i++) {
      var title = data.results[i].title;
      var newDisplay = $("<li>");
      var newTitle = $("<h3>")
        .addClass("caption center-align")
        .addClass("orange-text accent-3");
      newTitle.text(title);
      newTitle.appendTo(newDisplay);
      // Line 36-42 work with images
      newDisplay.appendTo(newDiv);
      var imgLink = data.results[i].image;
      var newImg = $("<img>")
      .attr("src", imgLink);
      

      // each li,h3,and img tag becomes appended to a ul tag where a slider class is used 
      newImg.appendTo(newDisplay);
      // button is attached to images using caption class
      var idLink = $("<button>")
      .addClass("btn-small")
      .addClass("caption bottom")
      .text("Click Me For Recipe!");
      idLink.attr("id", data.results[i].id)
      idLink.appendTo(newDisplay);
      
    };
    // slider call below allows for recipe images to appear one at a time 
    $('.slider').slider();

    // Event listener for button located on image which redirects to a new page 
    $("button").on("click", function(){
      var idNum = $(this).attr("id");
      var getRecipeUrl = "https://api.spoonacular.com/recipes/" + idNum + "/information?apiKey=" + apiKey;
      $.ajax({
        url: getRecipeUrl,
        method: "GET",
      }).then(function (data) {
        var spoonRecipe = data.spoonacularSourceUrl;
        window.open(spoonRecipe, "_blank");
      })

    });


  });

};


// Event listener on submit button 
$("#submitRequest").on("click",function(event){

  event.preventDefault();
  $(".box").empty();
  
  var ingredientInput= $("#ingredient_1").val();
  console.log(ingredientInput);
  console.log(cuisine);
  
  if(ingredientInput === "" && cuisine ===""){
    
    alert("input has been left blank!")
    
    return;
  }else{
    $("section").fadeIn(1000);
    fetchCuisineRecipe();
  }
  
  
  

});



  

