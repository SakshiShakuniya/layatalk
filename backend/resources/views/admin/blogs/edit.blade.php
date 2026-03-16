<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Edit Blog</title>
    <style>
        body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; background: #0a0112; color: #fff; margin: 0; }
        .wrap { max-width: 720px; margin: 40px auto; padding: 24px; }
        input, textarea, select { width: 100%; padding: 10px; margin: 8px 0; border-radius: 8px; border: 1px solid #3b0b4f; background: #1a0524; color: #fff; }
        button, a.btn { display: inline-block; padding: 10px 16px; border-radius: 8px; border: 1px solid #e879f9; color: #0a0112; background: #e879f9; text-decoration: none; width: 100px; text-align: center; }
        input[type="file"] { background: transparent; border: 1px solid #3b0b4f; padding: 10px; border-radius: 8px; }
        .form-buttons { display: flex; gap: 1rem; }
    </style>
</head>
<body>
    <div class="wrap">
        <h1>Edit Blog</h1>
        <form id="form">
            <input id="title" placeholder="Title" required />
            <textarea id="description" placeholder="Description"></textarea>
            <textarea id="content" placeholder="Content" rows="8" required></textarea>
            <select id="status">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
            </select>
            <input id="image" type="file" accept="image/*" />
            <div class="form-buttons">
                <button type="submit" class="btn">Update</button>
                <a class="btn" href="/admin/blogs">Back</a>
            </div>
        </form>
    </div>
    <script>
        const id = window.location.pathname.split('/').slice(-2)[0];
        async function load() {
            const token = localStorage.getItem('token');
            const res = await fetch('/api/admin/blogs', { headers: { Authorization: 'Bearer ' + token } });
            const blogs = await res.json();
            const b = blogs.find(x => String(x.id) === id);
            if (!b) return;
            document.getElementById('title').value = b.title || '';
            document.getElementById('description').value = b.description || '';
            document.getElementById('content').value = b.content || '';
            document.getElementById('status').value = b.status || 'draft';
        }
        document.getElementById('form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const token = localStorage.getItem('token');
            const fd = new FormData();
            const title = document.getElementById('title').value;
            const description = document.getElementById('description').value;
            const content = document.getElementById('content').value;
            const status = document.getElementById('status').value;
            if (title) fd.append('title', title);
            fd.append('description', description);
            fd.append('content', content);
            fd.append('status', status);
            const file = document.getElementById('image').files[0];
            if (file) fd.append('featured_image', file);
            const res = await fetch('/api/admin/blog/' + id, { method: 'POST', headers: { Authorization: 'Bearer ' + token, 'X-HTTP-Method-Override': 'PUT' }, body: fd });
            if (res.ok) window.location.href = '/admin/blogs';
        });
        load();
    </script>
</body>
</html>
