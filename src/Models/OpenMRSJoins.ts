import { OpenMRSModel } from "./OpenMRSModel";

export class OpenMRSJoin {
/*	public "attached": boolean = false;*/
	public model: OpenMRSModel;
	public type: string;

	constructor(type: string, model: OpenMRSModel) {
		this.type = type;
		this.model = model;
	}
}

export function OneToOneJoin(model: OpenMRSModel): OpenMRSJoin {
	return new OpenMRSJoin("OneToOne", model);
}

export function OneToManyJoin(model: OpenMRSModel): OpenMRSJoin {
	return new OpenMRSJoin("OneToMany", model);
}