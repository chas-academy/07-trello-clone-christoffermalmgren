$.widget('superwidgets.borderify', {
  options: {
    color: "red",
    width: "1px"
  },

  _create: function() {
    this.element.css({'border' : this.options.width +' solid ' + this.options.color})
  },

  _setOption: function(key, value) {
    if (key === "color") {
      this.options.color = value;
    } else if (key === "width") {
      this.options.width = value;
    }
    this._super(key, value)
  },

  _setOptions: function(options) {
    var that = this;
    $.each(options, function(key, value) {
      that._setOption(key, value)
    })
  }
});

$(document).ready(function() {
  $(".add-new").draggable({
    axis: "x"
  });

  $(".board").sortable({
    placeholder: "sortable-placeholder",
    start: function(event, ui) {
      ui.placeholder.height(ui.item.find('.list').height());
    }
  });

  $(".list-cards").sortable({
    //ändrar muspekaren plus att .list cards connectar med varandra.
    cursor: "move",
    connectWith: ".list-cards",
    placeholder: "sortable-placeholder",
    scroll: false,
    start: function(event, ui) {
      ui.placeholder.height(ui.item.outerHeight());
      ui.placeholder.width(ui.item.outerWidth());
    }
  });

  //add card

   $("body").on("submit", ".new-card", function(event) {
    event.preventDefault(); //gör så sidan inte laddas om.
    var formData = $(event.target).serializeArray();

    $(event.target)
      .find("input")
      .val("");

    var addNewCard = `
        <li class="card">
            <a href="#" class="card-dialog">
            ${formData[0].value}
            </a>
            <button class="button delete">X</button>
        </li>
    `;

    $(event.target)
      .closest(".add-new")
      .before(addNewCard);
  });

  //add new list
  $(".new-list").submit(function(event) {
    event.preventDefault(); //gör så sidan inte laddas om.
    var formData = $(event.target).serializeArray();
    $(event.target)
      .find("input")
      .val("");

    var addNewList = `
        <div class="column">
            <div class="list">
                <div class="list-header">
                    ${formData[0].value}
                    <button class="button delete">X</button>
                </div>
                <ul class="list-cards">

                    <li class="add-new">
                        <form class="new-card" action="index.html">
                            <input type="text" name="title" placeholder="Please name the card" />
                            <button class="button add">Add new card</button>
                        </form>
                    </li>
                </ul>
            </div>
        </div>
    `; //på .board appandas min variabel addNewList

    $(".board").append(addNewList);

    //remove list. när du på Xet på listan så kickar functionen igång,
    //this refererar till button-delete och närmsta column class som tas bort.
  });

  //remove card
  $("body").on("click", ".card > .button.delete", function(e) {
    e.stopPropagation();

    $(this)
      .closest(".card")
      .fadeOut("slow")
      .remove();
  });

  $("body").on("click", ".list .button.delete", function(e) {
    e.stopPropagation(); // Sluta bubbla eventet

    $(this)
      .closest(".column")
      .toggle("slide", "slow", function() { 
        this.remove() 
      });
  });

  $("body").on("click", ".card-dialog", function() {
    $(cardDetailsDialog).dialog("open");
    $("#tabs-1 > p").borderify({"color": "pink", "width": "3px" });
  });

  //popup dialog vid knapp tryck på card.
  var cardDetailsDialog = $("#card-details-dialog").dialog({
    autoOpen: false,
    show: {
      effect: "blind",
      duration: 1000
    },
    hide: {
      effect: "explode",
      duration: 1000
    }
  });

  $("#card-details-dialog #tabs").tabs();

  // i tabben due date dyker de upp ettt input field, trycker du där kommer en datepicker upp.
  $("#datepicker").datepicker();
    
});
