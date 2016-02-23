import Modal from 'Modal';
import ProvidersStore from 'dashboard/stores/providers';
import Dispatcher from 'dashboard/dispatcher';

var providersStoreID = 'default';

var ResourceDelete = React.createClass({
	displayName: "Views.ResourceDelete",

	render: function () {
		return (
			<Modal onShow={function(){}} onHide={this.props.onHide} visible={true}>
				<section className="resource-delete">
					<header>
						<h1>Delete resource ({this.props.resourceID})?</h1>
					</header>

					{this.state.errMsg ? (
						<p className="alert-error">{this.state.errMsg}</p>
					) : null}

					<button className="delete-btn" disabled={ this.state.isDeleting } onClick={this.__handleDeleteBtnClick}>{this.state.isDeleting ? "Please wait..." : "Delete"}</button>
				</section>
			</Modal>
		);
	},

	getInitialState: function () {
		return this.__getState(this.props);
	},

	componentDidMount: function () {
		ProvidersStore.addChangeListener(providersStoreID, this.__handleStoreChange);
	},

	componentWillUnmount: function () {
		ProvidersStore.removeChangeListener(providersStoreID, this.__handleStoreChange);
	},

	__getState: function (props) {
		var providersState = ProvidersStore.getState(providersStoreID);
		var state = providersState.deletingResourceStates[props.resourceID] || {
			isDeleting: false,
			errMsg: null
		};
		return state;
	},

	__handleStoreChange: function (props) {
		this.setState(this.__getState(props || this.props));
	},

	__handleDeleteBtnClick: function (e) {
		e.preventDefault();
		this.setState({
			isDeleting: true,
			errMsg: null
		});
		Dispatcher.dispatch({
			name: 'DELETE_RESOURCE',
			providerID: this.props.providerID,
			resourceID: this.props.resourceID
		});
	}
});

export default ResourceDelete;
