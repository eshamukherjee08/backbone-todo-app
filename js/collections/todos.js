var app = app || {}

var TodoList = Backbone.Collection.extend({

	//refering Todo Model
	model: app.Todo,


	//save all of the todo items under the "todos-backbone" namespace
	
	localStorage: new Backbone.LocalStorage("todos-backbone"),

	// Filter down the list of all todo items that are finished
	completed: function(){
		return this.filter(function(todo){
			return todo.get('completed');
		});
	},


	//Filter down the list to todo items that are not yet finished.
	remaining: function(){
		return this.without.apply(this, this.completed());
	},


	// Keep Todos in sequential order, despite being saved by unordered
	// GUID in the database. This generates the next order num for new item.

	nextOrder: function(){
		if(!this.length){
			return 1;
		}
		return this.last().get('order') + 1;
	},

	//Todos are sorted by original insertion order.
	comparator: function(todo){
		return todo.get('order');
	}
});


app.Todos = new TodoList();