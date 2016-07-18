var awsconfig = require('./awsconfig');
var aws = require('aws-sdk');

aws.config.update({accessKeyId: awsconfig.accessKeyId, secretAccessKey: awsconfig.secretAccessKey});
var lambda = new aws.Lambda({
	region: 'us-east-1' 
});	

module.exports = lambda;
