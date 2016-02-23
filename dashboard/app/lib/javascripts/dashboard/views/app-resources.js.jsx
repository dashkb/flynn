import { assertEqual } from 'marbles/utils';
import Config from 'dashboard/config';
import AppResourcesStore from '../stores/app-resources';
import ProvidersStore from 'dashboard/stores/providers';
import RouteLink from 'dashboard/views/route-link';

var providersStoreID = 'default';
var providerAttrs = Config.PROVIDER_ATTRS;

function getAppResourcesStoreId (props) {
	return {
		appId: props.appId
	};
}

function getState (props) {
	var state = {
		appResourcesStoreId: getAppResourcesStoreId(props)
	};

	var appResourcesState = AppResourcesStore.getState(state.appResourcesStoreId);
	state.resources = appResourcesState.resources;
	state.resourcesFetched = appResourcesState.fetched;

	var providersState = ProvidersStore.getState(providersStoreID);
	var providersByID = {};
	providersState.providers.forEach(function (provider) {
		providersByID[provider.id] = provider;
	});
	state.providersByID = providersState.fetched ? providersByID : null;

	return state;
}

var AppResources = React.createClass({
	displayName: "Views.AppResources",

	render: function () {
		var providersByID = this.state.providersByID;

		return (
			<section className="app-resources">
				<header>
					<h2>Databases</h2>
				</header>

				{(this.state.resources.length === 0 && this.state.resourcesFetched) ? (
					<span>(none)</span>
				) : (
					<ul>
						{this.state.resources.map(function (resource) {
							var provider = providersByID[resource.provider];
							var pAttrs = providerAttrs[provider.name];
							return (
								<li key={resource.id}>
									<RouteLink path={'/providers/'+ resource.provider +'/resources/'+ resource.id} style={{
										display: 'table'
									}}>
										<img
											src={pAttrs.img}
											style={{
												height: '1rem',
												display: 'table-cell',
												verticalAlign: 'middle'
											}} />
										<span style={{
											display: 'table-cell',
											verticalAlign: 'middle',
											paddingLeft: '0.5rem'
										}}>{pAttrs.title}</span>
									</RouteLink>
								</li>
							);
						}, this)}
					</ul>
				)}
			</section>
		);
	},

	getInitialState: function () {
		return getState(this.props);
	},

	componentDidMount: function () {
		AppResourcesStore.addChangeListener(this.state.appResourcesStoreId, this.__handleStoreChange);
		ProvidersStore.addChangeListener(providersStoreID, this.__handleStoreChange);
	},

	componentWillReceiveProps: function (nextProps) {
		var prevAppResourcesStoreId = this.state.appResourcesStoreId;
		var nextAppResourcesStoreId = getAppResourcesStoreId(nextProps);
		if ( !assertEqual(prevAppResourcesStoreId, nextAppResourcesStoreId) ) {
			AppResourcesStore.removeChangeListener(prevAppResourcesStoreId, this.__handleStoreChange);
			AppResourcesStore.addChangeListener(nextAppResourcesStoreId, this.__handleStoreChange);
			this.__handleStoreChange(nextProps);
		}
	},

	componentWillUnmount: function () {
		AppResourcesStore.removeChangeListener(this.state.appResourcesStoreId, this.__handleStoreChange);
		ProvidersStore.removeChangeListener(providersStoreID, this.__handleStoreChange);
	},

	__handleStoreChange: function (props) {
		this.setState(getState(props || this.props));
	}
});

export default AppResources;
