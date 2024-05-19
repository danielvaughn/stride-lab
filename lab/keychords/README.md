
creates a very simple, state-machine-esque data structure for allowing "keychords" - conjunctions of key that combine together to form unique commands.

for example, `a` for add, `x` for cut, `c` for copy, etc.
within `a` you have `s` for shape, `t` for text, `i` for image, etc.

therefore you can combine them i.e. `a + s` for "add shape"
