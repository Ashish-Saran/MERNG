import React, { useState, useContext } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from '../utils/Hooks';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth';

function Login(props) {

  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const history = useNavigate();
  const { onChange, onSubmit, values } = useForm(loginUserCallbk, {
    username: '',
    password: ''
  })

  // function onChange(event) {
  //   setValues({...values, [event.target.name]: event.target.value})
  // };
  
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, {data: {login: userData}}) {
      console.log(userData);
      context.login(userData)
      history('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values
  });

  function loginUserCallbk() {
    loginUser();
  }

  // function onSubmit(event) {
  //   event.preventDefault();
  //   loginUser();
  // }


  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit} noValidate>
        <input type="text"
          placeholder='Username'
          name='username'
          value={values.username}
          onChange={onChange}
        />
        <input type="password"
          placeholder='Password'
          name='password'
          value={values.password}
          onChange={onChange}
        />
        <button type="submit">Login</button>
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
  
const LOGIN_USER = gql`
  mutation login(
    $username: String!
    $password: String!
  ) {
    login(
        username: $username
        password: $password
    ){
      id email username createdAt token
    }
  }
`

export default Login;
