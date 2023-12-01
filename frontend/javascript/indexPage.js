// For testing purposes it is set to localhost
const dane = fetch("http://localhost:3000/api/v1/Pages", { method:"GET"}) 
    .then((r) => r.json())
    .then((data) => console.log(data))
    .catch((e) =>  console.log(e));