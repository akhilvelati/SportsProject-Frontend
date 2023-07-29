function store() {
  var name = document.getElementById("name");
  var pw = document.getElementById("pw");
  var lowerCaseLetters = /[a-z]/g;
  var upperCaseLetters = /[A-Z]/g;
  var numbers = /[0-9]/g;

  if (name.value.length == 0) {
    alert("Please fill in username");
  } else if (pw.value.length == 0) {
    alert("Please fill in password");
  } else if (name.value.length == 0 && pw.value.length == 0) {
    alert("Please fill in username and password");
  } else if (pw.value.length > 0) {
    alert("Max of 8");
  } else if (!pw.value.match(numbers)) {
    alert("please add 1 number");
  } else if (!pw.value.match(upperCaseLetters)) {
    alert("please add 1 uppercase letter");
  } else if (!pw.value.match(lowerCaseLetters)) {
    alert("please add 1 lovercase letter");
  } else {
    localStorage.setItem("name", name.value);
    localStorage.setItem("pw", pw.value);
    alert("Your account has been created");
  }
}

//checking
async function check() {
  const user = document.querySelector("#name").value;
  const pass = document.querySelector("#pw").value;
  console.log(user);
  //console.log(pass);
  try {
    const response = await axios.post("http://localhost:8801/login", {
      user: user,
      password: pass,
    });
    console.log("response", response.data);
    const dataArray = response.data.data[0];
    const id = dataArray.userID;
    //console.log(id);
    if (response.data.messaage == true) {
      localStorage.setItem("username", user);
      localStorage.setItem("userID", id);
      let storedName = localStorage.getItem("username");
      console.log(storedName);
      let storedId = localStorage.getItem("userID");
      console.log(storedId);
      window.location = "http://127.0.0.1:5500/sports/homepage.html";
    } else {
      console.log("invalid user");
    }
  } catch (error) {
    console.error("Error sending data:", error);
  }
  // var storedName = localStorage.getItem('name');
  // var storedPw = localStorage.getItem('pw');

  // var userName = document.getElementById('userName');
  // var userPw = document.getElementById('userPw');
  // var userRemember = document.getElementById("rememberMe");
}
