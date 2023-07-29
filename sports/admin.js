var array;
window.onload = function () {
  axios
    .get("http://localhost:8801/active_bookings")
    .then(function (response) {
      window.dataContainer = response.data;
      resourceArray = response.data.resourceTable;
      slotArray = response.data.slotTable;
      array = response.data.data;
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
