import { Component } from "./base-component";
import { validate, Validatable } from "../utils/validation";
import { autobind } from "../utils/decorators";
import { projectState } from "../state/global-state";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        super('project-input', 'app', true, 'user-input');

        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;
        this.configure();
    }

    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }

    renderContent() {

    }

    private gatherUserInput() : [string, string, number] | void {
        const eneteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;

        const titleValidatable: Validatable = {
            value: eneteredTitle,
            required: true
        }

        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 1
        }

        const peopleValidatabale: Validatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5
        }

        if (!validate(titleValidatable)) {
            alert('Invalid Title, please try again.');
        } else {
            if (!validate(titleValidatable) ||
            !validate(descriptionValidatable) || 
            !validate(peopleValidatabale)) {
                alert('Invalid input, please try again!');
                return;
            } else {
                return [eneteredTitle, enteredDescription, +enteredPeople];
            }
        }
    }

    private clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }

    @autobind
    private submitHandler(event: Event) {
        console.log('got submission');
        event.preventDefault();
        const userInput = this.gatherUserInput();
        console.log('INPUT: ', userInput);
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            projectState.addProject(title,desc,people);
            this.clearInputs();
        }
    }
}
