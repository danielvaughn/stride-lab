
// adjacency list for hierarchy, dictionaries for node data

export const initialData = {
  hierarchy: {
    html: ['body'],
    body: ['a', 'b'],
    a: [],
    b: [],
  },
  styles: {
    html: {
      backgroundColor: '#222',
    },
    body: {
      margin: '0px',
    },
    a: {
      color: 'red',
    },
    b: {
      border: '1px solid blue',
    },
  },
  attributes: {
    html: {
      'data-type': 'html',
    },
    body: {
      'data-type': 'body',
    },
    a: {
      'data-type': 'text',
    },
    b: {
      'data-type': 'image',
    },
  },
  content: {
    a: 'Hello World',
    b: 'assets/hero-image.jpg',
  },
}
