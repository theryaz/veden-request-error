// Type definitions for vEden Request Error
import express from 'express';

export = veden_request_error;

declare namespace veden_request_error{
	class RequestError extends Error {
		constructor(message: string, status_code: number, json?: Object)
		public status_code: number;
		public json: Object;
	}

	function handleError(err: Error,req: express.Response, res: express.Request, next: express.NextFunction): void;
}
