// $(document).ready(function() {
//     M.updateTextFields();
//   });


$ (function() {



    function fetchCuisineRecipe () {
  
    
  var apiKey = "ff436b868e184aa8b285a0654110973b";
  var spoonacularUrl = "https://api.spoonacular.com/recipes/complexSearch?apiKey=" + apiKey + "&cuisine=japanese";
  
  $.ajax({
      url: spoonacularUrl,
      method: "GET",
    }).then(function (data) {
      console.log(data);
  });

  }

  fetchCuisineRecipe();
  });