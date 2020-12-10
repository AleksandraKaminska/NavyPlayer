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
