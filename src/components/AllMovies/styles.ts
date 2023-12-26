import { colors } from '@/styles/colors'
import { shade } from 'polished'
import styled, { css } from 'styled-components'

interface ButtonCheck {
  $isCheck: boolean
}

export const Container = styled.div`
  margin: 4rem 0;

  div.content {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 2rem;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
      gap: 1rem;
      margin-right: 1rem;
    }
  }
`
export const Aside = styled.div`
  background-color: transparent;

  border-radius: 6px;
  height: fit-content;

  div.filter {
    overflow: hidden;
    border: 1px solid ${colors.Primary};
    border-radius: 6px;
    margin-top: 1rem;

    p {
      font-weight: bold;
    }

    div {
      padding: 6px;
    }
  }
`

export const Button = styled.button`
  width: 100%;
  border: none;
  padding: 8px 12px;
  background-color: ${colors.Primary};
  color: ${colors.Light};
  font-weight: bold;

  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`

export const Content = styled.div`
  div.grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2rem 1rem;

    @media (max-width: 900px) {
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }

  div.moreButton {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }
`

export const ViewMore = styled.button`
  width: fit-content;
  padding: 0.5rem 4rem;
  border-radius: 16px;
  border: none;

  font-weight: bold;

  background-color: ${colors.Primary};
  color: ${colors.Light};

  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background-color: ${shade(0.2, colors.Primary)};
  }
`

export const ContentGenres = styled.div`
  div {
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    column-count: 2;
    justify-content: center;
    gap: 0.4rem;
  }
`
export const ContentOrder = styled.div`
  overflow: hidden;
  border: 1px solid ${colors.Primary};
  border-radius: 6px;

  div {
    padding: 6px;
  }
`

export const TagGenre = styled.button<ButtonCheck>`
  border-radius: 2rem;

  background-color: transparent;
  padding: 6px 12px;
  border: 1px solid ${colors.Primary};
  color: ${(props) => props.theme.font};
  font-weight: 600;
  cursor: pointer;
  font-size: 13px;
  white-space: nowrap;

  transition: all 0.2s;

  &:hover {
    background-color: ${colors.Primary};
  }

  ${(props) =>
    props.$isCheck &&
    css`
      background-color: ${colors.Primary};
    `}
`
