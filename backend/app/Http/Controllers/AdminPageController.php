<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminPageController extends Controller
{
    public function login()
    {
        return view('admin.login');
    }

    public function dashboard()
    {
        return view('admin.dashboard');
    }

    public function blogs()
    {
        return view('admin.blogs.index');
    }

    public function createBlog()
    {
        return view('admin.blogs.create');
    }

    public function editBlog($id)
    {
        return view('admin.blogs.edit', ['id' => $id]);
    }
}
