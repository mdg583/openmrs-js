export abstract class OpenMRSConnection {
	/*
	abstract execute(query: OpenMRSModel): any;
	abstract save(obj: any): any;
	*/
	abstract get(resource: string, query: any): any;
	abstract getByUuid(resource: string, uuid: string): any;

	private validateQuery(query: any): boolean{
		return true;
	}
}