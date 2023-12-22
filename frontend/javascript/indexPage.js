// For testing purposes it is set to localhost

const Display_data = (Data) => 
{
    document.getElementsByTagName('main')[0].innerHTML="" // clears main
    for (let i = 0 ; i < Data.length; i++)
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
            //Adds icon with elements
    };  
    for(let i = 0; i< Data.length; i++)
    {
        document.getElementById(i).src = "data:image/png;base64,"+Data.images[i]; // adds icon
    }  
}

const Handler = (By_what, Value) => // Function for filtring data
{
    const PagesData = fetch(`http://localhost:3000/api/v1/SearchBy${By_what}?param=${Value}`, { method:"GET"}) 
    .then((r) => r.json())
    .then((Data) => {
        Display_data(Data)  
    })
    .catch((e) =>  console.log(e));
}

const Pages = () => // geting all pages
{
    const PagesData = fetch(`http://localhost:3000/api/v1/Pages`, { method:"GET"}) 
    .then((r) => r.json())
    .then((Data) => {
        Display_data(Data)  
    })
    .catch((e) =>  console.log(e));
}

const search = (what) => //when searching
{
    let Value = document.getElementById("text_input").value;
    Value.trim();
    switch (what) {
        case "Title":
            Handler("Title",Value);
        break;
        
        case "Author":
            Handler("Author",Value)
        break;

        case "Link":
            Handler("Link",Value);
        break;

        default:
            Pages();
        break;
    }
}

search(); // loads basic data