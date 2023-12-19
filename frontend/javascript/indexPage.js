// For testing purposes it is set to localhost

const Display_data = (Data) => 
{
    document.getElementsByTagName('main')[0].innerHTML=""
    for (let i = 0 ; i < Data.Length; i++)
    { 
            let element = Data.data[i]

            document.getElementsByTagName('main')[0].innerHTML+=
            `
                    <a class="window octagon-border" href="site_details/?id=${element.id}" target="_blank">
                        <div class="window-img">
                            <img id="${i}"/>
                        </div>
                        <div class="window-title">
                            <div class="btn inverted-colors no-hover">${element.title}</div>
                        </div>
                        <div class="window-mask hexagon"></div>
                    </a>
            `
            document.getElementById(i).src = "data:image/png;base64,"+Data.images[i];
    };  
    // for(let i = 0; i< Data.Length; i++) To be deleted when checked
    // {
    //     document.getElementById(i).src = "data:image/png;base64,"+Data.images[i];
    // }  
}

const Handler = (By_what, Value_name, Value) => 
{
    const PagesData = fetch(`http://localhost:3000/api/v1/SearchBy${By_what}?param="${Value}"`, { method:"GET"}) 
    .then((r) => r.json())
    .then((Data) => {
        Display_data(Data)  
    })
    .catch((e) =>  console.log(e));
}

const Pages = () => 
{
    const PagesData = fetch(`http://localhost:3000/api/v1/Pages`, { method:"GET"}) 
    .then((r) => r.json())
    .then((Data) => {
        Display_data(Data)  
    })
    .catch((e) =>  console.log(e));
}

const search = (what) => 
{
    let Value = document.getElementById("text_input").value;
    Value = Value.replace(" ", "%20");
    switch (what) {
        case "Title":
            Handler("Title","tile",Value);
        break;
        
        case "Author":
            Author("Author","author",Value)
        break;

        case "Link":
            Link("Link","link",Value);
        break;

        default:
            Pages();
        break;
    }
}
