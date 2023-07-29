var array;
window.onload = function () {
  // Your Axios code here
  axios
    .get("http://localhost:8801/slots_list")
    .then(function (response) {
      window.dataContainer = response.data;
      array = response.data.data;
      console.log(array);
      //console.log("server response:", response.data);
      let parentDiv = document.getElementById("main-time-slots");
      array.forEach((individualElement, i) => {
        const projectEl = document.createElement("button");
        projectEl.onclick = (e) => {
          if (e.target.className.includes("clicked")) {
            e.target.className = "time-slot";
          }
          handleClick(individualElement.slot_time, e);
          projectEl.className = "time-slot clicked";
        };
        projectEl.innerHTML = individualElement.slot_time;
        projectEl.id = `slot${i + 1}`;
        projectEl.setAttribute("value", individualElement.slot_time);
        if (individualElement.availability == "YES") {
          projectEl.className = `time-slot`;
        } else {
          projectEl.className = "not-available time-slot";
          projectEl.disabled = true;
        }
        // Add element to list
        parentDiv.appendChild(projectEl);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};
var dataArray = [];
let prevButton = null;
async function handleClick(v, button) {
  if (prevButton !== null) {
    prevButton.classList.remove("clicked");
  }
  dataArray[0] = v;
  console.log(dataArray);
  prevButton = button.target;
  // if (v.target.className.includes("not-available time-slot")) {
  //   return;
  // }
}

async function booking() {
  try {
    function message(params) {
      const danger = document.getElementById("danger");
      if (dataArray.length == 0) {
        danger.style.display = "block";
      }
      setTimeout(() => {
        danger.style.display = "none";
      }, 3000);
      return;
    }
    message();
    if (dataArray.length == 0) {
      return;
    }
    let bookedUser = localStorage.getItem("username");
    console.log(bookedUser);
    let bookedId = localStorage.getItem("userID");
    console.log(bookedId);
    const response = await axios.post("http://localhost:8801/slots_booking", {
      array: dataArray,
      user: bookedUser,
      id: bookedId,
    });
    console.log("Server response:", response.data);
    const serverData = response.data.messaage;
    console.log(serverData);
    updateDiv(serverData);

    // dataArray = [];
  } catch (error) {
    console.error("Error sending data:", error);
    dataArray = [];
  }
}

async function updateDiv(data) {
  const myDiv = await waitForElementToLoad("success");
  if (myDiv) {
    myDiv.textContent = data;
    myDiv.style.display = "block";

    setTimeout(() => {
      myDiv.style.display = "none";
    }, 1000);
  } else {
    console.log("The div element with ID 'myDiv' was not found.");
  }
}

async function waitForElementToLoad(elementId) {
  while (!document.getElementById(elementId)) {
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }
  return document.getElementById(elementId);
}
