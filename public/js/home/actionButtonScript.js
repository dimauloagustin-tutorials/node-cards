$(document).ready(function () {
  $(".ticket-action-available").click((event) => {
    Swal.fire({
      title: "¿Quieres usar este vale?",
      text: "No será posible volver a utilizarlo después de esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, usar!",
    }).then((result) => {
      if (result.value) {
        var api_url = "/use-ticket";
        var id = $(event.target).parents("#ticket-container").find("#ID").val();
        $.ajax({
          type: "POST",
          url: api_url,
          dataType: "json",
          data: {
            id: id,
          },
          success: function (result) {
            if (result.state == "USED") {
              Swal.fire("Validado!", "Por favor acérquese a su agufa personal para cobrar el vale", "success");
              $(event.target).removeClass("ticket-action-available");
              $(event.target).addClass("ticket-action-used");
            }
          },
        });
      }
    });
  });
});
