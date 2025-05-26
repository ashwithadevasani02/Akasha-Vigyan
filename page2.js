    let content = document.querySelector(".content");
    let index = 0;
    let forward;
    let responseArray = [];
    let btn = document.querySelector(".perform");
    btn.addEventListener("click", async () => {
        let start_date = document.querySelector("#inp1").value;
        let end_date = document.querySelector("#inp2").value;
        if (!start_date || !end_date) {
            alert("Please select both start and end dates.");
            return;
        }
        let dates = getDateRange(start_date, end_date);
        responseArray = [];
        index = 0;
        getMarsData(dates);
        await getMarsData(dates);
    });

    function getDateRange(start_date, end_date) {
        let dateArray = [];
        let curr_date = new Date(start_date);
        let final_date = new Date(end_date);

        while (curr_date <= final_date) {
            dateArray.push(curr_date.toISOString().split('T')[0]);
            curr_date.setDate(curr_date.getDate() + 1);
        }

        return dateArray;
    }

    async function getMarsData(dates) {
        let box = document.createElement("div");
        box.classList.add("con");
        content.innerHTML = "";
        content.appendChild(box);

        for (let date of dates) {
            let apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=62YrCSxet1iPDcu2kcJIJdI327tqaqwe7Tybwugg`;
            
            try {
                let response = await axios.get(apiUrl);
                let photos = response.data.photos;
                responseArray.push(...photos);
            } catch (err) {
                console.log(`Error fetching data for ${date}:`, err);
            }
        }

        if (responseArray.length === 0) {
            let error = document.createElement("h3");
            error.innerText = "No data available for selected dates.";
            box.appendChild(error);
            return;
        }

        displayData(index, box);
    }

    function displayData(i, box) {
        if (i >= responseArray.length) {
            return;
        }

        box.innerHTML = "";

        let pic = document.createElement("img");
        pic.setAttribute("src", responseArray[i].img_src);
        box.appendChild(pic);

        let desc = document.createElement("div");
        desc.classList.add("text");
        box.appendChild(desc);

        let date = document.createElement("h3");
        date.innerHTML = `Earth Date: ${responseArray[i].earth_date}`;
        desc.append(date);

        let sol = document.createElement("h3");
        sol.innerHTML = `Sol: ${responseArray[i].sol}`;
        desc.append(sol);

        let cam = document.createElement("h3");
        cam.innerHTML = `Camera: ${responseArray[i].camera.full_name} (${responseArray[i].camera.name})`;
        desc.append(cam);

        let rover = document.createElement("h3");
        rover.innerHTML = `Rover: ${responseArray[i].rover.name}`;
        desc.append(rover);

        let launch_date = document.createElement("h3");
        launch_date.innerHTML = `Launch Date: ${responseArray[i].rover.launch_date}`;
        desc.append(launch_date);

        let land_date = document.createElement("h3");
        land_date.innerHTML = `Landing Date: ${responseArray[i].rover.landing_date}`;
        desc.append(land_date);

        let status = document.createElement("h3");
        status.innerHTML = `Status: ${responseArray[i].rover.status}`;
        desc.append(status);

        forward = document.createElement("div");
        forward.classList.add("next");
        forward.innerHTML = '<i class="fa-regular fa-circle-right"></i>';
        forward.style.marginLeft = "34rem";
        forward.style.fontSize = "3rem";
        forward.style.visibility= (index==responseArray.length-1)?"hidden":"visible";
        desc.append(forward);

        let backward=document.createElement("div");
        backward.classList.add("next");
        backward.innerHTML='<i class="fa-regular fa-circle-left"></i>';
        backward.style.position = "absolute";
        backward.style.left = "80rem";
        backward.style.fontSize="3rem";
        backward.style.bottom = "2.6rem";
        backward.style.visibility= (index==0)? "hidden":"visible";
        desc.append(backward);
        forward.addEventListener("click", () => {
            if (index < responseArray.length - 1) {
                index++;
                displayData(index, box);
            }
        });
        backward.addEventListener("click", () => {
            if (index > 0) {
                index--;
                displayData(index, box);
            }
        });
    }
