let list = [];
closeSideNav();
document.querySelector(".close-tab").addEventListener("click", closeSideNav);
document.querySelector(".open-tab").addEventListener("click", openSideNav);

async function getData() {
  let myReq = await fetch("https://themealdb.com/api/json/v1/1/search.php?s=");
  let data = await myReq.json();
  list = data.meals;
  displayMeals();
}
getData();
function displayMeals(key) {
  let temp = "";

  list.forEach((el) => {
    temp += `<div class=" items col-md-3">
          <div
            onclick="getMealDetails(${el.idMeal})"
            class="meal position-relative overflow-hidden rounded-2 "
          >
            <div class="position-relative">
              <div
                class="meal-layer  d-flex justify-content-center align-items-center position-absolute text-black bottom-0 w-100"
              >
                <h3>${el.strMeal}</h3>
              </div>
              <div id="imgg" class="image overflow-hidden position-relative">
                <img
                  class="overflow-hidden rounded rounded-3"
                  src="${el.strMealThumb}"
                  alt=""
                />
              </div>
              
            </div>
          </div>
        </div>`;
  });

  document.getElementById("demo").innerHTML = temp;
}

/* ==================================== */
async function getMealDetails(mealID) {
  document.getElementById("demo").innerHTML = "";

  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  );
  respone = await respone.json();

  displayMealDetails(respone.meals[0]);
}

function displayMealDetails(meal) {
  let cartona = ``;

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      cartona += `<li class="alert alert-info m-2 p-1">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal.strTags?.split(",");

  if (!tags) tags = [];

  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
      <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }

  let cartoona = `
  <div class="col-md-4 ">
              <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                  alt="">
                  <h2 class="text-white">${meal.strMeal}</h2>
          </div>
          <div class="col-md-8">
              <h2 class="text-white">Instructions</h2>
              <p class="text-white">${meal.strInstructions}</p>
              <h3 class="text-white"><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
              <h3 class="text-white"><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
              <h3 class="text-white">Recipes :</h3>
              <ul class="list-unstyled d-flex g-3 flex-wrap">
                  ${cartona}
              </ul>

              <h3 class="text-white">Tags :</h3>
              <ul class="list-unstyled d-flex g-3 flex-wrap">
                  ${tagsStr}
              </ul>

              <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
              <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
          </div>`;

  document.getElementById("demo").innerHTML = cartoona;
}

function closeSideNav() {
  $(".navitems").css({ display: "none" });
  $(".list-unstyled").toggle(300);
  $(".info").animate({ width: "0px" });
  $(".sidenav").animate({ width: "100px" });
}
function openSideNav() {
  $(".navitems").css({ display: "block" });
  $(".list-unstyled").toggle(300);
  $(".info").animate({ width: "200px" });
  $(".sidenav").animate({ width: "300px" });
}

/* ========== Search by name =========== */

let searchContainer = document.getElementById("searchContainer");
function showSearchInputs() {
  searchContainer.innerHTML = `
  <div class="row py-4 ">
      <div class="col-md-6 ">
          <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
      </div>
      <div class="col-md-6">
          <input onkeyup="searchByLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
      </div>
  </div>`;

  document.getElementById("demo").innerHTML = "";
}
let searchByNameList = [];
async function searchByName(key) {
  document.getElementById("demo").innerHTML = "";
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${key}`
  );
  let data = await respone.json();
  searchByNameList = data.meals;
  showsearchByName();
}
function showsearchByName(key) {
  let temp = "";

  searchByNameList.forEach((el) => {
    temp += `<div class=" items col-md-3">
          <div
            onclick="getMealDetails(${el.idMeal})"
            class="meal position-relative overflow-hidden rounded-2 "
          >
            <div class="position-relative">
              <div
                class="meal-layer  d-flex justify-content-center align-items-center position-absolute text-black bottom-0 w-100"
              >
                <h3>${el.strMeal}</h3>
              </div>
              <div id="imgg" class="image overflow-hidden position-relative">
                <img
                  class="overflow-hidden rounded rounded-3"
                  src="${el.strMealThumb}"
                  alt=""
                />
              </div>
              
            </div>
          </div>
        </div>`;
  });

  document.getElementById("demo").innerHTML = temp;
}
/* ========== Search by letter =========== */

let searchByLetterList = [];
async function searchByLetter(key) {
  document.getElementById("demo").innerHTML = "";
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${key}`
  );
  let data = await respone.json();
  searchByLetterList = data.meals;
  showsearchByLetter();
}
function showsearchByLetter(key) {
  let temp = "";

  searchByLetterList.forEach((el) => {
    temp += `<div class=" items col-md-3">
          <div
            onclick="getMealDetails(${el.idMeal})"
            class="meal position-relative overflow-hidden rounded-2 "
          >
            <div class="position-relative">
              <div
                class="meal-layer  d-flex justify-content-center align-items-center position-absolute text-black bottom-0 w-100"
              >
                <h3>${el.strMeal}</h3>
              </div>
              <div id="imgg" class="image overflow-hidden position-relative">
                <img
                  class="overflow-hidden rounded rounded-3"
                  src="${el.strMealThumb}"
                  alt=""
                />
              </div>
              
            </div>
          </div>
        </div>`;
  });

  document.getElementById("demo").innerHTML = temp;
}
/*==== get category======*/

let categoriesList = [];
async function getcategories() {
  document.getElementById("demo").innerHTML = "";
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let data = await respone.json();
  categoriesList = data.categories;
  console.log(categoriesList);
  showscategories();
}
function showscategories() {
  document.getElementById("demo").innerHTML = "";
  let temp = "";
  categoriesList.forEach((el) => {
    temp += `<div class="col-md-3">
                <div onclick="getCategoryMeals('${
                  el.strCategory
                }')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${
                      el.strCategoryThumb
                    }" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${el.strCategory}</h3>
                        <p>${el.strCategoryDescription
                          .split(" ")
                          .slice(0, 20)
                          .join(" ")}</p>
                    </div>
                </div>
        </div>`;
  });

  document.getElementById("demo").innerHTML = temp;
}
async function getCategoryMeals(mealID) {
  document.getElementById("demo").innerHTML = "";

  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealID}`
  );
  respone = await respone.json();
  categoriesList = respone.meals;
  console.log(categoriesList);
  displayCategiryMeals(mealID);
}
function displayCategiryMeals(key) {
  document.getElementById("demo").innerHTML = "";
  let temp = "";

  categoriesList.forEach((el) => {
    temp += `<div class=" items col-md-3">
          <div
            onclick="getMealDetails(${el.idMeal})"
            class="meal position-relative overflow-hidden rounded-2 "
          >
            <div class="position-relative">
              <div
                class="meal-layer  d-flex justify-content-center align-items-center position-absolute text-black bottom-0 w-100"
              >
                <h3>${el.strMeal}</h3>
              </div>
              <div id="imgg" class="image overflow-hidden position-relative">
                <img
                  class="overflow-hidden rounded rounded-3"
                  src="${el.strMealThumb}"
                  alt=""
                />
              </div>
              
            </div>
          </div>
        </div>`;
  });

  document.getElementById("demo").innerHTML = temp;
}
/**
 * تعبت :)
 * get Area
 */
let areaList = [];
async function getArea() {
  document.getElementById("demo").innerHTML = "";
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let data = await respone.json();
  areaList = data.meals;
  showAreas();
  console.log(areaList);
}
function showAreas() {
  let temp = "";
  areaList.forEach((el) => {
    temp += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${el.strArea}')" class="rounded-2 text-center areaa">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${el.strArea}</h3>
                </div>
        </div>
        `;
  });
  document.getElementById("demo").innerHTML = temp;
}
let areaListMeals = [];
async function getAreaMeals(mealID) {
  document.getElementById("demo").innerHTML = "";
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${mealID}`
  );
  let data = await respone.json();
  areaListMeals = data.meals;
  displayAreaMeals(mealID);
}
function displayAreaMeals(key) {
  let temp = "";

  areaListMeals.forEach((el) => {
    temp += `<div class=" items col-md-3">
          <div
            onclick="getMealDetails(${el.idMeal})"
            class="meal position-relative overflow-hidden rounded-2 "
          >
            <div class="position-relative">
              <div
                class="meal-layer  d-flex justify-content-center align-items-center position-absolute text-black bottom-0 w-100"
              >
                <h3>${el.strMeal}</h3>
              </div>
              <div id="imgg" class="image overflow-hidden position-relative">
                <img
                  class="overflow-hidden rounded rounded-3"
                  src="${el.strMealThumb}"
                  alt=""
                />
              </div>
              
            </div>
          </div>
        </div>`;
  });

  document.getElementById("demo").innerHTML = temp;
}

/* ==== getIngredients ==== */
let IngredientsList = [];
async function getIngredients() {
  document.getElementById("demo").innerHTML = "";
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let data = await respone.json();
  IngredientsList = data.meals;
  showIngredient();
}
function showIngredient() {
  let temp = "";
  for (let i = 0; i < 20; i++) {
    temp += `<div class="col-md-3">
                <div onclick="getIngredientdetails('${
                  IngredientsList[i].strIngredient
                }')" class="rounded-2 text-center areaa">
                        <i class="fa-solid fa-drumstick-bite fa-2x"></i>
                        <h4>${IngredientsList[i].strIngredient}</h4>
                        <h6>${IngredientsList[i].strDescription
                          .split(" ")
                          .slice(0, 15)
                          .join(" ")}</h6>
                </div>
        </div>`;
  }
  document.getElementById("demo").innerHTML = temp;
}

let IngredientsMealList = [];

async function getIngredientdetails(mealID) {
  document.getElementById("demo").innerHTML = "";
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealID}`
  );
  let data = await respone.json();
  IngredientsMealList = data.meals;
  Ingredientdetails(mealID);
}
function Ingredientdetails(key) {
  let temp = "";

  IngredientsMealList.forEach((el) => {
    temp += `<div class=" items col-md-3">
          <div
            onclick="getMealDetails(${el.idMeal})"
            class="meal position-relative overflow-hidden rounded-2 "
          >
            <div class="position-relative">
              <div
                class="meal-layer  d-flex justify-content-center align-items-center position-absolute text-black bottom-0 w-100"
              >
                <h3>${el.strMeal}</h3>
              </div>
              <div id="imgg" class="image overflow-hidden position-relative">
                <img
                  class="overflow-hidden rounded rounded-3"
                  src="${el.strMealThumb}"
                  alt=""
                />
              </div>
              
            </div>
          </div>
        </div>`;
  });
  document.getElementById("demo").innerHTML = temp;
}

function contactUs() {
  document.getElementById("demo").innerHTML = "";
  let temp = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
      <div class="container w-75 text-center">
          <div class="row g-4">
              <div class="col-md-6">
                  <input id="nameInput"  type="text" class="form-control" placeholder="Enter Your Name">
                  
              </div>
              <div class="col-md-6">
                  <input id="emailInput" type="email" class="form-control " placeholder="Enter Your Email">
                  
              </div>
              <div class="col-md-6">
                  <input id="phoneInput" type="text" class="form-control " placeholder="Enter Your Phone">
                  
              </div>
              <div class="col-md-6">
                  <input id="ageInput"  type="number" class="form-control " placeholder="Enter Your Age">
                  
              </div>
              <div class="col-md-6">
                  <input  id="passwordInput"  type="password" class="form-control " placeholder="Enter Your Password">
                  
              </div>
              <div class="col-md-6">
                  <input  id="repasswordInput"  type="password" class="form-control " placeholder="Repassword">
                  
              </div>
          </div>
          <button id="sumBtn"  class="btn btn-outline-warning  mt-3">Submit</button>
      </div>
  </div> `;
  document.getElementById("demo").innerHTML = temp;
}