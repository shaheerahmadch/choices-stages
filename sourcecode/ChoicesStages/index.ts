import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class ChoicesStages implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private context: ComponentFramework.Context<IInputs>;
    private container: HTMLDivElement;
    private notifyOutputChanged: () => void;
    private isEditMode: boolean;
    private Choice: number | null;
    private ul:HTMLUListElement;
    constructor() {
    }
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
        this.context = context;
        this.notifyOutputChanged = notifyOutputChanged;
        this.container = container;
        this.isEditMode = false;// Create the span element to hold the project name
        this.Choice = context.parameters.Choice.raw;
        const Container = document.createElement("div");
        const br = document.createElement("br");
        this.container.appendChild(Container);
        const title = document.createElement("span");
        this.ul = document.createElement('ul');
        this.ul.classList.add('fluent-list');
        title.classList.add("my-title")
        let choiceName = context.parameters.Choice.attributes?.DisplayName;
        let choices = context.parameters.Choice.attributes?.Options;
     
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
                li.dataset['pcfValue'] = item.Value+'';
                li.addEventListener('click', () => {
                    this.ul.querySelectorAll('.fluent-list-item').forEach(item => {
                        item.classList.remove('active');
                    });
                    li.classList.add('active');
                    this.Choice = item.Value;
                    notifyOutputChanged();
                });
                if (item.Value == this.Choice) {
                    li.classList.add("active");
                }
                this.ul.appendChild(li);
            });
        }
        Container.appendChild(title);
        Container.appendChild(br);
        Container.appendChild(this.ul);
    }
    public updateView(context: ComponentFramework.Context<IInputs>): void {
        // Add code to update control view
        if(this.Choice!==context.parameters.Choice.raw){
            this.Choice=context.parameters.Choice.raw;
            this.ul.querySelectorAll('.fluent-list-item').forEach(item => {
              const li = item as HTMLLIElement;
                if(li.dataset['pcfValue'] === this.Choice+''){
                    item.classList.add('active')
                }else{
                    item.classList.remove('active');
                } 
            });
        }
    }
    public getOutputs(): IOutputs {
        return {
            Choice: this.Choice ?? undefined
        };
    }
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
