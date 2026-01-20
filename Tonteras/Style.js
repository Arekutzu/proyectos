$(function() {
  let display = $("#display");

  $("button").on("click", function() {
    let value = $(this).text();

    if (value === "C") {
      display.val("");
    } else if (value === "=") {
      try {
        display.val(eval(display.val()));
      } catch {
        display.val("Error");
      }
    } else {
      display.val(display.val() + value);
    }
  });
});
