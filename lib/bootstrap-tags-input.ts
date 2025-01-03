interface HtmlOptions {
  id?: string;
  class?: string;
}

interface InputHtmlOptions extends HtmlOptions {
  placeholder?: string;
}

interface BootstrapTagsInputConstructorArgs {
  onTagAdded: (tag: string) => void;
  onTagRemoved: (tag: string) => void;
  initialTags?: string[];
  rootElementHtmlOptions?: HtmlOptions;
  inputElementHtmlOptions?: InputHtmlOptions;
  tagElementHtmlOptions?: Omit<HtmlOptions, "id">;
}

class BootstrapTagsInput {
  tags: string[];
  readonly rootElement: HTMLElement;
  readonly inputElement: HTMLInputElement;
  private readonly onTagAdded: (tag: string) => void;
  private readonly onTagRemoved: (tag: string) => void;
  private readonly rootElementHtmlOptions: HtmlOptions;
  private readonly inputElementHtmlOptions: InputHtmlOptions;
  private readonly tagElementHtmlOptions: Omit<HtmlOptions, "id">;

  /**
   * Initializes a new instance of the BootstrapTagsInput class.
   * The options object contains the following properties:
   * - onTagAdded: The function to call when a tag is added. The function receives the added tag as a string argument.
   * - onTagRemoved: The function to call when a tag is removed. The function receives the removed tag as a string argument.
   * - initialTags: The initial tags to display in the input element.
   * - rootElementHtmlOptions: The options for the root element.
   * - inputElementHtmlOptions: The options for the input element.
   * - tagElementHtmlOptions: The options for each tag element.
   */
  constructor({
    onTagAdded = () => {},
    onTagRemoved = () => {},
    initialTags = [],
    rootElementHtmlOptions = {},
    inputElementHtmlOptions = {},
    tagElementHtmlOptions = {},
  }: BootstrapTagsInputConstructorArgs) {
    this.onTagAdded = onTagAdded;
    this.onTagRemoved = onTagRemoved;
    this.tags = initialTags;
    this.rootElementHtmlOptions = rootElementHtmlOptions;
    this.inputElementHtmlOptions = inputElementHtmlOptions;
    this.tagElementHtmlOptions = tagElementHtmlOptions;
    this.rootElement = this.renderRootElement();
    this.inputElement = this.renderInputElement();
    this.rootElement.appendChild(this.inputElement);
    this.addEnventListeners();
    this.renderInitialTags();
  }

  /**
   * Generates a random, URL-safe, unique identifier.
   * @param {number} [length=8] The length of the identifier to generate.
   * @returns {string} A random, URL-safe, unique identifier.
   */
  private generateUniqueId(length = 8) {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charsetLength = charset.length;
    const randomValues = new Uint8Array(length);
    window.crypto.getRandomValues(randomValues);
    return Array.from(
      randomValues,
      (value) => charset[value % charsetLength]
    ).join("");
  }

  /**
   * Renders the root element of the Bootstrap tags input.
   * The root element is the outermost element that contains the input element and the tag elements.
   * The root element is assigned an ID in the format "bootstrap-tags-input-<uniqueId>".
   * The root element is also assigned a CSS class "bootstrap-tags-input" and any additional classes specified in the options object.
   * @returns {HTMLDivElement} The rendered root element.
   */
  private renderRootElement(): HTMLDivElement {
    const rootElement = document.createElement("div");
    rootElement.id =
      this.rootElementHtmlOptions.id ||
      `bootstrap-tags-input-${this.generateUniqueId()}`;
    rootElement.className = `bootstrap-tags-input ${this.rootElementHtmlOptions.class}`;
    return rootElement;
  }

  /**
   * Renders the input element of the Bootstrap tags input.
   * The input element is the text input where the user enters tags.
   * The input element is assigned an ID in the format "bootstrap-tag-input-<uniqueId>".
   * The input element is also assigned any additional classes specified in the options object.
   * @returns {HTMLInputElement} The rendered input element.
   */
  private renderInputElement(): HTMLInputElement {
    const inputElement = document.createElement("input");
    inputElement.id =
      this.inputElementHtmlOptions.id ||
      `bootstrap-tag-input-${this.generateUniqueId()}`;
    this.inputElementHtmlOptions.class &&
      (inputElement.className = this.inputElementHtmlOptions.class);
    this.inputElementHtmlOptions.placeholder &&
      (inputElement.placeholder = this.inputElementHtmlOptions.placeholder);
    return inputElement;
  }

  /**
   * Adds event listeners to the rendered elements. This method is called by the constructor.
   */
  private addEnventListeners() {
    this.addRootElementEventListener();
    this.addInputEventListener();
  }

  /**
   * Adds an event listener to the root element to focus the input element when the root element is clicked.
   */
  private addRootElementEventListener() {
    this.rootElement.addEventListener("click", () => {
      this.inputElement.focus();
    });
  }

  /**
   * Adds an event listener to the input element to add a tag when the Enter key is pressed.
   * When the Enter key is pressed, the input element's value is added as a tag if it is not already present.
   * The input element's value is then cleared.
   */
  private addInputEventListener() {
    this.inputElement.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        const tagName = this.inputElement.value.trim();
        if (tagName && !this.tags.includes(tagName)) {
          this.tags.push(tagName);
          this.onTagAdded(tagName);
          const tag = this.renderTag(tagName);
          this.addTag(tag);
        }
        this.inputElement.value = "";
      }
    });
  }

  /**
   * Adds a tag element to the Bootstrap tags input.
   * @param {HTMLElement} tagElement The tag element to add.
   */
  private addTag(tagElement: HTMLElement) {
    this.rootElement.insertBefore(tagElement, this.inputElement);
  }

  /**
   * Renders a tag element from a string.
   * @param {string} text The text content of the tag element.
   * @returns {HTMLElement} The rendered tag element.
   */
  private renderTag(text: string) {
    const tagElement = document.createElement("span");
    tagElement.className = `bootstrap-tag badge text-bg-secondary ${this.tagElementHtmlOptions.class}`;
    tagElement.textContent = text;

    const removeButton = document.createElement("span");
    removeButton.classList.add("bootstrap-tag-remove-btn");
    removeButton.onclick = () => {
      this.tags = this.tags.filter((tag) => tag !== text);
      this.onTagRemoved(text);
      tagElement.remove();
    };
    tagElement.appendChild(removeButton);

    return tagElement;
  }

  /**
   * Renders the initial tags for the Bootstrap tags input.
   * This method is called by the constructor.
   */
  private renderInitialTags() {
    this.tags.forEach((tag) => {
      const tagElement = this.renderTag(tag);
      this.addTag(tagElement);
    });
  }
}

export default BootstrapTagsInput;
