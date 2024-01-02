import { colors } from '@/styles/colors'

import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { motion } from 'framer-motion'

export const Container = styled(motion.div)`
  position: fixed;
  background-color: ${colors.Dark_600};

  width: 13rem;

  top: 80px;
  right: 0px;
  /* margin-left: auto; */

  display: flex;
  flex-direction: column;

  p {
    font-size: 1.2rem;
    font-weight: 500;
    color: ${colors.Light};
  }
`

export const NavButton = styled.button`
  background-color: transparent;
  color: ${colors.Dark_300};
  display: flex;
  gap: 8px;
  border: none;
  align-items: center;
  box-shadow: none;
  outline: none;

  cursor: pointer;
  transition: all 0.2s;

  svg {
    width: 25px;
    height: 25px;
  }

  p {
    color: ${colors.Dark_300};
    font-weight: 500;
    font-size: 14px;
  }

  &:hover {
    p {
      text-decoration: underline;
    }
  }
`

export const Button = styled.button`
  background-color: transparent;

  padding: 1rem;
  border: none;
  align-items: center;
  box-shadow: none;

  border-top: 1px solid ${colors.Dark_300};

  cursor: pointer;

  transition: all 0.2s;

  p {
    color: ${colors.Dark_300};
    font-weight: 500;
    font-size: 14px;
  }

  &:hover {
    p {
      text-decoration: underline;
    }
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;

  gap: 0.5rem;
`

export const Anchor = styled(Link)`
  background-color: transparent;
  color: ${colors.Dark_300};
  display: flex;
  gap: 8px;
  text-decoration: none;
  align-items: center;
  box-shadow: none;

  cursor: pointer;
  transition: all 0.2s;

  svg {
    width: 25px;
    height: 25px;
  }

  p {
    color: ${colors.Dark_300};
    font-weight: 500;
    font-size: 14px;
  }

  &:hover {
    p {
      text-decoration: underline;
    }
  }
`
