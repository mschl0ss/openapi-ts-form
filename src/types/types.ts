/**
 * This is a TS interpretation of the standard Open API spec schema object
 * For more info, see https://swagger.io/docs/specification/data-models/
 */
type PropertyType = "string" | "array" | "enum";

/**
* OpenAPI primitives support an optional "format" parameter. 
* More info can be found here: https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#format
*/
type StringFormat = "date" | "date-time" | "password"

export type BaseProperty = {
    /**
     * The type of the property
     */
    type: PropertyType;
    /**
     * The label of the form field
     */
    description: string;
}

export type StringProperty = BaseProperty & {
    /**
     * The PropertyType union narrowed to only accept "string"
     */
    type: "string";
    /**
     * For the purposes of this exercise, only "date" is truly supported
     */
    format?: StringFormat;
}

export type ArrayProperty = BaseProperty & {
    /**
     * The PropertyType union narrowed to only accept "array"
     */
    type: "array";
    /**
     * OpenAPI supports deeply nested arrays
     */
    items: BaseProperty[];
}

export type EnumProperty = BaseProperty & {
    /**
     * The PropertyType union narrowed to only accept "enum"
     */
    type: "enum";
    /**
     * This is a valid property type in Open API spec, but in this exercise it is
     * functionally just an ArrayProperty with string items
     */
    enum: string[];
}

/**
 * Describes the type of form field
 */
export const FieldType = {
    /**
     * The text immediately below the form header
     */
    subtitle: "subtitle",
    /**
     * A standard dropdown select
     */
    select: "select",
    /**
     * A standard text box
     */
    textInput: "textInput",
    /**
     * A standard text area
     */
    textArea: "textArea",
    /**
     * The text of the submit button
     */
    submitButton: "submitButton"
}

export type FieldTypeKey = Partial<keyof typeof FieldType>;

export type PropertyCollection = { [key in FieldTypeKey]: BaseProperty[] };
/**
 * Special field types are those that are not rendered in the normal input field generation
 * 
 * @param fieldType a member of the FieldType enum
 * @returns a boolean describing whether the supplied field type is "special"
 */
export const isSpecialFieldType = (fieldType: FieldTypeKey): boolean => {
    return [FieldType.subtitle, FieldType.submitButton].includes(fieldType);
}

export type OpenApiForm = {
    /**
     * The text used for the form header
     */
    description: string;
    /**
     * A collection of properties describing the form fields.
     * All properties of a given type should be included in the collection of that FieldType
     * TODO - how to enforce field order? Perhaps a separate config object? 
     * That's awful, need to find a way to include it in each property that is valid Open API
     */
    properties: PropertyCollection,
}

