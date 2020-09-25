// $(document).ready(function() {
//     M.updateTextFields();
//   });
  $("section").hide();

   
  // var userIngredientInput = userIngredientInput.toLowerCase();
  
  function fetchCuisineRecipe() {
    
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
      for (var i = 0; i < data.results.length; i++) {
        var title = data.results[i].title;
        var newDisplay = $("<div>");
        var newTitle = $("<h3>")
        newTitle.text(title);
        newTitle.appendTo(newDisplay);
        newDisplay.appendTo(newDiv);
        var imgLink = data.results[i].image;
        var newImg = $("<img>").attr("src", imgLink);
        newImg.appendTo(newDisplay);
        var idLink = $("<button>").text("Click Me For Recipe!");
        idLink.attr("id", data.results[i].id)
        idLink.appendTo(newDisplay);
      };

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



  $("#submitRequest").on("click",function(event){

    event.preventDefault();
    $("section").fadeIn(1000);
    fetchCuisineRecipe();
  
  });

