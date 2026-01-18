const supabaseUrl = 'https://bulbvycoqyslcpbvgarf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1bGJ2eWNvcXlzbGNwYnZnYXJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3NzA2NDYsImV4cCI6MjA4NDM0NjY0Nn0.5J6yCqbBRHOvbvOmzUE-OtgaTdclbu7Mi78MHHM1Slw';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

async function loadSongs() {
    const grid = document.getElementById('songs-grid');

    // Haetaan biisit kuvineen tietokannasta
    const { data: songs, error } = await supabaseClient
        .from('biisit')
        .select('*')
        .order('nimi'); // Aakkosjärjestys

    if (error) {
        console.error(error);
        return;
    }

    grid.innerHTML = '';

    songs.forEach(song => {
        // Jos kuvaa ei ole, käytetään placeholderia
        const imgUrl = song.kuva_url || 'https://via.placeholder.com/300/000000/FFFFFF?text=Music';

        const card = document.createElement('div');
        card.className = 'song-card';
        card.innerHTML = `
            <img src="${imgUrl}" class="album-art" alt="${song.nimi}">
            <span class="song-title">${song.nimi}</span>
            <span class="song-artist">${song.artisti}</span>
            <button class="play-btn" onclick="playSong(${song.id}, '${song.nimi}')">▶</button>
        `;
        grid.appendChild(card);
    });
}

// Tämä funktio simuloi kuuntelua!
async function playSong(biisiId, biisiNimi) {
    console.log(`Playing: ${biisiNimi}`);
    
    // Visuaalinen palaute (alert on vähän ruma, mutta toimii testissä)
    // Oikeasti tässä alkaisi soida musiikki
    const btn = event.target;
    btn.innerHTML = "Iı"; // Pause icon simulation
    
    // TÄRKEÄ: Tallennetaan kuuntelu tietokantaan
    const { error } = await supabaseClient
        .from('historia')
        .insert({ biisi_id: biisiId });

    if (error) {
        console.error('Virhe tallennuksessa:', error);
    } else {
        console.log('Kuuntelu tallennettu tietokantaan!');
        
        // Palautetaan nappi normaaliksi hetken päästä
        setTimeout(() => {
            btn.innerHTML = "▶";
            alert(`Kuunneltu: ${biisiNimi}. Wrapped päivittyy!`);
        }, 500);
    }
}

// Ladataan biisit heti kun sivu aukeaa
loadSongs();