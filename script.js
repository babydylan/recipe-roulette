// $(document).ready(function() {
//     M.updateTextFields();
//   });

// Hides recipe results until user clicks submit 
  $("section").hide();

   
  // function below builds URL to retrieve recipe data

  function fetchCuisineRecipe() {
    // query variable obtains user input
    var query= $("#ingredient_1")
      .val()
      .toLowerCase()
      .trim();

    var apiKey = "8a9e2ee45fae41ecb210b7de4e23a7b1";
    
    var spoonacularUrl = "https://api.spoonacular.com/recipes/complexSearch?apiKey=" + apiKey + "&query=" + query;
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
        var newImg = $("<img>").attr("src", imgLink);

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
          window.location.replace(spoonRecipe);
        })

      });


    });

  };


// Event listener on submit button 
  $("#submitRequest").on("click",function(event){

    event.preventDefault();
    $("section").fadeIn(1000);
   
    fetchCuisineRecipe();
  
  });

