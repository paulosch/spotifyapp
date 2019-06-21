import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { Creators as PlaylistsActions } from '../../store/ducks/playlists'

import { Container, NewPlayList, Nav } from './styles'
import Loading from '../../components/Loading'
import AddPlayListIcon from '../../assets/images/add_playlist.svg'

const Sidebar = () => {
  const dispatch = useDispatch()
  const { data: playlists, loading } = useSelector(state => state.playlists)

  useEffect(() => {
    dispatch(PlaylistsActions.getPlaylistsRequest())
  }, [dispatch])

  return (
    <Container>
      <div>
        <Nav main>
          <li>
            <Link to={'/'}>Navegar</Link>
          </li>
          <li>
            <a href="">Rádio</a>
          </li>
        </Nav>

        <Nav>
          <li>
            <span>SUA BIBLIOTECA</span>
          </li>
          <li>
            <a href="">Seu dayly mix</a>
          </li>
          <li>
            <a href="">Tocados recentimente</a>
          </li>
          <li>
            <a href="">Álbuns</a>
          </li>
          <li>
            <a href="">Artistas</a>
          </li>
          <li>
            <a href="">Estações</a>
          </li>
          <li>
            <a href="">Arquivos locais</a>
          </li>
          <li>
            <a href="">Vídeos</a>
          </li>
          <li>
            <a href="">Podcasts</a>
          </li>
        </Nav>

        <Nav>
          <li>
            <span>PlayList</span>
            {loading && <Loading />}
          </li>
          {playlists.map(playlist => (
            <li key={playlist.id}>
              <Link to={`/playlists/${playlist.id}`}>{playlist.title}</Link>
            </li>
          ))}
        </Nav>
      </div>

      <NewPlayList>
        <img src={AddPlayListIcon} alt="Adicionar playlist" />
        Nova playlist
      </NewPlayList>
    </Container>
  )
}

Sidebar.propTypes = {
  playlists: PropTypes.shape({
    data: PropTypes.array,
    id: PropTypes.number,
    title: PropTypes.string
  }).isRequired,
  loading: PropTypes.bool.isRequired
}

export default Sidebar
