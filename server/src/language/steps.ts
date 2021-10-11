import { TraversalMethods, TraversalMethodSignature } from "./types";

export type StepDefinitions = { [key in TraversalMethods]: TraversalMethodSignature[] };

export const steps: StepDefinitions = {
	"addE": [
		{
			since: "3.1.0-incubating",
			returns: "the traversal with the AddEdgeStep added",
			description: "Adds an Edge with the specified edge label.",
			parameters: [
				{ type: "string", name: "edgeLabel", description: "the label of the newly added edge" }
			],
		},
		{
			since: "3.3.1",
			returns: "the traversal with the AddEdgeStep added",
			description: "Adds a Edge with an edge label determined by a Traversal.",
			parameters: [
				{ type: "traversal", name: "edgeLabelTraversal", description: "" }
			]
		}
	],
	"addV": [
		{
			since: "3.1.0-incubating",
			returns: "the traversal with the AddVertexStep added",
			description: "Adds a Vertex with a default vertex label.",
			parameters: []
		},
		{
			since: "3.1.0-incubating",
			returns: "the traversal with the AddVertexStep added",
			description: "Adds an Edge with the specified edge label.",
			parameters: [
				{ type: "string", name: "vertexLabel", description: "the label of the Vertex to add" }
			]
		},
		{
			since: "3.3.1",
			returns: "the traversal with the AddVertexStep added",
			description: "Adds a Vertex with a vertex label determined by a Traversal.",
			parameters: [
				{ type: "string", name: "vertexLabelTraversal", description: "" }
			]
		}
	],
	"aggregate": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended AggregateStep",
			description: "Eagerly collects objects up to this step into a side-effect. Same as calling aggregate(Scope, String) with a Scope.local.",
			parameters: [
				{ type: "string", name: "sideEffectKey", description: "the name of the side-effect key that will hold the aggregated objects" }
			]
		},
		{
			since: "3.4.3",
			returns: "the traversal with an appended AggregateStep",
			description: "Collects objects in a list using the Scope argument to determine whether it should be lazy Scope.local or eager (Scope.global while gathering those objects.",
			parameters: [
				{ type: "scope", name: "scope", description: "" },
				{ type: "string", name: "sideEffectKey", description: "the name of the side-effect key that will hold the aggregated objects" }
			]
		}
	],
	"and": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended AndStep",
			description: "Ensures that all of the provided traversals yield a result.",
			parameters: [
				{ type: "traversal", name: "andTraversals", description: "filter traversals that must be satisfied" }
			]
		}
	],
	"as": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with the modified end step",
			description: "A step modulator that provides a label to the step that can be accessed later in the traversal by other steps.",
			parameters: [
				{ type: "string", name: "stepLabel", description: "the name of the step" }
			]
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with the modified end step",
			description: "A step modulator that provides a label to the step that can be accessed later in the traversal by other steps.",
			parameters: [
				{ type: "string", name: "stepLabel", description: "the name of the step" },
				{ type: "string", name: "stepLabels", multiple: true, description: "additional names for the label" }
			]
		}
	],
	"asAdmin": [
		{
			since: "3.0.0-incubating",
			returns: "the admin of this traversal",
			description: "Get access to administrative methods of the traversal via its accompanying Traversal.Admin.",
			parameters: []
		}
	],
	"barrier": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended NoOpBarrierStep",
			description: "Turns the lazy traversal pipeline into a bulk-synchronous pipeline which basically iterates that traversal to the size of the barrier. In this case, it iterates the entire thing as the default barrier size is set to Integer.MAX_VALUE.",
			parameters: []
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended NoOpBarrierStep",
			description: "Turns the lazy traversal pipeline into a bulk-synchronous pipeline which basically iterates that traversal to the size of the barrier.",
			parameters: [
				{ type: "integer", name: "maxBarrierSize", description: "the size of the barrier" }
			]
		},
	],
	"both": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended VertexStep.",
			description: "Map the Vertex to its adjacent vertices given the edge labels.",
			parameters: []
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended VertexStep.",
			description: "Map the Vertex to its adjacent vertices given the edge labels.",
			parameters: [
				{ type: "string", name: "edgeLabels", multiple: true, description: "the edge labels to traverse" }
			]
		}
	],
	"bothE": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended VertexStep.",
			description: "Map the Vertex to its incident edges given the edge labels.",
			parameters: []
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended VertexStep.",
			description: "Map the Vertex to its incident edges given the edge labels.",
			parameters: [
				{ type: "string", name: "edgeLabels", multiple: true, description: "the edge labels to traverse" }
			]
		}
	],
	"bothV": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended EdgeVertexStep.",
			description: "Map the Edge to its incident vertices.",
			parameters: []
		}
	],
	"branch": [
		{
			since: "3.0.0-incubating",
			returns: "the Traversal with the BranchStep added",
			description: "Split the Traverser to all the specified traversals.",
			parameters: []
		},
		{
			since: "3.0.0-incubating",
			returns: "the Traversal with the BranchStep added",
			description: "Split the Traverser to all the specified traversals.",
			parameters: [
				{ type: "traversal", name: "branchTraversal", description: "the traversal to branch the Traverser to" }
			]
		}
	],
	"by": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with a modulated step.",
			description: "The by() can be applied to a number of different step to alter their behaviors. This form is essentially an identity() modulation.",
			parameters: []
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with a modulated step.",
			description: "The by() can be applied to a number of different step to alter their behaviors. Modifies the previous step with the specified function.",
			parameters: [
				{ type: "comparator", name: "comparator", description: "the comparator to apply typically for some order()" }
			]
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with a modulated step.",
			description: "The by() can be applied to a number of different step to alter their behaviors. Modifies the previous step with the specified key.",
			parameters: [
				{ type: "string", name: "key", description: "the key to apply" }
			]
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with a modulated step.",
			description: "The by() can be applied to a number of different step to alter their behaviors. Modifies the previous step with the specified function.",
			parameters: [
				{ type: "string", name: "key", description: "the key to apply traversal" },
				{ type: "comparator", name: "comparator", description: "the comparator to apply typically for some order()" }
			]
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with a modulated step.",
			description: "The by() can be applied to a number of different step to alter their behaviors. Modifies the previous step with the specified token of T.",
			parameters: [
				{ type: "token", name: "token", description: "the token to apply" }
			]
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with a modulated step.",
			description: "The by() can be applied to a number of different step to alter their behaviors. Modifies the previous step with the specified traversal.",
			parameters: [
				{ type: "traversal", name: "traversal", description: "the traversal to apply" }
			]
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with a modulated step.",
			description: "The by() can be applied to a number of different step to alter their behaviors. Modifies the previous step with the specified function.",
			parameters: [
				{ type: "traversal", name: "traversal", description: "the traversal to apply" },
				{ type: "comparator", name: "comparator", description: "the comparator to apply typically for some order()" }
			]
		}
	],
	"cap": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended SideEffectCapStep",
			description: "Iterates the traversal up to the itself and emits the side-effect referenced by the key. If multiple keys are supplied then the side-effects are emitted as a Map.",
			parameters: [
				{ type: "string", name: "sideEffectKey", description: "the side-effect to emit" }
			]
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended SideEffectCapStep",
			description: "Iterates the traversal up to the itself and emits the side-effect referenced by the key. If multiple keys are supplied then the side-effects are emitted as a Map.",
			parameters: [
				{ type: "string", name: "sideEffectKey", description: "the side-effect to emit" },
				{ type: "string", name: "sideEffectKeys", multiple: true, description: "other side-effects to emit" }
			]
		}
	],
	"choose": [
		{
			since: "3.2.4",
			returns: "the traversal with the appended ChooseStep",
			description: "Routes the current traverser to a particular traversal branch option which allows the creation of if-then like semantics within a traversal.",
			parameters: [
				{ type: "predicate", name: "choosePredicate", description: "the function used to determine the \"if\" portion of the if-then-else" },
				{ type: "traversal", name: "trueChoice", description: "the traversal to execute in the event the traversalPredicate returns true" }
			]
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with the appended ChooseStep",
			description: "Routes the current traverser to a particular traversal branch option which allows the creation of if-then-else like semantics within a traversal.",
			parameters: [
				{ type: "predicate", name: "choosePredicate", description: "the function used to determine the \"if\" portion of the if-then-else" },
				{ type: "traversal", name: "trueChoice", description: "the traversal to execute in the event the traversalPredicate returns true" },
				{ type: "traversal", name: "falseChoice", description: "the traversal to execute in the event the traversalPredicate returns false" }
			]
		},
		{
			since: "3.2.4",
			returns: "the traversal with the appended ChooseStep",
			description: "Routes the current traverser to a particular traversal branch option which allows the creation of if-then like semantics within a traversal.",
			parameters: [
				{ type: "traversal", name: "traversalPredicate", description: "the traversal used to determine the \"if\" portion of the if-then-else" },
				{ type: "traversal", name: "trueChoice", description: "the traversal to execute in the event the traversalPredicate returns true" }
			]
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with the appended ChooseStep",
			description: "Routes the current traverser to a particular traversal branch option which allows the creation of if-then-else like semantics within a traversal.",
			parameters: [
				{ type: "traversal", name: "traversalPredicate", description: "the traversal used to determine the \"if\" portion of the if-then-else" },
				{ type: "traversal", name: "trueChoice", description: "the traversal to execute in the event the traversalPredicate returns true" },
				{ type: "traversal", name: "falseChoice", description: "the traversal to execute in the event the traversalPredicate returns false" }
			]
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with the appended ChooseStep",
			description: "Routes the current traverser to a particular traversal branch option which allows the creation of if-then-else like semantics within a traversal. A choose is modified by option(M, org.apache.tinkerpop.gremlin.process.traversal.Traversal<?, E2>) which provides the various branch choices.",
			parameters: [
				{ type: "traversal", name: "choiceTraversal", description: "the traversal used to determine the value for the branch" }
			]
		}
	],
	"coalesce": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with the appended CoalesceStep",
			description: "Evaluates the provided traversals and returns the result of the first traversal to emit at least one object.",
			parameters: []
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with the appended CoalesceStep",
			description: "Evaluates the provided traversals and returns the result of the first traversal to emit at least one object.",
			parameters: [
				{ type: "traversal", name: "coalesceTraversals", multiple: true, description: "the traversals to coalesce" }
			]
		}
	],
	"coin": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended CoinStep.",
			description: "Filter the E object given a biased coin toss.",
			parameters: [
				{ type: "double", name: "probability", description: "the probability that the object will pass through" }
			]
		}
	],
	"connectedComponent": [
		{
			since: "3.4.0",
			returns: "the traversal with the appended ConnectedComponentVertexProgram",
			description: "Executes a Connected Component algorithm over the graph.",
			parameters: []
		}
	],
	"constant": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended ConstantStep.",
			description: "Map any object to a fixed E value.",
			parameters: [
				{ type: "any", name: "value", description: "Any object to be used as the value" }
			]
		}
	],
	"count": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended CountGlobalStep.",
			description: "Map the traversal stream to its reduction as a sum of the Traverser.bulk() values (i.e. count the number of traversers up to this point).",
			parameters: []
		}
	],
	"cyclicPath": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended PathFilterStep.",
			description: "Filter the E object if its Traverser.path() is Path.isSimple().",
			parameters: []
		}
	],
	"dedup": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended DedupGlobalStep.",
			description: "Remove all duplicates in the traversal stream up to this point.",
			parameters: []
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended DedupGlobalStep.",
			description: "Remove all duplicates in the traversal stream up to this point.",
			parameters: [
				{ type: "string", name: "dedupLabels", multiple: true, description: "if labels are provided, then the scoped object's labels determine de-duplication. No labels implies current object." }
			]
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended DedupGlobalStep or DedupLocalStep depending on scope.",
			description: "Remove all duplicates in the traversal stream up to this point.",
			parameters: [
				{ type: "scope", name: "scope", description: "whether the deduplication is on the stream (global) or the current object (local)." }
			]
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended DedupGlobalStep or DedupLocalStep depending on scope.",
			description: "Remove all duplicates in the traversal stream up to this point.",
			parameters: [
				{ type: "scope", name: "scope", description: "whether the deduplication is on the stream (global) or the current object (local)." },
				{ type: "string", name: "dedupLabels", multiple: true, description: "if labels are provided, then the scope labels determine de-duplication. No labels implies current object." }
			]
		}
	],
	"drop": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with the DropStep added",
			description: "Removes elements and properties from the graph. This step is not a terminating, in the sense that it does not automatically iterate the traversal. It is therefore necessary to do some form of iteration for the removal to actually take place. In most cases, iteration is best accomplished with g.V().drop().iterate().",
			parameters: []
		}
	],
	"elementMap": [
		{
			since: "3.4.4",
			returns: "the traversal with an appended ElementMapStep.",
			description: "Map the Element to a Map of the property values key'd according to their Property.key(). If no property keys are provided, then all property values are retrieved. For vertices, the Map will be returned with the assumption of single property values along with T.id and T.label. Prefer valueMap(String...) if multi-property processing is required. For edges, keys will include additional related edge structure of Direction.IN and Direction.OUT which themselves are Map instances of the particular Vertex represented by T.id and T.label.",
			parameters: []
		},
		{
			since: "3.4.4",
			returns: "the traversal with an appended ElementMapStep.",
			description: "Map the Element to a Map of the property values key'd according to their Property.key(). If no property keys are provided, then all property values are retrieved. For vertices, the Map will be returned with the assumption of single property values along with T.id and T.label. Prefer valueMap(String...) if multi-property processing is required. For edges, keys will include additional related edge structure of Direction.IN and Direction.OUT which themselves are Map instances of the particular Vertex represented by T.id and T.label.",
			parameters: [
				{ type: "string", name: "propertyKeys", multiple: true, description: "the properties to retrieve" }
			]
		}
	],
	"emit": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with the appended RepeatStep",
			description: "Emit is used in conjunction with repeat(Traversal) to emit all objects from the loop.",
			parameters: []
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with the appended RepeatStep",
			description: "Emit is used in conjunction with repeat(Traversal) to determine what objects get emit from the loop.",
			parameters: [
				{ type: "predicate", name: "emitPredicate", description: "the emit predicate" }
			]
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with the appended RepeatStep",
			description: "Emit is used in conjunction with repeat(Traversal) to determine what objects get emit from the loop.",
			parameters: [
				{ type: "traversal", name: "emitTraversal", description: "the emit predicate defined as a traversal" }
			]
		}
	],
	"filter": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with the LambdaFilterStep added",
			description: "Map the Traverser to either true or false, where false will not pass the traverser to the next step.",
			parameters: [
				{ type: "predicate", name: "predicate", description: "the filter function to apply" }
			]
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with the TraversalFilterStep added",
			description: "Map the Traverser to either true or false, where false will not pass the traverser to the next step.",
			parameters: [
				{ type: "traversal", name: "filterTraversal", description: "the filter traversal to apply" }
			]
		}
	],
	"flatMap": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended TraversalFlatMapStep.",
			description: "Map a Traverser referencing an object of type E to an iterator of objects of type E2. The internal traversal is drained one-by-one before a new E object is pulled in for processing.",
			parameters: [
				{ type: "traversal", name: "flatMapTraversal", description: "the traversal generating objects of type E2" }
			]
		}
	],
	"fold": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended FoldStep",
			description: "Rolls up objects in the stream into an aggregate list.",
			parameters: []
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended FoldStep",
			description: "Rolls up objects in the stream into an aggregate value as defined by a seed and BiFunction.",
			parameters: [
				{ type: "any", name: "seed", description: "the value to provide as the first argument to the foldFunction" },
				{ type: "any", name: "foldFunction", description: "the function to fold by where the first argument is the seed or the value returned from subsequent calss and the second argument is the value from the stream" },
			]
		}
	],
	"from": [
		{
			since: "3.1.0-incubating",
			returns: "the traversal with the modified FromToModulating step.",
			description: "Provide from()-modulation to respective steps.",
			parameters: [
				{ type: "string", name: "fromStepLabel", description: "the step label to modulate to." }
			]
		},
		{
			since: "3.1.0-incubating",
			returns: "the traversal with the modified AddEdgeStep.",
			description: "When used as a modifier to addE(String) this method specifies the traversal to use for selecting the outgoing vertex of the newly added Edge.",
			parameters: [
				{ type: "traversal", name: "fromVertex", description: "the traversal for selecting the outgoing vertex" }
			]
		}
	],
	"group": [
		{
			since: "3.1.0-incubating",
			returns: "the traversal with an appended GroupStep.",
			description: "Organize objects in the stream into a Map. Calls to group() are typically accompanied with by() modulators which help specify how the grouping should occur.",
			parameters: []
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended GroupStep.",
			description: "Organize objects in the stream into a Map. Calls to group() are typically accompanied with by() modulators which help specify how the grouping should occur.",
			parameters: [
				{ type: "string", name: "sideEffectKey", description: "the name of the side-effect key that will hold the aggregated grouping" }
			]
		}
	],
	"groupCount": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended GroupCountStep.",
			description: "Counts the number of times a particular objects has been part of a traversal, returning a Map where the object is the key and the value is the count.",
			parameters: []
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended GroupCountStep.",
			description: "Counts the number of times a particular objects has been part of a traversal, returning a Map where the object is the key and the value is the count.",
			parameters: [
				{ type: "string", name: "sideEffectKey", description: "the name of the side-effect key that will hold the aggregated grouping" }
			]
		}
	],
	"has": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended HasStep.",
			description: "Filters vertices, edges and vertex properties based on the existence of properties.",
			parameters: [
				{ type: "string", name: "propertyKey", description: "the key of the property to filter on for existence" }
			]
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended HasStep.",
			description: "Filters vertices, edges and vertex properties based on their properties.",
			parameters: [
				{ type: "string", name: "propertyKey", description: "the key of the property to filter on" },
				{ type: "any", name: "value", description: "the value to compare the property value to for equality" }
			]
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended HasStep.",
			description: "Filters vertices, edges and vertex properties based on their properties.",
			parameters: [
				{ type: "string", name: "propertyKey", description: "the key of the property to filter on" },
				{ type: "predicate", name: "predicate", description: "the filter to apply to the key's value" }
			]
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended HasStep.",
			description: "Filters vertices, edges and vertex properties based on their properties.",
			parameters: [
				{ type: "string", name: "label", description: "the label of the Element" },
				{ type: "string", name: "propertyKey", description: "the key of the property to filter on" },
				{ type: "any", name: "value", description: "the value to compare the accessor value to for equality" }
			]
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended HasStep.",
			description: "Filters vertices, edges and vertex properties based on their properties.",
			parameters: [
				{ type: "string", name: "label", description: "the label of the Element" },
				{ type: "string", name: "propertyKey", description: "the key of the property to filter on" },
				{ type: "predicate", name: "predicate", description: "the filter to apply to the key's value" }
			]
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended HasStep.",
			description: "Filters vertices, edges and vertex properties based on the value of the specified property key.",
			parameters: [
				{ type: "string", name: "propertyKey", description: "the key of the property to filter on" },
				{ type: "traversal", name: "propertyTraversal", description: "the traversal to filter the property value by" }
			]
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended HasStep.",
			description: "Filters vertices, edges and vertex properties based on their properties.",
			parameters: [
				{ type: "accessor", name: "accessor", description: "the T accessor of the property to filter on" },
				{ type: "any", name: "value", description: "the value to compare the accessor value to for equality" }
			]
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended HasStep.",
			description: "Filters vertices, edges and vertex properties based on their properties.",
			parameters: [
				{ type: "accessor", name: "accessor", description: "the T accessor of the property to filter on" },
				{ type: "predicate", name: "predicate", description: "the filter to apply to the key's value" }
			]
		},
		{
			since: "3.1.0-incubating",
			returns: "the traversal with an appended HasStep.",
			description: "Filters vertices, edges and vertex properties based on their value of T where only T.id and T.label are supported.",
			parameters: [
				{ type: "accessor", name: "accessor", description: "the T accessor of the property to filter on" },
				{ type: "traversal", name: "propertyTraversal", description: "the traversal to filter the accessor value by" }
			]
		}
	],
	"hasId": [
		{
			since: "3.2.2",
			returns: "the traversal with an appended HasStep.",
			description: "Filters vertices, edges and vertex properties based on their identifier.",
			parameters: [
				{ type: "any", name: "id", description: "the identifier of the Element" },
				{ type: "any", name: "otherIds", multiple: true, description: "additional identifiers of the Element" }
			]
		},
		{
			since: "3.2.4",
			returns: "the traversal with an appended HasStep.",
			description: "Filters vertices, edges and vertex properties based on their identifier.",
			parameters: [
				{ type: "predicate", name: "predicate", description: "the filter to apply to the identifier of the Element" }
			]
		}
	],
	"hasKey": [
		{
			since: "3.2.4",
			returns: "the traversal with an appended HasStep.",
			description: "Filters vertices, edges and vertex properties based on their key.",
			parameters: [
				{ type: "predicate", name: "predicate", description: "the filter to apply to the key of the Element" }
			]
		},
		{
			since: "3.2.2",
			returns: "the traversal with an appended HasStep.",
			description: "Filters vertices, edges and vertex properties based on their key.",
			parameters: [
				{ type: "string", name: "label", description: "the key of the Element" }
			]
		},
		{
			since: "3.2.2",
			returns: "the traversal with an appended HasStep.",
			description: "Filters vertices, edges and vertex properties based on their key.",
			parameters: [
				{ type: "string", name: "label", description: "the key of the Element" },
				{ type: "string", name: "otherLabels", multiple: true, description: "additional key of the Element" }
			]
		}
	],
	"hasLabel": [
		{
			since: "3.2.4",
			returns: "the traversal with an appended HasStep.",
			description: "Filters vertices, edges and vertex properties based on their label.",
			parameters: [
				{ type: "predicate", name: "predicate", description: "the filter to apply to the label of the Element" }
			]
		},
		{
			since: "3.2.2",
			returns: "the traversal with an appended HasStep.",
			description: "Filters vertices, edges and vertex properties based on their label.",
			parameters: [
				{ type: "string", name: "label", description: "the label of the Element" }
			]
		},
		{
			since: "3.2.2",
			returns: "the traversal with an appended HasStep.",
			description: "Filters vertices, edges and vertex properties based on their label.",
			parameters: [
				{ type: "string", name: "label", description: "the label of the Element" },
				{ type: "string", name: "otherLabels", multiple: true, description: "additional labels of the Element" }
			]
		}
	],
	"hasNot": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended HasStep.",
			description: "Filters vertices, edges and vertex properties based on the non-existence of properties.",
			parameters: [
				{ type: "string", name: "propertyKey", description: "the key of the property to filter on for existence" }
			]
		}
	],
	"hasValue": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended HasStep.",
			description: "Filters vertices, edges and vertex properties based on their value.",
			parameters: [
				{ type: "any", name: "value", description: "the value of the Element" }
			]
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended HasStep.",
			description: "Filters vertices, edges and vertex properties based on their value.",
			parameters: [
				{ type: "any", name: "value", description: "the value of the Element" },
				{ type: "any", name: "otherValues", multiple: true, description: "additional values of the Element" }
			]
		},
		{
			since: "3.2.4",
			returns: "the traversal with an appended HasStep.",
			description: "Filters vertices, edges and vertex properties based on their value.",
			parameters: [
				{ type: "predicate", name: "predicate", description: "the filter to apply to the value of the Element" }
			]
		}
	],
	"id": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended IdStep.",
			description: "Map the Element to its Element.id().",
			parameters: []
		}
	],
	"identity": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended IdentityStep.",
			description: "Map the E object to itself. In other words, a \"no op.\"",
			parameters: []
		}
	],
	"in": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended VertexStep.",
			description: "Map the Vertex to its incoming adjacent vertices given the edge labels.",
			parameters: [
				{ type: "string", name: "edgeLabels", multiple: true, description: "the edge labels to traverse" }
			]
		}
	],
	"index": [
		{
			since: "3.4.0",
			returns: "the traversal with an appended IndexStep.",
			description: "Indexes all items of the current collection. The indexing format can be configured using the with(String, Object) and WithOptions.indexer. Indexed as list: [\"a\",\"b\",\"c\"] => [[\"a\",0],[\"b\",1],[\"c\",2]] Indexed as map: [\"a\",\"b\",\"c\"] => {0:\"a\",1:\"b\",2:\"c\"} If the current object is not a collection, this step will map the object to a single item collection/map: Indexed as list: \"a\" => [\"a\",0] Indexed as map: \"a\" => {0:\"a\"}",
			parameters: []
		}
	],
	"inE": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended VertexStep.",
			description: "Map the Vertex to its incoming incident edges given the edge labels.",
			parameters: [
				{ type: "string", name: "edgeLabels", multiple: true, description: "the edge labels to traverse" }
			]
		}
	],
	"inject": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended InjectStep.",
			description: "Provides a way to add arbitrary objects to a traversal stream.",
			parameters: [
				{ type: "any", name: "injections", multiple: true, description: "the objects to add to the stream" }
			]
		}
	],
	"inV": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended EdgeVertexStep.",
			description: "Map the Edge to its incoming/head incident Vertex.",
			parameters: []
		}
	],
	"is": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended IsStep.",
			description: "Filter the E object if it is not P.eq(V) to the provided value.",
			parameters: [
				{ type: "any", name: "value", description: "the value that the object must equal." }
			]
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended IsStep.",
			description: "Filters E object values given the provided predicate.",
			parameters: [
				{ type: "predicate", name: "predicate", description: "the filter to apply" }
			]
		},
	],
	"iterate": [
		{
			since: "3.0.0-incubating",
			returns: "the fully drained traversal.",
			description: "Iterates the traversal presumably for the generation of side-effects.",
			parameters: []
		}
	],
	"key": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended PropertyKeyStep.",
			description: "Map the Property to its Property.key().",
			parameters: []
		}
	],
	"label": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended LabelStep.",
			description: "Map the Element to its Element.label().",
			parameters: []
		}
	],
	"limit": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended RangeGlobalStep.",
			description: "Filter the objects in the traversal by the number of them to pass through the stream, where only the first n objects are allowed as defined by the limit argument.",
			parameters: [
				{ type: "long", name: "limit", description: "the number at which to end the stream" }
			]
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended RangeGlobalStep or RangeLocalStep depending on scope.",
			description: "Filter the objects in the traversal by the number of them to pass through the stream given the Scope, where only the first n objects are allowed as defined by the limit argument.",
			parameters: [
				{ type: "scope", name: "scope", description: "the scope of how to apply the limit" },
				{ type: "long", name: "limit", description: "the number at which to end the stream" }
			]
		}
	],
	"local": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with the appended LocalStep.",
			description: "Provides a execute a specified traversal on a single element within a stream.",
			parameters: [
				{ type: "traversal", name: "localTraversal", description: "the traversal to execute locally" }
			]
		}
	],
	"loops": [
		{
			since: "3.1.0-incubating",
			returns: "the traversal with an appended LoopsStep.",
			description: "If the Traverser supports looping then calling this method will extract the number of loops for that traverser.",
			parameters: []
		},
		{
			since: "3.4.0",
			returns: "the traversal with an appended LoopsStep.",
			description: "If the Traverser supports looping then calling this method will extract the number of loops for that traverser for the named loop.",
			parameters: [
				{ type: "string", name: "loopName", description: "the loop name" }
			]
		}
	],
	"map": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended LambdaMapStep.",
			description: "Map a Traverser referencing an object of type E to an object of type E2.",
			parameters: [
				{ type: "function", name: "function", description: "the lambda expression that does the functional mapping" }
			]
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended LambdaMapStep.",
			description: "Map a Traverser referencing an object of type E to an object of type E2.",
			parameters: [
				{ type: "traversal", name: "mapTraversal", description: "the traversal expression that does the functional mapping" }
			]
		}
	],
	"match": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended MatchStep.",
			description: "Map the Traverser to a Map of bindings as specified by the provided match traversals.",
			parameters: [
				{ type: "traversal", name: "matchTraversals", multiple: true, description: "the traversal that maintain variables which must hold for the life of the traverser" }
			]
		}
	],
	"math": [
		{
			since: "3.3.1",
			returns: "the traversal with the MathStep added.",
			description: "Map the Traverser to a Double according to the mathematical expression provided in the argument.",
			parameters: [
				{ type: "string", name: "expression", description: "the mathematical expression with variables refering to scope variables." }
			]
		}
	],
	"max": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended MaxGlobalStep.",
			description: "Determines the largest value in the stream.",
			parameters: []
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended MaxGlobalStep or MaxLocalStep depending on the Scope.",
			description: "Determines the largest value in the stream given the Scope.",
			parameters: [
				{ type: "scope", name: "scope", description: "the scope of how to apply max" }
			]
		}
	],
	"mean": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended MeanGlobalStep.",
			description: "Determines the mean value in the stream.",
			parameters: []
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended MeanGlobalStep or MeanLocalStep depending on the Scope.",
			description: "Determines the mean value in the stream given the Scope.",
			parameters: [
				{ type: "scope", name: "scope", description: "the scope of how to apply mean" }
			]
		}
	],
	"min": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended MinGlobalStep.",
			description: "Determines the smallest value in the stream.",
			parameters: []
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended MinGlobalStep or MinLocalStep depending on the Scope.",
			description: "Determines the smallest value in the stream given the Scope.",
			parameters: [
				{ type: "scope", name: "scope", description: "the scope of how to apply min" }
			]
		}
	],
	"none": [
		{
			since: "3.0.0-incubating",
			returns: "the updated traversal with respective NoneStep.",
			description: "Filter all traversers in the traversal. This step has narrow use cases and is primarily intended for use as a signal to remote servers that iterate() was called. While it may be directly used, it is often a sign that a traversal should be re-written in another form.",
			parameters: []
		}
	],
	"not": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended NotStep.",
			description: "Removes objects from the traversal stream when the traversal provided as an argument does not return any objects.",
			parameters: [
				{ type: "traversal", name: "notTraversal", description: "the traversal to filter by." }
			]
		}
	],
	"option": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with the modulated step.",
			description: "This step modifies choose(Function) to specifies the available choices that might be executed.",
			parameters: [
				{ type: "any", name: "pickToken", description: "the token that would trigger this option" },
				{ type: "traversal", name: "traversalOption", description: "the option as a traversal" },
			]
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with the modulated step",
			description: "This step modifies choose(Function) to specifies the available choices that might be executed.",
			parameters: [
				{ type: "traversal", name: "traversalOption", description: "the option as a traversal" }
			]
		}
	],
	"optional": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with the appended ChooseStep",
			description: "Returns the result of the specified traversal if it yields a result, otherwise it returns the calling element.",
			parameters: []
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with the appended ChooseStep",
			description: "Returns the result of the specified traversal if it yields a result, otherwise it returns the calling element.",
			parameters: [
				{ type: "string", name: "optionalTraversal", description: "the traversal to execute for a potential result" }
			]
		}
	],
	"or": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended OrStep.",
			description: "Ensures that at least one of the provided traversals yield a result.",
			parameters: []
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended OrStep.",
			description: "Ensures that at least one of the provided traversals yield a result.",
			parameters: [
				{ type: "traversal", name: "orTraversals", multiple: true, description: "filter traversals where at least one must be satisfied" }
			]
		}
	],
	"order": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended OrderGlobalStep.",
			description: "Order all the objects in the traversal up to this point and then emit them one-by-one in their ordered sequence.",
			parameters: []
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended OrderGlobalStep or OrderLocalStep depending on the scope.",
			description: "Order either the Scope.local object (e.g. a list, map, etc.) or the entire Scope.global traversal stream.",
			parameters: [
				{ type: "scope", name: "scope", description: "whether the ordering is the current local object or the entire global stream." }
			]
		}
	],
	"otherV": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended EdgeOtherVertexStep.",
			description: "Map the Edge to the incident vertex that was not just traversed from in the path history.",
			parameters: []
		}
	],
	"out": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended VertexStep.",
			description: "Map the Vertex to its outgoing adjacent vertices given the edge labels.",
			parameters: [
				{ type: "string", name: "edgeLabels", multiple: true, description: "the edge labels to traverse" }
			]
		}
	],
	"outE": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended VertexStep.",
			description: "Map the Vertex to its outgoing incident edges given the edge labels.",
			parameters: [
				{ type: "string", name: "edgeLabels", multiple: true, description: "the edge labels to traverse" }
			]
		}
	],
	"outV": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended EdgeVertexStep.",
			description: "Map the Edge to its outgoing/tail incident Vertex.",
			parameters: []
		}
	],
	"pageRank": [
		{
			since: "3.2.0-incubating",
			returns: "the traversal with the appended PageRankVertexProgramStep.",
			description: "Calculates a PageRank over the graph using a 0.85 for the alpha value.",
			parameters: []
		},
		{
			since: "3.2.0-incubating",
			returns: "the traversal with the appended PageRankVertexProgramStep.",
			description: "Calculates a PageRank over the graph.",
			parameters: [
				{ type: "double", name: "alpha", description: "" }
			]
		}
	],
	"path": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended PathStep.",
			description: "Map the Traverser to its Path history via Traverser.path().",
			parameters: []
		}
	],
	"peerPressure": [
		{
			since: "3.2.0-incubating",
			returns: "the traversal with the appended PeerPressureVertexProgramStep.",
			description: "Executes a Peer Pressure community detection algorithm over the graph.",
			parameters: []
		}
	],
	"profile": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended ProfileSideEffectStep.",
			description: "Allows developers to examine statistical information about a traversal providing data like execution times, counts, etc.",
			parameters: []
		},
		{
			since: "3.2.0-incubating",
			returns: "the traversal with an appended ProfileSideEffectStep.",
			description: "Allows developers to examine statistical information about a traversal providing data like execution times, counts, etc.",
			parameters: [
				{ type: "string", name: "sideEffectKey", description: "the name of the side-effect key within which to hold the profile object" }
			]
		}
	],
	"program": [
		{
			since: "3.2.0-incubating",
			returns: "the traversal with the appended ProgramVertexProgramStep.",
			description: "Executes an arbitrary VertexProgram over the graph.",
			parameters: [
				{ type: "any", name: "vertexProgram", description: "The vertex program to execute" }
			]
		}
	],
	"project": [
		{
			since: "3.2.0-incubating",
			returns: "the traversal with an appended ProjectStep.",
			description: "Projects the current object in the stream into a Map that is keyed by the provided labels.",
			parameters: [
				{ type: "string", name: "projectKey", description: "the projected key" }
			]
		},
		{
			since: "3.2.0-incubating",
			returns: "the traversal with an appended ProjectStep.",
			description: "Projects the current object in the stream into a Map that is keyed by the provided labels.",
			parameters: [
				{ type: "string", name: "projectKey", description: "the projected key" },
				{ type: "string", name: "otherProjectKeys", multiple: true, description: "additional keys to be projected" }
			]
		}
	],
	"properties": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended PropertiesStep.",
			description: "Map the Element to its associated properties given the provide property keys. If no property keys are provided, then all properties are emitted.",
			parameters: [
				{ type: "string", name: "propertyKeys", multiple: true, description: "the properties to retrieve" }
			]
		}
	],
	"property": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with the last step modified to add a property.",
			description: "Sets the key and value of a Property. If the Element is a VertexProperty and the Graph supports it, meta properties can be set. Use of this method assumes that the VertexProperty.Cardinality is defaulted to null which means that the default cardinality for the Graph will be used.\n\nThis method is effectively calls property(org.apache.tinkerpop.gremlin.structure.VertexProperty.Cardinality, Object, Object, Object...) as property(null, key, value, keyValues.",
			parameters: [
				{ type: "any", name: "key", description: "the key for the property" },
				{ type: "any", name: "value", description: "the value for the property" }
			]
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with the last step modified to add a property.",
			description: "Sets the key and value of a Property. If the Element is a VertexProperty and the Graph supports it, meta properties can be set. Use of this method assumes that the VertexProperty.Cardinality is defaulted to null which means that the default cardinality for the Graph will be used.\n\nThis method is effectively calls property(org.apache.tinkerpop.gremlin.structure.VertexProperty.Cardinality, Object, Object, Object...) as property(null, key, value, keyValues.",
			parameters: [
				{ type: "any", name: "key", description: "the key for the property" },
				{ type: "any", name: "value", description: "the value for the property" },
				{ type: "any", name: "keyValues", multiple: true, description: "any meta properties to be assigned to this property" }
			]
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with the last step modified to add a property.",
			description: "Sets a Property value and related meta properties if supplied, if supported by the Graph and if the Element is a VertexProperty. This method is the long-hand version of property(Object, Object, Object...) with the difference that the VertexProperty.Cardinality can be supplied.\n\nGenerally speaking, this method will append an AddPropertyStep to the Traversal but when possible, this method will attempt to fold key/value pairs into an AddVertexStep, AddEdgeStep or AddVertexStartStep. This potential optimization can only happen if cardinality is not supplied and when meta-properties are not included.",
			parameters: [
				{ type: "cardinality", name: "cardinality", description: "the specified cardinality of the property where null will allow the Graph to use its default settings" },
				{ type: "any", name: "key", description: "the key for the property" },
				{ type: "any", name: "value", description: "the value for the property" }
			]
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with the last step modified to add a property.",
			description: "Sets a Property value and related meta properties if supplied, if supported by the Graph and if the Element is a VertexProperty. This method is the long-hand version of property(Object, Object, Object...) with the difference that the VertexProperty.Cardinality can be supplied.\n\nGenerally speaking, this method will append an AddPropertyStep to the Traversal but when possible, this method will attempt to fold key/value pairs into an AddVertexStep, AddEdgeStep or AddVertexStartStep. This potential optimization can only happen if cardinality is not supplied and when meta-properties are not included.",
			parameters: [
				{ type: "cardinality", name: "cardinality", description: "the specified cardinality of the property where null will allow the Graph to use its default settings" },
				{ type: "any", name: "key", description: "the key for the property" },
				{ type: "any", name: "value", description: "the value for the property" },
				{ type: "any", name: "keyValues", multiple: true, description: "any meta properties to be assigned to this property" }
			]
		}
	],
	"propertyMap": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended PropertyMapStep.",
			description: "Map the Element to a Map of the properties key'd according to their Property.key(). If no property keys are provided, then all properties are retrieved.",
			parameters: [
				{ type: "string", name: "propertyKeys", multiple: true, description: "the properties to retrieve" }
			]
		}
	],
	"range": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended RangeGlobalStep.",
			description: "Filter the objects in the traversal by the number of them to pass through the stream. Those before the value of low do not pass through and those that exceed the value of high will end the iteration.",
			parameters: [
				{ type: "long", name: "low", description: "the number at which to start allowing objects through the stream" },
				{ type: "long", name: "high", description: "the number at which to end the stream - use -1 to emit all remaining objects" }
			]
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended RangeGlobalStep or RangeLocalStep depending on scope.",
			description: "Filter the objects in the traversal by the number of them to pass through the stream as constrained by the Scope. Those before the value of low do not pass through and those that exceed the value of high will end the iteration.",
			parameters: [
				{ type: "scope", name: "scope", description: "the scope of how to apply the range" },
				{ type: "long", name: "low", description: "the number at which to start allowing objects through the stream" },
				{ type: "long", name: "high", description: "the number at which to end the stream - use -1 to emit all remaining objects" }
			]
		}
	],
	"read": [
		{
			since: "3.4.0",
			returns: "the traversal with the IoStep modulated to read.",
			description: "This step is technically a step modulator for the the GraphTraversalSource.io(String) step which instructs the step to perform a read with its given configuration.",
			parameters: []
		}
	],
	"repeat": [
		{
			since: "3.4.0",
			returns: "the traversal with the appended RepeatStep.",
			description: "This step is used for looping over a traversal given some break predicate and with a specified loop name.",
			parameters: [
				{ type: "string", name: "repeatTraversal", description: "the traversal to repeat over" },
				{ type: "traversal", name: "loopName", description: "The name given to the loop" }
			]
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with the appended RepeatStep",
			description: "This step is used for looping over a traversal given some break predicate.",
			parameters: [
				{ type: "traversal", name: "repeatTraversal", description: "the traversal to repeat over" }
			]
		}
	],
	"sack": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended SackStep.",
			description: "Map the Traverser to its Traverser.sack() value.",
			parameters: []
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended SackStep.",
			description: "Map the Traverser to its Traverser.sack() value.",
			parameters: [
				{ type: "function", name: "sackOperator", description: "the operator to apply to the sack value" }
			]
		}
	],
	"sample": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended SampleGlobalStep.",
			description: "Allow some specified number of objects to pass through the stream.",
			parameters: [
				{ type: "integer", name: "amountToSample", description: "the number of objects to allow" }
			]
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended SampleGlobalStep or SampleLocalStep depending on the scope.",
			description: "Allow some specified number of objects to pass through the stream.",
			parameters: [
				{ type: "scope", name: "scope", description: "the scope of how to apply the sample" },
				{ type: "integer", name: "amountToSample", description: "the number of objects to allow" }
			]
		}
	],
	"select": [
		// TODO
		/*{
			since: "3.1.0-incubating",
			returns: "the traversal with an appended TraversalMapStep.",
			description: "A version of select that allows for the extraction of a Column from objects in the traversal.",
			parameters: [
				{ type: "column", name: "column", description: "the column to extract" }
			]
		},*/
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended SelectStep.",
			description: "Map the Traverser to the object specified by the selectKey and apply the Pop operation to it.",
			parameters: [
				{ type: "pop", name: "selectKey", description: "the key to project" }
			]
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended SelectStep.",
			description: "Map the Traverser to a Map projection of sideEffect values, map values, and/or path values.",
			parameters: [
				{ type: "pop", name: "pop", description: "if there are multiple objects referenced in the path, the Pop to use" },
				{ type: "string", name: "selectKey1", description: "the first key to project" },
				{ type: "string", name: "selectKey2", description: "the second key to project" }
			]
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended SelectStep.",
			description: "Map the Traverser to a Map projection of sideEffect values, map values, and/or path values.",
			parameters: [
				{ type: "pop", name: "pop", description: "if there are multiple objects referenced in the path, the Pop to use" },
				{ type: "string", name: "selectKey1", description: "the first key to project" },
				{ type: "string", name: "selectKey2", description: "the second key to project" },
				{ type: "string", name: "otherSelectKeys", multiple: true, description: "the third+ keys to project" }
			]
		},
		{
			since: "3.3.3",
			returns: "the traversal with an appended SelectStep.",
			description: "Map the Traverser to the object specified by the key returned by the keyTraversal and apply the Pop operation to it.",
			parameters: [
				{ type: "pop", name: "pop", description: "if there are multiple objects referenced in the path, the Pop to use" },
				{ type: "traversal", name: "keyTraversal", description: "the traversal expression that selects the key to project" }
			]
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended SelectStep.",
			description: "Map the Traverser to the object specified by the selectKey. Note that unlike other uses of select where there are multiple keys, this use of select with a single key does not produce a Map.",
			parameters: [
				{ type: "string", name: "selectKey", description: "the key to project" }
			]
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended SelectStep.",
			description: "Map the Traverser to a Map projection of sideEffect values, map values, and/or path values.",
			parameters: [
				{ type: "string", name: "selectKey1", description: "the first key to project" },
				{ type: "string", name: "selectKey2", description: "the second key to project" }
			]
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended SelectStep.",
			description: "Map the Traverser to a Map projection of sideEffect values, map values, and/or path values.",
			parameters: [
				{ type: "string", name: "selectKey1", description: "the first key to project" },
				{ type: "string", name: "selectKey2", description: "the second key to project" },
				{ type: "string", name: "otherSelectKeys", multiple: true, description: "the third+ keys to project" }
			]
		},
		{
			since: "3.3.3",
			returns: "the traversal with an appended TraversalSelectStep.",
			description: "Map the Traverser to the object specified by the key returned by the keyTraversal. Note that unlike other uses of select where there are multiple keys, this use of select with a traversal does not produce a Map.",
			parameters: [
				{ type: "traversal", name: "keyTraversal", description: "the traversal expression that selects the key to project" }
			]
		}
	],
	"shortestPath": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with the appended ShortestPathVertexProgramStep.",
			description: "Executes a Shortest Path algorithm over the graph.",
			parameters: []
		}
	],
	"sideEffect": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended LambdaSideEffectStep.",
			description: "Perform some operation on the Traverser and pass it to the next step unmodified.",
			parameters: [
				{ type: "function", name: "consumer", description: "the operation to perform at this step in relation to the Traverser" }
			]
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended TraversalSideEffectStep.",
			description: "Perform some operation on the Traverser and pass it to the next step unmodified.",
			parameters: [
				{ type: "traversal", name: "sideEffectTraversal", description: "the operation to perform at this step in relation to the Traverser" }
			]
		}
	],
	"simplePath": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended PathFilterStep.",
			description: "Filter the E object if its Traverser.path() is not Path.isSimple().",
			parameters: []
		}
	],
	"skip": [
		{
			since: "3.3.0",
			returns: "the traversal with an appended RangeGlobalStep.",
			description: "Filters out the first n objects in the traversal.",
			parameters: [
				{ type: "long", name: "skip", description: "the number of objects to skip" }
			]
		},
		{
			since: "3.3.0",
			returns: "the traversal with an appended RangeGlobalStep or RangeLocalStep depending on scope.",
			description: "Filters out the first n objects in the traversal.",
			parameters: [
				{ type: "scope", name: "scope", description: "the scope of how to apply the tail" },
				{ type: "long", name: "skip", description: "the number of objects to skip" }
			]
		}
	],
	"store": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended StoreStep.",
			description: "**Deprecated.** As of release 3.4.3, replaced by aggregate(Scope, String) using Scope.local.\nLazily aggregates objects in the stream into a side-effect collection.",
			parameters: [
				{ type: "string", name: "sideEffectKey", description: "the name of the side-effect key that will hold the aggregate" }
			]
		}
	],
	"subgraph": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended SubgraphStep.",
			description: "Extracts a portion of the graph being traversed into a Graph object held in the specified side-effect key.",
			parameters: [
				{ type: "string", name: "sideEffectKey", description: "the name of the side-effect key that will hold the subgraph" }
			]
		}
	],
	"sum": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended SumGlobalStep.",
			description: "Map the traversal stream to its reduction as a sum of the Traverser.get() values multiplied by their Traverser.bulk() (i.e. sum the traverser values up to this point).",
			parameters: []
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended SumGlobalStep or SumLocalStep depending on the Scope.",
			description: "Map the traversal stream to its reduction as a sum of the Traverser.get() values multiplied by their Traverser.bulk() given the specified Scope (i.e. sum the traverser values up to this point).",
			parameters: [
				{ type: "scope", name: "scope", description: "the scope of how to apply the sum" }
			]
		}
	],
	"tail": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended TailGlobalStep.",
			description: "Filters the objects in the traversal emitted as being last objects in the stream. In this case, only the last object will be returned.",
			parameters: []
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended TailGlobalStep.",
			description: "Filters the objects in the traversal emitted as being last objects in the stream. In this case, only the last n objects will be returned as defined by the limit.",
			parameters: [
				{ type: "long", name: "limit", description: "the number at which to end the stream" }
			]
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended TailGlobalStep or TailLocalStep depending on scope.",
			description: "Filters the objects in the traversal emitted as being last objects in the stream given the Scope. In this case, only the last object in the stream will be returned.",
			parameters: [
				{ type: "scope", name: "scope", description: "the scope of how to apply the tail" }
			]
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended TailGlobalStep or TailLocalStep depending on scope.",
			description: "Filters the objects in the traversal emitted as being last objects in the stream given the Scope. In this case, only the last n objects will be returned as defined by the limit.",
			parameters: [
				{ type: "scope", name: "scope", description: "the scope of how to apply the tail" },
				{ type: "long", name: "limit", description: "the number at which to end the stream" }
			]
		},
	],
	"timeLimit": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended TimeLimitStep.",
			description: "Once the first Traverser hits this step, a count down is started. Once the time limit is up, all remaining traversers are filtered out.",
			parameters: [
				{ type: "long", name: "timeLimit", description: "the count down time" }
			]
		}
	],
	"times": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with the appended RepeatStep.",
			description: "Modifies a repeat(Traversal) to specify how many loops should occur before exiting.",
			parameters: [
				{ type: "integer", name: "maxLoops", description: "the number of loops to execute prior to exiting" }
			]
		}
	],
	"to": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended VertexStep.",
			description: "Map the Vertex to its adjacent vertices given a direction and edge labels.",
			parameters: [
				{ type: "direction", name: "direction", description: "the direction to traverse from the current vertex" },
				{ type: "string", name: "edgeLabels", multiple: true, description: "the edge labels to traverse" }
			]
		},
		{
			since: "3.1.0-incubating",
			returns: "the traversal with the modified FromToModulating step.",
			description: "Provide to()-modulation to respective steps.",
			parameters: [
				{ type: "string", name: "toStepLabel", description: "the step label to modulate to" }
			]
		},
		{
			since: "3.1.0-incubating",
			returns: "the traversal with the modified AddEdgeStep.",
			description: "When used as a modifier to addE(String) this method specifies the traversal to use for selecting the incoming vertex of the newly added Edge.",
			parameters: [
				{ type: "traversal", name: "toVertex", description: "the traversal for selecting the incoming vertex" }
			]
		}
		// TODO
		/*{
			since: "3.3.0",
			returns: "the traversal with the modified AddEdgeStep.",
			description: "When used as a modifier to addE(String) this method specifies the traversal to use for selecting the incoming vertex of the newly added Edge.",
			parameters: [
				{ type: "vertex", name: "toVertex", description: "the vertex for selecting the incoming vertex" }
			]
		}*/
	],
	"toE": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended VertexStep.",
			description: "Map the Vertex to its incident edges given the direction and edge labels.",
			parameters: [
				{ type: "direction", name: "direction", description: "the direction to traverse from the current vertex" },
				{ type: "string", name: "edgeLabels", multiple: true, description: "the edge labels to traverse" }
			]
		}
	],
	"toV": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended EdgeVertexStep.",
			description: "Map the Edge to its incident vertices given the direction.",
			parameters: [
				{ type: "direction", name: "direction", description: "the direction to traverser from the current edge" }
			]
		}
	],
	"tree": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended TreeStep.",
			description: "Aggregates the emanating paths into a Tree data structure.",
			parameters: []
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended TreeStep.",
			description: "Aggregates the emanating paths into a Tree data structure.",
			parameters: [
				{ type: "string", name: "sideEffectKey", description: "the name of the side-effect key that will hold the tree" }
			]
		}
	],
	"unfold": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended UnfoldStep.",
			description: "Unrolls a Iterator, Iterable or Map into a linear form or simply emits the object if it is not one of those types.",
			parameters: []
		}
	],
	"union": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with the appended UnionStep.",
			description: "Merges the results of an arbitrary number of traversals.",
			parameters: [
				{ type: "traversal", name: "unionTraversals", multiple: true, description: "the traversals to merge" }
			]
		}
	],
	"until": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with the appended RepeatStep.",
			description: "Modifies a repeat(Traversal) to determine when the loop should exit.",
			parameters: [
				{ type: "predicate", name: "untilPredicate", description: "the predicate that determines when the loop exits" }
			]
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with the appended RepeatStep.",
			description: "Modifies a repeat(Traversal) to determine when the loop should exit.",
			parameters: [
				{ type: "traversal", name: "untilTraversal", description: "the traversal that determines when the loop exits" }
			]
		}
	],
	"V": [
		{
			since: "3.1.0-incubating",
			returns: "the traversal with an appended GraphStep.",
			description: "A V step is usually used to start a traversal but it may also be used mid-traversal.",
			parameters: []
		},
		{
			since: "3.1.0-incubating",
			returns: "the traversal with an appended GraphStep.",
			description: "A V step is usually used to start a traversal but it may also be used mid-traversal.",
			parameters: [
				{ type: "any", name: "vertexIdsOrElements", multiple: true, description: "vertices to inject into the traversal" }
			]
		}
	],
	"value": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended PropertyValueStep.",
			description: "Map the Property to its Property.value().",
			parameters: []
		}
	],
	"valueMap": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended PropertyMapStep.",
			description: "**Deprecated.** As of release 3.4.0, deprecated in favor of valueMap(String...) in conjunction with with(String, Object) or simple prefer elementMap(String...).\nMap the Element to a Map of the property values key'd according to their Property.key(). If no property keys are provided, then all property values are retrieved.",
			parameters: [
				{ type: "boolean", name: "includeTokens", description: "whether to include T tokens in the emitted map" },
				{ type: "string", name: "propertyKeys", multiple: true, description: "the properties to retrieve" }
			]
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended PropertyMapStep.",
			description: "Map the Element to a Map of the property values key'd according to their Property.key(). If no property keys are provided, then all property values are retrieved.",
			parameters: [
				{ type: "string", name: "propertyKeys", multiple: true, description: "the properties to retrieve" }
			]
		}
	],
	"values": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended PropertiesStep.",
			description: "Map the Element to the values of the associated properties given the provide property keys. If no property keys are provided, then all property values are emitted.",
			parameters: [
				{ type: "string", name: "propertyKeys", multiple: true, description: "the properties to retrieve their value from" }
			]
		}
	],
	"where": [
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended WherePredicateStep.",
			description: "Filters the current object based on the object itself or the path history.",
			parameters: [
				{ type: "predicate", name: "predicate", description: "the filter to apply" }
			]
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended WherePredicateStep.",
			description: "Filters the current object based on the object itself or the path history.",
			parameters: [
				{ type: "string", name: "startKey", description: "the key containing the object to filter" },
				{ type: "predicate", name: "predicate", description: "the filter to apply" }
			]
		},
		{
			since: "3.0.0-incubating",
			returns: "the traversal with an appended WherePredicateStep.",
			description: "Filters the current object based on the object itself or the path history.",
			parameters: [
				{ type: "traversal", name: "whereTraversal", description: "the filter to apply" }
			]
		}
	],
	"with": [
		{
			since: "3.4.0",
			returns: "the traversal with a modulated step.",
			description: "Provides a configuration to a step in the form of a key which is the same as with(key, true). The key of the configuration must be step specific and therefore a configuration could be supplied that is not known to be valid until execution.",
			parameters: [
				{ type: "string", name: "key", description: "the key of the configuration to apply to a step" }
			]
		},
		{
			since: "3.4.0",
			returns: "the traversal with a modulated step.",
			description: "Provides a configuration to a step in the form of a key and value pair. The key of the configuration must be step specific and therefore a configuration could be supplied that is not known to be valid until execution.",
			parameters: [
				{ type: "string", name: "key", description: "the key of the configuration to apply to a step" },
				{ type: "any", name: "value", description: "the value of the configuration to apply to a step" }
			]
		}
	],
	"write": [
		{
			since: "3.4.0",
			returns: "the traversal with the IoStep modulated to write",
			description: "This step is technically a step modulator for the the GraphTraversalSource.io(String) step which instructs the step to perform a write with its given configuration.",
			parameters: []
		}
	],
};
