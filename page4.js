let array1 = document.querySelectorAll(".element");
let array = Array.from(array1);
let ele = document.querySelector(".elementt");
array.push(ele);
array.forEach((element) => {
    element.addEventListener("click", () => {
        let id = element.getAttribute("id");
        window.location.href = "redirect.html?id=" + id;
    });
});
