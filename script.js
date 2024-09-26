/* Step 1 : Get references to DOM elements*/
//Get a reference to the main container
const container = document.querySelector(".container");
//Get a reference of all available seats 
const seats = document.querySelectorAll(".row .seat:not(.sold)");
//Get a reference of the count and total elements of span
const count = document.getElementById("count");
const total = document.getElementById("total");
//Get a reference of movie drop-down
const movieSelect = document.getElementById("movie");


/* Step 2 : Add Event Listeners */
//Event listener for movie selection change
movieSelect.addEventListener("change", e => {
    //update ticket price - the movie you choose and store selected movies data - so that on refresh it doesn't change
    ticketPrice =+ e.target.value;
    //this function is declared below
    setMovieData(e.target.selectedIndex, e.target.value);

    //update displayed count and total
    updateSelectedCount();
    
});

//EventListener for seat clicks
container.addEventListener("click", e => {
    //check if a seat is click and not sold already
    if(e.target.classList.contains("seat") && !e.target.classList.contains("sold"))
    {
        //Toggle Seat Selection
        e.target.classList.toggle("selected");
        //update displayed count and total
        updateSelectedCount();
    }
});


/* Step 3 : Define Functions to Update selected count and total  */
function updateSelectedCount()
{
    //Get all selected seats
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    //Get an array of selected seat's indexes
    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

    //Store selected seats index into local storage
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
   
    //Calculate selected seats and counts
    const selectedSeatsCounts = selectedSeats.length;
 
    //update ui with selected seats count nad total price
    count.innerText = selectedSeatsCounts;
    total.innerText = selectedSeatsCounts * ticketPrice;
    setMovieData(movieSelect.selectedIndex, movieSelect.value);
}


/* Step 4 : Define Funtions to set Selected Movie Data, in local Storage */
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);

    setMovieData(movieSelect.selectedIndex, movieSelect.value);

}

/* Step 5 : Populate UI with local storage data - i.e the UI won't change on refresh */
//function to populate Ui from local storage data
function populateUI(){
    //Read or get selected seats from local storage
    const selectedSeats =JSON.parse(localStorage.getItem("selectedSeats"));
    //If there are selected seats mark them as selected in the UI
    if (selectedSeats !==null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) >-1){
                seat.classList.add("selected");
            }
        });
    }
    //Get selected movie data from local storage
    const selectedMovieIndex=localStorage.getItem("selectedMovieIndex");

    //If there's a selected movie index, then set it in the dropdown
    if(selectedMovieIndex!==null)
    {
        movieSelect.selectedIndex=selectedMovieIndex;
    }
}

/* Step 6 : Initial Set-Up of count, total and UI based on saved data */
populateUI();
//Initialise ticket price - the first movie price will be reflected
let ticketPrice = movieSelect.value;
updateSelectedCount();

