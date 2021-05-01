// generic AJAX function to load fromFile into object with ID whereTo
function loadFileInto(fromIdentifier, fromList) {

  // creating a new XMLHttpRequest object
  ajax = new XMLHttpRequest();

  //define the fromFile value based on PHP URL

  fromFile = "recipes.php?id=" + fromIdentifier + "&list=" + fromList;

  // defines the GET/POST method, source, and async value of the AJAX object
  ajax.open("GET", fromFile, true);

  // prepares code to do something in response to the AJAX request
  ajax.onreadystatechange = function() {

    if ((this.readyState == 4) && (this.status == 200)) {

      responseArray = JSON.parse(this.responseText);
      responseHTML = "";


      if (this.reponseText != "0") {
        for (i = 0; i < responseArray.length; i++) {
          responseHTML += "<li>" + responseArray[i] + "</li>";
        }
      }
      whereTo = "#" + fromList + " ul";
      if (fromList == "directions") whereTo = "#" + fromList + " ol";


      document.querySelector(whereTo).innerHTML = responseHTML;

      console.log(document.querySelector(whereTo).innerHTML);

    } else if ((this.readyState == 4) && (this.status != 200)) {
      console.log("Error: " + this.responseText);

    }
  } // end ajax.onreadystatechange

  // now that everything is set, initiate request
  ajax.send();

}


//generic object constructor

function Recipe(recipeTitle, imageURL, contributorName, recipeId) {
  this.title = recipeTitle;
  this.imgsrc = imageURL;
  this.contributor = contributorName;
  this.id = recipeId;


  this.displayRecipe = function() {
    document.querySelector("#title").innerHTML = this.title;
    document.querySelector("#contribute").innerHTML = "Contributed by " + this.contributor;
    document.querySelector("img").src = this.imgsrc;

    loadFileInto(this.id, "ingredients");
    loadFileInto(this.id, "equipment");
    loadFileInto(this.id, "directions");
  }
}

SoftPretzels = new Recipe(
  "Soft Pretzels",
  "https://sieaety.com/tp4/images/pretzel.jpg",
  "Kristine Zorn",
  "SoftPretzels"
);

Cookies = new Recipe(
  "Triple Choclate Chunk Cookies",
  "https://sieaety.com/tp4/images/cookies.jpg",
  "Jaclyn Seifert",
  "Cookies"
);

Crepe = new Recipe(
  "Easy Crepes",
  "https://sieaety.com/tp4/images/crepe.jpg",
  "Katelyn Gorman ",
  "Crepe"
);

window.onload = function() {
  //allows list visibility to be toggled on and off 
  list = document.querySelectorAll(".list");
  console.log(list);
  list.item(0).addEventListener("click", function() {
    document.querySelector('#ingredients').classList.toggle('hide');
  });
  list.item(1).addEventListener("click", function() {
    document.querySelector('#equipment').classList.toggle('hide');
  });
  list.item(2).addEventListener("click", function() {
    document.querySelector('#directions').classList.toggle('hide');
  });
}