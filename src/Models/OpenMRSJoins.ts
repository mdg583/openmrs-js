import { OpenMRSModel } from "./OpenMRSModel";

type OpenMRSJoin = {
	"type": string,
	"model": OpenMRSModel,
	"attached": boolean
}

export function OneToOneJoin(model: OpenMRSModel): OpenMRSJoin{
	return {
		"type": "OneToOne",
		"model": model,
		"attached": false
	}
}

export function OneToManyJoin(model: OpenMRSModel): OpenMRSJoin{
	return {
		"type": "OneToMany",
		"model": model,
		"attached": false
	}
}