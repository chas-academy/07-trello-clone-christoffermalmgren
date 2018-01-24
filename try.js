$( document ).ready(function() {
    
        $(".board" ).sortable()
        $(".list-cards" ).sortable({  
            //ändrar muspekaren plus att .list cards connectar med varandra.
            cursor: "move", 
            connectWith: ".list-cards",
            
    });
      
        //add card
        $(".new-card").submit(function(event){

            event.preventDefault();
            var formData = $(event.target)
        });

        //remove card
        $(".button-delete").on('click', function(){
        $(this).closest(".card").remove();
    });
});