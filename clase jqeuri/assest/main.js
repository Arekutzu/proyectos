$(document).ready(function () {

    // Selectores (id,class,tag)
    $("h1").text("Hola desde jQuery");
    $("h5").text("Hola desde el himalaya");
    $(".parrafo").text("Hola desde la clase parrafo");
    $(".wow").text("Hola desde la clase wow");
    $(".relleno").html("Contenido <strong>Lindo</strong> desde jQuery");

    $("img").attr("src", "https://picsum.photos/200/300");

    $("#other").removeAttr("disabled");
    const inputOther = $("#other");
    inputOther.removeAttr("disabled");

    $("#boton").click(function() {
        inputOther.addClass("form-control");
        box.css("width", "500px");
        box.css("height", "500px");
      });
      
      box.mouseenter(function() {
        $(this).css("background-color", "red");
      });

      box.mouseleave(function() {
        $(this).css("background-color", "green");
      });

 });
