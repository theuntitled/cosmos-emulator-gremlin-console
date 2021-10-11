import PredicateMethodParameter from "./PredicateMethodParameter";

type PredicateMethodSignature = {
	since: string;
	description: string;
	parameters: PredicateMethodParameter[];
};

export default PredicateMethodSignature;
