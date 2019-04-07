import { OpenMRSConnection } from "../Connection/OpenMRSConnection"
import { OpenMRSSchema } from "./OpenMRSModel";
import * as moment_ from 'moment';
const moment = moment_;

export class OpenMRSQuery{
	public joins: any = {};
	public requires: {field:string,cond:string,val:any}[] = [];
	public uuid?: string;
	public resourceName?: string;

	constructor(private schema: OpenMRSSchema, resourceName?: string, uuid?: string){
		// resource name necessary for call to execute
		if(resourceName) this.resourceName = resourceName;
		if(uuid) this.uuid = uuid;
	}

	attach(join: string) {
		if(! (join in this.schema.joins) ) throw new Error(`No such join: ${join}`);
		if(join in this.joins) throw new Error(`Join already attached: ${join}`);
		let child_schema = this.schema.joins[join].schema;
		this.joins[join] = new OpenMRSQuery(child_schema); // create a query for child
	}

	getJoinQuery(join: string): OpenMRSQuery {
		if(! (join in this.schema.joins) ) throw new Error(`No such join: ${join}`);
		if(! (join in this.joins) ) throw new Error(`Join not attached: ${join}`);
		return this.joins[join];
	}

	requireEq(field: string, val: any) {
		this.requireCmp(field, "=", val);
	}

	requireCmp(field: string, cmp: string, val: any) {
		if(!(field in this.model.fields)) throw new Error(`Model has no field: ${field}`);
		// different behavior if string or number or date?
		if(this.model.fields[field] == "date" && val instanceof Date){
			let m = moment(val);
			val = m.format('YYYY-MM-DD');
		}
		if(this.model.fields[field] == "datetime" && val instanceof Date){
			let m = moment(val);
			val = m.format('YYYY-MM-DD HH:mm:ss');
		}
		this.requires.push(
			{ field: field, cond:cmp, val: val}
		);
	}

	requireNull(field: string) {
		if(!(field in this.model.fields)) throw new Error(`Model has no field: ${field}`);
		this.requires.push(
			{field:field, cond:"is null", val:null}
		);
	}

	requireNotNull(field: string) {
		if(!(field in this.model.fields)) throw new Error(`Model has no field: ${field}`);
		this.requires.push(
			{field:field, cond:"is not null", val:null}
		);
	}

	private buildQueryObj(): any {

	}

	/**
	 * Run this query and generate a collection of corresponding models
	 */
	execute(connection: OpenMRSConnection): any[] {
		// iterate this model and its attachments to build query object
		if(this.uuid){
			if(this.requires.length > 0) throw new Error("Query requires not applicable with uuid");
			connection.getByUuid(resourceName, this.uuid);
		}else{
			connection.get(resourceName, query);
		}
		// use connection to get data
		// then call buildModelObj to create model
		return [];
	}
}