import { PredicateMethods, PredicateMethodSignature } from "./types";

export type PredicateDefinitions = { [key in PredicateMethods]: PredicateMethodSignature[] };

export const predicates: PredicateDefinitions = {
	"containing": [
		{
			since: "3.4.0",
			description: "Determines if String does contain the given value.",
			parameters: [
				{ type: "string", name: "value", }
			]
		}
	],
	"endingWith": [
		{
			since: "3.4.0",
			description: "Determines if String does start with the given value.",
			parameters: [
				{ type: "string", name: "value" }
			]
		}
	],
	"equals": [
		{
			since: "3.0.0-incubating",
			description: "Indicates whether some other object is \"equal to\" this one.",
			parameters: [
				{ type: "any", name: "other" }
			]
		}
	],
	"negate": [
		{
			since: "3.0.0-incubating",
			description: "Returns a predicate that represents the logical negation of this predicate.",
			parameters: []
		}
	],
	"notContaining": [
		{
			since: "3.4.0",
			description: "Determines if String does not contain the given value.",
			parameters: [
				{ type: "string", name: "value" }
			]
		}
	],
	"notEndingWith": [
		{
			since: "3.4.0",
			description: "Determines if String does not start with the given value.",
			parameters: [
				{ type: "string", name: "value" }
			]
		}
	],
	"notStartingWith": [
		{
			since: "3.4.0",
			description: "Determines if String does not start with the given value.",
			parameters: [
				{ type: "string", name: "value" }
			]
		}
	],
	"startingWith": [
		{
			since: "3.4.0",
			description: "Determines if String does start with the given value.",
			parameters: [
				{ type: "string", name: "value" }
			]
		}
	],
	"and": [
		{
			since: "3.0.0-incubating",
			description: "Returns a composed predicate that represents a short-circuiting logical AND of this predicate and another. When evaluating the composed predicate, if this predicate is false, then the other predicate is not evaluated.\n\nAny exceptions thrown during evaluation of either predicate are relayed to the caller; if evaluation of this predicate throws an exception, the other predicate will not be evaluated.",
			parameters: []
		},
		{
			since: "3.0.0-incubating",
			description: "Returns a composed predicate that represents a short-circuiting logical AND of this predicate and another. When evaluating the composed predicate, if this predicate is false, then the other predicate is not evaluated.\n\nAny exceptions thrown during evaluation of either predicate are relayed to the caller; if evaluation of this predicate throws an exception, the other predicate will not be evaluated.",
			parameters: [
				{ type: "predicate", name: "other", description: "a predicate that will be logically-ANDed with this predicate" }
			]
		}
	],
	"between": [
		{
			since: "3.0.0-incubating",
			description: "Determines if a value is within (inclusive) of the range of the two specified values.",
			parameters: [
				{ type: "string", name: "first" },
				{ type: "string", name: "second" },
			]
		}
	],
	"eq": [
		{
			since: "3.0.0-incubating",
			description: "Determines if values are equal.",
			parameters: [
				{ type: "any", name: "value" }
			]
		}
	],
	"gt": [
		{
			since: "3.0.0-incubating",
			description: "Determines if a value is greater than another.",
			parameters: [
				{ type: "any", name: "value" }
			]
		}
	],
	"gte": [
		{
			since: "3.0.0-incubating",
			description: "Determines if a value is greater than or equal to another.",
			parameters: [
				{ type: "any", name: "value" }
			]
		}
	],
	"inside": [
		{
			since: "3.0.0-incubating",
			description: "Determines if a value is within (exclusive) the range of the two specified values.",
			parameters: [
				{ type: "any", name: "first" },
				{ type: "any", name: "second" }
			]
		}
	],
	"lt": [
		{
			since: "3.0.0-incubating",
			description: "Determines if a value is less than another.",
			parameters: [
				{ type: "any", name: "value" }
			]
		}
	],
	"lte": [
		{
			since: "3.0.0-incubating",
			description: "Determines if a value is less than or equal to another.",
			parameters: [
				{ type: "any", name: "value" }
			]
		}
	],
	"neq": [
		{
			since: "3.0.0-incubating",
			description: "Determines if values are not equal.",
			parameters: [
				{ type: "any", name: "value" }
			]
		}
	],
	"not": [
		{
			since: "3.0.0-incubating",
			description: "The opposite of the specified P.",
			parameters: [
				{ type: "predicate", name: "predicate" }
			]
		}
	],
	"or": [
		{
			since: "3.0.0-incubating",
			description: "Returns a composed predicate that represents a short-circuiting logical OR of this predicate and another. When evaluating the composed predicate, if this predicate is true, then the other predicate is not evaluated.\n\nAny exceptions thrown during evaluation of either predicate are relayed to the caller; if evaluation of this predicate throws an exception, the other predicate will not be evaluated.",
			parameters: []
		},
		{
			since: "3.0.0-incubating",
			description: "Returns a composed predicate that represents a short-circuiting logical OR of this predicate and another. When evaluating the composed predicate, if this predicate is true, then the other predicate is not evaluated.\n\nAny exceptions thrown during evaluation of either predicate are relayed to the caller; if evaluation of this predicate throws an exception, the other predicate will not be evaluated.",
			parameters: [
				{ type: "predicate", name: "other", description: "a predicate that will be logically-ORed with this predicate" }
			]
		}
	],
	"outside": [
		{
			since: "3.0.0-incubating",
			description: "Determines if a value is not within (exclusive) of the range of the two specified values.",
			parameters: [
				{ type: "any", name: "first" },
				{ type: "any", name: "second" },
			]
		}
	],
	"within": [
		{
			since: "3.0.0-incubating",
			description: "Determines if a value is within the specified list of values.",
			parameters: [
				{ type: "any", name: "values", multiple: true }
			]
		}
	],
	"without": [
		{
			since: "3.0.0-incubating",
			description: "Determines if a value is not within the specified list of values.",
			parameters: [
				{ type: "any", name: "values", multiple: true }
			]
		}
	],
};
