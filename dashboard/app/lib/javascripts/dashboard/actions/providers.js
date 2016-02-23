import Dispatcher from 'dashboard/dispatcher';
import Config from 'dashboard/config';

var provisionResource = function (providerID) {
	var client = Config.client;
	client.provisionResource(providerID);
};

var deleteResource = function (providerID, resourceID) {
	var client = Config.client;
	client.deleteResource(providerID, resourceID);
};

var createExternalProviderRoute = function (providerAppID, serviceName) {
	var client = Config.client;
	client.createAppRoute(providerAppID, {
		type: 'tcp',
		leader: true,
		service: serviceName
	});
};

Dispatcher.register(function (event) {
	switch (event.name) {
	case 'PROVISION_RESOURCE_WITH_ROUTE':
		if (event.resourceID) {
			Config.history.navigate('/providers/'+ event.providerID +'/resources/'+ event.resourceID +'/create-external-route?provision=true', { replace: true });
		} else {
			Config.history.navigate('/providers/'+ event.providerID +'/create-external-route?provision=true', { replace: true });
		}
		break;
	case 'PROVISION_RESOURCE':
		provisionResource(event.providerID);
		break;
	case 'DELETE_RESOURCE':
		deleteResource(event.providerID, event.resourceID);
		break;
	case 'CREATE_EXTERNAL_PROVIDER_ROUTE':
		createExternalProviderRoute(event.providerAppID, event.serviceName);
		break;
	}
});
