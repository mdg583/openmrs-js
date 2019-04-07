export abstract class OpenMRSConnection {
	/*
	abstract execute(query: OpenMRSModel): any;
	abstract save(obj: any): any;
	*/
	// get json object
	abstract get(resource: string, query: any): any;
	abstract getByUuid(resource: string, uuid: string, query: any): any;

	private validateQuery(query: any): boolean{
		return true;
	}
}