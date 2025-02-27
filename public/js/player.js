document.addEventListener('DOMContentLoaded', () => {
    const playlist = document.getElementById('playlist');
    const audioPlayer = document.getElementById('audioPlayer');
    const audioSource = document.getElementById('audioSource');
    const songs = [];

    // Populate songs array with file names from data-file attributes
    playlist.querySelectorAll('a').forEach((link) => {
        songs.push(link.getAttribute('data-file'));
    });

    let currentIndex = 0; // Track current song index

    // Play song by index
    const playSong = (index) => {
        if (index < 0 || index >= songs.length) return; // Check if index is out of bounds
        const fileName = songs[index];
        audioSource.src = `/uploads/${fileName}`;
        audioPlayer.load();
        audioPlayer.play();
        currentIndex = index; // Update current index
    };

    // Event listener for playlist click
    playlist.addEventListener('click', (e) => {
        if (e.target && e.target.nodeName === 'A') {
            e.preventDefault();
            const index = parseInt(e.target.getAttribute('data-index'));
            playSong(index);
        }
    });

    // Event listener for when the song ends
    audioPlayer.addEventListener('ended', () => {
        currentIndex += 1; // Move to next song
        if (currentIndex < songs.length) {
            playSong(currentIndex);
        }
    });
});
