let content=document.querySelector(".content");
let btn=document.querySelector("button");
let body=document.querySelector("body");
let input1=document.querySelector("#inp1");
let input2=document.querySelector("#inp2");
let startdate,enddate;
window.onload=()=>{
     alert("Dates Range should be less than 7 days!");
}
btn.addEventListener("click",async () =>{
     startdate=input1.value;
     enddate=input2.value;
    let url=`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startdate}&end_date=${enddate}&api_key=62YrCSxet1iPDcu2kcJIJdI327tqaqwe7Tybwugg`;
    await getData(url);
})
function fetchDates(start_date,end_date){
    let dateArray=[];
    let curr_date=new Date(start_date);
    let final_date=new Date(end_date);
    while (curr_date<=final_date) {
        dateArray.push(curr_date.toISOString().split('T')[0]);
        curr_date.setDate(curr_date.getDate() + 1);
    }
    return dateArray;
}
function generateCard(obj) {
    let card = document.createElement("div");
    let p = document.createElement("p");
    p.innerHTML = `<b><u>Name</u></b>: ${obj.name} <br> 
        <b><u>Estimated Minimum diameter</u></b>: ${obj.estimated_diameter.meters.estimated_diameter_min} meters <br> 
        <b><u>Estimated Maximum diameter</u></b>: ${obj.estimated_diameter.meters.estimated_diameter_max} meters <br> 
        <b><u>Close Approach Date</u></b>: ${obj.close_approach_data[0].close_approach_date_full} <br> 
        <b><u>Relative Velocity</u></b>: ${obj.close_approach_data[0].relative_velocity.kilometers_per_hour} kmph <br> 
        <b><u>Miss Distance</u></b>: ${obj.close_approach_data[0].miss_distance.kilometers} km <br> 
        <b><u>Absolute Magnitude (Brightness)</u></b>: ${obj.absolute_magnitude_h} <br> 
        <b><u>Potentially Hazardous</u></b>: ${obj.is_potentially_hazardous_asteroid} <br> 
        <b><u>Sentry Object:</u></b> ${obj.is_sentry_object} <br> 
        <b><u>NEO reference id</u></b>: ${obj.neo_reference_id} <br>`;
        let link = document.createElement("a");
        link.href = encodeURI(obj.nasa_jpl_url);
        link.textContent = "Click here";
        let linkContainer = document.createElement("b");
        linkContainer.innerHTML = "<u>For More Info:</u> ";
        linkContainer.appendChild(link);
        p.appendChild(document.createElement("br"));
        p.appendChild(linkContainer);
        card.classList.add("stylecard");
        card.appendChild(p);
        content.appendChild(card);
}

async function getData(urll){
    let response=await axios.get(urll);
    let store=response.data.near_earth_objects;
    let dateArray=fetchDates(startdate,enddate);
    content.innerHTML = ""; 
    for(let date of dateArray){
        for(let el of store[date]){
            generateCard(el);
        }
    }
}