class BootstrapInputController {
  inputElement;

  /**
   * Initializes an instance of the InputController class.
   * @param {HTMLInputElement} inputElement The input element to control.
   */
  constructor(inputElement) {
    this.inputElement = inputElement;
  }

  /**
   * Retrieves the tags from the input element.
   * @returns {Array<string>} An array of tags split by commas, or an empty array if no tags are present.
   */
  getTags() {
    if (this.inputElement.value) {
      return this.inputElement.value.split(",");
    }
    return [];
  }

  /**
   * Sets the tags in the input element.
   * @param {Array<string>} tags An array of tags to set.
   */
  setTags(tags) {
    this.inputElement.value = tags.join(",");
  }

  /**
   * Handles the addition of a tag to the input element. Retrieves the tags in the input element,
   * adds the provided tag to the array, and sets the tags in the input element.
   * @param {string} tag The tag to add.
   */
  addTag(tag) {
    const tags = this.getTags();
    tags.push(tag);
    this.setTags(tags);
  }

  /**
   * Handles the removal of a tag from the input element. Retrieves the tags in the input element,
   * filters out the provided tag from the array, and sets the tags in the input element.
   * @param {string} tag The tag to remove.
   */
  removeTag(tag) {
    const tags = this.getTags();
    this.setTags(tags.filter((t) => t !== tag));
  }
}

window.BootstrapInputController = BootstrapInputController;
