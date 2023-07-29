var array;
window.onload = function () {
  axios
    .get("http://localhost:8801/resource_booking_list")
    .then(function (response) {
      window.dataContainer = response.data;
      console.log(response.data);
      array = response.data.data;
      console.log(Object.keys(array[0]));
      console.log(array);
      const tableParent = document.getElementById("table-container");
      const table = document.createElement("table");
      table.className = "table";
      //create table header
      const tableHeader = document.createElement("thead");
      const headerRow = document.createElement("tr");
      Object.keys(array[0]).forEach((key) => {
        const th = document.createElement("th");
        th.textContent = key;
        console.log(th);
        headerRow.appendChild(th);
      });
      tableHeader.appendChild(headerRow);
      console.log(headerRow);
      table.appendChild(tableHeader);
      console.log(tableHeader);

      //create table body
      const tbody = document.createElement("tbody");
      array.forEach((item) => {
        const row = document.createElement("tr");
        Object.values(item).forEach((value) => {
          const td = document.createElement("td");
          td.textContent = value;
          row.appendChild(td);
        });
        tbody.appendChild(row);
      });
      table.appendChild(tbody);

      // Add the table to the container
      tableParent.appendChild(table);
    })
    .catch(function (error) {
      console.log(error);
    });
};

async function reset(params) {
  console.log("clicked");
  try {
    const response = await axios.delete(
      "http://localhost:8801/reset_resource",
      {
        method: "DELETE",
      }
    );
    console.log("Server response:", response.data);
    const serverData = response.data.messaage;
    console.log(serverData);
  } catch (error) {
    console.error("Error sending data:", error);
  }
}
