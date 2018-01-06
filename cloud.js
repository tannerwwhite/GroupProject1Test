

//Initialize Firebase
var config = {
  apiKey: "AIzaSyAwSszrGJ-J62xrI0PRBRjypSoHFmtmQho",
  authDomain: "test-7f362.firebaseapp.com",
  databaseURL: "https://test-7f362.firebaseio.com",
  projectId: "test-7f362",
  storageBucket: "test-7f362.appspot.com",
  messagingSenderId: "1011145892760"
};
firebase.initializeApp(config);

var database = firebase.database();

// add event button
$("#add-event-btn").on("click", function(event) {
  event.preventDefault();

  // get user input to put into object
  var eventName = $("#event-name").val().trim();
  var eventDate = $("#event-date").val().trim();
  var eventDuration = $("#event-duration").val().trim();
  var eventLocation = $("#event-location").val().trim();
  var eventDescription = $("#event-description").val().trim();

  // object to hold our event info
  var newEvent = {
    name: eventName,
    date: eventDate,
    duration: eventDuration,
    location: eventLocation,
    description: eventDescription
  };

  // Uploads event to database
  database.ref().push(newEvent);

  // Logs everything to console
  console.log(newEvent.name);
  console.log(newEvent.date);
  console.log(newEvent.duration);
  console.log(newEvent.location);
  console.log(newEvent.description);

  // Alert
  //alert("Meeting successfully scheduled");

  // Clears all of the text-boxes
  $("#event-name").val("");
  $("#event-date").val("");
  $("#event-duration").val("");
  $("#event-location").val("");
  $("#event-description").val("");
});

// creating event to add users event to firebase
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var eventName = childSnapshot.val().name;
  var eventDate = childSnapshot.val().date;
  var eventDuration = childSnapshot.val().duration;
  var eventLocation = childSnapshot.val().location;
  var eventDescription = childSnapshot.val().description;

  $("#meeting-table > tbody").append("<tr><td>" + eventName + "</td><td>" + eventDate + "</td><td>" +
  eventDuration + "</td><td>" + eventLocation + "</td><td>" + eventDescription);
});
