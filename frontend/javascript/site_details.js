var currentUrl = window.location.search;
var params = new URLSearchParams(currentUrl);
var idParamValue = params.get('id');
console.log("Aktualny URL: ", idParamValue);

const PagesData = fetch("http://localhost:3000/api/v1/Pages:"+idParamValue, { method:"GET"}) 
        .then((r) => r.json())
        .then((Data) => {
        console.log(Data);
        for (let i = 0 ; i < Data.Length; i++)
        { 
            let element = Data.data[i]
            console.log(element)

            document.body.innerHTML+=
            `
                <img id="${i}"/>
                ${element.title}
            `
        };   
        for(let i = 0; i< Data.Length; i++)
        {
            document.getElementById(i).src = "data:image/png;base64,"+Data.images[i];
        }     
        })
        .catch((e) =>  console.log(e));