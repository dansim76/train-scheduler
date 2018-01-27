
  var config = {
    apiKey: "AIzaSyDqzexg_mcOot96qbGi2SdVuDdr27J2SAU",
    authDomain: "train-faf30.firebaseapp.com",
    databaseURL: "https://train-faf30.firebaseio.com",
    projectId: "train-faf30",
    storageBucket: "",
    messagingSenderId: "1099054784039"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

    var trainName ="";
    var destination = "";
    var trainTime = "";
    var frequency ="";

  $(document).on("click","#submit-btn", function(event){
    event.preventDefault();

   

    trainName = $("#trainName").val();
    console.log(trainName)

    destination = $("#destination").val();
    console.log(destination);
    
    trainTime = $("#trainTime").val();
    console.log(trainTime);

    frequency = $("#frequency").val();
    console.log(frequency);

    database.ref().push({
      trainName: trainName,
      destination: destination,
      trainTime: trainTime,
      frequency: frequency
    });


  });

  database.ref().on("child_added", function(childSnapshot) {

      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().trainName);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().trainTime);
      console.log(childSnapshot.val().frequency);

      var newDateFormat ="hh:mm";
      var convertedDate = moment(childSnapshot.val().trainTime,newDateFormat);
      var timediff = moment().diff(moment(convertedDate),'minutes');
      var minAway = timediff % frequency;
      var nextArrival = moment().add(minAway,'minutes');
      var nextArrivalconverted = moment(nextArrival).format("hh:mm");



      //var nextArrival = moment(convertedDate).add(frequency,'minutes').format('hh:mm');
      //var minAway = moment().diff(moment(nextArrival),'minutes');

      console.log(nextArrival);
      console.log(minAway);

      var tBody = $("tbody");
      var tRow = $("<tr>");

      // Methods run on jQuery selectors return the selector they we run on
      // This is why we can create and save a reference to a td in the same statement we update its text
      var trainnameTd = $("<td>").text(childSnapshot.val().trainName);
      var destinationTd = $("<td>").text(childSnapshot.val().destination);
      var frequencyTd = $("<td>").text(childSnapshot.val().frequency);
      var nextArrivalTd = $("<td>").text(nextArrivalconverted);

      var minAwayTd = $("<td>").text(minAway)
      // Append the newly created table data to the table row
      tRow.append(trainnameTd, destinationTd, frequencyTd, nextArrivalTd,minAwayTd);
      // Append the table row to the table body
      tBody.append(tRow);


      

    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

    
