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
    const containerRow = document.querySelector('#container_row');


    updateSelect();



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
            updateSelect();
            selectedRow = 0;
            selectedPlace = 0;
        } else {
            alert('Veuillez sélectionner un nombre');
        }
    });


    /**
     * Functions
     */
    
    const checkPlaces = (seats, row) => {
        if ((seats < 1 || seats > rowPlaces) && (row < 1 || row > allRows)) {
            alert('Le choix est incorrect');
        }

        if (countFreePlaces(theater[row]) === 0) {
            alert('Il n\'y a plus de places ici. Veuillez choisir une autre rangée.');
        } else if (countFreePlaces(theater[row]) < seats) {
            alert('Il n\'y a pas assez de places. Veuillez choisir une autre rangée.')
        } else if ((seats >= 1 || seats <= rowPlaces) && (row >= 1 || row <= allRows)) {
            const firstPlaceFree = theater[row].findIndex(e => e === 0);
            registerSeats(seats, row, firstPlaceFree);
            showPlaces();
            updateSelect();
        }
    }

    const countFreePlaces = (row) => {
        let count = 0;
        for (let i = 0; i < row.length; i++) {
            if (row[i] === 0) count++;
        }
        return count;
    }

    const registerSeats = (place, row, index) => {
        for (let i = index; i < place+index; i++) {
            theater[row][i] = 2;
        }
    }

    const showPlaces = () => {
        containerRow.innerHTML="";

        for(let i = 1; i <= allRows; i++){
        let row = document.createElement('div');
        row.setAttribute("class", "row");

            for(let j = 0; j < rowPlaces; j++){
                if(theater[i][j] === 0){
                    const cell = document.createElement('div');
                    cell.setAttribute("class", "seat");
                    row.append(cell);

                } else if(theater[i][j] === 1) {
                    const cell = document.createElement('div');
                    cell.setAttribute("class", "seat occupied");
                    row.append(cell);
                } else {
                    const cell = document.createElement('div');
                    cell.setAttribute("class", "seat selected");
                    row.append(cell);
                }
            }

            containerRow.append(row);
        }           

    }

    function updateSelect() {
        placesElement.selectedIndex = 0;
        rowsElement.selectedIndex = 0;
    }


});

