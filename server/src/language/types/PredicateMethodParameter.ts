import ParameterTypes from "./ParameterTypes";

type PredicateMethodParameter = {
	name: string;
	multiple?: boolean;
	description?: string;
	type: ParameterTypes;
}

export default PredicateMethodParameter;
