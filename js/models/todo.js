var app = app || {}

//Basic attributes : 'title', 'order' and 'completed'

app.Todo = Backbone.Model.extend({
	//setting default attributes
	defaults: {
		title: '',
		completed: false
	},

	// Toggle the 'completed' state of this todo item.
	toggle: function(){
		this.save({
			completed: !this.get('completed')
		});
	}

});