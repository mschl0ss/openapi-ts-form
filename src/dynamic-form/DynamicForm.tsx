import { Typography } from "@mui/material"
import { ArrayProperty, BaseProperty, FieldTypeKey, OpenApiForm, PropertyCollection, StringProperty, isSpecialFieldType } from "../types/types"
import { Fragment, useCallback } from "react";
import { Field, Form, Formik, FormikErrors, FormikProps, FormikTouched } from "formik";

export default function DynamicForm({ form }: { form: OpenApiForm }): JSX.Element {
    const { description: title, properties } = form;

    /** A memoized function that strips out any special fields and ensures required fields exist
     * @return a PropertyCollection from which to build the form
     */
    const getFormFields = useCallback((): PropertyCollection => {
        const formFields = properties;
        // First remove any special field types
        for (const key in Object.values(formFields)) {
            if (isSpecialFieldType(key as FieldTypeKey)) {
                delete formFields[key as FieldTypeKey]
            }
        }
        // If there is not custom submit button text supplied, use a default
        if (!formFields.submitButton || !formFields.submitButton.length) {
            formFields["submitButton" as FieldTypeKey] = [{
                type: "string",
                description: "Submit"
            }]
        }
        return formFields;
    }, [properties])

    /**
     * Get initial values for formik
     * @returns all of the form fields flattened into a shallow object for formik
     */
    const getInitialValues = (): { [fieldLabel: string]: any } => {
        const formLabels: { [fieldLabel: string]: any } = {};
        Object.values(getFormFields())
            .forEach(propertiesOfType => {
                propertiesOfType.forEach(property => {
                    formLabels[property.description] = ""
                })
            })
        return formLabels;
    }

    /**
     * 
     * @returns The subtitle string, built from concatenating all properties of type "subtitle"
     */
    const getSubtitles = () => {
        const subtitles = properties.subtitle;

        if (!subtitles) { return null; }

        return subtitles.map(obj => obj.description).join(" ");
    }

    const validateDate = (value: any, selectValue: any) => {
        // TODO youre a dumb jackass
        if ((selectValue === "Incorrect Pay" || selectValue === "Missing Expense") && !value) {
            return "Required"
        }
    }

    const validateField = (value: any) => !value && "Required";

    /**
     * 
     * @param fieldType a key of the FieldType object
     * @param baseProperty the property to map to an input
     * @returns a single element with an input and optionally a label as children
     */
    const getInputByType = (fieldType: FieldTypeKey, baseProperty: BaseProperty, formikProps: FormikProps<any>): JSX.Element => {
        const { values, errors, touched } = formikProps;
        const Label = () => <label className="form__label" htmlFor={baseProperty.description}>{baseProperty.description}</label>;

        const Error = () => (
            <div className="form__error">
                {errors[baseProperty.description] && touched[baseProperty.description] && <div><>{errors[baseProperty.description]}</></div>}
            </div>);

        switch (fieldType) {
            case "select":
                return (
                    <>
                        <Label />
                        <Field as="select" name={baseProperty.description} validate={validateField}>
                            <option disabled value=""> -- select an option -- </option>
                            {(baseProperty as ArrayProperty).items.map(item => (
                                // The spec may support deeply nested arrays, but I do not at this time. Sorry.
                                item instanceof Array ? null : <option value={item.description}>{item.description}</option>
                            ))}
                        </Field>
                        <Error />
                    </>
                );
            case "textInput":
                const inputType = (baseProperty as StringProperty).format === "date" ? "date" : "text";
                const validateFunc = (baseProperty as StringProperty).format === "date"
                    ? (value: any) => validateDate(value, values["What does your enquiry relate to?"])
                    : validateField;
                return (
                    <>
                        <Label /><Field as="input" type={inputType} name={baseProperty.description} validate={validateFunc} />
                        <Error />
                    </>);
            case "textArea":
                return (<>
                    <Label />
                    <Field as="textarea" name={baseProperty.description} validate={validateField} />
                    <Error />
                </>);
            case "submitButton":
                const disabled = Object.values(errors).some(value => !!value) || !Object.values(touched).some(value => value === true);
                return <button type="submit" className="form__submit" disabled={disabled}>{baseProperty.description}</button>;
            default:
                return <></>
        }
    }

    /**
     * @returns Returns inputs mapped to their appropriate input type
     */
    const getFormInputs = (formikProps: FormikProps<any>): JSX.Element[] => {
        return Object
            .keys(getFormFields())
            .map(fieldType => {
                return <Fragment key={fieldType}>
                    {getFormFields()[fieldType as FieldTypeKey].map(baseProperty => {
                        return <Fragment key={baseProperty.description}>
                            {getInputByType(fieldType as FieldTypeKey, baseProperty, formikProps)}
                        </Fragment>
                    })}
                </Fragment>
            })
    }

    return (
        <div className="wrapper">
            <header>
                <Typography variant="h2">
                    {title}
                </Typography>
                <Typography variant="subtitle1">
                    {getSubtitles()}
                </Typography>
                <section>
                </section>
            </header>
            <main className="main-wrapper">
                <Formik
                    initialValues={getInitialValues()}
                    onSubmit={(values) => console.log(values)}
                >
                    {(formikProps: FormikProps<any>) => (
                        <Form className="form">
                            {getFormInputs(formikProps)}
                        </Form>
                    )}
                </Formik>
            </main>
        </div>
    )
}

