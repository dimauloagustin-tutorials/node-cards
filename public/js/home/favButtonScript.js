$(document).ready(function () {
  $(".ticket-favButton").click((event) => {
    var api_url = "/change-fab-state";
    var id = $(event.target).parents("#ticket-container").find("#ID").val();
    $.ajax({
      type: "POST",
      url: api_url,
      dataType: "json",
      data: {
        id: id,
      },
      success: function (result) {
        if (result.favState) {
          $(event.target).removeClass("fa-heart-o");
          $(event.target).addClass("fa-heart");
        } else {
          $(event.target).removeClass("fa-heart");
          $(event.target).addClass("fa-heart-o");
        }
      },
    });
  });
});
