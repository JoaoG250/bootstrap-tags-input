# Bootstrap Tags Input Component

Bootstrap Tags Input is a component made with plain JavaScript for Bootstrap 5.

## Demo

The demo is available [here](https://joaog250.github.io/bootstrap-tags-input/index.html)

## Install

1. add the css to your stylesheets:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/JoaoG250/bootstrap-tags-input@main/dist/bootstrap-tags-input.css">
```
1. add the javascript to your html page:
```html
<script src="https://cdn.jsdelivr.net/gh/JoaoG250/bootstrap-tags-input@main/dist/bootstrap-tags-input.umd.js"></script>
```

## Usage

Checkout the usage example code in HTML [here](index.html)

---

# BootstrapInputController API

## Description
The `BootstrapInputController` class provides utility methods to manage tags within a single input element. It enables tag retrieval, addition, removal, and setting while maintaining a clean API for working with comma-separated tags.

---

## Constructor

```typescript
constructor(inputElement: HTMLInputElement)
```

### Parameters

| Parameter      | Type             | Description                              |
|----------------|------------------|------------------------------------------|
| `inputElement` | `HTMLInputElement` | The input element to control.            |

---

## Methods

### `getTags`

```typescript
getTags(): string[]
```

#### Description
Retrieves the tags from the input element.

#### Returns
- `string[]`: An array of tags split by commas, or an empty array if no tags are present.

---

### `setTags`

```typescript
setTags(tags: string[]): void
```

#### Description
Sets the tags in the input element.

#### Parameters

| Parameter | Type      | Description                     |
|-----------|-----------|---------------------------------|
| `tags`    | `string[]` | An array of tags to set.        |

---

### `addTag`

```typescript
addTag(tag: string): void
```

#### Description
Handles the addition of a tag to the input element. It retrieves the current tags, appends the provided tag to the array, and updates the input element.

#### Parameters

| Parameter | Type     | Description                  |
|-----------|----------|------------------------------|
| `tag`     | `string` | The tag to add to the input. |

---

### `removeTag`

```typescript
removeTag(tag: string): void
```

#### Description
Handles the removal of a tag from the input element. It retrieves the current tags, filters out the provided tag, and updates the input element.

#### Parameters

| Parameter | Type     | Description                     |
|-----------|----------|---------------------------------|
| `tag`     | `string` | The tag to remove from the input. |

---

## Example Usage

```typescript
import BootstrapInputController from './path/to/BootstrapInputController';

// Reference an input element
const inputElement = document.querySelector('#tagsInput') as HTMLInputElement;

// Initialize the controller
const inputController = new BootstrapInputController(inputElement);

// Set initial tags
inputController.setTags(['JavaScript', 'TypeScript']);

// Add a new tag
inputController.addTag('React');

// Remove a tag
inputController.removeTag('JavaScript');

// Get all tags
const tags = inputController.getTags();
console.log(tags); // ['TypeScript', 'React']
```

---

# BootstrapTagsInput Constructor API

## Description
The `BootstrapTagsInput` class allows you to create a tags input UI component using Bootstrap styling. It provides hooks for adding and removing tags and supports customizable HTML options for the root, input, and tag elements.

---

## Constructor

```typescript
constructor(args: BootstrapTagsInputConstructorArgs)
```

### Parameters
The constructor accepts a single object argument of type `BootstrapTagsInputConstructorArgs` with the following properties:

| Property                  | Type                                         | Description                                                                                   | Default Value  |
|---------------------------|----------------------------------------------|-----------------------------------------------------------------------------------------------|----------------|
| `onTagAdded`              | `(tag: string) => void`                     | A callback function invoked when a tag is added. Receives the added tag as a string argument. | `() => {}`     |
| `onTagRemoved`            | `(tag: string) => void`                     | A callback function invoked when a tag is removed. Receives the removed tag as a string argument. | `() => {}`     |
| `initialTags`             | `string[]`                                  | An array of initial tags to display.                                                         | `[]`           |
| `rootElementHtmlOptions`  | `HtmlOptions`                               | HTML options for the root container element.                                                 | `{}`           |
| `inputElementHtmlOptions` | `InputHtmlOptions`                          | HTML options for the input element (e.g., placeholder, classes).                             | `{}`           |
| `tagElementHtmlOptions`   | `Omit<HtmlOptions, "id">`                   | HTML options for individual tag elements (excluding `id`).                                   | `{}`           |

---

### Interfaces

#### `HtmlOptions`
```typescript
interface HtmlOptions {
  id?: string;
  class?: string;
}
```

| Property | Type     | Description                     |
|----------|----------|---------------------------------|
| `id`     | `string` | Optional `id` attribute.        |
| `class`  | `string` | Optional `class` attribute.     |

#### `InputHtmlOptions`
```typescript
interface InputHtmlOptions extends HtmlOptions {
  placeholder?: string;
}
```

| Property       | Type     | Description                     |
|----------------|----------|---------------------------------|
| `placeholder`  | `string` | Optional placeholder text.      |

#### `BootstrapTagsInputConstructorArgs`
```typescript
interface BootstrapTagsInputConstructorArgs {
  onTagAdded: (tag: string) => void;
  onTagRemoved: (tag: string) => void;
  initialTags?: string[];
  rootElementHtmlOptions?: HtmlOptions;
  inputElementHtmlOptions?: InputHtmlOptions;
  tagElementHtmlOptions?: Omit<HtmlOptions, "id">;
}
```

---

### Example Usage

```typescript
import { BootstrapTagsInput } from './path/to/BootstrapTagsInput';

const tagsInput = new BootstrapTagsInput({
  onTagAdded: (tag) => console.log(`Tag added: ${tag}`),
  onTagRemoved: (tag) => console.log(`Tag removed: ${tag}`),
  initialTags: ['JavaScript', 'TypeScript'],
  rootElementHtmlOptions: { class: 'tags-container' },
  inputElementHtmlOptions: { placeholder: 'Add a tag...', class: 'form-control' },
  tagElementHtmlOptions: { class: 'badge badge-primary' },
});

// Append the tags input to the DOM
document.body.appendChild(tagsInput.rootElement);
```
