export interface LofiStream {
  id: string
  title: string
  channel: string
  videoId: string
  playlistId?: string
  imageUrl: string
}

export interface BackgroundPreset {
  id: string
  name: string
  url: string
}

export interface AmbientSound {
  id: string
  key: string
  name: string
  iconName: string
  defaultVolume: number
  audioUrl: string
}

export const DEFAULT_LOFI_STREAMS: LofiStream[] = [
  {
    id: 'lofi-girl',
    title: 'Lofi Girl Live Stream',
    channel: 'Lofi Girl',
    videoId: 'jfKfPfyJRdk',
    imageUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 'chillhop',
    title: 'Chillhop Café Radio',
    channel: 'Chillhop Music',
    videoId: '5yx6Gygb9ac',
    imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 'cozy-rain',
    title: 'Cozy Coffee Shop Jazz',
    channel: 'Lofi Cafe',
    videoId: 'a7GIFyc0108',
    imageUrl: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=120&q=80'
  }
]

export const BACKGROUND_PRESETS: BackgroundPreset[] = [
  {
    id: 'forest',
    name: 'Misty Forest',
    url: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1920&q=80'
  },
  {
    id: 'ocean',
    name: 'Ocean Waves',
    url: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1920&q=80'
  },
  {
    id: 'cozy-room',
    name: 'Quiet Room',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1920&q=80'
  },
  {
    id: 'mountains',
    name: 'Cozy Cabin',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80'
  }
]

export const AMBIENT_SOUNDS: AmbientSound[] = [
  {
    id: 'rain',
    key: 'rain',
    name: 'Rain',
    iconName: 'rain',
    defaultVolume: 70,
    audioUrl: 'https://raw.githubusercontent.com/karthiknvd/noctune/master/sounds/rain.mp3'
  },
  {
    id: 'thunder',
    key: 'thunder',
    name: 'Thunderstorm',
    iconName: 'thunder',
    defaultVolume: 0,
    audioUrl: 'https://raw.githubusercontent.com/karthiknvd/noctune/master/sounds/thunder.mp3'
  },
  {
    id: 'wind',
    key: 'wind',
    name: 'Forest Breeze',
    iconName: 'wind',
    defaultVolume: 0,
    audioUrl: 'https://raw.githubusercontent.com/karthiknvd/noctune/master/sounds/wind.mp3'
  },
  {
    id: 'forest',
    key: 'forest',
    name: 'Forest Nature',
    iconName: 'forest',
    defaultVolume: 0,
    audioUrl: 'https://raw.githubusercontent.com/karthiknvd/noctune/master/sounds/forest.mp3'
  },
  {
    id: 'campfire',
    key: 'campfire',
    name: 'Campfire',
    iconName: 'campfire',
    defaultVolume: 40,
    audioUrl: 'https://raw.githubusercontent.com/karthiknvd/noctune/master/sounds/campfire.mp3'
  },
  {
    id: 'ocean',
    key: 'ocean',
    name: 'Ocean Waves',
    iconName: 'ocean',
    defaultVolume: 0,
    audioUrl: 'https://raw.githubusercontent.com/bradtraversy/ambient-sound-mixer/main/audio/ocean.mp3'
  },
  {
    id: 'cafe',
    key: 'cafe',
    name: 'Coffee Shop',
    iconName: 'cafe',
    defaultVolume: 20,
    audioUrl: 'https://raw.githubusercontent.com/bradtraversy/ambient-sound-mixer/main/audio/cafe.mp3'
  }
]

export const INITIAL_TODOS = [
  { id: '1', text: 'Review design system', completed: true, createdAt: new Date().toISOString() },
  { id: '2', text: 'Write planning docs', completed: false, createdAt: new Date().toISOString() },
  { id: '3', text: 'Set up Vite React project', completed: false, createdAt: new Date().toISOString() }
]
