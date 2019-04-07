import { OpenMRSModel, OneToManyJoin, OneToOneJoin } from "./OpenMRSModel";
import { Identifier, IdentifierModel } from "./IdentifierModel"
import { PatientName, PatientNameModel } from "/PatientNameModel"

// fields are given here for specific type definition ie for text editor
export interface Patient {
	id?: string;
	age?: number;
	identifiers?: Identifier[];
	name?: PatientName;
}

export class PatientModel extends OpenMRSModel {
	// fields and joins are repeated here for type of introspection
	fields = {
		"id":"string",
		"age":"number"
	};
	joins = {
		"identifiers": OneToManyJoin(IdentifierModel),
		"name": OneToOneJoin(PatientNameModel)
	}
	get identifiers(): IdentifierModel { return this.getJoinModel("identifiers") as IdentifierModel; }
	get name(): PatientNameModel { return this.getJoinModel("name") as PatientModel; }

	// could have custom require methods here
}