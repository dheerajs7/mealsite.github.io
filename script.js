// Get DOM elements
const searchbox =document.getElementById('search-bar');
const favorite =document.getElementById('favourite-meals');
const mealsDiv =document.getElementById('meals-div');


let favouriteArr =[];
let URL;

// favourite array is store in locastorge if not then initialze
  if(localStorage.getItem ("favouriteArr")){
    localStorage.setItem("favouriteArr", JSON.stringify(favouriteArr));
}
else{
    favouriteArr= JSON.parse(localStorage.getItem("favouriteArr"));
}

// input event for searchbox
searchbox.addEventListener('input', displaySearchResults);
// click event for favourite button 
favorite.addEventListener('click', displayFavoriteMeals);

//function to display search results
function displaySearchResults() {
    let keyword = searchbox.value;
    URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`;
    createMeals(URL);
}

// Function to toggle favorites
function toggleFavorites(event) {
    event.preventDefault();
    let index = favouriteArr.indexOf(this.id);
    if (index == -1) {
      favouriteArr.push(this.id);
      this.classList.add('clicked');
    } else {
      favouriteArr.splice(index, 1);
      this.classList.remove('clicked');
    }
  
    localStorage.setItem("favouriteArr", JSON.stringify(favouriteArr));
  }

  // Function to fetch and display recipe of the meal
async function moreDetails() {
    let id = this.id;
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
  
    mealsDiv.innerHTML = '';
  
    let meals = data.meals[0];
  
    const div = document.createElement('div');
    div.classList.add('details-page');
    div.innerHTML = `  
      <h3>${meals.strMeal}</h3>
      <img src="${meals.strMealThumb}" alt="">
      <p>${meals.strInstructions}</p>
      <h5>Cuisine Type: ${meals.strArea}</h5>
      <a href="${meals.strYoutube}"><button type="button" class='border-circle more-details' id='${meals.idMeal}'>Watch Video</button></a>`;
  
    mealsDiv.append(div);
  }
  
  // Function to fetch and create meals based on the provided URL
  async function createMeals(URL){
    try {
      const response = await fetch(URL);
      const data = await response.json();
  
      mealsDiv.innerHTML = '';
      for (let meals of data.meals) {
        const div = document.createElement('div');
        div.classList.add('images');
        div.innerHTML = `
          <img src="${meals.strMealThumb}" alt="">
          <h4>${meals.strMeal}</h4>
          <button type="button" class='border-circle more-details' id='${meals.idMeal}'>Recipe</button>
          ${
            favouriteArr.includes(meals.idMeal) ? `<a href="" class='favourite clicked' id='${meals.idMeal}'><i class="fa-sharp fa-solid fa-heart"></i></a>` : `<a href="" class='favourite' id='${meals.idMeal}'><i class="fa-sharp fa-solid fa-heart"></i></a>`
          }`;
  
        mealsDiv.append(div);
      }
  
      var favoriteButton = document.querySelectorAll('a');
      for (let button of favoriteButton) {
        button.addEventListener('click', toggleFavorites);
      }
  
      var moreDetailsbutton = document.querySelectorAll('.more-details');
      for (let button of moreDetailsbutton) {
        button.addEventListener('click', moreDetails);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  // Fetching all meals from API
    async function displayFavoriteMeals() {
    mealsDiv.innerHTML = '';
  
    for (let meal of favouriteArr) {
      
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`);
      const data = await response.json();
  
      let meals = data.meals[0];
      const div = document.createElement('div');
      div.classList.add('images');
      div.innerHTML = `
        <img src="${meals.strMealThumb}" alt="">
        <h4>${meals.strMeal}</h4>
        <button type="button" class='border-circle more-details' id='${meals.idMeal}'>Recipe</button>
        <a href="" class='favourite clicked' id='${meals.idMeal}'><i class="fa-sharp fa-solid fa-heart"></i></a>`;
  
      mealsDiv.append(div);
  
      var favoriteButton = document.querySelectorAll('a');
      for (let button of favoriteButton) {
        button.addEventListener('click', toggleFavorites);
      }
  
      var moreDetailsbutton = document.querySelectorAll('.more-details');
      for (let button of moreDetailsbutton) {
        button.addEventListener('click', moreDetails);
      }
    }
  }
 
  

