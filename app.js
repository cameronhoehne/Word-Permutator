//Notes - 
  //Created custom popup
  //Output is sorted
  //Input accepts spaces or commas between words (or a mixture)

//Select HTML Elements
  let input = document.querySelector("#input");
  let button = document.querySelector("#btn");
  let generatorP = document.querySelector("#show-on-generate");
  let refreshBtn = document.querySelector("#show-after-generate");
  let resultsDiv = document.querySelector("#results");
  let popup = document.querySelector(".popup");
  let closePopupButton = document.querySelector("#close-popup");
  let popupP = document.querySelector("#popP");
  let overlay = document.querySelector("#overlay");

//Event listener on button click
button.addEventListener("click", function(){
  //Event listener on popup button
closePopupButton.addEventListener("click", () => {
  closePopup();
  setTimeout(() => {
    window.location.reload();
  }, 100);
})
//Makes input uneditable after generation until page refreshes
input.setAttribute("readonly", true) 

//Assigning variable to input string from user
let originString = input.value;

//Removes all spaces and turns them into commas, accounts for situations where commas have spaces around them
let noSpaceString = originString.replace(/[ ,]+/g, ",");

//Puts spaces back in after commas so that result looks nicer
let prettyString = noSpaceString.replace(/,/g, ", ")

//Converts everything to lowercase so we can better catch duplicate words
let lowerCaseString = prettyString.toLowerCase();

//Splits the input into an array, based on comma
arr = lowerCaseString.split(",");

//This adds a space to the front of the first word, so that it looks prettier in the end result
let a = arr[0];
a = " " + arr[0]
arr.shift(0)
arr.unshift(a)

//Error Handling

    //More than five words in input
    if (arr.length > 5) {
        openPopup();
        popupP.innerText = "No more than five words allowed"
    } else {

    //Duplicate words in input (called later)
    function hasDuplicates(arr) {
        return new Set(arr).size !== arr.length; //returns true if there are duplicates
    }

//Combine elements in array for every possible combo - mathematically, we want permutations of our input, not combination, 
//as permutation cares about order and gives us our factorial output
function permutations(elements) {
  if (elements.length === 0) { //Handles situations where no content is entered in input 
    return [[]]
  } else if (hasDuplicates(arr)) { //checks if the result from function is true
    openPopup();
        popupP.innerText = "No duplicate words allowed"
        return
}

  const firstEl = elements[0]; //Takes first word in array
  const rest = elements.slice(1); //Takes the rest of the array
  const permsWithoutFirst = permutations(rest); //Begins recursion with the array, minus the first element
  const allPermutations = []; //Empty array to push results into

  permsWithoutFirst.forEach(function(perm) { //This basically takes the first element and inserts that
                      //into every possible spot in the given array, resulting in our factorial output
    for (let i = 0; i <= perm.length; i++) {
      const permWithFirst = [...perm.slice(0, i), firstEl, ...perm.slice(i)];
      allPermutations.push(permWithFirst);
    }
  });
return allPermutations;
 }
}
let results = permutations(arr);
let count = 1;

//Sort results
results.sort();



//Display results on page
results.forEach(function(item){
    let x = document.createElement("h3");
    x.innerText = count + ": " + "{ " + item + " }";
    resultsDiv.appendChild(x);
    count++
})
generatorP.style.display = "block";
refreshBtn.style.display = "block";
});

//Listener for refresh after generate
refreshBtn.addEventListener("click", function() {
    window.location.reload();
})

//Functions to open and close popup
function openPopup() {
  if (popup == null) {
    return
  } 
  popup.classList.add("active");
  overlay.classList.add("active")
}

function closePopup() {
  if (popup == null) {
    return
  } 
  popup.classList.remove("active");
  overlay.classList.remove("active")
}
