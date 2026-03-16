<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Admin Dashboard</title>
    <style>
        body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; background: #0a0f1a; color: #fff; margin: 0; }
        .wrap { max-width: 960px; margin: 40px auto; padding: 24px; }
        .btn { display: inline-flex; align-items: center; justify-content: center; min-width: 140px; padding: 12px 16px; border-radius: 10px; border: 1px solid #3b82f6; color: #fff; background: #3b82f6; text-decoration: none; margin-right: 12px; cursor: pointer; }
        .btn:hover { filter: brightness(1.05); }
        .card { background: #0a1531; padding: 16px; border-radius: 12px; border: 1px solid rgba(149,149,149,.2); margin-top: 16px; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin: 16px 0; }
        .stat { background: #0a1531; border: 1px solid rgba(149,149,149,.2); border-radius: 12px; padding: 14px; }
        .stat .label { color: rgba(216,219,219,.6); font-size: 12px; text-transform: uppercase; letter-spacing: .08em; }
        .stat .value { font-size: 28px; font-weight: 700; margin-top: 6px; }
    </style>
    <script>
        function logout() {
            localStorage.removeItem('token');
            window.location.href = '/';
        }
        async function loadStats() {
            const token = localStorage.getItem('token');
            if (!token) { window.location.href = '/admin/login'; return; }
            try {
                const res = await fetch('/api/admin/blogs', { headers: { Authorization: 'Bearer ' + token } });
                if (res.status === 401) { window.location.href = '/admin/login'; return; }
                const data = await res.json();
                const countEl = document.getElementById('blogCount');
                if (Array.isArray(data)) countEl.textContent = data.length;
            } catch (_) {}
        }
        document.addEventListener('DOMContentLoaded', loadStats);
    </script>
</head>
<body>
    <div class="wrap">
        <h1>Dashboard</h1>
        <a class="btn" href="/admin/blogs">Manage Blogs</a>
        <button class="btn" onclick="logout()">Logout</button>
        <div class="card">
            <p>Welcome, Admin</p>
        </div>
        <div class="stats">
            <div class="stat">
                <div class="label">Blogs</div>
                <div id="blogCount" class="value">0</div>
            </div>
        </div>
    </div>
</body>
</html>
