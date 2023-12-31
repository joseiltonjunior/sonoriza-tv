import { colors } from '@/styles/colors'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Container = styled.header`
  background-color: ${colors.Primary};
  height: 70px;
  display: flex;
  align-items: center;
  position: fixed;

  z-index: 1000;
  width: 100%;

  justify-content: space-between;

  padding: 0 1rem;

  .hiddenMobile {
    display: flex;
    gap: 4px;
    align-items: center;

    @media (max-width: 900px) {
      display: none;
    }
  }
`
export const LimitContent = styled.div`
  max-width: calc(100vw - ((100vw - 1180px) / 2));
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: space-between;

  /* position: relative; */
`

export const Logo = styled.img`
  height: 40px;
  width: 150px;
  object-fit: contain;
`

export const Button = styled.button`
  height: fit-content;

  padding: 4px;
  border-radius: 4px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  cursor: pointer;
`

export const Anchor = styled(Link)`
  height: fit-content;

  padding: 4px;
  border-radius: 4px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  cursor: pointer;
`

export const Profile = styled.button`
  width: 45px;
  height: 45px;
  overflow: hidden;

  border-radius: 45px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  cursor: pointer;

  margin-left: 20px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 900px) {
    width: 40px;
    height: 40px;
  }
`

export const Content = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`

export const Brand = styled.img`
  width: 20px;
  height: 20px;
`
export const HomeButtom = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  @media (max-width: 900px) {
    display: flex;
  }
`

export const ContentLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`
