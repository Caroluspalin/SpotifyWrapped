// 1. SUPABASE CONFIG 
const supabaseUrl = 'https://bulbvycoqyslcpbvgarf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1bGJ2eWNvcXlzbGNwYnZnYXJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3NzA2NDYsImV4cCI6MjA4NDM0NjY0Nn0.5J6yCqbBRHOvbvOmzUE-OtgaTdclbu7Mi78MHHM1Slw';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function fetchTopTracks() {
    const listContainer = document.getElementById('tracks-list');

    // 2. Fetch data from the 'top_tracks' VIEW we created in SQL
    // We order by play_count descending and take top 5
    const { data, error } = await supabase
        .from('top_tracks')
        .select('*')
        .order('play_count', { ascending: false })
        .limit(5);

    if (error) {
        console.error('Error:', error);
        listContainer.innerHTML = '<p>Error loading tracks.</p>';
        return;
    }

    // 3. Clear loading text
    listContainer.innerHTML = '';

    // 4. Render cards
    data.forEach((track, index) => {
        const card = document.createElement('div');
        card.className = 'track-card';
        
        card.innerHTML = `
            <div class="rank-num">#${index + 1}</div>
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
}

// Run immediately
fetchTopTracks();