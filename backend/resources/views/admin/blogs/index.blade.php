<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Blogs</title>
    <style>
        body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; background: #0a0f1a; color: #fff; margin: 0; }
        .wrap { max-width: 960px; margin: 40px auto; padding: 24px; }
        .btn { display: inline-flex; align-items: center; justify-content: center; min-width: 140px; padding: 12px 16px; border-radius: 10px; border: 1px solid #3b82f6; color: #fff; background: #3b82f6; text-decoration: none; margin-right: 12px; cursor: pointer; line-height: 1; }
        .btn.small { min-width: auto; padding: 8px 12px; }
        .btn:hover { filter: brightness(1.05); }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border-bottom: 1px solid rgba(149,149,149,.2); padding: 12px; text-align: left; }
        th { color: rgba(216,219,219,.6); font-size: 13px; text-transform: uppercase; }
        .empty { color: rgba(216,219,219,.6); padding: 16px 4px; }
    </style>
</head>
<body>
    <div class="wrap">
        <h1>Blogs</h1>
        <a class="btn" href="/admin/blogs/create">Create Blog</a>
        <table id="tbl"><thead><tr><th>Title</th><th>Status</th><th>Created</th><th>Actions</th></tr></thead><tbody></tbody></table>
        <div id="empty" class="empty" style="display:none;">No blogs found</div>
    </div>
    <script>
        async function load() {
            const token = localStorage.getItem('token');
            if (!token) { window.location.href = '/admin/login'; return; }
            try {
                const res = await fetch('/api/admin/blogs', { headers: { Authorization: 'Bearer ' + token } });
                if (!res.ok) {
                    if (res.status === 401) { window.location.href = '/admin/login'; return; }
                    throw new Error('Failed to load');
                }
                const data = await res.json();
                const body = document.querySelector('#tbl tbody');
                const empty = document.getElementById('empty');
                body.innerHTML = '';
                if (!Array.isArray(data) || data.length === 0) {
                    empty.style.display = 'block';
                    return;
                }
                empty.style.display = 'none';
                data.forEach(b => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `<td>${b.title}</td><td>${b.status}</td><td>${(new Date(b.created_at)).toLocaleDateString()}</td>
                    <td>
                        <a class="btn small" href="/admin/blogs/${b.id}/edit">Edit</a>
                        <a class="btn small" href="#" data-id="${b.id}" onclick="del(${b.id})">Delete</a>
                    </td>`;
                    body.appendChild(tr);
                });
            } catch (_) {
                const body = document.querySelector('#tbl tbody');
                body.innerHTML = '';
                document.getElementById('empty').style.display = 'block';
            }
        }
        async function del(id) {
            const token = localStorage.getItem('token');
            if (!token) { window.location.href = '/admin/login'; return; }
            await fetch('/api/admin/blog/' + id, { method: 'DELETE', headers: { Authorization: 'Bearer ' + token } });
            load();
        }
        document.addEventListener('DOMContentLoaded', load);
    </script>
</body>
</html>
