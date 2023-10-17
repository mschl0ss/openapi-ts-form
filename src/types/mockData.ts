import { ArrayProperty, FieldType, OpenApiForm, StringProperty } from "./types"



const subtitle: StringProperty = {
    type: 'string',
    description: "Please use this form for any Payroll related enquiries"
}

const submitButton: StringProperty = {
    type: "string",
    description: "Submit Payroll Enquiry"
}

const enquiryTypes: string[] = ["Incorrect Pay", "Missing Expense", "Change of Bank Details", "Change of Address", "Other"];

const enquiryTypeField: ArrayProperty = {
    type: "array",
    description: "What does your enquiry relate to?",
    items: enquiryTypes.map(enquiryType => ({ type: "string", description: enquiryType }))
}

const dateOfPayslipField: StringProperty = {
    type: "string",
    description: "Date of payslip being queries (if applicable)",
    format: "date"
}

const queryDescriptionField: StringProperty = {
    type: "string",
    description: "Query"
}

export const payrollEnquiryForm: OpenApiForm = {
    description: "Payroll Form",
    properties: {
        subtitle: [subtitle],
        select: [enquiryTypeField],
        textInput: [dateOfPayslipField],
        textArea: [queryDescriptionField],
        submitButton: [submitButton]
    },
}

const otherFormField1: StringProperty = {
    type: "string",
    description: "Sample field one"
}


const otherFormField2: StringProperty = {
    type: "string",
    description: "Sample field two",
    format: "date"
}

export const otherForm: OpenApiForm = {
    description: "Other Form",
    properties: {
        subtitle: [],
        select: [],
        textInput: [otherFormField1, otherFormField2],
        textArea: [],
        submitButton: [],
    }
}