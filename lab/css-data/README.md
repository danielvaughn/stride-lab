
trying out kind of a weird idea - storing css in data attributes.
acknowledging ahead of time that this is probably extremely unperformant.

however, i have my reasons:

1. I need to store and retrieve html and css files together, always
2. when dom elements are manipulated, the CSSOM needs to be updated as well
3. currently there are no observation utilities built into the CSSOM, whereas we _do_ have DOMMutationObserver
4. synchronizing data between the DOM and the CSSOM is tedious and error prone
5. ensuring transaction atomicity is difficult with two separate data stores
6. having the css updates be a second-order effect from the primary DOM mutation is a _very nice_ programming model, from a DX POV

requirements:
- formulate a convention for data-attribute semantics that can be used to represent css styles
- use a DOMMutationObserver to watch for all mutations
- on element add, scan new elements for matching attributes, and create a rule in the CSSOM
- on attribute update, check whether it matches a style, and update rule accordingly
- on element remove, scan deleted elements for matching attributes, and remove rules from the CSSOM

constraints:
- the attributes should be atomic (i.e. relate to one style), mostly because JSON serialization/deserialization is expensive
- the attributes need to at least support psuedo states (hover)
- would be nice to think about arbitrary parametric rendering as well, but not strictly a requirement
