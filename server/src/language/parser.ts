
import { CancellationToken } from "vscode-jsonrpc";
import { TextDocument } from 'vscode-languageserver-textdocument';

import { steps } from "./steps";
import { predicates } from "./predicates";
import { PredicateMethods, TraversalMethods } from './types';

import Token from "./Token";
import TextRange from "./TextRange";
import { getBestGuessSignatureIndex } from "./utilities";

const stopRegExp = /[()\.]/;
const quoteRegExp = /[\"\']/;
const numberRegExp = /[0-9]*/;
const whiteSpaceRegExp = /[\s]/;

const isNumber = (character: string) => !isNaN(parseFloat(character));
const isWhiteSpace = (character: string) => whiteSpaceRegExp.test(character);
const isQuote = (character: string) => character === "\"" || character === "'";
const isNewLine = (character: string) => character === "\r" || character === "\n";

const stepKeys = Object.keys(steps);
const predicateKeys = Object.keys(predicates);

const parse = async (text: string, start: number, end: number, cancellationToken: CancellationToken, previous?: Token, parent?: Token): Promise<Token[]> => {
	const results: Token[] = [];

	let isInChain = false;

	const addResult = (token: Token) => {
		if (isInChain && !!previous) {
			previous.next = token;

			previous = previous.next;
		} else {
			results.push(token);
		}

		isInChain = false;
	};

	for (let charIndex = start; charIndex < end; charIndex++) {
		if (cancellationToken.isCancellationRequested) {
			return [];
		}

		const character = text[charIndex];

		if (isNewLine(character)) {
			continue;
		}

		if (isWhiteSpace(character)) {
			continue;
		}

		// TODO: The chain has to be resolved, so it makes a difference if there's a "." or ","
		if (character === ".") {
			isInChain = true;

			continue;
		}

		// TODO: The chain has to be resolved, so it makes a difference if there's a "." or ","
		if (character === ",") {
			continue;
		}

		let stopIndex: number;

		if (isQuote(character)) {
			stopIndex = text.substr(charIndex + 1).search(quoteRegExp);

			addResult({
				isValid: true,
				type: "string",
				body: text.substring(charIndex, charIndex + stopIndex + 2),
				label: text.substring(charIndex + 1, charIndex + 1 + stopIndex), // the label does not contain the quotation marks
				range: {
					start: charIndex,
					end: charIndex + stopIndex + 1 // The range includes the quotation marks
				},
				labelRange: {
					start: charIndex + 1,
					end: charIndex + stopIndex + 1
				}
			});

			charIndex = charIndex + stopIndex + 2;

			continue;
		}

		// Lookahead to see if its a boolean
		if (character === "t" && text.substr(charIndex, 4) === "true") {
			addResult({
				isValid: true,
				type: "boolean",
				label: "true",
				body: text.substring(charIndex, charIndex + 4),
				range: {
					start: charIndex,
					end: charIndex + 4
				},
				labelRange: {
					start: charIndex,
					end: charIndex + 4
				}
			});

			charIndex = charIndex + 4;

			continue;
		}

		// Lookahead to see if its a boolean
		if (character === "f" && text.substr(charIndex, 5) === "false") {
			addResult({
				isValid: true,
				type: "boolean",
				label: "false",
				body: text.substring(charIndex, charIndex + 5),
				range: {
					start: charIndex,
					end: charIndex + 5
				},
				labelRange: {
					start: charIndex,
					end: charIndex + 5
				}
			});

			charIndex = charIndex + 5;

			continue;
		}

		// Lookahead to see if its a incr comparator
		if (character === "i" && text.substr(charIndex, 4) === "incr") {
			addResult({
				isValid: true,
				type: "comparator",
				label: "incr",
				body: text.substring(charIndex, charIndex + 4),
				range: {
					start: charIndex,
					end: charIndex + 4
				},
				labelRange: {
					start: charIndex,
					end: charIndex + 4
				}
			});

			charIndex = charIndex + 4;

			continue;
		}

		// Lookahead to see if its a decr comparator
		if (character === "d" && text.substr(charIndex, 4) === "decr") {
			addResult({
				isValid: true,
				type: "comparator",
				label: "decr",
				body: text.substring(charIndex, charIndex + 4),
				range: {
					start: charIndex,
					end: charIndex + 4
				},
				labelRange: {
					start: charIndex,
					end: charIndex + 4
				}
			});

			charIndex = charIndex + 4;

			continue;
		}

		if (isNumber(character)) {
			const match = text.substr(charIndex, 128).match(numberRegExp);

			if (match == null) {
				throw "Inconceivable!";
			}

			const number = match[0];

			const numberToken: Token = {
				isValid: true,
				type: "integer",
				label: number,
				body: text.substring(charIndex, charIndex + number.length),
				range: {
					start: charIndex,
					end: charIndex + number.length
				},
				labelRange: {
					start: charIndex,
					end: charIndex + number.length
				}
			};

			if (number.includes(".") || number.includes(",")) {
				numberToken.type = "long";
			}

			addResult(numberToken);

			charIndex += number.length;

			continue;
		}

		// at this point we can assume the token is "g", a method invocation or anything we don't care about
		stopIndex = text.substr(charIndex, 32).search(stopRegExp);

		const label = text.substr(charIndex, stopIndex).trimLeft();

		if (label === "g") {
			addResult({
				label: label,
				isValid: true,
				type: "traversal",
				body: text.substring(charIndex, charIndex + 1),
				range: {
					start: charIndex,
					end: charIndex + 1
				},
				labelRange: {
					start: charIndex,
					end: charIndex + 1
				}
			});

			continue;
		}

		if (stepKeys.includes(label)) {
			const signatures = steps[label as TraversalMethods];

			const methodToken: Token = {
				body: "",
				label: label,
				isValid: false,
				type: "traversal",
				signatureIndex: 0,
				range: {} as TextRange,
				labelRange: {} as TextRange
			};

			let body: string = "";

			const hasStartingBracket = text.charAt(charIndex + stopIndex) === "(";

			if (!hasStartingBracket) {
				methodToken.range = {
					start: charIndex,
					end: charIndex + stopIndex
				};

				methodToken.labelRange = {
					start: charIndex,
					end: charIndex + stopIndex
				};

				methodToken.body = text.substring(charIndex, charIndex + stopIndex);

				addResult(methodToken);

				charIndex = methodToken.range.end;

				continue;
			}
			
			let openedParentheses = 0;

			// lookahead, count open and closing parentheses
			for (let i = charIndex + stopIndex; i < end; i++) {
				// should be the first thing to find since this is an invokation
				if (text[i] === "(") {
					openedParentheses++;
				}

				if (text[i] === ")") {
					openedParentheses--;
				}

				if (openedParentheses === 0) {
					// contains the full and possibly nested parameters for the method invokation, must be recusively checked
					body = text.substring(charIndex + stopIndex + 1, i);

					break;
				}
			}

			if (openedParentheses > 0) {
				methodToken.range = {
					start: charIndex,
					end: charIndex + stopIndex
				};

				methodToken.labelRange = {
					start: charIndex,
					end: charIndex + stopIndex
				};

				methodToken.body = text.substring(charIndex, charIndex + stopIndex);

				addResult(methodToken);

				charIndex = methodToken.range.end;

				continue;
			}

			methodToken.range = {
				start: charIndex, // including the opening parenthesis "("
				end: charIndex + stopIndex + body.length + 2 // including the closing parenthesis ")" 
			};

			methodToken.labelRange = {
				start: charIndex,
				end: charIndex + stopIndex
			};

			methodToken.body = text.substring(charIndex, charIndex + stopIndex + body.length + 2);

			if (body.length === 0) {
				if (!!signatures.find(signature => signature.parameters.length === 0)) {
					methodToken.isValid = true;
				}
			}

			if (body.length > 0) {
				const children = await parse(text, methodToken.range.start + label.length + 1, methodToken.range.end - 1, cancellationToken, methodToken, methodToken);

				if (Array.isArray(children) && children.length > 0) {
					methodToken.parent = parent;

					const signatureMatch = getBestGuessSignatureIndex(methodToken, children);

					if (signatureMatch != null) {
						methodToken.isValid = true;
						methodToken.signatureIndex = signatureMatch;
					}

					methodToken.arguments = children;
				}
			}

			addResult(methodToken);

			charIndex = methodToken.range.end - 1; // jumpt to before the closing parenthesis ")", the loop will jump ahead

			continue;
		}

		if (predicateKeys.includes(label)) {
			const signatures = predicates[label as PredicateMethods];

			const methodToken: Token = {
				body: "",
				label: label,
				isValid: false,
				type: "predicate",
				signatureIndex: 0,
				range: {} as TextRange,
				labelRange: {} as TextRange
			};

			let body: string = "";

			const hasStartingBracket = text.charAt(charIndex + stopIndex) === "(";

			if (!hasStartingBracket) {
				methodToken.range = {
					start: charIndex,
					end: charIndex + stopIndex
				};

				methodToken.labelRange = {
					start: charIndex,
					end: charIndex + stopIndex
				};

				methodToken.body = text.substring(charIndex, charIndex + stopIndex);

				addResult(methodToken);

				charIndex = methodToken.range.end;

				continue;
			}
			
			let openedParentheses = 0;

			// lookahead, count open and closing parentheses
			for (let i = charIndex + stopIndex; i < end; i++) {
				// should be the first thing to find since this is an invokation
				if (text[i] === "(") {
					openedParentheses++;
				}

				if (text[i] === ")") {
					openedParentheses--;
				}

				if (openedParentheses === 0) {
					// contains the full and possibly nested parameters for the method invokation, must be recusively checked
					body = text.substring(charIndex + stopIndex + 1, i);

					break;
				}
			}

			if (openedParentheses > 0) {
				methodToken.range = {
					start: charIndex,
					end: charIndex + stopIndex
				};

				methodToken.labelRange = {
					start: charIndex,
					end: charIndex + stopIndex
				};

				methodToken.body = text.substring(charIndex, charIndex + stopIndex);

				addResult(methodToken);

				charIndex = methodToken.range.end;

				continue;
			}

			methodToken.range = {
				start: charIndex, // including the opening parenthesis "("
				end: charIndex + stopIndex + body.length + 2 // including the closing parenthesis ")" 
			};

			methodToken.labelRange = {
				start: charIndex,
				end: charIndex + stopIndex
			};

			methodToken.body = text.substring(charIndex, charIndex + stopIndex + body.length + 2);

			if (body.length === 0) {
				if (!!signatures.find(signature => signature.parameters.length === 0)) {
					methodToken.isValid = true;
				}
			}

			if (body.length > 0) {
				const children = await parse(text, methodToken.range.start + label.length + 1, methodToken.range.end - 1, cancellationToken, methodToken, methodToken);

				if (Array.isArray(children) && children.length > 0) {
					methodToken.parent = parent;

					const signatureMatch = getBestGuessSignatureIndex(methodToken, children);

					if (signatureMatch != null) {
						methodToken.isValid = true;
						methodToken.signatureIndex = signatureMatch;
					}

					methodToken.arguments = children;
				}
			}

			addResult(methodToken);

			charIndex = methodToken.range.end - 1; // jumpt to before the closing parenthesis ")", the loop will jump ahead

			continue;
		}
	}

	if (cancellationToken.isCancellationRequested) {
		return [];
	}

	return results;
};

export const getTokens = (document: TextDocument, cancellationToken: CancellationToken): Promise<Token[]> => {
	const text = document.getText();

	return parse(
		text,
		0,
		text.length,
		cancellationToken
	);
}
