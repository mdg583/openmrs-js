import { OpenMRSConnection } from "../Connection/OpenMRSConnection"
import * as moment_ from 'moment';
const moment = moment_;

export abstract class OpenMRSModel {
	public fields: any;
	public requires: {field:string,cond:string,val:any}[] = [];
	public joins: any;
	public uuid?: string;

	constructor(uuid?: string){
		// if uuid is given, requires are ignored
		if(uuid) this.uuid = uuid;
		// verify fields
	}

	attach(join: string) {
		if(! (join in this.joins) ) throw new Error(`No such join: ${join}`);
		if( this.joins[join].attached ) throw new Error(`Join already attached: ${join}`);
		this.joins[join].attached = true;
	}

	getJoinModel(join: string): OpenMRSModel {
		if(! (join in this.joins) ) throw new Error(`No such join: ${join}`);
		if(! this.joins[join].attached ) throw new Error(`Join not attached: ${join}`);
		return this.joins[join].model;
	}

	requireEq(field: string, val: any) {
		this.requireCmp(field, "=", val);
	}

	requireCmp(field: string, cmp: string, val: any) {
		if(!(field in this.fields)) throw new Error(`Model has no field: ${field}`);
		// different behavior if string or number or date?
		if(this.fields[field] == "date" && val instanceof Date){
			let m = moment(val);
			val = m.format('YYYY-MM-DD');
		}
		if(this.fields[field] == "datetime" && val instanceof Date){
			let m = moment(val);
			val = m.format('YYYY-MM-DD HH:mm:ss');
		}
		this.requires.push(
			{ field: field, cond:cmp, val: val}
		);
	}

	requireNull(field: string) {
		if(!(field in this.fields)) throw new Error(`Model has no field: ${field}`);
		this.requires.push(
			{field:field, cond:"is null", val:null}
		);
	}

	requireNotNull(field: string) {
		if(!(field in this.fields)) throw new Error(`Model has no field: ${field}`);
		this.requires.push(
			{field:field, cond:"is not null", val:null}
		);
	}

	/**
	 * Run this query and generate a collection of corresponding models
	 */
	execute(connection: OpenMRSConnection): any[] {
		// iterate this model and its attachments to build query object
		// use connection to get data
		// then call buildModelObj to create model
		return [];
	}

	// todo: implement
	private buildModelObj(objData: any): any {
		let p:any = {};
		for (var field in objData) {
			if( field in this.fields) p[field] = objData[field]; // use mapper
			if( field in this.joins ) {
				// get type of join, verify json matches, assign value
			}
		}
		return p;
	}
}