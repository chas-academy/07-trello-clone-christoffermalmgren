$(function() {
    function initSort() {
      $(".list-cards").sortable({
        cursor: "move",
        connectWith: ".list-cards",
        handle: ".list-header",
        helper: "clone",
        placeholder: "sortable-placeholder",
        revert: true
      });
    }
    initSort();
  
    function addList(event) {
      event.preventDefault(); // Don't actually submit the form, silly
  
      var formData = $(event.target).offsetParent().find("form").serializeArray();
  
      var newColumn = `<div class="column">
          <div class="list">
              <div class="list-header">
                  ${formData[0].value}
                  <button class="button delete">
                      X
                  </button>
              </div>
              <ul class="list-cards">
              </ul>
          </div>
      </div>`;
  
      $(".board .column:last").before(newColumn);
      // init the sorting again after adding new lists/columns
      initSort();
    }
  
    dialog = $("#list-creation-dialog").dialog({
      autoOpen: false,
      height: 200,
      width: 270,
      modal: true,
      buttons: {
        Save: addList,
        Cancel: function() {
          dialog.dialog("close");
        }
      }
    });
  
    $("#new-list").click(function() {
      dialog.dialog("open");
    });
  
    $("body").on("click", ".list-header .delete", function(event) {
      $(event.target).closest(".column").remove();
    });
  
    $(".new-card").submit(function(event) {
      event.preventDefault(); // Don't actually submit the form, silly
      var formData = $(event.target).serializeArray();
      $(event.target).find("input").val("");
  
      var newCard = `<li class="card">
          ${formData[0].value}
          <button class="button delete">X</button>   
      </div>`;
  
      $(event.target).closest(".add-new").before(newCard);
    });
  
    $("body").on("click", ".list-cards .card .delete", function(event) {
      $(event.target).parent().remove();
    });
  });
  