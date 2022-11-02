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
      <form onSubmit={handle_login}>
        <div>
          Username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handle_username_input}
          />
        </div>

        <div>
          Password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handle_password_input}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export { LoginForm };
