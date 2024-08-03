import React, { FC, useState } from "react";
import { Form, Button } from "react-bootstrap";
import {
  Formik,
  Field,
  FormikHelpers,
  ErrorMessage,
  FormikProps,
  Form as FormikForm,
} from "formik";
import * as Yup from "yup";
import { loginUser } from "../../service/index.service";
import { useNavigate } from "react-router-dom";

interface FormValues {
  username: string;
  email: string;
  password: string;
}

const Login: FC = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // const handleSubmit = (
  //   values: FormValues,
  //   { setSubmitting }: FormikHelpers<FormValues>
  // ) => {
  //   // Handle form submission
  //   console.log(values);
  //   setSubmitting(false);
  // };

  // first Update

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setErrors }: FormikHelpers<FormValues>
  ) => {
    const response = await loginUser(values);
    if (response) {
      navigate("/welcome");
    } else {
      alert("Login failed");
    }
    setSubmitting(false);

    if (!response.success) {
      setErrors({ email: response.error || "Login failed" });
    } else {
      return response.data;
      // console.log("Login successful", response.data);
      // Handle successful login (e.g., redirect to another page)
    }
  };

  // SECOND UPDATE

  // const handleSubmit = async (
  //   values: FormValues,
  //   { setSubmitting, setErrors }: FormikHelpers<FormValues>
  // ) => {
  //   const response = await loginUser(values);
  //   setSubmitting(false);

  //   if (response.success) {
  //     setUser(response.data);
  //     navigate('/welcome');
  //   } else {
  //     setErrors({ username: response.error || 'Login failed' });
  //   }
  // };

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Log in</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your details to get started.
        </p>
      </div>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, isSubmitting }: FormikProps<FormValues>) => (
          <FormikForm className="space-y-4" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Field
                type="email"
                name="email"
                as={Form.Control}
                autoComplete="on"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Field
                type="password"
                name="password"
                as={Form.Control}
                autoComplete="on"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger"
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              Sign In
            </Button>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default Login;
