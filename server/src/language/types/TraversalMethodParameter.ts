import ParameterTypes from "./ParameterTypes";

type TraversalMethodParameter = {
	name: string;
	multiple?: boolean;
	description: string;
	type: ParameterTypes;
}

export default TraversalMethodParameter;
