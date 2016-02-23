import { extend } from 'marbles/utils';
import State from 'marbles/state';
import Store from 'dashboard/store';
import Config from 'dashboard/config';
import Dispatcher from 'dashboard/dispatcher';

var Providers = Store.createClass({
	displayName: "Stores.Providers",

	getState: function () {
		return this.state;
	},

	didBecomeActive: function () {
		this.__fetchProviders();
	},

	getInitialState: function () {
		return {
			fetched: false,
			providers: [],
			newResourceStates: {},
			deletingResourceStates: {},
			newRouteStates: {},
			providerApps: {}
		};
	},

	handleEvent: function (event) {
		switch (event.name) {
		case 'PROVISION_RESOURCE':
			this.setState({
				newResourceStates: extend({}, this.state.newResourceStates, (function () {
					var s = {};
					s[event.providerID] = {
						isCreating: true,
						errMsg: null
					};
					return s;
				})())
			});
			break;

		case 'PROVISION_RESOURCE_FAILED':
			this.setState({
				newResourceStates: extend({}, this.state.newResourceStates, (function () {
					var s = {};
					s[event.providerID] = {
						isCreating: false,
						errMsg: event.error
					};
					return s;
				})())
			});
			break;

		case 'RESOURCE':
			this.__handleResourceEvent(event);
			break;

		case 'DELETE_RESOURCE':
			this.__handleDeleteResourceEvent(event);
			break;

		case 'DELETE_RESOURCE_FAILED':
			this.__handleDeleteResourceFailedEvent(event);
			break;

		case 'RESOURCE_DELETED':
			this.__handleResourceDeletedEvent(event);
			break;
		}
	},

	__handleResourceEvent: function (event) {
		if (event.app) {
			return;
		}
		var provider = null;
		var providers = this.state.providers;
		for (var i = 0, len = providers.length; i < len; i++) {
			if (providers[i].id === event.data.provider) {
				provider = providers[i];
				break;
			}
		}
		if (provider === null) {
			return;
		}
		this.setState({
			newResourceStates: extend({}, this.state.newResourceStates, (function () {
				var s = {};
				s[provider.id] = {
					isCreating: false,
					errMsg: null
				};
				return s;
			})())
		});
	},

	__handleDeleteResourceEvent: function (event) {
		this.setState({
			deletingResourceStates: extend({}, this.state.deletingResourceStates, (function () {
				var s = {};
				s[event.resourceID] = {
					isDeleting: true,
					errMsg: null
				};
				return s;
			})())
		});
	},

	__handleDeleteResourceFailedEvent: function (event) {
		this.setState({
			deletingResourceStates: extend({}, this.state.deletingResourceStates, (function () {
				var s = {};
				s[event.resourceID] = {
					isDeleting: false,
					errMsg: event.error
				};
				return s;
			})())
		});
	},

	__handleResourceDeletedEvent: function (event) {
		this.setState({
			deletingResourceStates: extend({}, this.state.deletingResourceStates, (function () {
				var s = {};
				s[event.resourceID] = {
					isDeleting: false,
					errMsg: null
				};
				return s;
			})())
		});
	},

	__fetchProviders: function () {
		Config.client.listProviders().then(function (args) {
			var res = args[0];
			var providerApps = {};
			Promise.all(res.map(function (provider) {
				return Config.client.getApp(provider.name).then(function (args) {
					providerApps[provider.id] = args[0];
				});
			}, this)).then(function () {
				this.setState({
					fetched: true,
					providers: res,
					providerApps: providerApps
				});
			}.bind(this));
		}.bind(this));
	}
}, State);

Providers.registerWithDispatcher(Dispatcher);

export default Providers;
