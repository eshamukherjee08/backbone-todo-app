// This will be in charge of individual Todo records,
// making sure the view updates when the todo does. To enable this functionality, 
//we will add event listeners to the view that listen for events on an individual todo’s HTML
// representation.

// Points to remember:
// 1. The model passed in the arguments hash by AppView is available 
// to us as this.model


var app = app || {}

app.TodoView = Backbone.View.extend({

	tagName: 'li',

	template: _.template($('#item-template').html()),

	events: {
		'click .toggle': 'toggleCompleted',
		'dblclick label': 'edit',
		'click .destroy': 'clear',
		'keypress .edit': 'updateOnEnter',
		'blur .edit': 'close'
	},

	initialize: function(){
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
		this.listenTo(this.model, 'visible', this.toggleVisible);
	},

	// Re-renders the titles of the todo item.
	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		this.$el.toggleClass('completed', this.model.get('completed'));
		this.toggleVisible();
		this.$input = this.$('.edit');
		return this;
	},

	// Toggle visibility of item
	toggleVisible : function(){
		this.$el.toggleClass('hidden', this.isHidden());
	},

	// Determines if item should be hidden
	isHidden : function(){
		var isCompleted = this.model.get('completed');
		return(
			(!isCompleted && app.TodoFilter === 'completed')
			|| (isCompleted && app.TodoFilter === 'active')
		);
	},

	// Toggle the "completed" state of the model
	toggleCompleted: function(){
		console.log('click'+this)
		this.model.toggle();
	},

	// Switch the view into editing mode, displaying the input field
	edit: function(){
		this.$el.addClass('editing');
		this.$input.focus();
	},

	// Close the "editing" mode, saving changes to todo.
	close: function(){
		var trimmedValue = this.$input.val().trim();
		this.$input.val(trimmedValue);

		if (trimmedValue) {
			this.model.save({ title: trimmedValue });
		} else {
			this.clear();
		}

		this.$el.removeClass('editing');
	},

	// If user hit 'enter', we're through editing the item.
	updateOnEnter: function(e){
		if(e.which === ENTER_KEY){
			this.close();
		}
	},

	// Remove the item, destroy the model from "localStorage" and delete its view
	clear: function() {
		this.model.destroy();
	}
});