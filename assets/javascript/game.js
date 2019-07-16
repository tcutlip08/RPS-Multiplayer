const config = {
    apiKey: "AIzaSyAv6nfjDI7pugMSXRehk_5HeFvltIGMG0Y",
    authDomain: "rps-multi-5a0b5.firebaseapp.com",
    databaseURL: "https://rps-multi-5a0b5.firebaseio.com",
    projectId: "rps-multi-5a0b5",
    storageBucket: "",
    messagingSenderId: "267169757000",
    appId: "1:267169757000:web:2315ff3185637041"
};

firebase.initializeApp(config);

var database = firebase.database();


database.ref().on("value", function (snapshot) {

    // database.ref().on("value", function (snapshot) {
    //     $("#highest-bidder").text(snapshot.val().highestBidder);
    //     $("#highest-price").text(snapshot.val().highestBid);
    // });

}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

$(document).ready(function () {
    database.ref().set({
        clickCount: 7
    });
});