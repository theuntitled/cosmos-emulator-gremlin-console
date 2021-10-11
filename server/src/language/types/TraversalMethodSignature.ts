import TraversalMethodParameter from "./TraversalMethodParameter";

type TraversalMethodSignature = {
	since: string;
	returns: string;
	description: string;
	parameters: TraversalMethodParameter[];
}

export default TraversalMethodSignature;
