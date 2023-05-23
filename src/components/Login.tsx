import React, { type ChangeEvent, type FormEvent, useState } from 'react';
import './Login.css';

interface Field {
  name: string
  label: string
  type: string
  required: boolean
}

interface LoginProps {
  title: string
  logoUrl: string
  fields: Field[]
  error?: string
}

const Login: React.FC<LoginProps> = ({ title, logoUrl, fields, error }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    setErrors({});
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    // Perform form validation
    const validationErrors: Record<string, string> = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      // Form is valid, perform further actions
      console.log('Form submitted:', formData);
    }
  };

  const validateForm = (): Record<string, string> => {
    const validationErrors: Record<string, string> = {};
    for (const field of fields) {
      if (field.required && !formData[field.name]) {
        validationErrors[field.name] = `${field.label} is required.`;
      }
      // if (field.type === 'email' && formData[field.name]) {
      //   const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      //     formData[field.name]
      //   );
      //   if (!isValidEmail) {
      //     validationErrors[field.name] = 'Invalid email address.';
      //   }
      // }
      // Add additional validations as needed for different field types
    }
    return validationErrors;
  };

  return (
    <div className="login-form">
      <div className="top-section">
        <img src={logoUrl} alt="Logo" className="logo" />
        <h2 className="form-title">{title}</h2>
      </div>
      {error && !Object.keys(errors).length && (
        <div className="error-message">{error}</div>
      )}
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div key={field.name} className="form-field-container">
            <div className="form-field">
              <label htmlFor={field.name}>{field.label}</label>
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleInputChange}
                className={errors[field.name] ? 'input-error' : ''}
              />
              {errors[field.name] && (
                <div className="error-message">{errors[field.name]}</div>
              )}
            </div>
          </div>
        ))}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
