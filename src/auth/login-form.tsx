import React, { ChangeEventHandler, FormEvent } from 'react';

interface ILoginFormProps {
  username: string;
  password: string;
  handle_login: (e: FormEvent<HTMLFormElement>) => void;
  handle_username_input: ChangeEventHandler<HTMLInputElement>;
  handle_password_input: ChangeEventHandler<HTMLInputElement>;
}

const LoginForm = ({
  username,
  password,
  handle_login,
  handle_username_input,
  handle_password_input
}: ILoginFormProps) => {
  return (
    <>
      <form onSubmit={handle_login} className="login-form">
        <p>Username</p>
        <input
          type="text"
          value={username}
          name="Username"
          onChange={handle_username_input}
        />

        <p>Password</p>
        <input
          type="password"
          value={password}
          name="Password"
          onChange={handle_password_input}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export { LoginForm };
