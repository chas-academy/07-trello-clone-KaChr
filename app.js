$(document).ready(function() {

    var Board = (function() {
      var currentTarget;
      var initialize = function() {
        initDialogs(); 
        initTabs();
        initSort();
        initDrag();
        initDrop();
        createAdders();
        addEventListeners();
        selectDate();
      };

      var initDialogs = function() {
        listDialog = $("#list-creation-dialog").dialog({
          autoOpen: false,
          modal: true,
          width: 270,
          buttons: {
            Save: saveList, 
            Cancel: function() { $(this).dialog("close") }
          }
        })

        cardDetailDialog = $("#card-edit-dialog").dialog({
          autoOpen: false,
          modal: true,
          width: 270,
          show: {effect: 'puff', duration: 500},
          hide: {effect: 'puff', duration: 500},
          buttons: {
            Save: saveCard,
            Cancel: function() { $(this).dialog("close") }
          }
        })
      }

      var initTabs = function() {
        $('#card-tabs').tabs();
      }

      var initSort = function() {
        $(".cards").sortable({
          cursor: "pointer",
          connectWith: ".cards",
          handle: ".card",
          helper: "original",
          placeholder: "sortable-placeholder",
          revert: true
        });
      };

      var initDrag = function() {
        $(".card").draggable({
          connectToSortable: ".cards"
        });
      };
  
      var initDrop = function() {
        $(".cards").droppable({
          accept: ".card"
        });
      };

      var createAdders = function() {

        var newCardForm = $(`
        <form class="new-card">
          <input type="text" name="title" placeholder="Card title">
          <button class="new-card-button">Add new card</button>
        </form>`);
        
        var newListForm = $(`
        <div class="column">
            <div class="list">
              <button class="new-list">Add new list</button>    
            </div>    
        </div>
        `);
        
        $('ul.cards').after(newCardForm);
        $('.column:last').after(newListForm);
      }

      var addEventListeners = function() {
        $('.new-card').on("submit", addCard);
        $('body').on("click", ".delete-card", deleteCard);
        $('body').on("click", ".card-title", (event) => openCardDetailDialog(event.target));
        $('.new-list').on("click", openAddListDialog);
      }

      var addCard = function(e) {
        e.preventDefault();

        var newCard = $(`
          <li>
            <div class="card">
              <span class="card-title"></span>
              <span class="card-due"></span>
              <button class="delete-card">X</button>
            </div>
          </li>`);
  
        var newTitle = $(this).serializeArray()[0].value;
        if (newTitle){
        $(newCard).find('.card-title').html(newTitle);
        } else {
          return;
        }

        $(this).parent().find('ul li:last').after(newCard);

        $(this)[0].reset();
      }

      var saveCard = function(event) {
         event.preventDefault();
          
         var cardInfo = $(this).find('input').serializeArray();

         $(currentTarget).text(cardInfo[0].value);
         $(currentTarget).siblings('.card-due').text(cardInfo[1].value);

         cardDetailDialog.dialog("close");
      }

      var saveList = function(event) {
        event.preventDefault();

        var newList = $(`
        <div class="column">
            <div class="list">
                <div class="new-list-name"></div>
                    <ul class="cards">
                        <li>
                            <div class="card">
                                <span class="card-title">Card #1 in new list</span>
                                <span class="card-due"></span>
                                <button class="delete-card">X</button>
                            </div>
                        </li>
                    </ul>
                    <form class="new-card">
                      <input type="text" name="title" placeholder="Card title">
                      <button class="new-card-button">Add new card</button>
                    </form>
                </div>            
            </div>    
        </div>`);

        var newListName = $(this).find('input').serializeArray();
          
        $('.column:last').append(newList).find('.new-list-name').text(newListName[0].value);
        
        listDialog.dialog("close");
      }

      var deleteCard = function() {
        $(this).parent().remove();
      }

      var openCardDetailDialog = function(target) {
        currentTarget = target;
        $('input#title-text').val($(currentTarget).text());
        $('input#datepicker').val($(currentTarget).siblings('.card-due').text())
        cardDetailDialog.dialog("open");
      }

      var openAddListDialog = function() {
        listDialog.dialog("open");
      }
      
      var selectDate = function() {
        $("#datepicker").datepicker({
          dateFormat: 'dd-mm-yy',
          showAnim: 'clip'
        });
      }
  

      return {
        initialize: initialize
      }
    })();

    Board.initialize();
});