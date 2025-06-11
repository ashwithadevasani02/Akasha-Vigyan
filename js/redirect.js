let array = [];
let index = 0;
let container = document.querySelector(".container");
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
let id = getQueryParam("id");
let url = `https://images-api.nasa.gov/search?q=${id}`;
async function getDetails() {
    try {
        let response = await axios.get(url);
        let responseData = response.data;
        if (!responseData.collection || !responseData.collection.items) {
            console.log("No data available");
            return;
        }
        let responseArray = responseData.collection.items;
        array = []; 
        for (let el of responseArray) {
            if (el.links) {
                let mediumImage = el.links.find(link => link.href.includes("~medium.jpg"));
                if (mediumImage && !array.includes(mediumImage.href)) {
                    array.push(mediumImage.href);
                }
            }
        }
        if (array.length > 0) {
            display(index);
        } else {
            console.log("No medium-sized image links found.");
        }
    } catch (error) {
        console.error("Error fetching details:", error);
    }
}
function display(index) {
    container.innerHTML = "";
    let img = document.createElement("img");
    img.setAttribute("src", array[index]);
    container.appendChild(img);
}
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" && index < array.length - 1) {
        index++;
        display(index);
    } else if (event.key === "ArrowLeft" && index > 0) {
        index--;
        display(index);
    }
});
getDetails();