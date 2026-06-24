/**
 * Utility to extract Video ID or Playlist ID from standard YouTube URLs.
 */
export function extractYouTubeId(url: string): { videoId?: string; playlistId?: string } {
  try {
    const trimmed = url.trim()
    
    // Check for Playlist ID first
    const playlistRegExp = /[&?]list=([^&]+)/
    const playlistMatch = trimmed.match(playlistRegExp)
    if (playlistMatch && playlistMatch[1]) {
      return { playlistId: playlistMatch[1] }
    }

    // Check for standard watch URL or short link
    const videoRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
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
