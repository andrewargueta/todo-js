'use strict'
/**
 * TodoListItem.js
 * 
 * This class represents an item for our list.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
class TodoListItem {
    /**
     * The constructor creates a default, empty item.
     */
    constructor() {
        this.description = "Unknown";
        this.assignedTo = "Unknown";
        this.due_date = "Unknown";
        this.completed = false;
    }

    // GETTER/SETTER METHODS

    getDescription() {
        return this.description;
    }

    setDescription(initDescription) {
        this.description = initDescription;
    }

    getAssignedTo() {
        return this.assignedTo;
    }

    setAssignedTo(initAssignedTo) {
        this.assignedTo = initAssignedTo;
    }

    getDueDate(){
        return this.due_date;
    }

    setDueDate(initDueDate){
        this.due_date = initDueDate;
    }

    isCompleted() {
        return this.completed;
    }

    setCompleted(initCompleted) {
        this.completed = initCompleted;
    }
}