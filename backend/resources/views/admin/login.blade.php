<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Admin Login</title>
    <style>
        body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; background: #0a0112; color: #fff; margin: 0; min-height: 100vh; display: grid; place-items: center; }
        .wrap { width: 92%; max-width: 420px; background: linear-gradient(180deg, rgba(26,5,36,.95), rgba(12,2,20,.95)); padding: 28px; border-radius: 16px; border: 1px solid #3b0b4f; box-shadow: 0 10px 30px rgba(0,0,0,.35); }
        h2 { margin: 0 0 14px; font-size: 24px; }
        .sub { color: #b38abf; font-size: 13px; margin-bottom: 16px; }
        .field { margin: 10px 0 14px; }
        input { width: 100%; padding: 12px 14px; border-radius: 10px; border: 1px solid #3b0b4f; background: #0f0219; color: #fff; outline: none; }
        input:focus { border-color: #e879f9; box-shadow: 0 0 0 3px rgba(232,121,249,.15); }
        .btn { width: 100%; padding: 12px 16px; margin-top: 4px; border-radius: 10px; color: #0a0112; background: linear-gradient(90deg, #e879f9, #c084fc); border: 1px solid #e879f9; cursor: pointer; font-weight: 600; }
        .btn:hover { filter: brightness(1.05); }
        .msg { margin-top: 12px; font-size: 14px; color: #e879f9; min-height: 18px; }
    </style>
</head>
<body>
    <div class="wrap">
        <h2>Admin Login</h2>
        <div class="sub">Access your dashboard to manage blogs</div>
        <form id="loginForm">
            <div class="field">
                <input type="email" id="email" placeholder="Email" value="admin@layatalk.com" required />
            </div>
            <div class="field">
                <input type="password" id="password" placeholder="Password" value="admin123" required />
            </div>
            <button class="btn" type="submit">Login</button>
            <div class="msg" id="msg"></div>
        </form>
    </div>
    <script>
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const msg = document.getElementById('msg');
            if (!res.ok) {
                msg.textContent = 'Invalid credentials';
                return;
            }
            const data = await res.json();
            localStorage.setItem('token', data.token);
            window.location.href = '/admin/dashboard';
        });
    </script>
</body>
</html>
