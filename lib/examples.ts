export const FORM_EXAMPLES = {
  contact: {
    label: "Contact Form (Inline Layout)",
    value: {
      layout: "inline",
      fields: [
        {
          name: "firstName",
          label: "First Name",
          type: "text",
          placeholder: "Enter first name",
          required: true,
          width: "half"
        },
        {
          name: "lastName",
          label: "Last Name",
          type: "text",
          placeholder: "Enter last name",
          required: true,
          width: "half"
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "your@email.com",
          required: true,
          width: "full"
        },
        {
          name: "message",
          label: "Message",
          type: "textarea",
          placeholder: "Your message",
          required: true,
          validation: {
            min: 10,
            max: 500
          }
        }
      ]
    }
  },
  survey: {
    label: "Survey Form (Vertical Layout)",
    value: {
      layout: "vertical",
      fields: [
        {
          name: "satisfaction",
          label: "How satisfied are you?",
          type: "radio",
          required: true,
          options: [
            { label: "Very Satisfied", value: "5" },
            { label: "Satisfied", value: "4" },
            { label: "Neutral", value: "3" },
            { label: "Dissatisfied", value: "2" },
            { label: "Very Dissatisfied", value: "1" }
          ]
        },
        {
          name: "improvements",
          label: "What areas need improvement?",
          type: "select",
          placeholder: "Select areas",
          options: [
            { label: "User Interface", value: "ui" },
            { label: "Performance", value: "performance" },
            { label: "Features", value: "features" },
            { label: "Documentation", value: "docs" }
          ]
        },
        {
          name: "subscribe",
          label: "Subscribe to newsletter",
          type: "checkbox"
        }
      ]
    }
  },
  registration: {
    label: "Registration Form (Horizontal Layout)",
    value: {
      layout: "horizontal",
      fields: [
        {
          name: "username",
          label: "Username",
          type: "text",
          placeholder: "Choose a username",
          required: true,
          validation: {
            min: 3,
            max: 20
          }
        },
        {
          name: "email",
          label: "Email Address",
          type: "email",
          placeholder: "Enter your email",
          required: true
        },
        {
          name: "password",
          label: "Password",
          type: "text",
          placeholder: "Choose a password",
          required: true,
          validation: {
            min: 8,
            pattern: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$"
          }
        },
        {
          name: "role",
          label: "Account Type",
          type: "select",
          placeholder: "Select account type",
          required: true,
          options: [
            { label: "Developer", value: "developer" },
            { label: "Designer", value: "designer" },
            { label: "Manager", value: "manager" }
          ]
        }
      ]
    }
  }
} as const;