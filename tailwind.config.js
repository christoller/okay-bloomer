module.exports = {
    content: [
        './client/index.html',
        './client/js/*.js',
        './client/js/*/*.js',
        './client/js/*/*/*.js',
    ],
    theme: {
        fontFamily: {
            body: ['IBM Plex Serif', 'serif'],
            title: ['Alfa Slab One', 'cursive'],
            type: ['Noto Sans Display', 'sans-serif'],
        },
        extend: {},
    },
    plugins: [],
};
