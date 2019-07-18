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
    promise.catch(e => console.log(e.message));

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
        $("#signOut").attr("style", "display: block");
        $(".signIn").attr("style", "display: none");
        $("#displayEmail").text(firebaseUser.email);
    } else {
        console.log("not logged in");
        $(".signIn").attr("style", "display: block");
        $("#displayEmail").text("Sign In");
    }
})

$("#signOut").on("click", function () {

    firebase.auth().signOut();

    $("#signOut").attr("style", "display: none");

    console.log("sign out");
});

// firebase.database().ref().child('Profiles').child(user.uid).set({
//     user
// });

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