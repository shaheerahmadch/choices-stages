/*
*This is auto generated from the ControlManifest.Input.xml file
*/

// Define IInputs and IOutputs Type. They should match with ControlManifest.
export interface IInputs {
    Choice: ComponentFramework.PropertyTypes.OptionSetProperty;
    entityId: ComponentFramework.PropertyTypes.StringProperty;
    entityName: ComponentFramework.PropertyTypes.StringProperty;
}
export interface IOutputs {
    Choice?: number;
}
