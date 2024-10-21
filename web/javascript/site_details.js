var currentUrl = window.location.search; // takes URL
var params = new URLSearchParams(currentUrl); // takes params
var idParamValue = params.get("id"); // takes id from params

const addrating = () =>
  //adding rating
  {
    const Value = document.getElementsByName("rate")[0].value;
    const result = fetch(
      "http://localhost:3000/api/v1/AddRating?pageId=" +
        idParamValue +
        "&rating=" +
        Value,
      { method: "post" }
    );
    const rate = fetch(
      "http://localhost:3000/api/v1/getRating?id=" + idParamValue,
      { method: "get" }
    )
      .then((r) => r.json())
      .then((Data) => {
        document.getElementById("rating").innerHTML = `
            AVERAGE RATING: ${parseFloat(Data.rating[0].avg).toFixed(1)}
            `;
      })
      .catch((e) => {
        console.log("We are sorry. Problem occured");
      });
  };

const PagesData = fetch("http://localhost:3000/api/v1/Pages:" + idParamValue, {
  method: "GET",
}) // Gets data
  .then((r) => r.json()) // changes to json
  .then((Data) => {
    console.log(Data);
    let element = Data.data[0];
    // Creates box filled with data (shows deatils of site)
    document.getElementsByTagName("main")[0].innerHTML += `
            <div class="data_box">
                <img id="image_insert"/>
                <h1>${element.title}</h1>
                <a href="https://${
                  element.link
                }" target="_blank"> <span class="text"> ${
      element.link
    } </span> </a>
                <span class="text">${element.description}</span>
                <span class="text" id ="rating">AVERAGE RATING: ${parseFloat(
                  element.rating
                ).toFixed(1)}</span>
                <select name="rate" onchange="addrating()">
                <option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option>
            </select>
            </div>
        `;
    document.getElementById("image_insert").src =
      "data:image/png;base64," + Data.images[0]; // Fills image with buffer for png
    document.title = element.title; // changes title
  })
  .catch((e) => console.log(e)); //returns error, if thre is any
