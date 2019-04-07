import { OpenMRSModel, OpenMRSSchema } from "./OpenMRSModel";
import { OpenMRSQuery } from "./OpenMRSQuery";
import { OneToManyJoin, OneToOneJoin } from "./OpenMRSJoins";
import { Identifier, IdentifierSchema, IdentifierQuery } from "./IdentifierModel";
import { PatientName, PatientNameSchema, PatientNameQuery } from "/PatientNameModel";

// fields are given here for specific type definition ie for text editor
export class Patient {
	id?: string;
	age?: number;
	identifiers?: Identifier[];
	name?: PatientName;
}

// fields and joins are repeated here for type of introspection (??)
export const PatientSchema: OpenMRSSchema = {
	fields: {
		"id":"string",
		"age":"number"
	},
	joins: {
		"identifiers": {"type": "OneToMany", "schema": IdentifierSchema},
		"name": 	   {"type": "OneToOne",  "schema": PatientNameSchema}
	}
}

/*

PatientQuery q = new PatientQuery(uuid);


PatientQuery q = PatientModel.query(uuid);
q.requireEq('field', 'val');
q.attach('patientName');
q.patientName.requireIsNotNull('field');
Patient p = q.execute(connection)

p = PatientModel.create()
PatientModel.save(p)

*/

export class PatientModel extends OpenMRSModel<Patient, PatientQuery> {
	private schema = PatientSchema;
	private resourceName = "patient";
}

export class PatientQuery extends OpenMRSQuery {
	get identifiers(): IdentifierQuery { return this.getJoinQuery("identifiers") as IdentifierQuery; }
	get name(): PatientNameQuery { return this.getJoinQuery("name") as PatientNameQuery; }
	// could have custom require methods here
}