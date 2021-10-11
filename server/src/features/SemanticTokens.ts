import { SymbolKind } from 'vscode-languageserver/node';
import { ParameterTypes } from "../language/types";

export const parameterTypeToSymbolKind = (parameterType: ParameterTypes): SymbolKind => {
	switch (parameterType) {
		case "any":
			return SymbolKind.Object;
		case "pop":
			return SymbolKind.EnumMember;
		case "long":
		case "double":
		case "integer":
			return SymbolKind.Number;
		case "scope":
			return SymbolKind.Struct;
		case "token":
			return SymbolKind.Struct;
		case "string":
			return SymbolKind.String;
		case "boolean":
			return SymbolKind.Boolean;
		case "accessor":
			return SymbolKind.Constant;
		case "function":
			return SymbolKind.Function;
		case "traversal":
			return SymbolKind.Method;
		case "direction":
			return SymbolKind.EnumMember;
		case "predicate":
			return SymbolKind.Method;
		case "comparator":
			return SymbolKind.Operator;
		case "cardinality":
			return SymbolKind.Key;
	}

	return SymbolKind.String;
};
