# OpenAPI TS Dynamic FormBuilder
This project is a response to the challenge to create a dynamic form builder that generates forms from a JSON payload.

I used the [OpenAPI spec](https://swagger.io/docs/specification/about/) as a model for the JSON object.  This has the benefit of taking advantage of a pre-existing ecosystem of documentation, validation, and tools.  

# Summary of Requirements

## Bad stuff BLUF
Validation is janky and not well implemented.  Additionally, it's not incorporated into the OpenAPI TS schema. In the interest of sticking to the time frame requested I decided to leave it as is. In order to fix this I would
* implement Yup validation
* validate on the whole form instead of simply doing field level validation
* add validation to the OpenAPI TS schema

## Validation
_With the above section in mind, these validation requirements_ do _work in some limited, not production quality capacity_.
 - [x] First & third fields are always required
 - [x] Date field is conditionally required based on the select dropdown option value

## Requirements
 - [x] JSON representation of the form fields and values _(see further notes below)_
 - [x] React App renders the form(s)
 - [x] Form contains required parts
 - [x] Submit button disabled behavior (caveat: see 'Validation Rules' above)
 - [x] On click submit logs values to the console
 - [x] Some very basic SCSS applied

## Growing into a production ready app
The benefit of using the Open API spec is the ease with which an endpoint that accepts a form could be implemented. The consumer would simply have to format the POST body with valid schema and our backend would be equipped to correctly handle it.  Additionally, the predictable nature of the spec would make building a GUI for creating and saving forms a more easily implemented epic from a technical perspective.

## Testing Plan
Another casualty of the time limit, I would utilize Jest and `react-testing-library` to get code & branch coverage above acceptable thresholds (>95%).

## Screenshot
![Screenshot](image.png)