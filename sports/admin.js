var array;
window.onload = function () {
  axios
    .get("http://localhost:8801/active_bookings")
    .then(function (response) {
      window.dataContainer = response.data;
      let testData = {
        data: [
          { count: "4/7", name: "Active Slot", image: "/images/booking.png" },
          {
            count: "22/200",
            name: "Active Resource",
            image: "/images/stadium.png",
          },
          {
            count: "178/200",
            name: "Available Resource",
            image: "/images/equip-2.png",
          },
          {
            count: "3/7",
            name: "Available Slots",
            image: "/images/available-slot.png",
          },
        ],
        slotTable: [
          {
            userID: 1,
            user_name: "akhil",
            slot_time: "09:00:00",
            booked_date: "2023-07-21T18:30:00.000Z",
          },
          {
            userID: 3,
            user_name: "srujan",
            slot_time: "12:00:00",
            booked_date: "2023-07-26T18:30:00.000Z",
          },
        ],
        resourceTable: [
          {
            ID: 3,
            userID: 3,
            user_name: "srujan",
            resource_name: "Football",
            booked_date: "2023-07-27T18:30:00.000Z",
          },
        ],
        messaage: "all counts sent",
      };
      resourceArray = testData.resourceTable//response.data.resourceTable;
      slotArray = testData.slotTable//response.data.slotTable;
      array = testData.data//response.data.data;
      console.log(array);
      console.log(resourceArray);
      console.log(slotArray);
      let parentDiv = document.getElementById("count-box-container");
      array.forEach((individualCount, i) => {
        // console.log(i);
        // console.log(individualCount.countSlots);
        const boxNo = document.createElement("div");
        boxNo.className = `box box${i + 1}`;
        const text = document.createElement("div");
        text.className = "text";
        const topicHeading = document.createElement("h2");
        topicHeading.className = "topic-heading";
        topicHeading.innerHTML = individualCount.count;
        const topicName = document.createElement("h2");
        topicName.className = "topic";
        topicName.textContent = individualCount.name;
        const setImage = document.createElement("img");
        setImage.src = individualCount.image;
        // console.log(setImage.src);
        setImage.alt = "Image";
        text.appendChild(topicHeading);
        text.appendChild(topicName);
        boxNo.appendChild(text);
        boxNo.appendChild(setImage);
        parentDiv.appendChild(boxNo);
      });

      //slot table
      let parentReport = document.getElementById("report-body");
      const reportTopicHeading = document.createElement("div");
      reportTopicHeading.className = "report-topic-heading";

      //creating table headers
      Object.keys(slotArray[0]).forEach((key) => {
        const h3 = document.createElement("h3");
        h3.className = "t-op";
        h3.textContent = key;
        // console.log(h3);
        reportTopicHeading.appendChild(h3);
      });

      //creating table body
      const items = document.createElement("div");
      items.className = "items";
      slotArray.forEach((item) => {
        const childItem = document.createElement("div");
        childItem.className = "item1";
        Object.values(item).forEach((value) => {
          const h3 = document.createElement("h3");
          h3.className = "t-op-nextlvl";
          h3.textContent = value;
          childItem.appendChild(h3);
        });
        items.appendChild(childItem);
      });
      parentReport.appendChild(reportTopicHeading);
      parentReport.appendChild(items);
      console.log(reportTopicHeading);

      //resource table
      let resourceparentReport = document.getElementById("report-body2");
      const resourcereportTopicHeading = document.createElement("div");
      resourcereportTopicHeading.className = "report-topic-heading";

      //creating table headers
      Object.keys(resourceArray[0]).forEach((key) => {
        const h3 = document.createElement("h3");
        h3.className = "t-op";
        h3.textContent = key;
        // console.log(h3);
        resourcereportTopicHeading.appendChild(h3);
      });

      //creating table body
      const resourceItems = document.createElement("div");
      resourceItems.className = "items";
      resourceArray.forEach((item) => {
        const resourcechildItem = document.createElement("div");
        resourcechildItem.className = "item1";
        Object.values(item).forEach((value) => {
          const h3 = document.createElement("h3");
          h3.className = "t-op-nextlvl";
          h3.textContent = value;
          resourcechildItem.appendChild(h3);
        });
        resourceItems.appendChild(resourcechildItem);
      });
      resourceparentReport.appendChild(resourcereportTopicHeading);
      resourceparentReport.appendChild(resourceItems);
      console.log(resourcereportTopicHeading);
    })
    .catch(function (error) {
      console.log(error);
    });
};
