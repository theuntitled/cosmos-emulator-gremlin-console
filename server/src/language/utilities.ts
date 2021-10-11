import {
	TraversalMethods,
	PredicateMethods,
	TraversalMethodSignature,
	PredicateMethodSignature,
	TraversalMethodParameter,
	PredicateMethodParameter
} from "./types";
import Token from "./Token";
import { steps } from "./steps";
import { predicates } from "./predicates";
import { MarkupContent } from "vscode-languageserver-types";

export const getBestGuessSignatureIndex = (token: Token, children: Token[]): number | null => {
	let signatures: undefined | TraversalMethodSignature[] | PredicateMethodSignature[];

	if (token.type === "traversal") {
		signatures = steps[token.label as TraversalMethods];
	}

	if (token.type === "predicate") {
		signatures = predicates[token.label as PredicateMethods];
	}

	if (typeof signatures === "undefined") {
		return null;
	}

	let hasComma = false;

	const matches = signatures.map((signature: TraversalMethodSignature | PredicateMethodSignature, signatureIndex: number) => {
		let lastChildOffset = token.range.start + token.label.length + 1;

		let confidence: number[] = signature.parameters.map((parameter: TraversalMethodParameter | PredicateMethodParameter, parameterIndex: number) => {
			if (!Array.isArray(children)) {
				return 0;
			}

			const argument = children[parameterIndex];

			if (!argument) {
				const localOffset = lastChildOffset - token.range.start;
				const searchString = token.body.substr(localOffset);

				const commaIndex = searchString.indexOf(",");
				const bracketIndex = searchString.indexOf("(");

				if ((commaIndex < bracketIndex) || (commaIndex > -1 && bracketIndex < 0)) {
					hasComma = true;

					return 0.5;
				}
			}

			if (!!argument) {
				lastChildOffset = argument.range.end;
			}

			if (!!argument && (argument.type === "any" || argument.type === parameter.type)) {
				return 1;
			}

			return 0;
		});

		let percent = 0;

		if (confidence.length > 0) {
			percent = ((100 / confidence.length) * confidence.reduce((a, b) => a + b, 0));
		}

		return {
			confidence: percent,
			index: signatureIndex
		};
	}).sort((a, b) => b.confidence - a.confidence);

	const perfectMatch = matches.find(match => match.confidence === 100);

	if (!!perfectMatch && !hasComma) {
		return perfectMatch.index;
	} else {
		if (matches.length > 0) {
			return matches.filter(match => match.confidence < 100)[0].index;
		}
	}

	return null;
};

export const getActiveParameter = (token: Token, offset: number): number | null => {
	if (!Array.isArray(token.arguments)) {
		return null;
	}

	const index = token.arguments.findIndex(argument => argument.range.start <= offset && argument.range.end >= offset);

	if (index > -1) {
		return index;
	}

	return token.arguments.length;
};

export const getSignatureDescription = (signature: TraversalMethodSignature | PredicateMethodSignature): MarkupContent => {
	let description = [signature.description];

	if (signature.parameters.length > 0) {
		signature.parameters.forEach((parameter: TraversalMethodParameter | PredicateMethodParameter) => {
			description.push("\n\n");
			description.push("*@param* `");
			description.push(parameter.name);

			if (parameter.multiple) {
				description.push("[]");
			}

			description.push(": ");
			description.push(parameter.type);
			description.push("`");

			if (!!parameter.description) {
				description.push(` — `);
				description.push(parameter.description);
			}
		});
	}

	if (typeof (signature as TraversalMethodSignature).returns === "string") {
		description.push("\n\n");
		description.push("*@returns* ");
		description.push((signature as TraversalMethodSignature).returns);
	}

	if (!!signature.since) {
		description.push("\n\n");
		description.push("*@since* ");
		description.push(signature.since);
	}

	return {
		kind: "markdown",
		value: description.join("")
	} as MarkupContent;
};
