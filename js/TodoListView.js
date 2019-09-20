'use strict'
/**
 * TodoListView.js
 * 
 * This class deals with the view of our Web application providing services
 * for loading data into our controls and building other UI controls.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
class TodoListView {
    /**
     * This constructor initializes the view, keeping the model it will
     * use to pull data from to update the view.
     * 
     * @param {TodoListModel} initModel 
     */
    constructor(initModel) {
        this.model = initModel;
    }

    /**
     * Helper method for making and returning an HTML open tag.
     * 
     * @param {String} tagName HTML type of tag to make.
     */
    buildOpenTag(tagName) {
        return "<" + tagName + ">";
    }

    /**
     * Helper method for making and returing an HTML close tag.
     * 
     * @param {String} tagName HTML type of tag to make.
     */
    buildCloseTag(tagName) {
        return "</" + tagName + ">";
    }

    /**
     * This function builds and returns a DIV for a card in the list. A card
     * is a row in the list that we can interact with and contains information about
     * the list item.
     * 
     * @param {TodoListItem} listItem Item in the list to build card for.
     * @param {Number} listItemIndex Index location in the list of the item.
     */
    buildListItem(listItem, listItemIndex, listToLoad) {
        let newItemDiv = document.createElement(TodoHTML.DIV);
        newItemDiv.setAttribute(TodoHTML.ID, TodoGUIId.ITEM_CARD_ + listItemIndex);
        newItemDiv.setAttribute(TodoHTML.CLASS, TodoGUIClass.LIST_ITEM_CARD);
        
        
        let itemArgs = [listToLoad.getName(), listItemIndex] ;
        //itemArgs.push(listToLoad.getName());
        
        this.setupCallback(newItemDiv, TodoHTML.ONCLICK, TodoCallback.PROCESS_EDIT_ITEM, itemArgs);
      
        
        // WE'LL PUT ITEMS INTO THIS CARD IN A GRID
        let descriptionDiv = document.createElement(TodoHTML.DIV);
        descriptionDiv.setAttribute(TodoHTML.CLASS, TodoGUIClass.LIST_ITEM_CARD_DESCRIPTION);
        descriptionDiv.innerHTML = listItem.getDescription();

        let assignedToDiv = document.createElement(TodoHTML.DIV);
        assignedToDiv.setAttribute(TodoHTML.CLASS, TodoGUIClass.LIST_ITEM_CARD_ASSIGNED_TO);
        assignedToDiv.innerHTML =
            'Assigned To: ' + this.buildOpenTag(TodoHTML.STRONG) + listItem.getAssignedTo() + this.buildCloseTag(TodoHTML.STRONG);

        let dueDateDiv = document.createElement(TodoHTML.DIV);
        dueDateDiv.setAttribute(TodoHTML.CLASS, TodoGUIClass.LIST_ITEM_CARD_DUE_DATE);
        dueDateDiv.innerHTML = listItem.getDueDate();

        let completedDiv = document.createElement(TodoHTML.DIV);
        if (listItem.isCompleted()) {
            completedDiv.innerHTML += "Completed";
            completedDiv.setAttribute(TodoHTML.CLASS, TodoGUIClass.LIST_ITEM_CARD_COMPLETED);
        }
        else {
            completedDiv.innerHTML += "Pending";
            completedDiv.setAttribute(TodoHTML.CLASS, TodoGUIClass.LIST_ITEM_CARD_NOT_COMPLETED);
        }

        /**
         * BUTTONS MAYBE GO HERE?????
         */

        itemArgs = [listToLoad.getName(),listItemIndex];
        let buttonDiv = document.createElement(TodoHTML.DIV);
        buttonDiv.setAttribute(TodoHTML.CLASS, TodoGUIClass.LIST_ITEM_CARD_TOOLBAR);
        
        let buttonUpDiv =  document.createElement(TodoHTML.BUTTON);
        buttonUpDiv.setAttribute(TodoHTML.ID, TodoGUIId.ITEM_CARD_ + listItemIndex + TodoGUIId.UP);
        buttonUpDiv.setAttribute(TodoHTML.CLASS, TodoGUIClass.LIST_ITEM_CARD_UP);
        this.setupCallback(buttonUpDiv, TodoHTML.ONCLICK, TodoCallback.PROCESS_MOVE_ITEM_UP, itemArgs);
        buttonUpDiv.innerHTML = "<img src = './images/icons/MoveUp.png' alt = '' />";
        
        
        let buttonDownDiv =  document.createElement(TodoHTML.BUTTON);
        debugger;
        buttonDownDiv.setAttribute(TodoHTML.CLASS, TodoGUIClass.LIST_ITEM_CARD_DOWN);
        buttonDownDiv.setAttribute(TodoHTML.ID, TodoGUIId.ITEM_CARD_ + listItemIndex + TodoGUIId.DOWN);
        this.setupCallback(buttonDownDiv, TodoHTML.ONCLICK, TodoCallback.PROCESS_MOVE_ITEM_DOWN, itemArgs);
        buttonDownDiv.innerHTML = "<img src = './images/icons/MoveDown.png' alt = '' />";

        let buttonDeleteDiv =  document.createElement(TodoHTML.BUTTON);
        buttonDeleteDiv.setAttribute(TodoHTML.ID, TodoGUIId.ITEM_CARD_ + listItemIndex + TodoGUIId.DELETE);
        buttonDeleteDiv.setAttribute(TodoHTML.CLASS, TodoGUIClass.LIST_ITEM_CARD_DELETE);
        this.setupCallback(buttonDeleteDiv, TodoHTML.ONCLICK, TodoCallback.PROCESS_DELETE_ITEM, itemArgs);
        buttonDeleteDiv.innerHTML = "<img src = './images/icons/RemoveItem.png' alt = '' />";
        

<<<<<<< HEAD
        buttonUpDiv.addEventListener('click', event => event.stopPropagation());
        buttonDownDiv.addEventListener('click', event => event.stopPropagation());
        buttonDeleteDiv.addEventListener('click', event => event.stopPropagation());

        
=======
        this.setupCallback(buttonUpDiv, TodoHTML.ONCLICK, TodoCallback.PROCESS_MOVE_ITEM_UP, [listItemIndex]);
        this.setupCallback(buttonDownDiv, TodoHTML.ONCLICK, TodoCallback.PROCESS_MOVE_ITEM_DOWN, [listItemIndex]);
        this.setupCallback(buttonDeleteDiv, TodoHTML.ONCLICK, TodoCallback.PROCESS_DELETE_ITEM, [listItemIndex]);

>>>>>>> cbe9a72fcbd5c41e83e3e2516843d6befea744f8
        buttonDiv.appendChild(buttonUpDiv);
        buttonDiv.appendChild(buttonDownDiv);
        buttonDiv.appendChild(buttonDeleteDiv);




        // THESE SPANS GO IN THE DETAILS DIV
        newItemDiv.appendChild(descriptionDiv);
        newItemDiv.appendChild(assignedToDiv);
        newItemDiv.appendChild(dueDateDiv);
        newItemDiv.appendChild(completedDiv);
        newItemDiv.appendChild(buttonDiv);
        
        

        return newItemDiv;
    }

    buildListItemFooter(listToLoad){
        let addDiv = document.createElement(TodoHTML.DIV);
        addDiv.setAttribute(TodoHTML.CLASS, TodoGUIClass.LIST_ITEM_ADD_CARD);
       
        addDiv.innerHTML = "+";
        
        
        let itemArgs = [listToLoad.getName()] ;
        //itemArgs.push(listToLoad.getName());
        
        this.setupCallback(addDiv, TodoHTML.ONCLICK, TodoCallback.PROCESS_ADD_ITEM, itemArgs);
        return addDiv;
    }

    /**
     * This function builds and returns a DIV with the header in the
     * table of cards for the todo list.
     */
    buildListItemsHeader() {
        // WE'LL PUT ITEMS INTO THIS CARD IN A GRID
        let listItemHeaderDiv = document.createElement(TodoHTML.DIV);
        listItemHeaderDiv.setAttribute(TodoHTML.CLASS, TodoGUIClass.LIST_ITEM_HEADER_CARD);

        // WE'LL PUT ITEMS INTO THIS CARD IN A GRID
        let taskHeaderDiv = document.createElement(TodoHTML.DIV);
        taskHeaderDiv.setAttribute(TodoHTML.CLASS, TodoGUIClass.LIST_ITEM_TASK_HEADER);
        taskHeaderDiv.innerHTML = "Task";
        let callbackArguments = [];
        this.setupCallback(taskHeaderDiv, TodoHTML.ONCLICK, TodoCallback.PROCESS_SORT_ITEMS_BY_TASK, callbackArguments);
        
        let dueDateHeaderDiv =  document.createElement(TodoHTML.DIV);
        dueDateHeaderDiv.setAttribute(TodoHTML.CLASS, TodoGUIClass.LIST_ITEM_DUE_DATE_HEADER);
        dueDateHeaderDiv.innerHTML = "Due Date";
        this.setupCallback(dueDateHeaderDiv, TodoHTML.ONCLICK, TodoCallback.PROCESS_SORT_ITEMS_BY_DUE_DATE, callbackArguments);

        let statusHeaderDiv = document.createElement(TodoHTML.DIV);
        statusHeaderDiv.setAttribute(TodoHTML.CLASS, TodoGUIClass.LIST_ITEM_STATUS_HEADER);
        statusHeaderDiv.innerHTML = 'Status';
        this.setupCallback(statusHeaderDiv, TodoHTML.ONCLICK, TodoCallback.PROCESS_SORT_ITEMS_BY_STATUS, callbackArguments);

        
        // THESE GO IN THE DETAILS DIV
        listItemHeaderDiv.appendChild(taskHeaderDiv);
        listItemHeaderDiv.appendChild(dueDateHeaderDiv);
        listItemHeaderDiv.appendChild(statusHeaderDiv);
        
        return listItemHeaderDiv;
    }

    /**
     * This method is for building and returning a link on the front page
     * of the app. One will be built for each list.
     * 
     * @param {String} listName Name of the list to appear in the link.
     */
   buildListLink(listName) {
        let newA = document.createElement(TodoHTML.A);
        newA.setAttribute(TodoHTML.CLASS, TodoGUIClass.HOME_LIST_LINK);
        newA.setAttribute('href', '#');
        newA.innerHTML = listName;
        let br = document.createElement(TodoHTML.BR);
        newA.appendChild(br);
        let callbackArguments = [listName];
        this.setupCallback(newA, TodoHTML.ONCLICK, TodoCallback.PROCESS_EDIT_LIST, callbackArguments);
        return newA;
    }

    /**
     * This method is for taking the list item data out of the listToLoad
     * object and putting it into controls in the list screen.
     * 
     * @param {TodoList} listToLoad 
     */
    loadItems(listToLoad) {
        let listItemsDiv = document.getElementById(TodoGUIId.LIST_ITEMS_CONTAINER);
        this.removeAllChildren(listItemsDiv);
        let listItemsHeaderDiv = this.buildListItemsHeader();
        listItemsDiv.appendChild(listItemsHeaderDiv);

        // LOAD THE ITEM CARDS
        for (let i = 0; i < listToLoad.items.length; i++) {
            let item = listToLoad.items[i];   
            let itemCard = this.buildListItem(item, i, listToLoad);
            listItemsDiv.appendChild(itemCard);
        }
        listItemsDiv.appendChild(this.buildListItemFooter(listToLoad));
        
        for(let i = 0; i < listToLoad.items.length; i++){
            if(listToLoad.items.length === 1){
                this.disableButton(i,TodoGUIId.UP);
                this.disableButton(i,TodoGUIId.DOWN);
            }
            else if(i === 0){
                this.disableButton(i,TodoGUIId.UP);
                this.enableButton(i, TodoGUIId.DOWN);
            }
            else if( i === listToLoad.items.length - 1){
                this.disableButton(i, TodoGUIId.DOWN)
                this.enableButton(i, TodoGUIId.UP);
            }
            else{
                this.enableButton(i, TodoGUIId.UP);
                this.enableButton(i, TodoGUIId.DOWN);
            }
        }
    }

    /**
     * This method is for taking the data out of the listToLoad
     * object and putting it into the appropriate controls in the list screen.
     * 
     * @param {TodoList} listToLoad 
     */
    loadListData(listToLoad) {
        let listNameTextField = document.getElementById(TodoGUIId.LIST_NAME_TEXTFIELD);
        listNameTextField.value = listToLoad.getName();

        let listOwnerTextField = document.getElementById(TodoGUIId.LIST_OWNER_TEXTFIELD);
        listOwnerTextField.value = listToLoad.getOwner();

       
        
        this.loadItems(listToLoad);
        
    }

    /**
     * This method goes through all the todo lists managed by this application
     * and one at time extracts the name of each and then creates a link for
     * each on the welcome page such that the user may edit one of them.
     * 
     * @param {Array} todoLists 
     */
    loadListLinks(todoLists) {
        let yourListsList = document.getElementById(TodoGUIId.HOME_YOUR_LISTS_LIST);
        this.removeAllChildren(yourListsList);
        for (let i = 0; i < todoLists.length; i++) {
            let todoList = todoLists[i];
            this.appendListLink(todoList);
        }
    }

    /**
     * This method appends a link to the welcome page for the listToAppend argument provided.
     * 
     * @param {TodoList} listToAppend 
     */
    appendListLink(listToAppend) {
        let yourListsList = document.getElementById(TodoGUIId.HOME_YOUR_LISTS_LIST);
        let listName = listToAppend.getName();
        let newA = this.buildListLink(listName);
        yourListsList.appendChild(newA);
        let newBr = document.createElement(TodoHTML.BR);
        yourListsList.appendChild(newBr);
    }

    /**
     * This method goes through the node argument and removes all its child nodes.
     * 
     * @param {Node} node 
     */
    removeAllChildren(node) {
        if (!node)
            console.log("WHAT?");
        let child = node.firstElementChild;
        while (child) {
            child.remove();
            child = node.firstElementChild;
        }
    }

    /**
     * This method sets up a callback method for an element, registering the
     * elementCallbackName (e.g. click) function for the element control in the DOM, specifying
     * callbackFunctionName as the method to be called when that event occurs. The
     * args array is used to pass needed data to the callback.
     * 
     * @param {Element} element 
     * @param {String} elementCallbackName 
     * @param {String} callbackFunctionName 
     * @param {String[]} args 
     */
    setupCallback(element, elementCallbackName, callbackFunctionName, args) {
        let functionCallText = callbackFunctionName + "(";
        for (let i = 0; i < args.length; i++) {
            functionCallText += "'" + args[i] + "'";
            if (i < (args.length - 1)) {
                functionCallText += ", ";
            }
        }
        functionCallText += ")";
        element.setAttribute(elementCallbackName, functionCallText);
        return functionCallText;
    }

    /**
     * This method is for toggling the element argument to show it or hide it.
     * 
     * @param {Element} element 
     * @param {Boolean} show 
     */
    showElement(element, show) {
        if (!element)
            console.log("WHAT?");
        element.hidden = !show;
        if (show)
            console.log(element);

        // NOW HIDE FROM ALL THE CHILDREN
        if (element.hasChildNodes()) {
            for (let i = 0; i < element.childNodes.length; i++) {
                var child = element.childNodes[i];
                this.showElement(child, show);
            }
        }
    }

    /**
     * This method is for toggling the element in the DOM with the elementId id to
     * show it or hide it.
     * 
     * @param {String} elementId 
     * @param {Boolean} show 
     */
    showElementWithId(elementId, show) {
        let element = document.getElementById(elementId);
        this.showElement(element, show);
    }

    /**
     * This method is for hiding the yes/no dialog.
     */
    hideDialog() {
        let dialog = document.getElementById(TodoGUIId.MODAL_YES_NO_DIALOG);
        dialog.classList.remove(TodoGUIClass.IS_VISIBLE);
    }

    /**
     * This method is for showing the yes/no dialog.
     */
    showDialog() {
        let dialog = document.getElementById(TodoGUIId.MODAL_YES_NO_DIALOG);
        dialog.classList.add(TodoGUIClass.IS_VISIBLE);
    }

    /**
     * This function can be used to disable on of the three buttons for each
     * list item, which are for moving an item up or down or for removing it.
     * 
     * @param {Number} itemIndex 
     * @param {TodoGUIId} buttonType 
     */
    disableButton(itemIndex, buttonType) {
        let buttonId = TodoGUIId.ITEM_CARD_ + itemIndex + buttonType;
        let button = document.getElementById(buttonId);
        button.disabled = true;
        button.classList.add(TodoGUIClass.DISABLED);       
    }

    /**
     * This function can be used to enable one of the three buttons for each
     * list item, which are for moving an item up or down or for removing it.
     * 
     * @param {Number} itemIndex 
     * @param {TodoGUIId} buttonType 
     */
    enableButton(itemIndex, buttonType) {
        let buttonId = TodoGUIId.ITEM_CARD_ + itemIndex + buttonType;
        let button = document.getElementById(buttonId);
        button.classList.remove(TodoGUIClass.DISABLED);        
    }
}
