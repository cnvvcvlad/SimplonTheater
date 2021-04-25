window.addEventListener('DOMContentLoaded', () => {

    /**
     * Declare variables
     */

    const theater = {
        1: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        2: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        3: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        4: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        5: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        6: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        7: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        8: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    };

    const rowPlaces = 9;
    const allRows = 8;
    let selectedPlace = 0;
    let selectedRow = 0;

    const placesElement = document.querySelector('#places');
    const rowsElement = document.querySelector('#rows');
    const submitElement = document.querySelector('#submit');


    /**
     * Events
     */

    placesElement.addEventListener('change', event => {
        selectedPlace = +event.target.value;
    });

    rowsElement.addEventListener('change', event => {
        selectedRow = +event.target.value;
    });

    submitElement.addEventListener('click', () => {
        if (selectedPlace !== 0 && selectedRow !== 0) {
            checkPlaces(selectedPlace, selectedRow);
            selectedRow = 0;
            selectedPlace = 0;
        } else {
            alert('Veuillez sélectionner un nombre');
        }
    });


    /**
     * Functions
     */

    function checkPlaces(seats, row) {
        if ((seats < 1 || seats > rowPlaces) && (row < 1 || row > allRows)) {
            alert('Le choix est incorrect');
        }

        if (countFreePlaces(theater[row]) === 0) {
            alert('Il n\'y a plus de places ici. Veuillez choisir une autre rangée.');
        } else if (countFreePlaces(theater[row]) < seats) {
            alert('Il n\'y a pas assez de places. Veuillez choisir une autre rangée.')
        } else if ((seats >= 1 || seats <= rowPlaces) && (row >= 1 || row <= allRows)) {
            const firstPlaceFree = theater[row].findIndex(e => e === 0);
            registerSeats(place, row, firstPlaceFree);
        }
    }


});

