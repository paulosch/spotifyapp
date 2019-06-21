import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'

import { Creators as PlaylistsActions } from '../../store/ducks/playlists'
import Loading from '../../components/Loading'
import { Container, Title, List, Playlist } from './styles'

const Browse = () => {
  const dispatch = useDispatch()
  const { data: playlists, loading } = useSelector(state => state.playlists)

  useEffect(() => {
    dispatch(PlaylistsActions.getPlaylistsRequest())
  }, [dispatch])

  return (
    <Container>
      <Title>Navegar {loading && <Loading />}</Title>

      <List>
        {playlists.map(playlist => (
          <Playlist key={playlist.id} to={`/playlists/${playlist.id}`}>
            <img src={playlist.thumbnail} Alt={playlist.Title} />
            <strong>{playlist.Title}</strong>
            <p>{playlist.description}</p>
          </Playlist>
        ))}
      </List>
    </Container>
  )
}

Browse.protoTypes = {
  playlists: PropTypes.shape({
    data: PropTypes.array,
    id: PropTypes.number,
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    description: PropTypes.string
  }).isRequired,
  loading: PropTypes.bool
}

export default Browse
