import React, { ChangeEventHandler, FormEvent } from 'react';

interface IRegisterFormProps {
  name: string;
  username: string;
  password: string;
  handle_register: (e: FormEvent<HTMLFormElement>) => void;
  handle_name_input: ChangeEventHandler<HTMLInputElement>;
  handle_username_input: ChangeEventHandler<HTMLInputElement>;
  handle_password_input: ChangeEventHandler<HTMLInputElement>;
}

const RegisterForm = ({
  name,
  username,
  password,
  handle_register,
  handle_name_input,
  handle_username_input,
  handle_password_input
}: IRegisterFormProps) => {
  return (
    <>
      <form onSubmit={handle_register} className="register-form">
        <p>Name</p>
        <input
          type="text"
          value={name}
          name="Name"
          onChange={handle_name_input}
        />

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
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export { RegisterForm };
