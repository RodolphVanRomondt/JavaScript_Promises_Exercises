// // PART 1

// const baseURL = "http://numbersapi.com"
// const numFav = 23;
// const numMin = Math.floor(Math.random() * 5);
// const numMax = 5


// // 1

// let res = axios.get(`${baseURL}/${numFav}?json`);
// res
//     .then(data => console.log(data.data.text))
//     .catch(err => console.log(err.message));


// // 2
// const resMultiple = axios.get(`${baseURL}/${numMin}..${numMax},${numFav}`);

// resMultiple
//     .then(data => {
//         for (let i = numMin; i <= numMax; i++) {
//             console.log(data.data[i])
//         }
//         console.log(data.data[numFav])
//     })
//     .catch(err => console.log(err.message));


// // 3
// const fourPromises = [];

// for (let i of [1, 2, 3, 4]) {
//     fourPromises.push(axios.get(`${baseURL}/23?json`))
// }

// Promise.all(fourPromises)
//     .then(data => (data.forEach(ele => $("ul").append(`<li>${ele.data.text}</li>`))))
//     .catch(err => console.log(err.message));


// // PART 2

// const CARD_URL = "https://deckofcardsapi.com/api/deck";

// // 1

// res = axios.get(`${CARD_URL}/new/shuffle/?deck_count=1`);
// res
//     .then(data => {
//         return axios.get(`${CARD_URL}/${data.data.deck_id}/draw/?count=1`);
//     })
//     .then(data => console.log(data.data.cards[0].value, "of", data.data.cards[0].suit))
//     .catch(err => console.log(err.message))


// // 2

// let returnCards = {};

// res = axios.get(`${CARD_URL}/new/shuffle/?deck_count=1`);
// res
//     .then(data => {
//         return axios.get(`${CARD_URL}/${data.data.deck_id}/draw/?count=1`)
//     })
//     .then(data => {
//         returnCards[1] = `${data.data.cards[0].value} of ${data.data.cards[0].suit}`;
//         return axios.get(`${CARD_URL}/${data.data.deck_id}/draw/?count=1`)
//     })
//     .then(data => {
//         returnCards[2] = `${data.data.cards[0].value} of ${data.data.cards[0].suit}`;
//         console.log(returnCards[1],"-", returnCards[2])
//     })
//     .catch(err => console.log(err.message))

// // 3

// const resDraw = axios.get(`${CARD_URL}/new/shuffle`)

// $("button").on("click", function () {

//     resDraw.then(data => {
//         return axios.get(`${CARD_URL}/${data.data.deck_id}/draw/?count=1`)
//     }).then(data => {

//         if (data.data.remaining === 0) {
//             $("button")
//                 .removeClass("btn-primary")
//                 .addClass("btn-success")
//                 .text("No More Card").off()
//         }

//         $(".cards").append(`<img src="${data.data.cards[0].image}">`)
//     })
// });

// ASYNC - PART 1

const baseURL = "http://numbersapi.com"
const numFav = 23;
const numMin = Math.floor(Math.random() * 5);
const numMax = 5


// async - 1

async function favNum(num, api) {

    try {
        let res = await axios.get(`${api}/${num}?json`);
        console.log(res.data.text);
    }
    catch (e) {
        console.log("FAILED:", e.message);
    }
}

favNum(23, baseURL);


// async - 2

async function numMultiple(numMin, numMax, numFav, api) {

    try {
        let { data:res } = await axios.get(`${api}/${numMin}..${numMax},${numFav}?json`);
        for (let i = numMin; i <= numMax; i++) {
            console.log(res[i]);
        }
        console.log(res[numFav]);
    }
    catch (e) {
        console.log("FAILED:", e.message);
    }
}

numMultiple(numMin, numMax, numFav, baseURL);


// async - 3

async function fourPromisesAsync(api) {

    let res = await Promise.all(
        [
            axios.get(`${api}/23?json`),
            axios.get(`${api}/23?json`),
            axios.get(`${api}/23?json`),
            axios.get(`${api}/23?json`)
        ]
    );

    for (let i of res) {
        $("ul").append(`<li>${i.data.text}</li>`)
    }
}

fourPromisesAsync(baseURL);

// ASYNC - PART 2

const CARD_URL = "https://deckofcardsapi.com/api/deck";

// 1

async function singleCard(api) {

    let resDeck = await axios.get(`${api}/new/shuffle/?deck_count=1`)

    let {data: resCard} = await axios.get(`${api}/${resDeck.data.deck_id}/draw/?count=1`)

    console.log(
        resCard.cards[0].value.toLowerCase(),
        "of",
        resCard.cards[0].suit.toLowerCase()
    );
}

singleCard(CARD_URL);


// 2

async function twoCards(api) {

    let resDeck = await axios.get(`${api}/new/shuffle/?deck_count=1`)

    let { data: card1 } = await axios.get(`${api}/${resDeck.data.deck_id}/draw/?count=1`)
    let { data: card2 } = await axios.get(`${api}/${resDeck.data.deck_id}/draw/?count=1`)

    console.log(
        card1.cards[0].value.toLowerCase(),
        "of",
        card1.cards[0].suit.toLowerCase(),
        "-",
        card2.cards[0].value.toLowerCase(),
        "of",
        card2.cards[0].suit.toLowerCase()
    );
}

twoCards(CARD_URL);


// 3

const deck_id = axios.get(`${CARD_URL}/new/shuffle`)

async function drawCards() {

    let {data: deckID} = await deck_id;

    let { data: card } = await axios.get(`${CARD_URL}/${deckID.deck_id}/draw/?count=1`)

    if (card.remaining === 0) {
        $("button")
            .removeClass("btn-primary")
            .addClass("btn-success")
            .text("No More Card").off()
    }

    $(".cards").append(`<img src="${card.cards[0].image}">`)
}

$("button").on("click", drawCards)