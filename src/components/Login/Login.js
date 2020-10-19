import { gql, useMutation } from "@apollo/client";
import React, { useRef } from "react";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const mutateQueryLogin = gql`
    mutation login($email: String = "123", $password: String = "123") {
      login(email: $email, password: $password) {
        id
        email
      }
    }
  `;
  const [mutateLogin, { loginData }] = useMutation(mutateQueryLogin);

  const handleSubmit = async e => {
    e.preventDefault();
    document.location.reload();
    await mutateLogin({
      variables: {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      },
    });
  };

  return (
    <div>
      {console.log(loginData)}
      <form onSubmit={handleSubmit}>
        <input ref={emailRef} name="email" type="email" />
        <input ref={passwordRef} name="password" type="password" />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
