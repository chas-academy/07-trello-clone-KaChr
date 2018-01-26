$(document).ready(function() {

    var newCard = $(`
    <input type="text" name="title" placeholder="Card title">
    <button class="new-card-button">Add new card</button>`);
   



    $('ul').after(newCard);


});