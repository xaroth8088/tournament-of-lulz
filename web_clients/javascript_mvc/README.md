CLIENT - JavaScript MVC
=============

A client built from MVC basics, not using any particular framework.

### The case for

The upside of a build-your-own client architecture is that it can be extremely flexible.  At no point will development be stopped because the surrounding framework is unable to account for a specific use case.  Performance can be maximized, because the code will be custom to the application's specific usage patterns.

Building the framework from scratch can be a good choice for projects which will need to be complex, performant, and maintained for a long period of time.  It's can also be a good choice for retrofitting existing projects due to its high levels of encapsulation and flexibility of application.

### The case against
Most companies are not in the business of building frameworks, so time spent on the internals may carry a somewhat larger opportunity cost.  Many challenges with the framework itself will have already been solved by other frameworks, leading to some potentially wasted effort.

Another downside of a build-your-own client architecture is that it can be somewhat fragile.  A solid understanding of the fundamentals is required for all who work on the project, and any shortcuts taken have to be considered especially carefully, lest they silently grow into big problems.

A custom framework is typically not a good fit for prototyping or rapid initial development, or for teams with mixed skill levels.

## Setup

Configure your favorite web server to serve up the www directory, using nginx or the like.

As is the case for all of the JavaScript clients, the web server will need to present the API endpoints as though they're on the same domain as the static HTML files to satisfy browsers' same-domain policies.  Normally, this is done by way of a transparent proxy for those endpoints.

Please see your web server's documentation for how to set this up.  [An example for nginx can be found here.](http://nginx.org/en/docs/beginners_guide.html#proxy)

Note that all endpoints are served from the /api/ path, which should simplify configuration somewhat.

## Notes

This client follows a traditional MVC-style architecture, breaking up the visual page into small, self-contained widgets.  Business model objects are kept separate from client model objects.  View updating is done by subscribing to updates from its model, which always triggers a refresh of all of its data fields.  Even though it's a little extra wiring, DOM events are the domain of the views so that the models and controllers might be re-usable in a non-browser context.

Alternate variants of MVC exist, of course, but this structure was chosen for its ease of implementation and its flexibility.

## Libraries Used

* [jsclass](http://jsclass.jcoglan.com/) is used to ease working with the class inheritance mechanisms that are a hallmark of MVC development.
* [jQuery](http://jquery.com/) is used to ease working with the DOM.
