RESTful API documentation
=========================

The Tournament of Lulz APIs permit a client to host a small tournament where the user compares pairs of images to determine which image in a set is the funniest.  The APIs are simple, but support a number of different tournament use cases: [single elimination](http://en.wikipedia.org/wiki/Single-elimination_tournament), [double elimination](http://en.wikipedia.org/wiki/Double-elimination_tournament), [swiss](http://en.wikipedia.org/wiki/Swiss_system_tournament), [round-robin](http://en.wikipedia.org/wiki/Round-robin_tournament), etc.

It is the responsibility of the client to manage its tournament flows.  All the back-end does is calculate and store ratings information, and prevents image pairs from being rated more than once in a given tournament.

Because of how the system is designed, the server can also accurately report the funniest images in the system as determined by all clients' tournament results (regardless of tournament format).

## A Brief Note on Transport Formats

All API endpoints take JSON for their bodies and return JSON for their responses.  Put differently, all requests should use the `application/json` content type, and should expect the same in return.

Because JSON is an extensible format, clients may receive additional information (which they can safely ignore) and are responsible for validating that they recieve what they require to function.

## API Call Flow

The first thing a client should do is [start a tournament](#post_tournament).  This will do a few things:

1. The server will randomly select a set of `image`s to use in the tournament.  They will be returned in the form of `image` objects, which contain all the metadata the client should require in order to display the image.
2. The server will start the bookeeping for the tournament results.
3. The API will return a `tournament_id`, which the client will use to indicate which tournament it's participating in when making future calls to the APIs.

Once this information has been retrieved, the client is free to organize the `image`s into whatever tournament structure it likes, with two restrictions:

1. Matches in the tournament must be comprised of directly comparing one `image` against another.
2. Any given pair of `image`s is not permitted to occur twice in the same tournament.
	* Example: If "cat with a pancake on its head" is matched up against "dog licking baby's ice cream", those two animal images mustn't compete again in the current tournament.

*Note: this is naturally the case for most tournament formats.*

When the user selects which `image` they like better, the client need only [register that win](#post_tournament_results) with the server.  In the event of a bye, the client does not need to tell the server anything.

After the tournament has completed, it's always nice to tidy up by [ending the tournament](#delete_tournament).  Yes, the server will eventually clean things up on its own, but doing this step can help the client avoid state machine bugs of its own.

# Common JSON Objects

## [Image](id:image_object)

### Purpose and Usage
This object refers to an image in the system, and includes its associated metadata.

### Attributes
* `image_id` - An internal id for the image, used for ease of reference to a given image.
* `page_url` - The URL where this image can be found on the open internet.
* `image_url` - A direct link to the actual image.
* `thumbnail_url` - A smaller version of the image, for previewing or low bandwidth use.
* `title` - A string with the image's title
* `rating` - A numeric indication of the image's relative strength.  Higher numbers indicate that a user is more likely to pick this image in a tournament.  Please note that this is not the same as a ranking.

### Example JSON

		{
			'image_id': '123',
			'page_url': 'http://imgur.com/gallery/w2RByDr',
			'image_url': 'http://i.imgur.com/w2RByDr.png',
			'thumbnail_url': 'http://i.imgur.com/w2RByDrs.png',
			'title': "OP's Delivery Service",
			'rating': 1234.56
		}

---
# Common Errors and HTTP Statuses

Most requests will be successful.  However, there are a few circumstances where the server will be unable to service a request.  In the event that an error occurs, an appropriate HTTP status code will be selected, and the body will include additional information if available.

For more information on common HTTP status codes and their causes, please see the Wikipedia page on [HTTP status codes](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes).

## Standard Error Response

### Body parameters

* `error` *(optional)* - A human-readable string with additional details on what happened, if available.

### Example error response body

	503 Service Unavailable
	
	{
		'error': "Unable to connect to database"
	}

### Example HTTP Statuses

#### 200 OK
Everything is awesome.  See the individual endpoints for details on what the response body will contain.

#### 400 Bad Request
Probably you're using the wrong content type when sending your request (it should be `application/json`), or your hand-rolled JSON has a syntax error.

#### 404 Not Found
Either you're talking about something that no longer exists (e.g. an expired `tournament_id`), or your API endpoint has a typo.

#### 418 I'm a teapot
The developer has forgotten to take out a debug error response, or the client has stumbled upon an easter egg in the API.

#### 5xx
These will happen when the server is having a bad day.  The body of the response will contain additional information, if available.  The client generally can't do anything about these except retry later.

---
# API Endpoints

## [GET /api/top_images.json?start=&lt;start&gt;&limit=&lt;limit&gt;](id:get_top_images)

### Purpose
Fetch a list of the top images, primarily for use in a top-10 type of view.  Results will be sorted by descending rating.

### URL Parameters
* `start` *(optional)* - A 0-based numeric index indicating the first of the top you'd like to retrieve.  If omitted, the response will start with the most popular image (equivalent to `start` = 0).
* `limit` *(optional)* - How many records you'd like to retrieve.  Note that you are not guaranteed to receive this many records!  If omitted, the server will pick a sensible default as it sees fit.

### Body Parameters
*Not applicable*

### Sample Request Body
*Not applicable*

### Response Parameters
* `images` - An array of [image objects](#image_object), in descending rating order, starting from the given `start` index.  This is not guaranteed to have `limit` entries, and may even be empty - the system has a finite number of images and can't return something that doesn't exist, of course.

### Sample Response
	200 OK
	
	{
		'images':
		[
			<image object 0>,
			<image object 1>,
			<image object 2>,
			<image object 3>,
			<image object 4>
		]
	}

### Error Responses
* Sending a non-numeric `start` or `limit` will result in a `400 Bad Request` response.
* Giving a `start` larger than the number of images in the system will result in a `200 OK` response where `images` is an empty array.
* Giving a `start`/`limit` combination which extend beyond the number of images in the system will result in a shortened or empty `images` array.

---
## [POST /api/tournament.json](id:post_tournament)

### Purpose
Fetch top images and their ratings, primarily for use as a top-10 type of view.  Results will be sorted by descending rating.

### URL Parameters
*None*

### Body Parameters
* `starting_image_id` *(optional)* - an image id that the user wants to include in their tournament.  If the user does not specify a starting image id, the POST body can be left blank.
* `num_images` - An integer specifying how many images the client wants to include in the tournament.  Must be larger than 1.

### Sample Request Body
	{
		'num_images': 8,
		'starting_image_id': 123
	}

### Response Parameters

* `tournament_id` - An id which identifies the newly created tournament.
* `images` - An array of `num_images` image objects, to be used in the tournament.

### Sample Response
	200 OK

	{
		'tournament_id': 'fb156a9e-618d-4355-8b1b-5657d9704d90',
		'images': [
			<image object 0>,
			<image object 1>,
			<image object 2>,
			<image object 3>,
			<image object 4>,
			<image object 5>,
			<image object 6>,
			<image object 7>
		]
	}

### Error Responses

* Sending a non-existent or otherwise invalid `starting_image_id` will result in a `404 Not Found` response.
* Sending `num_images` that is less than 1, larger than a server-specified "reasonable" value, or a non-numeric entry will result in a `400 Bad Request` response.

---
## [POST /api/tournament/&lt;tournament_id&gt;/results.json](id:post_tournament_results)

### Purpose
To indicate a player-selected match win between two images in a tournament.  This will affect the ratings of both images given, per the ratings algorithm on the server side.

### URL Parameters
* `tournament_id` - the tournament id being used for the current images matchup

### Body Parameters
* `winner_id` - The `image_id` of the image which won the pairing
* `loser_id` - The `image_id` of the image which lost the pairing

### Sample Request Body
	{
		'winner_id': 123,
		'loser_id': 456
	}

### Response Parameters
*Not applicable*

### Sample Response
	200 OK

### Error Responses

* A `404 Not Found` will be returned if the `tournament_id` parameter refers to an invalid or expired tournament.  If this occurs, clients should gracefully end their current tournament and permit the user to start a new one.
* A `403 Forbidden` will be returned if `winner_id` or `loser_id` refer to an `image_id` that is not a part of the tournament referred to by `tournament_id`.

---
## [DELETE /api/tournament/&lt;tournament_id&gt;.json](id:delete_tournament)

### Purpose
Ends a tournament.

### URL Parameters
* `tournament_id` - the tournament id to end

### Body Parameters
*Not applicable*

### Sample Request Body
*Not applicable*

### Response Parameters
*Not applicable*

### Sample Response
	200 OK

### Error Responses

* Per REST semantics, deleting a non-existent or malformed `tournament_id` is acceptable, and will still return a `200 OK`.
