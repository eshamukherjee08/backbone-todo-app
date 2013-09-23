// Application view : handle creation of new todos and rendering of the initial todo list


var app = app || {};

// overall **AppView** is top-level of UI

app.AppView = Backbone.View.extend({

	//Binding to an existing element
	el: '#todoapp',

	//Our 
	statsTemplate: _.template($('#stats-template').html()),

	// At initialization we bind to the relevant events on the 'todos'
	// collection, when items are added or changed.

	initialize: function(){
		this.allcheckbox = this.$('#toggle-all');
		this.$input = this.$('#new-todo');
		this.$footer = this.$('#footer');
		this.$main = this.$('#main');

		this.listenTo(app.Todos, 'add', this.addOne);
		this.listenTo(app.Todos, 'reset', this.addAll);
	},


	//Add a single todo item to the list by creating a view for it, and
	//appending its element to the <ul>

	addOne: function(todo){
		var view = new app.TodoView({model:todo});
		$('#todo-list').append(view.render().el);
	},

	//Add all items in the **Todos** collection at once.
	addAll: function(){
		this.$('#todo-list').html('');
		app.Todos.each(this.addOne, this);
	}

});