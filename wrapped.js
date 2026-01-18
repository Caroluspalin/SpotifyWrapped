const supabaseUrl = 'https://bulbvycoqyslcpbvgarf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1bGJ2eWNvcXlzbGNwYnZnYXJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3NzA2NDYsImV4cCI6MjA4NDM0NjY0Nn0.5J6yCqbBRHOvbvOmzUE-OtgaTdclbu7Mi78MHHM1Slw';

// Luodaan yhteys (käytetään nimeä supabaseClient, jotta ei mene sekaisin)
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

async function fetchTopTracks() {
    const listContainer = document.getElementById('tracks-list');

    // 2. Haetaan data 'top_tracks' -näkymästä
    // Järjestetään play_countin mukaan ja otetaan top 5
    const { data, error } = await supabaseClient
        .from('top_tracks')
        .select('*')
        .order('play_count', { ascending: false })
        .limit(5);

    if (error) {
        console.error('Error:', error);
        listContainer.innerHTML = '<p style="text-align:center; color: #ff5555;">Virhe ladatessa listaa. Tarkista SQL-oikeudet.</p>';
        return;
    }

    // 3. Tyhjennetään "Loading..." teksti
    listContainer.innerHTML = '';

    // 4. Luodaan kortit silmukassa
    data.forEach((track, index) => {
        const card = document.createElement('div');
        card.className = 'track-card';
        
        // Asetetaan animaatioviive, jotta ne liukuvat hienosti peräkkäin
        card.style.animationDelay = `${index * 0.1}s`;
        
        // KUVAN KÄSITTELY: Jos tietokannassa ei ole kuvaa, käytetään mustaa placeholderia
        const imgUrl = track.kuva_url || 'https://via.placeholder.com/60/000000/FFFFFF?text=Music';

        card.innerHTML = `
            <div class="rank-num">#${index + 1}</div>
            
            <img src="${imgUrl}" style="width: 50px; height: 50px; border-radius: 4px; object-fit: cover; margin-right: 15px; box-shadow: 0 2px 5px rgba(0,0,0,0.5);">
            
            <div class="track-info">
                <span class="track-name">${track.track_name}</span>
                <span class="artist-name">${track.artist}</span>
            </div>
            
            <div class="play-count">
                ${track.play_count} plays
            </div>
        `;

        listContainer.appendChild(card);
    });

    // 5. Lisätään loppuun nappi, josta pääsee "Top Artist" -sivulle
    const nextButtonDiv = document.createElement('div');
    nextButtonDiv.style.marginTop = "2rem";
    nextButtonDiv.style.textAlign = "center";
    nextButtonDiv.style.opacity = "0"; // Aluksi piilossa
    nextButtonDiv.style.animation = "slideUp 0.8s forwards 1s"; // Ilmestyy viiveellä

    nextButtonDiv.innerHTML = `
        <button onclick="window.location.href='artist.html'" 
                style="
                    background: var(--neon-green); 
                    color: #050505; 
                    font-weight: 700; 
                    border: none; 
                    padding: 12px 30px; 
                    border-radius: 30px; 
                    font-size: 1rem; 
                    cursor: pointer; 
                    transition: transform 0.2s;
                    box-shadow: 0 0 15px rgba(10, 255, 96, 0.3);
                "
                onmouseover="this.style.transform='scale(1.05)'"
                onmouseout="this.style.transform='scale(1)'">
            Reveal Top Artist &rarr;
        </button>
    `;
    
    listContainer.appendChild(nextButtonDiv);
}

// Käynnistetään haku heti
fetchTopTracks();