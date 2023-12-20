import { colors } from '@/styles/colors'
import styled from 'styled-components'

export const Container = styled.header`
  background-color: ${colors.Primary};
  height: 70px;
  display: flex;
  align-items: center;

  justify-content: space-between;

  padding: 0 1rem;
`
export const LimitContent = styled.div`
  max-width: calc(100vw - ((100vw - 1180px) / 2));
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
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

export const Profile = styled.button`
  width: 45px;
  height: 45px;

  padding: 4px;
  border-radius: 45px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  cursor: pointer;

  margin-left: 20px;

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
