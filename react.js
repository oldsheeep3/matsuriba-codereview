import React, { useState } from "react";

const login = () => { // コンポーネント名は大文字から始める 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    setIsLoading(true);

    try {
      const response = await fetch('https://api.hoge.net/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: { email, password }, //json.Stringify
      });

      if (!response.ok) {
        throw new Error('ログインに失敗しました');
      }

      const data = await response.json();
      alert(`ログイン成功: ${data.message}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>ログイン</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            メールアドレス:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label>
            パスワード:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>

        {error && {error}} {/*{error}をタグで囲ってください*/}
        {isLoading ? <button type="submit" disabled="true">読み込み中...</button> // disabledはboolean型
          : <button type="submit" disabled="false">ログイン</button>  }
      </form>
    </div>
  );
};

export default login; // コンポーネント名は大文字で