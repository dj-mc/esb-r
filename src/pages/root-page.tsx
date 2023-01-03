import React, { FormEvent, useEffect, useState } from 'react';

import { IUser } from '../auth/user-types';
import { LoginForm } from '../auth/login-form';
import { RegisterForm } from '../auth/register-form';
import { auth_service } from '../services/auth-service';

import { Notification } from '../components/notification';

import { NoteList } from './note-list-page';

const Home = () => {
  const [name, set_name] = useState('');
  const [username, set_username] = useState('');
  const [password, set_password] = useState('');

  const [user, set_user] = useState<IUser | null>(null);

  const [notification, set_notification] = useState('');

  useEffect(() => {
    const logged_in_user_JSON = window.localStorage.getItem('logged_in_user');
    if (logged_in_user_JSON) {
      const parsed_user = JSON.parse(logged_in_user_JSON);
      set_user(parsed_user);
      auth_service.set_token(parsed_user.token);
    }
  }, []);

  const handle_login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Logging in as ${username}`);
    console.log(username);
    console.log(password);

    try {
      const logged_in_user = await auth_service.login_response({
        username,
        password
      });

      window.localStorage.setItem(
        'logged_in_user',
        JSON.stringify(logged_in_user)
      );

      auth_service.set_token(logged_in_user.token);

      set_user(logged_in_user);
      set_username('');
      set_password('');
    } catch (error) {
      console.error(error);
      set_notification('Invalid credentials');
      setTimeout(() => {
        set_notification('');
      }, 5000);
    }
  };

  const handle_register = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Registering as ${username}`);
    console.log(name);
    console.log(username);
    console.log(password);

    try {
      const registered_user = await auth_service.register_response({
        name,
        username,
        password
      });

      console.log(registered_user);
      set_notification(`Created user: ${registered_user.username}`);

      set_name('');
      set_username('');
      set_password('');
    } catch (error) {
      console.error(error);
      set_notification("Could't register that user");
      setTimeout(() => {
        set_notification('');
      }, 5000);
    }
  };

  const logout = () => {
    window.localStorage.removeItem('logged_in_user');
    set_user(null);
  };

  return (
    <>
      <h1>Home</h1>
      {notification !== '' && (
        <>
          <Notification message={notification} />
        </>
      )}
      {user === null ? (
        <div>
          <LoginForm
            username={username}
            password={password}
            handle_login={handle_login}
            handle_username_input={({ target }) => set_username(target.value)}
            handle_password_input={({ target }) => set_password(target.value)}
          />
          <RegisterForm
            name={name}
            username={username}
            password={password}
            handle_register={handle_register}
            handle_name_input={({ target }) => set_name(target.value)}
            handle_username_input={({ target }) => set_username(target.value)}
            handle_password_input={({ target }) => set_password(target.value)}
          />
        </div>
      ) : (
        <>
          <NoteList />
        </>
      )}

      {user !== null && (
        <>
          <p>Logged in as {user.name}</p>
          <button onClick={() => logout()}>Logout</button>
        </>
      )}

      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias ipsum
        dignissimos ipsa. Rerum debitis quidem veniam natus, perspiciatis
        soluta, ex molestias, commodi dolorem placeat tenetur. Distinctio
        excepturi necessitatibus iusto facilis?
      </p>
    </>
  );
};

export { Home };
