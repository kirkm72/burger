// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".change-devoured").on("click", function(event) {
    let id = $(this).data("id");
    let newDevoured = $(this).data("newDevoured");

    let newDevourState = {
      devoured: newDevoured
    };

    $.ajax("/api/burgers/" + id, { //PUT request.
      type: "PUT",
      data: newDevouredState
    }).then(
      function() {
        console.log("changed devoured to", newDevoured);
        location.reload(); //Page reload for updates
      }
    );
  });

  $(".create-form").on("submit", function(event) {
    event.preventDefault(); //preventDefault needed on a submit event.

    let newBurger = {
      burgerName: $("#burger-name").val().trim(),
    };

    $.ajax("/api/burgers", { //POST request.
      type: "POST",
      data: newBurger
    }).then(
      function() {
        console.log("created new burger");
        
        location.reload(); //Page reload for updates
      }
    );
  });
});