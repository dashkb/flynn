import Config from 'dashboard/config';
import AppsStore from 'dashboard/stores/apps';
import AppRoutesStore from 'dashboard/stores/app-routes';
import RouteLink from 'dashboard/views/route-link';
import EditEnv from 'dashboard/views/edit-env';

var appsStoreID = null;
var appRoutesStoreID = function (props) {
	return {
		appId: props.providerApp.id
	};
};

var providerAttrs = Config.PROVIDER_ATTRS;

var Resource = React.createClass({
	displayName: "Views.Resource",

	render: function () {
		var appsByID = this.state.appsByID;
		var showAdvanced = this.state.showAdvanced;
		var hasExternalRoute = this.state.hasExternalRoute;

		if ( !appsByID ) {
			return <div />;
		}

		var provider = this.props.provider;
		var resource = this.props.resource;
		var pAttrs = providerAttrs[provider.name];
		var appNames = (resource.apps || []).map(function (appID) {
			return appsByID[appID].name;
		});
		return (
			<section className='resource'>
				<header>
					<h1>
						{pAttrs.title} ({appNames.length ? appNames.join(', ') : 'Standalone'})
						<RouteLink path={'/providers/'+ resource.provider +'/resources/'+ resource.id +'/delete'}>
							<i className="icn-trash" />
						</RouteLink>
					</h1>
				</header>

				<section style={{
					visibility: hasExternalRoute === null ? 'hidden' : 'visible'
				}}>
					{hasExternalRoute ? (
						<p>
							<code>{this.state.externalRouteURI}</code>
						</p>
					) : (
						<button className="btn-green" onClick={this.__handleCreateRouteBtnClick} style={{marginBottom: '1rem'}}>Create external route for provider</button>
					)}
				</section>

				<section>
					<button className="btn" onClick={this.__toggleShowAdvanced} style={{marginBottom: '1rem'}}>{showAdvanced ? 'Hide' : 'Show'} advanced settings</button>
					<EditEnv
						env={resource.env}
						disabled={true}
						style={{
							textAlign: 'left',
							display: showAdvanced ? 'block' : 'none'
						}} />
				</section>

				{(resource.apps || []).length ? (
					<section className='resource-apps'>
						<h2>Apps</h2>
						<ul>
							{resource.apps.map(function (appID) {
								return (
									<li key={appID}>
										<RouteLink path={'/apps/'+ appID}>{appsByID[appID].name}</RouteLink>
									</li>
								);
							}, this)}
						</ul>
					</section>
				) : null}
			</section>
		);
	},

	getInitialState: function () {
		return this.__getState(this.props, {});
	},

	componentDidMount: function () {
		AppRoutesStore.addChangeListener(appRoutesStoreID(this.props), this.__handleStoreChange);
		AppsStore.addChangeListener(appsStoreID, this.__handleStoreChange);
	},

	componentWillUnmount: function () {
		AppRoutesStore.removeChangeListener(appRoutesStoreID(this.props), this.__handleStoreChange);
		AppsStore.removeChangeListener(appsStoreID, this.__handleStoreChange);
	},

	__handleCreateRouteBtnClick: function (e) {
		e.preventDefault();
		Config.history.navigate('/providers/'+ this.props.provider.id +'/resources/'+ this.props.resource.id +'/create-external-route', { replace: true });
	},

	__toggleShowAdvanced: function (e) {
		e.preventDefault();
		this.setState(this.__getState(this.props, this.state, !this.state.showAdvanced));
	},

	__getState: function (props, prevState, showAdvanced) {
		var state = {
			showAdvanced: showAdvanced === undefined ? prevState.showAdvanced || false : showAdvanced
		};

		var appsState = AppsStore.getState(appsStoreID);
		var appsByID = {};
		appsState.apps.forEach(function (app) {
			appsByID[app.id] = app;
		});
		state.appsByID = appsState.fetched ? appsByID : null;

		var appRoutesState = AppRoutesStore.getState(appRoutesStoreID(props));
		var routes = appRoutesState.fetched ? appRoutesState.routes : null;
		var hasExternalRoute = (routes || []).find(function (route) {
			return route.leader === true && route.type === 'tcp';
		});
		state.hasExternalRoute = hasExternalRoute === undefined && !appRoutesState.fetched ? null : !!hasExternalRoute;

		var pAttrs = providerAttrs[props.provider.name];
		state.externalRouteURI = (function (discoverdRouteURI) {
			return discoverdRouteURI.replace('discoverd', Config.default_route_domain);
		})(props.resource.env[pAttrs.discoverdRouteURIEnvKey]);

		return state;
	},

	__handleStoreChange: function () {
		this.setState(this.__getState(this.props, this.state));
	}
});

export default Resource;
