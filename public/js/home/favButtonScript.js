$(document).ready(function () {
    //TODO - disable for mobile
  $(".ticket-favButton").mouseover((event) => {
    if ($(event.target).hasClass("fa-heart")) {
      $(event.target).removeClass("fa-heart");
      $(event.target).addClass("fa-heart-o");
    } else {
      $(event.target).removeClass("fa-heart-o");
      $(event.target).addClass("fa-heart");
    }
  });
  
  //TODO - disable for mobile
  $(".ticket-favButton").mouseout((event) => {
    if ($(event.target).hasClass("fa-heart")) {
      $(event.target).removeClass("fa-heart");
      $(event.target).addClass("fa-heart-o");
    } else {
      $(event.target).removeClass("fa-heart-o");
      $(event.target).addClass("fa-heart");
    }
  });
});