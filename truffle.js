App = {
web3Provider: null,
contracts: {},
init: async function() {
	return await App.initWeb3();
},

initWeb3: async function() {
	if (window.ethereum) {
	App.web3Provider = window.ethereum;
	try {
		await window.ethereum.enable();
	} catch (error) {
		console.error("User denied account access")
	}
	}
	else if (window.web3) {
	App.web3Provider = window.web3.currentProvider;
	}
	else {
	App.web3Provider = new Web3.providers
		.HttpProvider('http://localhost:7545');
	}
	web3 = new Web3(App.web3Provider);
	return App.initContract();
},

initContract: function() {
	$.getJSON("TestContract.json", function(data) {
	var TestContractArtifact = data;
	App.contracts.TestContract = 
		TruffleContract(TestContractArtifact);
		
	App.contracts.TestContract
		.setProvider(App.web3Provider);
	});
	return App.callFunctionFromContract();
},

callFunctionFromContract: function() {
	App.contracts.TestContract.deployed()
	.then(function(instance) {
	console.log(instance.getId());
	}
}
};
