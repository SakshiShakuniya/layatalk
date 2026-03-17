<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Blog;
use App\Models\User;
use Illuminate\Support\Str;

class DetailedBlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first();

        if ($user) {
            Blog::updateOrCreate(
                ['slug' => 'the-ultimate-guide-to-layatalk'],
                [
                    'user_id' => $user->id,
                    'title' => 'The Ultimate Guide to LayaTalk',
                    'description' => 'Everything you need to know about LayaTalk, from its features to its community.',
                    'content' => '<p>LayaTalk is a revolutionary platform that is changing the way people connect and interact. In this guide, we will explore all the amazing features that LayaTalk has to offer.</p><h2>Features</h2><ul><li>Real-time chat</li><li>Group conversations</li><li>File sharing</li><li>And much more!</li></ul>',
                    'featured_image' => 'https://placehold.co/1200x600/0077be/ffffff?text=LayaTalk',
                    'status' => 'published',
                ]
            );
        }
    }
}
