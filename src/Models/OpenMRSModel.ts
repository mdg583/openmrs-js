import { OpenMRSQuery } from "./OpenMRSQuery"

export type OpenMRSSchema = {fields: any, joins: any};

export abstract class OpenMRSModel<TObj, TQuery extends OpenMRSQuery> {
	public abstract schema: OpenMRSSchema;
	public abstract resourceName: string;

	constructor(){
		// check something?
	}

	// todo: implement
	private buildModelObj(objData: any): TObj {
		let p:any = {};
		for (var field in objData) {
			if( field in this.schema.fields) p[field] = objData[field]; // use mapper
			if( field in this.schema.joins ) {
				// get type of join, verify json matches, assign value
			}
		}
		return p as TObj;
	}

	public save(obj: TObj): TObj {
		// todo
		return null;
	}

	public query(uuid?: string){
		return new OpenMRSQuery(this.schema, this.resourceName, uuid) as TQuery;
	}
}