SERVER - Mock
=============

Not really a 'server' per se, but rather a collection of static files so that various client functionality can be written without relying on a live server.

## Setup

Configure your favorite web server to serve up this directory (nginx or the like).

## Configuration
None.

## Notes
The beauty of having a well-defined set of APIs is that it's easy to decouple front- and back- end development.  The mocks can be written quickly and agreed to by everyone working on a feature, and can also serve as codified examples.  Additionally, they can be useful when starting out on the API definition, because the cost of changing the spec at this level is minimal.

Some mocks may need to be slightly more complex in order to fully simulate client behavior, but in the majority of cases a collection of simple static files will do the trick.

Static mocks aren't perfect, of course - anything resembling real server behavior or error conditions can require some acrobatics on the client to get to work right.  Nonetheless, they're a great accellerant when starting development.
