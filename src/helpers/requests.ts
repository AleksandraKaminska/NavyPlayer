import fetchJsonp from 'fetch-jsonp'

export const fetchAlbum: (id: string | number) => Promise<any> = async (id) =>
  await (await fetchJsonp(`https://api.deezer.com/album/${id}?output=jsonp`)).json()

export const fetchPlaylist: (id?: string | number) => Promise<any> = async (id) =>
  await (await fetchJsonp(`https://api.deezer.com/playlist/${id}?output=jsonp`)).json()

export const fetchArtist: (id?: string | number) => Promise<any> = async (id) =>
  await (await fetchJsonp(`https://api.deezer.com/artist/${id}&output=jsonp`)).json()

export const fetchArtistTopTracks: (id?: string | number, limit?: string | number) => Promise<any> = async (
  id,
  limit = 100
) => await (await fetchJsonp(`https://api.deezer.com/artist/${id}/top?limit=${limit}&output=jsonp`)).json()
