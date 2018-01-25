$( document ).ready(function() {
    
        $(".board" ).sortable()
        $(".list-cards" ).sortable({  
            //ändrar muspekaren plus att .list cards connectar med varandra.
            cursor: "move", 
            connectWith: ".list-cards",
            
    });
      
        //add card

         $(".new-card").submit(function(event){

            event.preventDefault(); //gör så sidan inte laddas om.
            var formData = $(event.target).serializeArray();
            $(event.target).find('input').val("");

            var addNewCard = `

            <li class="card">
                ${formData[0].value}
                <button class="button-delete">X</button>
            </li>
            `
            $(event.target).closest('.add-new').before(addNewCard);
            
               //remove card
            $(".button-delete").on('click', function(){
            $(this).closest( ".card" ).fadeOut("slow");
            
        });
     });

     //add new list

        $(".new-list").submit(function(event){

        event.preventDefault(); //gör så sidan inte laddas om.
        var formData = $(event.target).serializeArray();
        $(event.target).find('input').val("");

        var addNewList = `
        <div class="column">
        <div class="list">
            <div class="list-header">
                ${formData[0].value}
                <button class="button-delete">X</button>
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

      `      //på .board appandas min variabel addNewList 
    $('.board').append(addNewList);

            //remove list. när du på Xet på listan så kickar functionen igång,
            //this refererar till button-delete och närmsta column class som tas bort.
    $(".button-delete").on('click', function(){
        $(this).closest(".column").toggle("slide");

    });
});



});