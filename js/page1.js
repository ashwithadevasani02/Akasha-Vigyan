let btn = document.querySelector("button");
let info = document.querySelector(".information");
let inputt = document.querySelector("input");
btn.addEventListener("click", async () => {
    let date = inputt.value.trim(); 
    let url = "";
    let url1 = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=hqigD2hajasvIoNpFr5s4xhw5zGi5gDd8BwFfeb6`;
    let url2 = `https://api.nasa.gov/planetary/apod?start_date=${date.slice(0,10)}&end_date=${date.slice(11)}&api_key=hqigD2hajasvIoNpFr5s4xhw5zGi5gDd8BwFfeb6`;
     if (date.includes(",")) url = url2;
    else url = url1;
    await createCard(url);
});

async function createCard(url) {
    try {
        let res = await axios.get(url);
        let resArray = res.data;
        if (!Array.isArray(resArray)) {
            resArray = [resArray];
        }
        info.innerHTML = ""; 
        for (let e of resArray) {
            let date = e.date;
            let title = e.title;
            let exp = e.explanation;
            let mediaUrl = e.url;
            let mediaType = e.media_type;
            let infocard = document.createElement("div");
            infocard.classList.add("pretty");
            if (mediaType === "image") {
                let img = document.createElement("img");
                img.classList.add("styleimg");
                img.setAttribute("src", mediaUrl);
                infocard.appendChild(img);
            } else if (mediaType === "video") {
                let video = document.createElement("iframe");
                video.setAttribute("src", mediaUrl);
                video.setAttribute("frameborder", "0");
                video.setAttribute("allowfullscreen", "true");
                video.classList.add("stylevideo");
                infocard.appendChild(video);
            }
            let h4 = document.createElement("h4");
            h4.innerText = title;
            h4.classList.add("align");
            infocard.appendChild(h4);
            let h6 = document.createElement("h6");
            h6.innerText = date;
            h6.classList.add("align");
            infocard.appendChild(h6);
            let p = document.createElement("p");
            p.innerText = exp;
            p.classList.add("align");
            infocard.appendChild(p);
            info.appendChild(infocard);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
