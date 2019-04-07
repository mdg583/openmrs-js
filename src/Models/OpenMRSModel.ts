import { OpenMRSConnection } from "../Connection/OpenMRSConnection"
import * as moment_ from 'moment';
const moment = moment_;

export abstract class OpenMRSModel<TObj, TQuery extends OpenMRSQuery> {
	public abstract readonly fields: any;
	public abstract readonly joins: any; // can be readonly?
	public abstract readonly resourceName: string;

	constructor(){
		// verify fields
	}

	// todo: implement
	private buildModelObj(objData: any): TObj {
		let p:any = {};
		for (var field in objData) {
			if( field in this.fields) p[field] = objData[field]; // use mapper
			if( field in this.joins ) {
				// get type of join, verify json matches, assign value
			}
		}
		return p as TObj;
	}

	public query(uuid?: string): TQuery {
		return new OpenMRSQuery(this, uuid) as TQuery;
	}
}

export class OpenMRSQuery{
	public joins: any = {};
	public requires: {field:string,cond:string,val:any}[] = [];
	public uuid?: string;

	constructor(private model: OpenMRSModel<any, OpenMRSQuery>, uuid?: string){
		// if uuid is given, requires are ignored
		// not relavent for children (ie joins)
		if(uuid) this.uuid = uuid;
	}

	attach(join: string) {
		if(! (join in this.model.joins) ) throw new Error(`No such join: ${join}`);
		if(join in this.joins) throw new Error(`Join already attached: ${join}`);
		let child_model = this.model.joins[join].model;
		this.joins[join] = new OpenMRSQuery(child_model); // create a query for child
	}

	getJoinModel(join: string): OpenMRSModel<any, OpenMRSQuery> {
		if(! (join in this.model.joins) ) throw new Error(`No such join: ${join}`);
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