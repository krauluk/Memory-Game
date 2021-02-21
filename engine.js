const cardsImg = ["chandra", "chandra", "gideon", "gideon", "jayce", "jayce", "liliana", "liliana", "nicol", "nicol", "nissa", "nissa"];

let cards = document.querySelectorAll(".cards");
//Przerobienie listy węzłów na tablice
cards = [...cards];

//Zaczyna się liczenie czasu
const startTime = new Date().getTime();

let activeCard = "";
const activeCards = [];

const pairLeft = cards.length/2; //6
let gameResult = 0;
let moves = 0;

const clickCard = function(){
    activeCard = this;
    //Zabezpieczenie przed kliknięciem w tą samą kartę
    if(activeCard == activeCards[0]){
        return;
    }
    activeCard.classList.remove("hidden");
    //pierwsze klikniecie
    if(activeCards.length === 0){
        activeCards[0] = activeCard;
        return;
    }
    //drugie klkniecie
    else{
        //Liczenie posunięć
        moves++;
        $('.score').html('Moves: ' + moves);
        cards.forEach(card => {
            card.removeEventListener("click", clickCard)
        })
        activeCards[1] = activeCard;
        setTimeout(function(){
            if(activeCards[0].className === activeCards[1].className){
                activeCards.forEach(card => card.classList.add("off"));
                gameResult++;
                cards = cards.filter(card => !card.classList.contains("off"))
                if(gameResult === pairLeft){
                    const endTime =  new Date().getTime();
                    const gameTime = (endTime - startTime) / 1000;
                    alert(`Udało się! Twój wynik to: ${gameTime} sekund`)
                    location.reload();
                }
            }
            else{
                activeCards.forEach(card => card.classList.add("hidden"));
            }
            //resetowanie zmiennych
            activeCard = "";
            activeCards.length = 0;
            cards.forEach(card => card.addEventListener("click", clickCard))
        }, 500)
        
    }
};

//Funkcji inicjująca, losowanie kart
const init = function() {   
    cards.forEach(card => {
        //losowanie indeksu tablicy
        const position = Math.floor(Math.random()*cardsImg.length);
        card.classList.add(cardsImg[position]);
        //Usuwanie wylosowanego indeksu z tablicy
        cardsImg.splice(position, 1);
    });

    setTimeout(function(){
        cards.forEach(card => {
            card.classList.add("hidden");
            card.addEventListener("click", clickCard);
        })
    }, 2000)
}

init(); 