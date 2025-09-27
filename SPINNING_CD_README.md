# 🎵 Spinning CD Component

A realistic, interactive spinning CD component that plays songs from Spotify. The CD is positioned in the top right corner of the website and spins continuously with realistic visual effects.

## ✨ Features

- **Realistic CD Design**: 3D-like appearance with gradients, borders, and shine effects
- **Continuous Spinning**: Smooth rotation animation that runs continuously
- **Interactive Click**: Click to open the song on Spotify in a new tab
- **Visual Feedback**: Hover effects, click animations, and playing state indicators
- **Song Selection**: Choose from multiple songs using the song selector
- **Responsive**: Works on all screen sizes
- **No API Required**: Simple implementation that doesn't require Spotify API keys

## 🎯 Usage

### Basic Implementation

```tsx
import { SpinningCD } from './components/spinning-cd'

<SpinningCD 
  spotifyUrl="https://open.spotify.com/track/your-track-id"
  songTitle="Song Title"
  artist="Artist Name"
/>
```

### With Song Selector

```tsx
import { SongSelector } from './components/song-selector'
import { SpinningCD } from './components/spinning-cd'

const [currentSong, setCurrentSong] = useState({
  id: '1',
  title: 'Blinding Lights',
  artist: 'The Weeknd',
  spotifyUrl: 'https://open.spotify.com/track/0V3wPSX9ygBnCmTps53vjK',
  emoji: '💫'
})

<SongSelector 
  onSongSelect={setCurrentSong}
  currentSong={currentSong}
/>
<SpinningCD 
  spotifyUrl={currentSong.spotifyUrl}
  songTitle={currentSong.title}
  artist={currentSong.artist}
/>
```

## 🎨 Customization

### Props

- `spotifyUrl`: Spotify track URL (opens in new tab when clicked)
- `songTitle`: Title of the song (displayed below the CD)
- `artist`: Artist name (displayed below the song title)

### Styling

The component uses Tailwind CSS classes and can be customized by modifying the component file. Key styling features:

- **CD Size**: Currently set to `w-16 h-16` (64px × 64px)
- **Position**: Fixed positioning in top right corner (`fixed top-4 right-4`)
- **Z-index**: High z-index (`z-50`) to ensure it's above other content
- **Colors**: Gray gradient with rainbow CD effects
- **Animations**: Smooth transitions and hover effects

## 🔧 Technical Details

### Animation System

- **Continuous Spin**: Uses CSS `animate-spin` with 3-second duration
- **Hover Effects**: Scale, rotation, and shadow changes on hover
- **Click Animation**: Quick 360° rotation when clicked
- **Playing State**: Pulse animation when "playing"

### Event Handling

- **Click**: Opens Spotify URL in new tab
- **Hover**: Enhances visual effects and shows song info
- **Song Change**: Custom event system for updating CD info across components

### Browser Compatibility

- Modern browsers with CSS Grid and Flexbox support
- Tailwind CSS required
- React 18+ recommended

## 📱 Responsive Design

The component automatically adjusts to different screen sizes:

- **Desktop**: Full-size CD with hover effects
- **Tablet**: Maintains functionality with touch support
- **Mobile**: Touch-friendly with appropriate sizing

## 🎵 Pre-loaded Songs

The component comes with 5 classic songs pre-configured:

1. **Blinding Lights** - The Weeknd 💫
2. **Bohemian Rhapsody** - Queen 👑
3. **Billie Jean** - Michael Jackson 🌙
4. **Hotel California** - Eagles 🏨
5. **Imagine** - John Lennon 🕊️

## 🚀 Future Enhancements

Potential improvements that could be added:

- **Audio Preview**: Short audio clips before opening Spotify
- **Playlist Support**: Multiple song playlists
- **Custom Themes**: Different CD designs and color schemes
- **Animation Controls**: Pause/resume spinning
- **Integration**: Connect with actual Spotify playback

## 📄 License

This component is part of the Jenny Mai portfolio website and follows the same licensing terms.

---

**Note**: This component is designed to be simple and lightweight, providing a fun interactive element without requiring complex API integrations or external dependencies.
