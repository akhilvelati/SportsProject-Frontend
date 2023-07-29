window.onload = function () {
  // Your Axios code here
  axios.get("http://localhost:8801/resources").then(function (response) {
    console.log(response.data);
    window.resources = response.data;
    array = response.data.data;
    // let bookedUser = localStorage.getItem("username");
    // console.log(bookedUser);
    const dropdown = document.getElementById("bat");
    array.forEach((individualResource, i) => {
      const resource = document.createElement("option");
      // resource.value = "Basketball";
      console.log(resource.value);
      resource.textContent = individualResource.resource_name;
      console.log(resource.innerHTML);
      dropdown.appendChild(resource);
    });
    const inputElement = document.querySelector("#quantity");
    inputElement.setAttribute("max", window.resources.data.available_inventory);
    let selectedDropDownValue = "Cricket Bat";
    dropdown.addEventListener("change", function (event) {
      const selectedValue = event.target.value;
      selectedDropDownValue = selectedValue;
      console.log(selectedValue);
      array.forEach((row) => {
        if (row.resource_name == selectedValue) {
          inputElement.setAttribute("max", row.available_inventory);
          console.log("changed the max value");
        }
      });
    });

    const numberInput = document.getElementById("quantity");
    numberInput.addEventListener("change", function (event) {
      console.log(event.target.value);
      array.forEach((row) => {
        if (row.resource_name == selectedDropDownValue) {
          event.target.value > row.available_inventory
            ? (numberInput.value = row.available_inventory)
            : event.target.value;
        }
      });
    });
  });
};

function bookResource() {
  // const selectedResource = document.querySelector("#bat");
  // console.log(selectedResource);
  const inputElement = document.querySelector("#quantity");
  console.log(inputElement.value);
  const equipment = document.querySelector("#bat");
  console.log(equipment.value);
  let bookedUser = localStorage.getItem("username");
  console.log(bookedUser);
  let bookedId = localStorage.getItem("userID");
  axios
    .post("http://localhost:8801/resource_booking", {
      quantity: inputElement.value,
      equip: equipment.value,
      user: bookedUser,
      id: bookedId,
    })
    .then(function (response) {
      window.resources = response.data.data;
    });
}
function handleInputChange(e) {
  console.log(e.target);
}
