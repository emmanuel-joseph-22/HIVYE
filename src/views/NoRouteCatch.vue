<template>
    <section class="w-full flex">
        <div class="mx-auto flex flex-col my-24">
            <h1 class="text-2xl">404</h1>
            <h3 class="text-xl mb-8">Page not found</h3>
            <router-link :to="{ name: 'forum' }">
                <button class="rounded-full shadow-lg bg-accentRed hover:bg-matcha px-8 py-3 my-8">
                    Go back
                </button>
            </router-link>
        </div>        
    </section>
</template>
