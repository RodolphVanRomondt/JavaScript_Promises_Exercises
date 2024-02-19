// PART 1

const baseURL = "http://numbersapi.com"
const numFav = 23;
const numMin = Math.floor(Math.random() * 5);
const numMax = 5


// 1

let res = axios.get(`${baseURL}/${numFav}?json`);
res
    .then(data => console.log(data.data.text))
    .catch(err => console.log(err.message));


// 2
const resMultiple = axios.get(`${baseURL}/${numMin}..${numMax},${numFav}`);

resMultiple
    .then(data => {
        for (let i = numMin; i <= numMax; i++) {
            console.log(data.data[i])
        }
        console.log(data.data[numFav])
    })
    .catch(err => console.log(err.message));


// 3
const fourPromises = [];

for (let i of [1, 2, 3, 4]) {
    fourPromises.push(axios.get(`${baseURL}/23?json`))
}

Promise.all(fourPromises)
    .then(data => (data.forEach(ele => $("ul").append(`<li>${ele.data.text}</li>`))))
    .catch(err => console.log(err.message));


// PART 2

const CARD_URL = "https://deckofcardsapi.com/api/deck";

// 1

res = axios.get(`${CARD_URL}/new/shuffle/?deck_count=1`);
res
    .then(data => {
        return axios.get(`${CARD_URL}/${data.data.deck_id}/draw/?count=1`);
    })
    .then(data => console.log(data.data.cards[0].value, "of", data.data.cards[0].suit))
    .catch(err => console.log(err.message))


// 2

let returnCards = {};

res = axios.get(`${CARD_URL}/new/shuffle/?deck_count=1`);
res
    .then(data => {
        return axios.get(`${CARD_URL}/${data.data.deck_id}/draw/?count=1`)
    })
    .then(data => {
        returnCards[1] = `${data.data.cards[0].value} of ${data.data.cards[0].suit}`;
        return axios.get(`${CARD_URL}/${data.data.deck_id}/draw/?count=1`)
    })
    .then(data => {
        returnCards[2] = `${data.data.cards[0].value} of ${data.data.cards[0].suit}`;
        console.log(returnCards[1],"-", returnCards[2])
    })
    .catch(err => console.log(err.message))

// 3

const resDraw = axios.get(`${CARD_URL}/new/shuffle`)

$("button").on("click", function () {

    resDraw.then(data => {
        return axios.get(`${CARD_URL}/${data.data.deck_id}/draw/?count=1`)
    }).then(data => {

        if (data.data.remaining === 0) {
            $("button")
                .removeClass("btn-primary")
                .addClass("btn-success")
                .text("No More Card").off()
        }

        $(".cards").append(`<img src="${data.data.cards[0].image}">`)
    })
});