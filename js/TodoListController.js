'use strict'
/**
 * TodoListController.js
 * 
 * This file provides responses for all user interface interactions.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
class TodoListController {
    /**
     * The constructor sets up all event handlers for all user interface
     * controls known at load time, meaning the controls that are declared 
     * inside index.html.
     */
    constructor() {
        // SETUP ALL THE EVENT HANDLERS FOR EXISTING CONTROLS,
        // MEANING THE ONES THAT ARE DECLARED IN index.html

        // FIRST THE NEW LIST BUTTON ON THE HOME SCREEN
        this.registerEventHandler(TodoGUIId.HOME_NEW_LIST_BUTTON, TodoHTML.CLICK, this[TodoCallback.PROCESS_CREATE_NEW_LIST]);

        // THEN THE CONTROLS ON THE LIST SCREEN
        this.registerEventHandler(TodoGUIId.LIST_HEADING, TodoHTML.CLICK, this[TodoCallback.PROCESS_GO_HOME]);
        this.registerEventHandler(TodoGUIId.LIST_NAME_TEXTFIELD, TodoHTML.KEYUP, this[TodoCallback.PROCESS_CHANGE_NAME]);
        this.registerEventHandler(TodoGUIId.LIST_OWNER_TEXTFIELD, TodoHTML.KEYUP, this[TodoCallback.PROCESS_CHANGE_OWNER]);
        this.registerEventHandler(TodoGUIId.LIST_TRASH, TodoHTML.CLICK, this[TodoCallback.PROCESS_DELETE_LIST]);
        
        //THEN THE CONTROLS ON THE ITEMS SCREEN
        this.registerEventHandler(TodoGUIId.ITEM_FORM_CANCEL_BUTTON, TodoHTML.CLICK, this[TodoCallback.PROCESS_RESET_ITEM]);
        
    }

    /**
     * This function helps the constructor setup the event handlers for all controls.
     * 
     * @param {TodoGUIId} id Unique identifier for the HTML control on which to
     * listen for events.
     * @param {TodoHTML} eventName The type of control for which to respond.
     * @param {TodoCallback} callback The callback function to be executed when
     * the event occurs.
     */
    registerEventHandler(id, eventName, callback) {
        // GET THE CONTROL IN THE GUI WITH THE CORRESPONDING id
        let control = document.getElementById(id);

        // AND SETUP THE CALLBACK FOR THE SPECIFIED EVENT TYPE
        control.addEventListener(eventName, callback);
    }

    /**
     * This function responds to when the user changes the
     * name of the list via the textfield.
     */
    processChangeName() {
        let nameTextField = document.getElementById(TodoGUIId.LIST_NAME_TEXTFIELD);
        let newName = nameTextField.value;
        let listBeingEdited = window.todo.model.listToEdit;
        window.todo.model.updateListName(listBeingEdited, newName);
    }

    processChangeOwner() {
        let ownerTextField = document.getElementById(TodoGUIId.LIST_OWNER_TEXTFIELD);
        let newOwner = ownerTextField.value;
        let listBeingEdited = window.todo.model.listToEdit;
        window.todo.model.updateListOwner(listBeingEdited, newOwner);
    }

    /**
     * This function is called when the user requests to create
     * a new list.
     */
    processCreateNewList() {
        // MAKE A BRAND NEW LIST
        window.todo.model.loadNewList();

        // CHANGE THE SCREEN
        window.todo.model.goList();
    }
    /**
     * This function is called when the user requests to delete
     * a list.
     */

    processDeleteList(){
       let dialog = document.getElementById(TodoGUIId.MODAL_YES_NO_DIALOG);
       window.todo.model.view.showDialog();

       let yesButton = document.getElementById(TodoGUIId.YES_BUTTON);
       let noButton = document.getElementById(TodoGUIId.NO_BUTTON);
       yesButton.onclick= function(){
           let listBeingDeleted =  window.todo.model.listToEdit;
           window.todo.model.removeList(listBeingDeleted);
           window.todo.model.goHome();
           window.todo.model.view.hideDialog();
       }
       noButton.onclick = function(){
        window.todo.model.view.hideDialog();
       }
        
        
    }

    /**
     * This function responds to when the user clicks on a link
     * for a list on the home screen.
     * 
     * @param {String} listName The name of the list to load into
     * the controls on the list screen.
     */
    processEditList(listName) {
        // LOAD THE SELECTED LIST
        window.todo.model.loadList(listName);

        // CHANGE THE SCREEN
        window.todo.model.goList();
    }

     /**
     * This function responds to when the user clicks on an item
     * for an item on the list screen.
     * 
     * @param {String} item The name of the item to load into
     * the controls on the list screen.
     */
    processEditItem(listName, indexItem) {
       
        let submitButton1 = document.getElementById(TodoGUIId.ITEM_FORM_SUBMIT_BUTTON);
        submitButton1.onclick = function(){
            let description = document.getElementById(TodoGUIId.ITEM_DESCRIPTION_TEXTFIELD).value;
            let assigned_to = document.getElementById(TodoGUIId.ITEM_ASSIGNED_TO_TEXTFIELD).value;
            let due_date = document.getElementById(TodoGUIId.ITEM_DUE_DATE_PICKER).value;
            let isCompleted = document.getElementById(TodoGUIId.ITEM_COMPLETED_CHECKBOX).checked;
            if(description === "" || assigned_to === "" || due_date === ""){
                alert("Invalid Inputs");
            }
            else{
                let listBeingEdited = window.todo.model.loadList(listName);
                let itemBeingEdited = listBeingEdited.getItemAtIndex(indexItem);

                itemBeingEdited.setDescription(description);
                itemBeingEdited.setAssignedTo(assigned_to);
                itemBeingEdited.setDueDate(due_date);
                itemBeingEdited.setCompleted(isCompleted);
            
                // LOAD THE SELECTED LIST
                window.todo.model.loadList(listName);

                // CHANGE THE SCREEN
                window.todo.model.goList();
            }
            
        } 

        // CHANGE THE SCREEN
        window.todo.model.goEdit();

        //SET EDIT ITEM TO TRUE
        window.todo.model.editItem = true;

        //
        let listBeingEdited = window.todo.model.loadList(listName);
        let itemBeingEdited = listBeingEdited.getItemAtIndex(indexItem);
        

        //LOAD DETAILS
        document.getElementById(TodoGUIId.ITEM_DESCRIPTION_TEXTFIELD).value = itemBeingEdited.getDescription();
        document.getElementById(TodoGUIId.ITEM_ASSIGNED_TO_TEXTFIELD).value = itemBeingEdited.getAssignedTo();;
        document.getElementById(TodoGUIId.ITEM_DUE_DATE_PICKER).value= itemBeingEdited.getDueDate();
        document.getElementById(TodoGUIId.ITEM_COMPLETED_CHECKBOX).checked = itemBeingEdited.isCompleted();

        
    }

    processAddItem(listName) {
        // CHANGE THE SCREEN
        window.todo.model.goEdit();
        document.getElementById(TodoGUIId.ITEM_DESCRIPTION_TEXTFIELD).value = '';
        document.getElementById(TodoGUIId.ITEM_ASSIGNED_TO_TEXTFIELD).value = '';
        document.getElementById(TodoGUIId.ITEM_DUE_DATE_PICKER).value= 'MM-DD-YYYY';
        document.getElementById(TodoGUIId.ITEM_COMPLETED_CHECKBOX).checked = false;

        let listBeingEdited = window.todo.model.loadList(listName);
        let newItem = new TodoListItem();
            
        let submitButton2 = document.getElementById(TodoGUIId.ITEM_FORM_SUBMIT_BUTTON);
        submitButton2.onclick = function(){
            let description = document.getElementById(TodoGUIId.ITEM_DESCRIPTION_TEXTFIELD).value;
            let assigned_to = document.getElementById(TodoGUIId.ITEM_ASSIGNED_TO_TEXTFIELD).value;
            let due_date = document.getElementById(TodoGUIId.ITEM_DUE_DATE_PICKER).value;
            let isCompleted = document.getElementById(TodoGUIId.ITEM_COMPLETED_CHECKBOX).checked;
            
            if(description === "" || assigned_to === "" || due_date === ""){
                alert("Invalid Inputs");
            }

            else{
                newItem.setDescription(description);
                newItem.setAssignedTo(assigned_to);
                newItem.setDueDate(due_date);
                newItem.setCompleted(isCompleted);
            
                listBeingEdited.addItem(newItem);
                // LOAD THE SELECTED LIST
                window.todo.model.loadList(listName);

                // CHANGE THE SCREEN
                window.todo.model.goList();
            }
            
        } 



    }

    /**
     * This function responds to when the user clicks on the
     * todo logo to go back to the home screen.
     */
    processGoHome() {
        window.todo.model.goHome();
    }


    /**
     * This function responds to when the user clicks on the
     * reset button on the item form screen.
     */
    processResetItem(){
        document.getElementById(TodoGUIId.ITEM_DESCRIPTION_TEXTFIELD).value = '';
        document.getElementById(TodoGUIId.ITEM_ASSIGNED_TO_TEXTFIELD).value = '';
        document.getElementById(TodoGUIId.ITEM_DUE_DATE_PICKER).value= 'MM-DD-YYYY';
        document.getElementById(TodoGUIId.ITEM_COMPLETED_CHECKBOX).checked = false;
    }

    /**
     * This function responds to when the user clicks on the
     * submit button on the item form screen.
     */
    processSubmitItemChanges(listName, indexItem){
        let description = document.getElementById(TodoGUIId.ITEM_DESCRIPTION_TEXTFIELD).value;
        let assigned_to = document.getElementById(TodoGUIId.ITEM_ASSIGNED_TO_TEXTFIELD).value;
        let due_date = document.getElementById(TodoGUIId.ITEM_DUE_DATE_PICKER).value;
        let isCompleted = document.getElementById(TodoGUIId.ITEM_COMPLETED_CHECKBOX).checked;
        
        let listBeingEdited = window.todo.model.loadList(listName);
        let itemBeingEdited = listBeingEdited.getItemAtIndex(indexItem);

        itemBeingEdited.setDescription(description);
        itemBeingEdited.setAssignedTo(assigned_to);
        itemBeingEdited.setDueDate(due_date);
        itemBeingEdited.setCompleted(isCompleted);

        
        window.todo.model.goList();

        
    }

    processMoveItemUp(listName, itemIndex) {
        let index = parseInt(itemIndex);
        let listBeingEdited = window.todo.model.loadList(listName);
        let tempItem = listBeingEdited.items[index-1];
        listBeingEdited.items[index-1] = listBeingEdited.items[index];
        listBeingEdited.items[index] = tempItem;
        todo.view.loadItems(listBeingEdited);

    }

    processMoveItemDown(listName, itemIndex) {
        let index = parseInt(itemIndex);
        let listBeingEdited = window.todo.model.loadList(listName);
        let tempItem = listBeingEdited.items[index];
        listBeingEdited.items[index] = listBeingEdited.items[index + 1];
        listBeingEdited.items[index + 1] = tempItem;
        todo.view.loadItems(listBeingEdited);
    }

    processDeleteItem(listName, itemIndex) {
        let index = parseInt(itemIndex);
        let listBeingEdited = window.todo.model.loadList(listName);
        listBeingEdited.removeItem(listBeingEdited.getItemAtIndex(index));
        todo.view.loadItems(listBeingEdited);
    }


    

    /**
     * This function is called in response to when the user clicks
     * on the Task header in the items table.
     */
    processSortItemsByTask() {
        // IF WE ARE CURRENTLY INCREASING BY TASK SWITCH TO DECREASING
        if (window.todo.model.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_INCREASING)) {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_TASK_DECREASING);
        }
        // ALL OTHER CASES SORT BY INCREASING
        else {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_TASK_INCREASING);
        }
    }

    /**
     * This function is called in response to when the user clicks
     * on the Status header in the items table.
     */
    processSortItemsByStatus() {
        // IF WE ARE CURRENTLY INCREASING BY STATUS SWITCH TO DECREASING
        if (window.todo.model.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_STATUS_INCREASING)) {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_STATUS_DECREASING);
        }
        // ALL OTHER CASES SORT BY INCRASING
        else {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_STATUS_INCREASING);
        }
    }

    /**
     * This function is called in response to when the user clicks
     * on the Due Date header in the items table.
     */
    processSortItemsByDueDate() {
        // IF WE ARE CURRENTLY INCREASING BY DUE DATE SWITCH TO DECREASING
        if (window.todo.model.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING)) {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING);
        }
        // ALL OTHER CASES SORT BY INCREASING
        else {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING);
        }
    }

}