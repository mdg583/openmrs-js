import { OpenMRSConnection } from "./OpenMRSConnection";

export class OpenMRSApiConnection extends OpenMRSConnection {
	constructor(){
		super();
	}

	public get(resource: string, query: string): any{
		throw new Error("Query-based get not supported for Rest API connection");
	}

	public getByUuid(resource: string, uuid: string): any{
		// not implemented
		return null;
	}
}