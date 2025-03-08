import React, { useState, useEffect } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';

import axios from 'axios';

const initialForm = {
  email: '',
  password: '',
  terms: false,
};

const initialErrors = {
  email: false,
  password: false,
};

const errorMessages = {
  email: 'Please enter a valid email address',
  password: 'Password must be at least 4 characters long',
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const history = useHistory();

  // Validate form when inputs change
  useEffect(() => {
    validateForm();
  }, [form]);

  const validateForm = () => {
    const newErrors = { ...initialErrors };

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (form.email && !emailRegex.test(form.email)) {
      newErrors.email = true;
    }

    // Password validation
    if (form.password && form.password.length < 4) {
      newErrors.password = true;
    }

    setErrors(newErrors);

    // Form is valid if:
    // 1. No errors
    // 2. Email and password are not empty
    // 3. Terms are accepted
    const formIsValid =
      !newErrors.email &&
      !newErrors.password &&
      form.email.trim() !== '' &&
      form.password.trim() !== '' &&
      form.terms === true;

    setIsValid(formIsValid);
  };

  const handleChange = (event) => {
    let { name, value, type } = event.target;
    value = type === 'checkbox' ? event.target.checked : value;
    setForm({ ...form, [name]: value });

    // Mark field as touched when changed
    if (!touched[name]) {
      setTouched({ ...touched, [name]: true });
    }
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched({ ...touched, [name]: true });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Mark all fields as touched on submit attempt
    setTouched({
      email: true,
      password: true,
    });

    // Do not proceed if form is not valid
    if (!isValid) {
      return;
    }

    axios
      .get('https://6540a96145bedb25bfc247b4.mockapi.io/api/login')
      .then((res) => {
        const user = res.data.find(
          (item) => item.password === form.password && item.email === form.email
        );
        if (user) {
          setForm(initialForm);
          history.push('/main');
        } else {
          history.push('/error');
        }
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          id="exampleEmail"
          name="email"
          placeholder="Enter your email"
          type="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={form.email}
          invalid={touched.email && errors.email}
        />
        {touched.email && errors.email && (
          <FormFeedback>{errorMessages.email}</FormFeedback>
        )}
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          id="examplePassword"
          name="password"
          placeholder="Enter your password "
          type="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={form.password}
          invalid={touched.password && errors.password}
        />
        {touched.password && errors.password && (
          <FormFeedback>{errorMessages.password}</FormFeedback>
        )}
      </FormGroup>
      <FormGroup check className="mb-3">
        <Input
          id="terms"
          name="terms"
          checked={form.terms}
          type="checkbox"
          onChange={handleChange}
        />{' '}
        <Label htmlFor="terms" check>
          I agree to terms of service and privacy policy
        </Label>
      </FormGroup>
      <FormGroup className="text-center p-4">
        <Button color="primary" disabled={!isValid}>
          Sign In
        </Button>
      </FormGroup>
    </Form>
  );
}
