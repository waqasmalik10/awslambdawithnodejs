var lambda = require('./awslambda');

function awsgetboosts(isLoggedIn, fn)
{
	if(isLoggedIn) {
		lambda.invoke({
			// here, change your lambda function name for getting data accordinly. Mine is "getPosts" 
			FunctionName: 'getPosts'}, function(err, data) {
			if (err) {
				console.log(err, err.stack);
				fn(true,null);
			} else {
				var output = JSON.parse(data.Payload);
				var params = {
					"userPosts": output
				};
				fn(false, params);
				console.log(params);
			}
		});

	} 
	else {
		fn(false, false); 
	}
}

module.exports = awsgetboosts;