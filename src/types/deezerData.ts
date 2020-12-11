export type ArtistType = {
  id?: number
  link?: string
  name?: string
  nb_album?: number
  nb_fan?: number
  picture?: string
  picture_big?: string
  picture_medium?: string
  picture_small?: string
  picture_xl?: string
  radio?: boolean
  tracklist?: string
  type?: 'artist'
}

export type AlbumType = {
  id?: number
  cover?: string
  cover_big?: string
  cover_medium?: string
  cover_small?: string
  cover_xl?: string
  explicit_lyrics?: boolean
  fans?: number
  genre_id?: number
  link?: string
  md5_image?: string
  record_type?: string
  release_date?: string
  title?: string
  tracklist?: string
  type?: 'album'
}

export type TrackType = {
  id?: number
  album?: any
  artist?: ArtistType
  duration?: number
  explicit_content_cover?: number
  explicit_content_lyrics?: number
  explicit_lyrics?: boolean
  link?: string
  md5_image?: string
  preview?: string
  rank?: number
  readable?: boolean
  title?: string
  title_short?: string
  title_version?: string
  type?: 'track'
}
