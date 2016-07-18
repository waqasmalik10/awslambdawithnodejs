var lambda = require('./awslambda');

function awslogin(username, password, fn)
{
	console.log("Starting..")
	var input = {
		email: username,
		password: password
	};
	result = {};

	lambda.invoke({
		// here, change your lambda function name for LOGIN accordinly. Mine is "login" 
		FunctionName: 'login',
		Payload: JSON.stringify(input)
	}, 
	function(err, data) {
		if (err) {
			console.log(err, err.stack);
			fn(err, null);
		} 
		else {
			var output = JSON.parse(data.Payload);
			console.log(output);
			if (!output || output.errorMessage) {
				console.log('<b>Not</b> logged in');
				fn(null, false);
			} else {
		    	console.log("Logged In");
				fn(null, true);
			}
		}
	});
}

module.exports = awslogin;