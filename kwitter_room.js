  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCdn0Tt8EflWIhTU9bFFFE4aVD05XlOOFg",
    authDomain: "kwitter-8b63e.firebaseapp.com",
    databaseURL: "https://kwitter-8b63e-default-rtdb.firebaseio.com",
    projectId: "kwitter-8b63e",
    storageBucket: "kwitter-8b63e.appspot.com",
    messagingSenderId: "126508700088",
    appId: "1:126508700088:web:ed4db7804485118afcbf4d"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);



  function getData() {
    firebase.database().ref("/").on('value', function (snapshot) {
      document.getElementById("output").innerHTML = "";
      snapshot.forEach(function (childSnapshot) {
        childKey = childSnapshot.key;
        room_name = childKey;
        //Start code
        console.log("room name - " + room_name);
        row = "<div class='room_name' id=" + room_name + " onclick='redirectToRoomName(this.id)'>#" + room_name + "</div><hr>";
        document.getElementById("output").innerHTML += row;
        //End code
      });
    });
  }
  getData();

  function addRoom() {
    room_name = document.getElementById("room_name").value;

    firebase.database().ref("/").child(room_name).update({
      purpose: "adding room name"
    });

    localStorage.setItem("room_name", room_name);

    window.location = "kwitter_room.html";
  }

  function redirectToRoomName(name) {
    console.log(name);
    localStorage.setItem("room_name", name);
    window.location = "kwitter_room.html";
  }

  function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "kwitter.html";
  }

  function send() {
    msg = document.getElementById("msg").value;
    firebase.database().rel(room_name).push({
      name: user_name,
      message: msg,
      like: 0
    })
    document.getElementById("msg").value = "";
  }

  firebase.database().ref(room_name).push({
    name: user_name,
    message: msg,
    like: 0
  });

  function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
          document.getElementById("output").innerHTML = "";
          snapshot.forEach(function (childSnapshot) {
                childKey = childSnapshot.key;
                childData = childSnapshot.val();
                if (childKey != "purpose") {
                  firebase_message_id = childKey;
                  message_data = childData;

                  console.log(firebase_messagr_id);
                  console.log(message_data);
                  name = message_data['name'];
                  message = message_data['message'];
                  like = message_data['like'];
                  name_with_tag = "<h4>"+"<img class='user_tick' src='tick.png'></h4>";
                  message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                  like_button = "<button class = 'btn btn-warning' id="+firebase_message_id+" value="+like;" onclick='updatelLike('this.id')>";
                  span_with_tag = "<span class='glyphicon - glyphicon-thumbs-up'>like: " + like + "</span></button><hr>";


                  row = name_with_tag + message_with_tag + like_button +span_with_tag;
                  document.getElementById("output").innerHTML +=row;

                } });  }); }
        getData();

        function updatelLike(message_id)
        {
          console.log("clicked on like button - " + message_id);
          button_id = message_id;
          like = document.getElementById(button_id).value;
          update_like = Number(like) + 1;
          console.log(updated_Like);

          firebase.database().ref(room_name).child(message_id).update({
            like : updated_Likes
          });
        }

        function logout() {
          localStorage.removeItem("user_name");
          localStorage.removeItem("room_name");
          windows.location.replace("kwitter.html");
        }

        if (keyPressed =="13"){
          windows.location.replace("kwitter.html");
          console.log("enter");
        }