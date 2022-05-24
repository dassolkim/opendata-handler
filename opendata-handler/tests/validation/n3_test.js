const n3 = require('n3')

const { DataFactory } = n3
const { namedNode, literal, defaultGraph, quad } = DataFactory

const parser = new n3.Parser();

parser.parse(
  `PREFIX c: <http://example.org/cartoons#>
   c:Tom a c:Cat.
   c:Jerry a c:Mouse;
           c:smarterThan c:Tom.`,
  (error, quad, prefixes) => {
    if (quad)
      console.log(quad);
    else
      console.log("# That's all, folks!", prefixes);
  });


// Createing triples/quads
const myQuad = quad(
    namedNode('https://ruben.verborgh.org/profile/#me'),
    namedNode('http://xmlns.com/foaf/0.1/givenName'),
    literal('Ruben', 'en'),
    defaultGraph(),
  )
 
console.log(myQuad.termType);              // Quad
console.log(myQuad.value);                 // ''
console.log(myQuad.subject.value);         // https://ruben.verborgh.org/profile/#me
console.log(myQuad.object.value);          // Ruben
console.log(myQuad.object.datatype.value); // http://www.w3.org/1999/02/22-rdf-syntax-ns#langString
console.log(myQuad.object.language);  
console.log(myQuad.object.datatype)
console.log(myQuad)
console.log(myQuad.object)