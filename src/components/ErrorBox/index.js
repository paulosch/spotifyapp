import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Creators as ErrorActions } from '../../store/ducks/error'

import CloseIcon from '../../assets/images/close.svg'
import { Container } from './styles'

const ErrorBox = () => {
  const dispatch = useDispatch()
  const { message, visible } = useSelector(state => state.error)

  const handleClick = () => {
    dispatch(ErrorActions.hideError())
  }

  return (
    visible && (
      <Container>
        <p>{message}</p>
        <button onClick={handleClick}>
          <img src={CloseIcon} alt="Fechar" />
        </button>
      </Container>
    )
  )
}

export default ErrorBox
