import styles from "./index.module.scss";
import Logo from '../../assets/logo.png';
import { FaEnvelope, FaLock } from "react-icons/fa6";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginView = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch('http://localhost:8081/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      navigate('/office'); // Przekierowanie po zalogowaniu
    } else {
      alert(data.message); // Wyświetlenie błędu
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoView}>
        <img src={Logo} className={styles.logo} />
      </div>
      <div className={styles.loginView}>
        <div className={styles.loginBox}>
          <p className={styles.title}>Logowanie</p>
          <div className={styles.inputContainer}>
            <div className={styles.inputBox}>
              <div className={styles.iconBox}>
                <FaEnvelope className={styles.icon} />
              </div>
              <input
                placeholder="Email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.inputBox}>
              <div className={styles.iconBox}>
                <FaLock className={styles.icon} />
              </div>
              <input
                placeholder="Hasło"
                type="password"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className={styles.button} onClick={handleLogin}>Zaloguj się</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;