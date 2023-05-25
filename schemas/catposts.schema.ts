export const catposts = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/catpost",
  "title": "catpost",
  "description": "An catpost in the blog",
  "type": "object",
  "properties": {
    "title": {
      "description": "The title of the  catpost",
      "type": "string"
    },
    "allText": {
      "description": "Body text about cat",
      "type": "string"
    },
    "breed":{
      "description": "cat breed",
      "type": "string"
    },
    "summary": {
      "description": "Optional short text summary of catpost",
      "type": "string"
    },
    "imageURL": {
      "description": "URL for main image to show in catpost",
      "type": "uri"
    },
    "state": {
      "description": "Is the cat state (Here/Not)",
      "type": "String"
    },
    "staffid": {
      "description": "User ID of the article author",
      "type": "integer",
      "minimum": 0
    },
  }, "required": ["title", "allText","breed","staffid"]
}