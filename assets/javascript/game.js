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
var user;

// const auth = firebase.auth();
// auth.signInWithEmailAndPassword(email, pass);
// auth.createUserWithEmailAndPassword(email, pass);
// auth.onAuthStateChanged(firebaseUser => { });

$("#signInBtn").on("click", function () {

    event.preventDefault();

    const email = $("#email").val().trim();
    const password = $("#passWord").val().trim();
    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, password);
    $("#displayError").text("");
    promise.catch(e => {
        console.log(e.message);
        promise.catch(e => {
            console.log(e.message);
            $("#displayError").text(e.message);
        });
    });

    $("#userName").val("");
    $("#passWord").val("");

    console.log("sign in");
});

$("#signUpBtn").on("click", function () {

    event.preventDefault();

    // TODO: Check For Real Email
    const email = $("#email").val().trim();
    const password = $("#passWord").val().trim();
    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, password);
    $("#displayError").text("");
    promise.catch(e => {
        console.log(e.message);
        $("#displayError").text(e.message);
    });
    // $("#displayError").text()

    console.log("sign up");
});

firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
        user = firebaseUser;

        $("#signOut").attr("style", "display: block");
        $(".signIn").attr("style", "display: none");
        $("#displayEmail").text(firebaseUser.email);

        // Create/Join Room
        $(".createOrJoinRoom").attr("style", "display: block;");
        createOrJoinRoom();

        // Game Starts Here

    } else {
        console.log("not logged in");
        $(".signIn").attr("style", "display: block");
        $("#displayEmail").text("Sign In");

        $(".createOrJoinRoom").attr("style", "display: none;");

        // $(".chatDiv").attr("style", "display: block");
        // $(".chatDiv").attr("style", "display: none");
    }
})

$("#signOut").on("click", function () {

    firebase.auth().signOut();

    $("#signOut").attr("style", "display: none");

    console.log("sign out");
});

function createOrJoinRoom() {
    // console.log("hey");
}

$("#createRoom").on("click", function () {
    event.preventDefault();

    const create = $("#createOrJoin").val().trim();
    database.ref().push({
        CreateRoom: create
    });
    // console.log("create");

    $("#createOrJoin").val("");
});

$("#joinRoom").on("click", function () {
    event.preventDefault();

    const join = $("#createOrJoin").val().trim();
    database.ref().push({
        JoinRoom: join
    });
    // console.log("join");

    $("#createOrJoin").val("");
});

$("#sendToChat").on("click", function(){
    var message = $("#chatBoxMessage").val().trim();

    database.ref().push({
        message: message
    });

    $("#chatBoxMessage").val("");
});

database.ref().on("child_added", function (snap) {
    $("#displayMessages").prepend(snap.val().message + " (Time Stamp)<br>");
});


// database.ref().on("value", function (snap) {

//     console.log(snap.val());
//     console.log(snap.val().length);

//     // if (snap.val().username.includes(enteredEmail)) {
//     //     // test for password
//     //     console.log("woah");
//     // }
//     // else {
//     //     database.ref().push({
//     //         username: enteredEmail,
//     //         password: enteredPassword
//     //     });
//     //     console.log("thats too bad");
//     // }


// }, function (errorObject) {
//     console.log("The read failed: " + errorObject.code);
// });



// $(document).ready(function () {
//     database.ref().set({
//         clickCount: 7
//     });
// });