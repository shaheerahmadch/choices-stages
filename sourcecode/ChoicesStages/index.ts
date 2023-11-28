import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class ChoicesStages implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private context: ComponentFramework.Context<IInputs>;
    private container: HTMLDivElement;
    private notifyOutputChanged: () => void;
    private isEditMode: boolean;
    private Choice: string | null;
    constructor() {
    }
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
        this.context = context;
        this.notifyOutputChanged = notifyOutputChanged;
        this.container = container;
        this.isEditMode = false;// Create the span element to hold the project name
        const Container = document.createElement("div");
        const br = document.createElement("br");
        this.container.appendChild(Container);
        const title = document.createElement("span");
        const ul = document.createElement('ul');
        ul.classList.add('fluent-list');
        title.classList.add("my-title")
        let choiceName = context.parameters.Choice.attributes?.DisplayName;
        let choices = context.parameters.Choice.attributes?.Options;
        const selectedValue: number | undefined | null = this.context.parameters.Choice.raw;
        if (choiceName != undefined) {
            title.innerText = choiceName;
        } else {
            title.innerText = "undefined";
        }
        if (choices != undefined) {
            choices.forEach(item => {
                const li = document.createElement('li');
                li.classList.add('fluent-list-item');
                li.textContent = item.Label;
                li.addEventListener('click', () => {
                    ul.querySelectorAll('.fluent-list-item').forEach(item => {
                        item.classList.remove('active');
                    });
                    li.classList.add('active');
                    context.parameters.Choice.raw = item.Value;
                    notifyOutputChanged();
                });
                if (item.Value == selectedValue) {
                    li.classList.add("active");
                }
                ul.appendChild(li);
            });
        }
        Container.appendChild(title);
        Container.appendChild(br);
        Container.appendChild(ul);
    }
    public updateView(context: ComponentFramework.Context<IInputs>): void {
        // Add code to update control view
    }
    public getOutputs(): IOutputs {
        return {
            Choice: this.context.parameters.Choice.raw ?? undefined
        };
    }
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
