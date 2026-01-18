const supabaseUrl = 'https://bulbvycoqyslcpbvgarf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1bGJ2eWNvcXlzbGNwYnZnYXJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3NzA2NDYsImV4cCI6MjA4NDM0NjY0Nn0.5J6yCqbBRHOvbvOmzUE-OtgaTdclbu7Mi78MHHM1Slw';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

async function revealArtist() {
    // Haetaan ykkösbiisi
    const { data, error } = await supabaseClient
        .from('top_tracks')
        .select('*')
        .order('play_count', { ascending: false })
        .limit(1); // Otetaan vain voittaja

    if (error || data.length === 0) return;

    const topTrack = data[0];

    // Päivitetään HTML
    document.getElementById('artist-name').innerText = topTrack.artist;
    document.getElementById('play-count').innerText = topTrack.play_count;
    
    // Kuvien käsittely
    const imgUrl = topTrack.kuva_url || 'https://via.placeholder.com/300';
    document.getElementById('artist-img').src = imgUrl;
    document.getElementById('bg-img').style.backgroundImage = `url('${imgUrl}')`;
}

revealArtist();