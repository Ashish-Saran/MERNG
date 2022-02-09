import React, { useState, useContext } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from '../utils/Hooks';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth';
 
function Register(props) {
  
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const history = useNavigate();

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  // function onChange(event) {
  //   setValues({...values, [event.target.name]: event.target.value})
  // };
  
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, {data: {register: userData}}) {
      context.login(userData)
      history('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values
  });

  // the f(x)'s with the keyword 'function' is hoisted. Meaning, even though they come later in the code, like the function below, it will be recognised when call before. eg: in line 10, where the below f(x) is called(unlike the const declared f(x)'s).
  function registerUser() {
    addUser();
  };

  // function onSubmit(event) {
  //   event.preventDefault();
  //   addUser();
  // }


  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={onSubmit} noValidate>
        <input type="text"
          placeholder='Username'
          name='username'
          value={values.username}
          onChange={onChange}
        />
        <input type="email"
          placeholder='Email'
          name='email'
          value={values.email}
          onChange={onChange}
        />
        <input type="password"
          placeholder='Password'
          name='password'
          value={values.password}
          onChange={onChange}
        />
        <input type="password"
          placeholder='Confirm Password'
          name='confirmPassword'
          value={values.confirmPassword}
          onChange={onChange}
        />
        <button type="submit">Register</button>
      </form>
      {Object.keys(errors).length > 0 && (
        <div>
          <ul>
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
  
const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ){
      id email username createdAt token
    }
  }
`

export default Register;
