class BootstrapTagsInput {
  onTagAdded = () => {};
  onTagRemoved = () => {};
  tags = [];
  rootElementId;
  rootElement;
  rootElementClass;
  inputId;
  inputElement;
  inputElementClass;
  tagClass;

  /**
   * Initializes an instance of the BootstrapTagsInput class.
   * @param {Object} [options]
   * @param {function(string): void} [options.onTagAdded] A callback to call when a tag is added.
   *     The callback will receive the added tag as a parameter.
   * @param {function(string): void} [options.onTagRemoved] A callback to call when a tag is removed.
   *     The callback will receive the removed tag as a parameter.
   * @param {Array<string>} [options.initialTags] An array of initial tags to show in the input element.
   * @param {string} [options.rootElementClass] A string of classes to add to the root element.
   * @param {string} [options.inputElementClass] A string of classes to add to the input element.
   * @param {string} [options.tagClass] A string of classes to add to each tag element.
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
   * Renders the root element for the Bootstrap tags input.
   * @param {string} idSuffix A string to append to the end of the root element's ID.
   * @returns {HTMLElement} The root element.
   */
  renderRootElement(idSuffix) {
    return this.renderElementFromString(`
      <div id="bootstrap-tags-input-${idSuffix}" class="bootstrap-tags-input ${this.rootElementClass}"></div>
    `);
  }

  /**
   * Renders an HTML element from a string.
   * @param {string} htmlString An HTML string to render into an element.
   * @returns {HTMLElement} The rendered HTML element.
   */
  renderElementFromString(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    return doc.body.firstChild;
  }

  /**
   * Renders an input HTML element with a unique ID.
   * @param {string} idSuffix A string to append to the end of the input element's ID.
   * @returns {HTMLElement} The rendered input element.
   */
  renderInput(idSuffix) {
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
  addTag(tagElement) {
    this.rootElement.insertBefore(tagElement, this.inputElement);
  }

  /**
   * Renders a tag element from a string.
   * @param {string} text The text content of the tag element.
   * @returns {HTMLElement} The rendered tag element.
   */
  renderTag(text) {
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

window.BootstrapTagsInput = BootstrapTagsInput;
