/**
 * @author Sghaier Wala Eddine <sghaierwalaeddine@gmail.com>
 */

//main function to start playing (and restart playing too)
function play() {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    let lettersArray = Array.from(letters);

    let lettersContainer = document.querySelector(".letters");

    lettersArray.forEach(letter => {
        // Create Span
        let span = document.createElement("span");

        // Create Letter Text Node
        let theLetter = document.createTextNode(letter);

        // Append The Letter To Span
        span.appendChild(theLetter);

        // Add Class On Span
        span.className = 'letter-box';

        // Append Span To The Letters Container
        lettersContainer.appendChild(span);

    });

    // Words per Category
    const words = {
        programmingLanguages: ["php", "javascript", "perl", "typescript", "python"],
        chessPlayers: ["Carlsen", "Kasparov", "Karpov", "Nakamoura", "Firouzja", "Fischer"],
        countries: ["Tunisia", "Albania", "Turkey", "Cuba", "Mali", "Sweden", "Spain"]
    }

    // All categories {progLanguage,chessPlayer,country}
    let allKeys = Object.keys(words);
    let randomCategoryNumber = Math.floor(Math.random() * allKeys.length);
    // Choose Category 
    let randomWordCategory = allKeys[randomCategoryNumber];

    // Category Words
    let wordsArray = words[randomWordCategory];

    // Random Number Depend On Words
    let wordNumber = Math.floor(Math.random() * wordsArray.length);

    // the chosen word
    let theWord = wordsArray[wordNumber];

    // set indication info (key written not in camelCase)
    let indication;
    switch (randomWordCategory) {
        case "programmingLanguages":
            indication = "programming language"
            break;
        case "chessPlayers":
            indication = "chess player"
            break;
        case "countries":
            indication = "country"
            break;
    }
    document.querySelector(".game-info .category span").innerHTML = indication;

    // Select Letters Guess Element
    let lettersGuessContainer = document.querySelector(".letters-guess");
    let lettersOfTheWord = Array.from(theWord);

    // create spans for each letter
    lettersOfTheWord.forEach(letter => {
        let emptySpan = document.createElement("span");
        lettersGuessContainer.appendChild(emptySpan);

    });
    // Select Guess Spans
    let guessSpans = document.querySelectorAll(".letters-guess span");

    // Select The Draw Element
    let theDraw = document.querySelector(".hangman-draw");
    let wrongAttempts = 0;
    let guessedLetters = 0;
    // clicking on letters
    document.addEventListener("click", (e) => {
        // status of the choosen letter, true or false guess
        let theStatus = false;
        if (e.target.className === 'letter-box') {
            e.target.classList.add("clicked");
            // get clicked one
            let theClickedLetter = e.target.innerHTML.toLowerCase();

            let theChosenWord = Array.from(theWord.toLowerCase());
            theChosenWord.forEach((wordLetter, WordIndex) => {
                // If The Clicked Letter Equal To One Of The Chosen Word Letter
                if (theClickedLetter == wordLetter) {
                    // Set Status To Correct
                    theStatus = true;
                    // Loop On All Guess Spans
                    guessSpans.forEach((span, spanIndex) => {
                        if (WordIndex === spanIndex) {
                            span.innerHTML = theClickedLetter;
                            guessedLetters++;
                        }
                    });
                }
            });

            // if the choosen letter is wrong
            if (theStatus !== true) {
                wrongAttempts++;
                // add class wrong on the draw element
                theDraw.classList.add(`wrong-${wrongAttempts}`);

                if (wrongAttempts === 8) {
                    youLost(theWord);
                    lettersContainer.classList.add("finished");
                }
            } else {
                if (guessedLetters == theWord.length) {
                    youWon(theWord);
                }
            }
        }
    });
}


//function called in case you lost
function youLost(theWord) {
    //PopupLost Div
    let div = document.createElement("div");
    let divText = document.createTextNode(`Game Over, The Word Is ${theWord} `);
    div.appendChild(divText);
    //Restart Button
    let restartButton = document.createElement("button");
    let buttonText = document.createTextNode("Play Again");
    restartButton.appendChild(buttonText);
    restartButton.addEventListener("click", function () { location.reload() });
    div.appendChild(restartButton);
    restartButton.className = "button";
    // add class and add it to the doc
    div.className = 'popupLose';
    document.body.appendChild(div);
}

//function called in case you won
function youWon(theWord) {
    //PopupWon Div
    let div = document.createElement("div");
    let divText = document.createTextNode(`Yeah ${theWord}! right answer, You won!`);
    div.appendChild(divText);
    //Restart Button
    let restartButton = document.createElement("button");
    let buttonText = document.createTextNode("Play Again");
    restartButton.appendChild(buttonText);
    restartButton.addEventListener("click", function () { location.reload() });
    div.appendChild(restartButton);
    restartButton.className = "button";
    // add class and add it to the doc
    div.className = 'popupWin';
    document.body.appendChild(div);
}