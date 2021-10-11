import TextRange from "./TextRange";
import { ParameterTypes } from "./types";

export default interface Token {
	next?: Token;
	body: string;
	label: string;
	parent?: Token;
	range: TextRange;
	isValid: boolean;
	arguments?: Token[];
	type: ParameterTypes;
	labelRange: TextRange;
	signatureIndex?: number;
}
