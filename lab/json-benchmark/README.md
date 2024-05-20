
this lab was inspired by the `css-data` lab.
I decided pre-emptively not to store the style attributes as JSON,
because "JSON serialization and deserialization is expensive".

just goes to show that you always need to test your hypothesis.
the test here isn't exactly scientific, but the results are pretty stark.

given the following data:

```
{
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
}
```

I wanted to test which method was more performant:
1. storing it as a single data-attribute via JSON
2. storing each k/v pair individually as a unique data attribute

This test does two things with the data.
First, it builds 1000 elements,
assigns the data attributes to them,
and appends them to the DOM.
Then, it performs a retrieval operation on each generated element,
which will allow us to evaluate the relative performance of _getting_ multiple attribute values vs parsing one JSON object.

The results here are _not at all_ what I would have expected,
though in hindsight I should have,
because DOM manipulation is also known to be fairly expensive.

| technique | operation | latency |
| --- | --- | --- |
| json | render | 0.82ms
| json | retrieve | 0.74ms
| raw | render | 10.23 ms
| raw | retrieve | 2.61ms

As you can see, rendering with a JSON attribute is ~10X faster,
and retrieving the same elements is ~3X faster.
