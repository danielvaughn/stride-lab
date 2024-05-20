
```
// colons are not legal:
<div data-style-:hover-background-color="red"></div>
```

so we need some valid naming convention that can:
1. distinguish pseudo states from style properties
2. distinguish pseudo states from arbitrary parameters

1. use the attribute value

```
<div data-style-background-color=":hover:red"></div>
```

downside is that you can't apply multiple values to the same style,
unless you come up with a bizarre syntax for it, like this:

```
<div data-style-background-color="blue;:hover:red;"></div>
```

that...might work?
I need to do some sanity checking on legal css values to see if colons are used anywhere.
apart from probably being legal in the content attribute, I'm not aware of it.
