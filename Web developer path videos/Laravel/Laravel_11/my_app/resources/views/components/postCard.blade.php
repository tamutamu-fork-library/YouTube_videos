@props(['post', 'full' => false])

<div class="card">
    {{-- Cover photo --}}
    <div class="h-52 rounded-md mb-4 w-full object-cover overflow-hidden">
        @if ($post->image)
            <img src="{{ asset('storage/' . $post->image) }}" alt="">
        @else
            <img src="{{ asset('storage/posts_images/default.jpeg') }}" alt="">
        @endif
    </div>

    {{-- Title --}}
    <h2 class="font-bold text-xl">{{ $post->title }}</h2>

    {{-- Author and Date --}}
    <div class="text-xs font-light mb-4">
        <span>Posted {{ $post->created_at->diffForHumans() }} by </span>
        <a href="{{ route('posts.user', $post->user) }}" class="text-blue-500 font-medium">{{ $post->user->username }}</a>
    </div>

    {{-- Body --}}
    @if ($full)
        {{-- Show full body text in single post page --}}
        <div class="text-sm">
            <span>{{ $post->body }}</span>
        </div>
    @else
        {{-- Show limited body text in single post page --}}
        <div class="text-sm">
            <span>{{ Str::words($post->body, 15) }}</span>
            <a href="{{ route('posts.show', $post) }}" class="text-blue-500 ml-2">Read more &rarr;</a>
        </div>
    @endif

    {{-- Placeholder for extra elements used in user dashboard --}}
    <div class="flex items-center justify-end gap-4 mt-6">
        {{ $slot }}
    </div>
</div>