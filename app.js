$(function(){
    function initSort(){
        $("column").sortable({

            connectWith: '.column',
            handle: '.list__header'
        });


    }
    initSort();

    $('body').on('click', '#addNew', function(){

        var newList =$('.board .column:first .list').clone();

        var lastColumn =  $('.board .column:last')

        var newColumn = lastColumn.clone();

        lastColumn.html(newList);
        
        lastColumn.after(newColumn);

    });

    $('body').on('click', '.list__header', 'delete', function(){
        $(event.target).closest('.column').remove();
    });
});