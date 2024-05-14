
an expressive command syntax for declaring styles

- css properties can be enumerated or non-enumerated
- an enumerated property is one where there is a finite list of possible values
- a non-enumerated property can be (nearly) anything, such as a color or a pixel dimension
- increasing dev velocity means providing a subset of values for non-enumerated css properties
- this is what tailwind does, but at the cost of littering the html with long lists of classes

property: `accent-color`  
command: `accent-${color}`  
