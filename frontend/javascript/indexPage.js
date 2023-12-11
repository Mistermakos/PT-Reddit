// For testing purposes it is set to localhost
const PagesData = fetch("http://localhost:3000/api/v1/Pages", { method:"GET"}) 
    .then((r) => r.json())
    .then((Data) => {
        console.log(Data);
        for (let i = 0 ; i < Data.Length; i++)
        { 
            let element = Data.data[i]
            console.log(element)

            document.getElementsByTagName('main')[0].innerHTML+=
            `
                    <a class="window octagon-border" href="site_details/?id=${element.id}">
                        <div class="window-img">
                            <img id="${i}"/>
                        </div>
                        <div class="window-title">
                            <div class="btn inverted-colors no-hover">${element.title}</div>
                        </div>
                        <div class="window-mask hexagon"></div>
                    </a>
            `
        };   
        for(let i = 0; i< Data.Length; i++)
        {
            document.getElementById(i).src = "data:image/png;base64,"+Data.images[i];
        }     
    })
    .catch((e) =>  console.log(e));
