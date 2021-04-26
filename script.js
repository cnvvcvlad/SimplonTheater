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


    /**
     * Vérification s'il y a assez de place sur la rangée. Si oui, on affiche les sièges. Si non, une alerte se déclanche.
     * @param {number} seats 
     * @param {number} row 
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
            const randomPosition = Math.random();
            if (randomPosition < 0.5) {
                const firstPlaceFree = theater[row].findIndex(e => e === 0);
                registerSeats(seats, row, firstPlaceFree);
            } else {
                const lastPlaceFree = +theater[row].lastIndexOf(0) + 1;
                reverseRegisterSeats(seats, row, lastPlaceFree);

            }
            showPlaces();
            updateSelect();
        }
    }



    /**
     * Calcule le nombre de place libres sur la rangée
     * @param {number} row 
     * @returns {number}
     */
    const countFreePlaces = (row) => {
        let count = 0;
        for (let i = 0; i < row.length; i++) {
            if (row[i] === 0) count++;
        }
        return count;
    }

    /**
     * Enregistre les nouvelles places de gauche à droite
     * @param {number} seats 
     * @param {number} row 
     * @param {number} index 
     */
    const registerSeats = (seats, row, index) => {
        for (let i = index; i < seats + index; i++) {
            theater[row][i] = 2;
        }
    }

    /**
     * Enregistre les nouvelles places de droite à gauche
     * @param {number} seats 
     * @param {number} row 
     * @param {number} index 
     */
    const reverseRegisterSeats = (seats, row, index) => {
        for (let i = index - seats; i < index; i++) {
            theater[row][i] = 2;
        }
    }

    /**
     * Affiche les sièges du cinéma
     */
    const showPlaces = () => {
        containerRow.innerHTML = "";

        for (let i = 1; i <= allRows; i++) {
            let row = document.createElement('div');
            row.setAttribute("class", "row");

            for (let j = 0; j < rowPlaces; j++) {
                if (theater[i][j] === 0) {
                    const cell = document.createElement('div');
                    cell.setAttribute("class", "seat");
                    row.append(cell);

                } else if (theater[i][j] === 1) {
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

    /**
     * Initialise la liste d'options avec la valeur par défaut 0
     */
    function updateSelect() {
        placesElement.selectedIndex = 0;
        rowsElement.selectedIndex = 0;
    }


});

