class RequestError extends Error{
	constructor(message, status_code, json){
		super(message);
		this.name = this.constructor.name;
		this.json = json;
		Error.captureStackTrace(this,this.constructor);
		this.status_code = status_code || 500;
	}
};

RequestError.handleError = (err,req,res,next) => {
	if(err){
		winston.log('error',err);
		let timestamp = new Date().toISOString();
		winston.log('error','Error Caught',err.status_code);
		let message;
		if(process.env.NODE_ENV !== "production"){
			message = err.message;
		}else{
			switch (err.status_code) {
				case 400:
						message = "Bad Request";
					break;
				case 401:
						message = "Unauthorized";
					break;
				case 403:
						message = "Forbidden";
					break;
				case 404:
						message = "Not Found";
					break;
				case 405:
						message = "Method Not Allowed";
					break;
				case 418:
						message = "I'm a teapot";
					break;
				case 500:
						message = "Internal Server Error";
					break;
				default:
					message = err.message;
			}
		}
		res.status(err.status_code || 500).json({result:{message:message, json: err.json}});
	}else{
		next();
	}
};

module.exports = RequestError;