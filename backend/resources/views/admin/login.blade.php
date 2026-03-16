<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Admin Login</title>
    <style>
        body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; background: #0a0f1a; color: #fff; margin: 0; min-height: 100vh; display: grid; place-items: center; }
        .wrap { width: 92%; max-width: 420px; background: linear-gradient(180deg, rgba(10,21,49,.95), rgba(10,15,26,.95)); padding: 28px; border-radius: 16px; border: 1px solid rgba(149,149,149,.2); box-shadow: 0 10px 30px rgba(0,0,0,.35); }
        h2 { margin: 0 0 14px; font-size: 24px; }
        .sub { color: rgba(216,219,219,.6); font-size: 13px; margin-bottom: 16px; }
        .field { margin: 10px 0 14px; }
        input { width: 100%; padding: 12px 14px; border-radius: 10px; border: 1px solid rgba(149,149,149,.2); background: #0a0f1a; color: #fff; outline: none; }
        input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,.15); }
        .btn { width: 100%; padding: 12px 16px; margin-top: 4px; border-radius: 10px; color: #fff; background: #3b82f6; border: 1px solid #3b82f6; cursor: pointer; font-weight: 600; }
        .btn:hover { filter: brightness(1.05); }
        .msg { margin-top: 12px; font-size: 14px; color: #cf3127; min-height: 18px; }
    </style>
</head>
<body>
    <div class="wrap">
        <h2>Admin Login</h2>
        <div class="sub">Access your dashboard to manage blogs</div>
        <form id="loginForm">
            <div class="field">
                <input type="email" id="email" placeholder="Email" required />
            </div>
            <div class="field">
                <input type="password" id="password" placeholder="Password" required />
            </div>
            <div class="field" style="display: flex; align-items: center; margin-bottom: 20px;">
                <input type="checkbox" id="remember" style="width: auto; margin-right: 8px;">
                <label for="remember" style="font-size: 14px; color: rgba(216,219,219,.6); cursor: pointer;">Remember email</label>
            </div>
            <button class="btn" type="submit">Login</button>
            <div class="msg" id="msg"></div>
        </form>
    </div>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const savedEmail = localStorage.getItem('admin_email');
            if (savedEmail) {
                document.getElementById('email').value = savedEmail;
                document.getElementById('remember').checked = true;
            }
        });

        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;
            
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
            
            if (remember) {
                localStorage.setItem('admin_email', email);
            } else {
                localStorage.removeItem('admin_email');
            }
            
            window.location.href = '/admin/dashboard';
        });
    </script>
</body>
</html>
