import Router from 'marbles/router';
import State from 'marbles/state';
import ProvidersComponent from 'dashboard/views/providers';
import CreateExternalProviderRouteComponent from 'dashboard/views/provider-route-create';
import ResourceDeleteComponent from 'dashboard/views/resource-delete';
import Dispatcher from 'dashboard/dispatcher';

var ProvidersRouter = Router.createClass({
	displayName: "routers.providers",

	routes: [
		{ path: "providers", handler: "providers" },
		{ path: "providers/:providerID/create-external-route", handler: "createExternalProviderRoute", secondary: true },
		{ path: "providers/:providerID/resources/:resourceID/create-external-route", handler: "createExternalProviderRoute", secondary: true },
		{ path: "providers/:providerID/resources/:resourceID", handler: "resource" },
		{ path: "providers/:providerID/resources/:resourceID/delete", handler: "resourceDelete", secondary: true }
	],

	mixins: [State],

	willInitialize: function () {
		this.dispatcherIndex = Dispatcher.register(this.handleEvent.bind(this));
		this.state = {};
		this.__changeListeners = []; // always empty
	},

	providers: function () {
		var props = {
			providerID: null,
			resourceID: null
		};
		var view = this.context.primaryView;
		if (view && view.isMounted() && view.constructor.displayName === "Views.Providers") {
			view.setProps(props);
		} else {
			this.context.primaryView = React.render(React.createElement(
				ProvidersComponent, props), this.context.el);
		}
	},

	createExternalProviderRoute: function (params) {
		params = params[0];

		this.context.secondaryView = React.render(React.createElement(
			CreateExternalProviderRouteComponent,
			{
				key: params.providerID,
				providerID: params.providerID,
				provisionResource: params.provision === 'true',
				onHide: function () {
					if (params.resourceID) {
						this.history.navigate('/providers/'+ params.providerID +'/resources/'+ params.resourceID, { replace: true });
					} else {
						this.history.navigate('/providers', { replace: true });
					}
				}.bind(this)
			}),
			this.context.secondaryEl
		);

		if (params.resourceID) {
			// render resource view in background
			this.resource.apply(this, arguments);
		} else {
			// render providers view in background
			this.providers.apply(this, arguments);
		}
	},

	resource: function (params) {
		params = params[0];
		var props = {
			providerID: params.providerID || null,
			resourceID: params.resourceID || null
		};
		var view = this.context.primaryView;
		if (view && view.isMounted() && view.constructor.displayName === "Views.Providers") {
			view.setProps(props);
		} else {
			this.context.primaryView = React.render(React.createElement(
				ProvidersComponent, props), this.context.el);
		}
	},

	resourceDelete: function (params) {
		params = params[0];

		this.context.secondaryView = React.render(React.createElement(
			ResourceDeleteComponent,
			{
				key: params.resourceID,
				providerID: params.providerID || null,
				resourceID: params.resourceID || null,
				onHide: function () {
					this.history.navigate('/providers/'+ params.providerID +'/resources/'+ params.resourceID);
				}.bind(this)
			}),
			this.context.secondaryEl
		);

		// render resource view in background
		this.resource.apply(this, arguments);
	},

	handleEvent: function (event) {
		switch (event.name) {
		case 'handler:before':
			// reset state between routes
			if (event.path.match(/^providers/)) {
				this.state = {
					providerID: event.params[0].providerID,
					resourceID: event.params[0].resourceID,
					loaded: true
				};
			} else {
				this.state = {
					loaded: false
				};
			}
			React.unmountComponentAtNode(this.context.secondaryEl);
			break;
		case 'PROVISION_RESOURCE':
			this.setState({
				newResourceProviderID: event.providerID
			});
			break;
		case 'RESOURCE':
			if (this.state.newResourceProviderID === event.data.provider) {
				this.history.navigate('/providers/'+ event.data.provider +'/resources/'+ event.object_id);
			}
			break;
		case 'RESOURCE_DELETED':
			if (this.state.loaded && this.state.resourceID === event.object_id) {
				this.history.navigate('/providers');
			}
			break;
		}
	}

});

export default ProvidersRouter;
