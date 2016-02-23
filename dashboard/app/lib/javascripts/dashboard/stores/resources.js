import State from 'marbles/state';
import Store from 'dashboard/store';
import Config from 'dashboard/config';
import Dispatcher from 'dashboard/dispatcher';

var Resources = Store.createClass({
	displayName: "Stores.Resources",

	getState: function () {
		return this.state;
	},

	didBecomeActive: function () {
		this.__fetchResources();
	},

	getInitialState: function () {
		return {
			resources: [],
			resourcesFetched: false
		};
	},

	handleEvent: function (event) {
		switch (event.name) {
		case 'RESOURCE':
			this.__addResource(event.data);
			break;
		case 'RESOURCE_DELETED':
			this.__removeResource(event.object_id);
			break;
		}
	},

	__fetchResources: function () {
		Config.client.listResources().then(function (args) {
			var res = args[0];
			this.setState({
				resources: res,
				resourcesFetched: true
			});
		}.bind(this));
	},

	__addResource: function (resource) {
		var resources = this.state.resources;
		var newResources = [resource];
		for (var i = 0, len = resources.length; i < len; i++) {
			if (resources[i].id !== resource.id) {
				newResources.push(resources[i]);
			}
		}
		this.setState({
			resources: newResources
		});
	},

	__removeResource: function (resourceID) {
		var resources = this.state.resources;
		var newResources = [];
		var found = false;
		for (var i = 0, len = resources.length; i < len; i++) {
			if (resources[i].id === resourceID) {
				found = true;
			} else {
				newResources.push(resources[i]);
			}
		}
		if (!found) {
			return;
		}
		this.setState({
			resources: newResources
		});
	}
}, State);

Resources.registerWithDispatcher(Dispatcher);

export default Resources;
