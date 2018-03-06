module.exports = class RequestError extends Error{
	constructor(message, status_code){
		super(message);
		this.name = this.constructor.name;
		Error.captureStackTrace(this,this.constructor);
		this.status_code = status_code || 500;
	}
};
