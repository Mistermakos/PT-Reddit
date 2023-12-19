var currentUrl = window.location.search; // takes URL
var params = new URLSearchParams(currentUrl); // takes params
var idParamValue = params.get('id'); // takes id from params

const PagesData = fetch("http://localhost:3000/api/v1/Pages:"+idParamValue, { method:"GET"}) // Gets data
        .then((r) => r.json()) // changes to json
        .then((Data) => {

        let element = Data.data[0]

        // Creates box filled with data (shows deatils of site)
        document.body.innerHTML+=
        `
            <div class="data_box">
                <img id="image"/>
                <h1>${element.title}</h1>
                <a href="https://${element.link}" target="_blank"> <span class="text"> ${element.link} </span> </a>
                <span class="text">${element.description}</span>
            </div>
        `  
        document.getElementById("image").src = "data:image/png;base64,"+Data.images[0]; // Fills image with buffer for png
        document.title = element.title // changes title
        })
        .catch((e) =>  console.log(e)); //returns error, if thre is any