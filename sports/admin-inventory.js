async function addItem() {
  const itemName = document.getElementById("itemName").value;
  console.log(itemName);
  const itemQuantity = document.getElementById("itemQuantity").value;
  console.log(itemQuantity);
  try {
    const response = await axios.post("http://localhost:8801/add_item", {
      name: itemName,
      quantity: itemQuantity,
    });
    if (response.status === 200) {
      console.log("Data sent successfully!");
    }
    console.log("Server response:", response.data);
  } catch (error) {
    console.error("Error sending data:", error.messaage);
  }
}
