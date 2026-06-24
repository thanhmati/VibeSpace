/**
 * Utility to extract Video ID or Playlist ID from standard YouTube URLs.
 */
export function extractYouTubeId(url: string): { videoId?: string; playlistId?: string } {
  try {
    const trimmed = url.trim()

    // Check for Playlist ID first (but not if it's a mix/watch playlist auto-generated)
    const playlistRegExp = /[&?]list=((?!RD|WL)[^&]+)/
    const playlistMatch = trimmed.match(playlistRegExp)
    if (playlistMatch && playlistMatch[1]) {
      // Also extract videoId if present in the same URL
      const videoRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
      const videoMatch = trimmed.match(videoRegExp)
      const videoId = videoMatch && videoMatch[2] && videoMatch[2].length === 11
        ? videoMatch[2]
        : undefined
      return { playlistId: playlistMatch[1], videoId }
    }

    // Check for standard watch URL or short link
    const videoRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const videoMatch = trimmed.match(videoRegExp)
    if (videoMatch && videoMatch[2] && videoMatch[2].length === 11) {
      return { videoId: videoMatch[2] }
    }

    // Fallback if the user just inputs the 11 character ID directly
    if (trimmed.length === 11 && !trimmed.includes('/') && !trimmed.includes('.')) {
      return { videoId: trimmed }
    }

    return {}
  } catch (error) {
    console.error('Error parsing YouTube URL:', error)
    return {}
  }
}

/**
 * Get the best available YouTube thumbnail URL for a video.
 * Returns high quality first, falls back to medium quality.
 */
export function getYouTubeThumbnail(videoId: string, quality: 'hq' | 'mq' | 'sd' = 'mq'): string {
  if (!videoId) return ''
  const qualityMap = {
    hq: 'hqdefault',
    mq: 'mqdefault',
    sd: 'sddefault',
  }
  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`
}

/**
 * Unsplash fallback images for lofi/music themes (random selection).
 */
const LOFI_FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=120&q=80',
  'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=120&q=80',
  'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=120&q=80',
  'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=120&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=120&q=80',
]

export function getRandomFallbackImage(): string {
  return LOFI_FALLBACK_IMAGES[Math.floor(Math.random() * LOFI_FALLBACK_IMAGES.length)]
}

export interface VideoValidationResult {
  ok: boolean
  title?: string
  author?: string
  thumbnailUrl?: string
  error?: string
}

/**
 * Validate a YouTube video ID using the noembed.com oEmbed proxy (no API key needed).
 * Returns metadata if valid, or an error message if not.
 */
export async function validateYouTubeVideo(videoId: string): Promise<VideoValidationResult> {
  if (!videoId || videoId.length !== 11) {
    return { ok: false, error: 'Invalid video ID format' }
  }
  try {
    const res = await fetch(
      `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`,
      { signal: AbortSignal.timeout(6000) }
    )
    if (!res.ok) {
      return { ok: false, error: 'Could not reach validation service' }
    }
    const data = await res.json()
    // noembed returns { error: "..." } for unavailable videos
    if (data.error) {
      return { ok: false, error: data.error }
    }
    return {
      ok: true,
      title: data.title,
      author: data.author_name,
      thumbnailUrl: data.thumbnail_url || getYouTubeThumbnail(videoId, 'mq'),
    }
  } catch (err: any) {
    if (err?.name === 'AbortError' || err?.name === 'TimeoutError') {
      return { ok: false, error: 'Validation timed out' }
    }
    return { ok: false, error: 'Network error during validation' }
  }
}
