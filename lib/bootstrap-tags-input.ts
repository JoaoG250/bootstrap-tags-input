class BootstrapTagsInput {
  onTagAdded: (tag: string) => void = () => {};
  onTagRemoved: (tag: string) => void = () => {};
  tags: string[] = [];
  rootElementId: string;
  rootElement: HTMLElement;
  rootElementClass;
  inputId: string;
  inputElement: HTMLInputElement;
  inputElementClass;
  tagClass: string;

  /**
   * Initializes a new instance of the BootstrapTagsInput class.
   * The options object contains the following properties:
   * - onTagAdded: The function to call when a tag is added. The function receives the added tag as a string argument.
   * - onTagRemoved: The function to call when a tag is removed. The function receives the removed tag as a string argument.
   * - initialTags: The initial tags to display in the input element.
   * - rootElementClass: The CSS class to apply to the root element.
   * - inputElementClass: The CSS class to apply to the input element.
   * - tagClass: The CSS class to apply to each tag element.
   */
  constructor({
    onTagAdded = () => {},
    onTagRemoved = () => {},
    initialTags = [],
    rootElementClass = "",
    inputElementClass = "",
    tagClass = "badge text-bg-secondary",
  }) {
    this.onTagAdded = onTagAdded;
    this.onTagRemoved = onTagRemoved;
    this.tags = initialTags;
    this.rootElementClass = rootElementClass;
    this.inputElementClass = inputElementClass;
    this.tagClass = tagClass;
    this.rootElementId = this.generateUniqueId();
    this.rootElement = this.renderRootElement(this.rootElementId);
    this.inputId = this.generateUniqueId();
    this.inputElement = this.renderInput(this.inputId);
    this.rootElement.appendChild(this.inputElement);
    this.addEnventListeners();
    this.renderInitialTags();
  }

  /**
   * Generates a random, URL-safe, unique identifier.
   * @param {number} [length=8] The length of the identifier to generate.
   * @returns {string} A random, URL-safe, unique identifier.
   */
  generateUniqueId(length = 8) {
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
   * The root element is assigned an ID in the format "bootstrap-tags-input-<idSuffix>".
   * The root element is also assigned a CSS class "bootstrap-tags-input" and any additional classes specified in the options object.
   * @param {string} idSuffix A string to append to the end of the root element's ID.
   * @returns {HTMLDivElement} The rendered root element.
   */
  renderRootElement(idSuffix: string): HTMLDivElement {
    return this.renderElementFromString(`
      <div id="bootstrap-tags-input-${idSuffix}" class="bootstrap-tags-input ${this.rootElementClass}"></div>
    `);
  }

  /**
   * Parses an HTML string and returns the first element as a specified HTMLElement type.
   * @template T - The type of HTMLElement to return.
   * @param {string} htmlString - The HTML string to parse.
   * @returns {T} The first HTML element parsed from the string.
   */
  renderElementFromString<T extends HTMLElement>(htmlString: string): T {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    return doc.body.firstElementChild as T;
  }

  /**
   * Renders the input element of the Bootstrap tags input.
   * The input element is the text input where the user enters tags.
   * The input element is assigned an ID in the format "bootstrap-tag-input-<idSuffix>".
   * The input element is also assigned a CSS class "bootstrap-tag-input" and any additional classes specified in the options object.
   * @param {string} idSuffix A string to append to the end of the input element's ID.
   * @returns {HTMLInputElement} The rendered input element.
   */
  renderInput(idSuffix: string): HTMLInputElement {
    return this.renderElementFromString(`
      <input id="bootstrap-tag-input-${idSuffix}" type="text" class="${this.inputElementClass}">
    `);
  }

  /**
   * Adds event listeners to the rendered elements. This method is called by the constructor.
   */
  addEnventListeners() {
    this.addRootElementEventListener();
    this.addInputEventListener();
  }

  /**
   * Adds an event listener to the root element to focus the input element when the root element is clicked.
   */
  addRootElementEventListener() {
    this.rootElement.addEventListener("click", () => {
      this.inputElement.focus();
    });
  }

  /**
   * Adds an event listener to the input element to add a tag when the Enter key is pressed.
   * When the Enter key is pressed, the input element's value is added as a tag if it is not already present.
   * The input element's value is then cleared.
   */
  addInputEventListener() {
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
  addTag(tagElement: HTMLElement) {
    this.rootElement.insertBefore(tagElement, this.inputElement);
  }

  /**
   * Renders a tag element from a string.
   * @param {string} text The text content of the tag element.
   * @returns {HTMLElement} The rendered tag element.
   */
  renderTag(text: string) {
    const tagElement = document.createElement("span");
    tagElement.className = `bootstrap-tag ${this.tagClass}`;
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
  renderInitialTags() {
    this.tags.forEach((tag) => {
      const tagElement = this.renderTag(tag);
      this.addTag(tagElement);
    });
  }
}

export default BootstrapTagsInput;
