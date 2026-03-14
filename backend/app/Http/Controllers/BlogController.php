<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Blog;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class BlogController extends Controller
{
    public function indexPublic()
    {
        $blogs = Blog::where('status', 'published')
            ->with('user:id,name')
            ->latest()
            ->get(['id','user_id','title','slug','description','featured_image','created_at','updated_at']);
        return response()->json($blogs);
    }

    public function showBySlug(string $slug)
    {
        $blog = Blog::where('slug', $slug)->with('user:id,name')->firstOrFail();
        return response()->json($blog);
    }

    public function indexAdmin()
    {
        return response()->json(Blog::with('user:id,name')->latest()->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => ['required','string','max:255'],
            'description' => ['nullable','string','max:500'],
            'content' => ['required','string'],
            'status' => ['required','in:published,draft'],
            'featured_image' => ['nullable','image','max:10240'],
        ]);

        $data['slug'] = Str::slug($data['title']);
        if (Blog::where('slug', $data['slug'])->exists()) {
            $data['slug'] .= '-'.Str::random(6);
        }
        if ($request->hasFile('featured_image')) {
            $path = $request->file('featured_image')->store('blogs', 'public');
            $data['featured_image'] = '/storage/' . $path;
            Log::info('Stored new image in store', ['path' => $data['featured_image']]);
        }
        $data['user_id'] = $request->user()->id;
        $blog = Blog::create($data);
        Log::info('Blog created', [
            'id' => $blog->id,
            'hasFile' => $request->hasFile('featured_image'),
            'featured_image' => $blog->featured_image,
        ]);
        return response()->json($blog->fresh(), 201);
    }

    public function update(Request $request, int $id)
    {
        $blog = Blog::findOrFail($id);
        Log::info('Blog update request', [
            'id' => $id,
            'hasFile' => $request->hasFile('featured_image'),
            'current' => $blog->featured_image,
        ]);

        $data = $request->validate([
            'title' => ['sometimes','string','max:255'],
            'description' => ['sometimes','nullable','string','max:500'],
            'content' => ['sometimes','string'],
            'status' => ['sometimes','in:published,draft'],
            'featured_image' => ['sometimes','nullable','image','max:10240'],
        ]);

        if (isset($data['title'])) {
            $slug = Str::slug($data['title']);
            if (Blog::where('slug', $slug)->where('id','!=',$blog->id)->exists()) {
                $slug .= '-'.Str::random(6);
            }
            $data['slug'] = $slug;
        }

        if ($request->hasFile('featured_image')) {
            // Delete old image if it exists
            if ($blog->featured_image) {
                $oldPath = parse_url($blog->featured_image, PHP_URL_PATH);
                // Remove /storage/ prefix to get relative path for Storage disk
                $old = ltrim(str_replace('/storage/', '', $oldPath), '/');
                if ($old && Storage::disk('public')->exists($old)) {
                    Storage::disk('public')->delete($old);
                    Log::info('Deleted old image', ['path' => $old]);
                }
            }

            // Store new image
            $path = $request->file('featured_image')->store('blogs', 'public');
            // Store relative path in database
            $data['featured_image'] = '/storage/' . $path;
            Log::info('Stored new image', ['path' => $data['featured_image']]);
        }

        $blog->update($data);
        $fresh = $blog->fresh();
        
        Log::info('Blog updated', [
            'id' => $fresh->id,
            'featured_image' => $fresh->featured_image,
        ]);

        return response()->json($fresh);
    }

    public function destroy(int $id)
    {
        $blog = Blog::findOrFail($id);
        $blog->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
