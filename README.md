# Form Builder

A powerful and flexible form generator that creates React forms from JSON structures using Next.js, Tailwind CSS, and shadcn/ui components.

## Features

- 📝 Generate forms from JSON structure
- 🎨 Live form preview with real-time updates
- 💻 Code generation with syntax highlighting
- 🎯 Multiple layout options:
  - Vertical (default)
  - Horizontal (label-input side by side)
  - Inline (fields in grid layout)
- ✨ Comprehensive field types:
  - Text input
  - Email input
  - Number input
  - Textarea
  - Select dropdown
  - Checkbox
  - Radio buttons
- ✅ Built-in form validation using Zod
- 📱 Fully responsive design
- 🎯 Real-time JSON validation
- 📋 One-click code copying
- 🎉 Beautiful UI with shadcn/ui components
- 🌙 Dark mode support (coming soon)

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd form-builder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Usage

### Basic Usage

1. Input your form structure in JSON format in the editor
2. Use the "Prettify JSON" button to format your input
3. Click "Generate Form" to create your form
4. Switch between "Preview" and "Code" tabs to see the result
5. Copy the generated code to use in your project

### JSON Structure

The form configuration accepts the following root properties:

```typescript
{
  "layout": "vertical" | "horizontal" | "inline",
  "fields": FormField[]
}
```

Each field in the `fields` array supports these properties:

```typescript
{
  "name": string,          // Field identifier
  "label": string,         // Display label
  "type": string,          // Input type
  "placeholder"?: string,  // Optional placeholder
  "required"?: boolean,    // Is field required
  "width"?: "full" | "half" | "third", // Field width (for inline layout)
  "validation"?: {        // Optional validation rules
    "min"?: number,      // Minimum length/value
    "max"?: number,      // Maximum length/value
    "pattern"?: string   // Regex pattern
  },
  "options"?: Array<{    // Required for select/radio
    "label": string,
    "value": string
  }>
}
```

### Example Configurations

#### Contact Form
```json
{
  "layout": "inline",
  "fields": [
    {
      "name": "firstName",
      "label": "First Name",
      "type": "text",
      "placeholder": "Enter first name",
      "required": true,
      "width": "half"
    },
    {
      "name": "lastName",
      "label": "Last Name",
      "type": "text",
      "placeholder": "Enter last name",
      "required": true,
      "width": "half"
    },
    {
      "name": "email",
      "label": "Email",
      "type": "email",
      "placeholder": "your@email.com",
      "required": true,
      "width": "full"
    },
    {
      "name": "message",
      "label": "Message",
      "type": "textarea",
      "placeholder": "Your message",
      "required": true,
      "validation": {
        "min": 10,
        "max": 500
      }
    }
  ]
}
```

#### Survey Form
```json
{
  "layout": "vertical",
  "fields": [
    {
      "name": "satisfaction",
      "label": "How satisfied are you?",
      "type": "radio",
      "required": true,
      "options": [
        { "label": "Very Satisfied", "value": "5" },
        { "label": "Satisfied", "value": "4" },
        { "label": "Neutral", "value": "3" },
        { "label": "Dissatisfied", "value": "2" },
        { "label": "Very Dissatisfied", "value": "1" }
      ]
    },
    {
      "name": "improvements",
      "label": "What areas need improvement?",
      "type": "select",
      "placeholder": "Select areas",
      "options": [
        { "label": "User Interface", "value": "ui" },
        { "label": "Performance", "value": "performance" },
        { "label": "Features", "value": "features" },
        { "label": "Documentation", "value": "docs" }
      ]
    },
    {
      "name": "subscribe",
      "label": "Subscribe to newsletter",
      "type": "checkbox"
    }
  ]
}
```

### Layout Options

1. **Vertical Layout** (default)
   - Fields stack vertically
   - Labels appear above inputs
   - Best for mobile and simple forms

2. **Horizontal Layout**
   - Labels align to the right
   - Inputs appear next to labels
   - Great for forms with shorter inputs

3. **Inline Layout**
   - Fields can be arranged in a grid
   - Supports different field widths:
     - `full`: 100% width
     - `half`: 50% width
     - `third`: 33.33% width
   - Perfect for complex forms with multiple columns

## Field Types

### Text Input
```json
{
  "name": "username",
  "label": "Username",
  "type": "text",
  "placeholder": "Enter username",
  "required": true
}
```

### Email Input
```json
{
  "name": "email",
  "label": "Email",
  "type": "email",
  "placeholder": "your@email.com",
  "required": true
}
```

### Textarea
```json
{
  "name": "description",
  "label": "Description",
  "type": "textarea",
  "placeholder": "Enter description",
  "validation": {
    "min": 10,
    "max": 1000
  }
}
```

### Select Dropdown
```json
{
  "name": "country",
  "label": "Country",
  "type": "select",
  "placeholder": "Select country",
  "options": [
    { "label": "United States", "value": "us" },
    { "label": "United Kingdom", "value": "uk" },
    { "label": "Canada", "value": "ca" }
  ]
}
```

### Radio Group
```json
{
  "name": "gender",
  "label": "Gender",
  "type": "radio",
  "options": [
    { "label": "Male", "value": "male" },
    { "label": "Female", "value": "female" },
    { "label": "Other", "value": "other" }
  ]
}
```

### Checkbox
```json
{
  "name": "terms",
  "label": "I agree to the terms",
  "type": "checkbox",
  "required": true
}
```

## Validation

The form builder supports various validation rules:

- Required fields
- Minimum/maximum length or value
- Regular expression patterns
- Custom error messages (coming soon)

Example with validation:
```json
{
  "name": "password",
  "label": "Password",
  "type": "text",
  "required": true,
  "validation": {
    "min": 8,
    "max": 32,
    "pattern": "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$"
  }
}
```

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Zod](https://zod.dev/) - Schema validation
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [Prism.js](https://prismjs.com/) - Syntax highlighting

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.