
let a = document.getElementById("textbox").value;
let b = document.getElementById("textbox").innerText;
let button = document.getElementById('add');
button.addEventListener("click", function () {
    document.getElementById('lista').innerHTML += '<li>'+ a +'</li>' + '<br>';
    a = "";
    b = "";
});