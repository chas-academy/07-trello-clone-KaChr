$(document).ready(function() {

    var Board = (function() {

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
            Save: function() { console.log('Save me!') }, 
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
            Save: function() { console.log('Save me!') }, 
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
        
        $('ul').after(newCardForm);
        $('.column:last').after(newListForm);
      }

      var addEventListeners = function() {
        $('.new-card').on("submit", addCard);
        $('body').on("click", ".delete-card", deleteCard);
        $('body').on("click", ".card-title", openCardDetailDialog);
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
        $(newCard).find('.card-title').html(newTitle);

        $(this).parent().find('ul li:last').after(newCard);

        $(this)[0].reset();
      }

      var deleteCard = function() {
        $(this).parent().remove();
      }

      var openCardDetailDialog = function() {
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