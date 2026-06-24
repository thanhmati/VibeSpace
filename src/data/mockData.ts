export interface LofiStream {
  id: string;
  title: string;
  channel: string;
  videoId: string;
  playlistId?: string;
  imageUrl: string;
}

export interface BackgroundPreset {
  id: string;
  name: string;
  url: string;
}

export interface AmbientSound {
  id: string;
  key: string;
  name: string;
  iconName: string;
  defaultVolume: number;
  audioUrl: string;
}

export const DEFAULT_LOFI_STREAMS: LofiStream[] = [
  {
    id: "lofi-girl",
    title: "1 A.M Study Session 📚 [lofi hip hop]",
    channel: "Lofi Girl",
    videoId: "lTRiuFIWV54",
    imageUrl:
      "https://i.ytimg.com/vi/lTRiuFIWV54/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAMK_m8HvYYIeUmaaXjbm2I1cPnVA",
  },
  {
    id: "lofi-girl-2",
    title: "2 A.M Study Session 📚 [lofi hip hop]",
    channel: "Lofi Girl",
    videoId: "wAPCSnAhhC8",
    imageUrl:
      "https://i.ytimg.com/vi/wAPCSnAhhC8/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBS9RZ5iVQLUTb14OEX_EP--tJnSg",
  },
  {
    id: "cozy-coffee",
    title: "Cozy Coffee Shop Jazz",
    channel: "Coffee Shop Vibes",
    videoId: "NJuSStkIZBg",
    imageUrl:
      "https://i.ytimg.com/vi/NJuSStkIZBg/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCzOa027gJJdVBcIDPOb-062NK9rg",
  },
  {
    id: "jazzy-lofi",
    title: "Jazz × Lofi Hip Hop",
    channel: "Lofi Girl",
    videoId: "-R0UYHS8A_A",
    imageUrl:
      "https://i.ytimg.com/vi/-R0UYHS8A_A/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDWkqkTVrGbu04QiP789oGRMnTWpA",
  },
  {
    id: "rainy-jazz",
    title: "Rainy Day Jazz Café",
    channel: "Calmed By Nature",
    videoId: "c0_ejQQcrwI",
    imageUrl:
      "https://i.ytimg.com/vi/c0_ejQQcrwI/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBfM_C4IHcYXdMp31nVcAj7jdi4Yg",
  },
  {
    id: "MONOMAN",
    title: "Meditation - Monoman",
    channel: "MONOMAN",
    videoId: "FjHGZj2IjBk",
    imageUrl:
      "https://i.ytimg.com/vi/FjHGZj2IjBk/hq720.jpg?sqp=-oaymwFBCNAFEJQDSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AH-CYAC0AWKAgwIABABGH8gQSgeMA8=&rs=AOn4CLApyo4sLxD2OiciLT11ykwZLEeAqg",
  },
];

export const BACKGROUND_PRESETS: BackgroundPreset[] = [
  {
    id: "forest",
    name: "Misty Forest",
    url: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: "ocean",
    name: "Ocean Waves",
    url: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: "cozy-room",
    name: "Quiet Room",
    url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: "mountains",
    name: "Cozy Cabin",
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80",
  },
];

export const AMBIENT_SOUNDS: AmbientSound[] = [
  {
    id: "rain",
    key: "rain",
    name: "Rain",
    iconName: "rain",
    defaultVolume: 70,
    audioUrl:
      "https://raw.githubusercontent.com/karthiknvd/noctune/master/sounds/rain.mp3",
  },
  {
    id: "thunder",
    key: "thunder",
    name: "Thunderstorm",
    iconName: "thunder",
    defaultVolume: 0,
    audioUrl:
      "https://raw.githubusercontent.com/karthiknvd/noctune/master/sounds/thunder.mp3",
  },
  {
    id: "wind",
    key: "wind",
    name: "Forest Breeze",
    iconName: "wind",
    defaultVolume: 0,
    audioUrl:
      "https://raw.githubusercontent.com/karthiknvd/noctune/master/sounds/wind.mp3",
  },
  {
    id: "forest",
    key: "forest",
    name: "Forest Nature",
    iconName: "forest",
    defaultVolume: 0,
    audioUrl:
      "https://raw.githubusercontent.com/karthiknvd/noctune/master/sounds/forest.mp3",
  },
  {
    id: "campfire",
    key: "campfire",
    name: "Campfire",
    iconName: "campfire",
    defaultVolume: 40,
    audioUrl:
      "https://raw.githubusercontent.com/karthiknvd/noctune/master/sounds/campfire.mp3",
  },
  {
    id: "ocean",
    key: "ocean",
    name: "Ocean Waves",
    iconName: "ocean",
    defaultVolume: 0,
    audioUrl:
      "https://raw.githubusercontent.com/bradtraversy/ambient-sound-mixer/main/audio/ocean.mp3",
  },
  {
    id: "cafe",
    key: "cafe",
    name: "Coffee Shop",
    iconName: "cafe",
    defaultVolume: 20,
    audioUrl:
      "https://raw.githubusercontent.com/bradtraversy/ambient-sound-mixer/main/audio/cafe.mp3",
  },
];

export const INITIAL_TODOS = [
  {
    id: "1",
    text: "Review design system",
    completed: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    text: "Write planning docs",
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    text: "Set up Vite React project",
    completed: false,
    createdAt: new Date().toISOString(),
  },
];
