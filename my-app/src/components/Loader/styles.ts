import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

interface ContentBoxProps {
  isShowResult: boolean
}

const rotateAnimation = keyframes`
    100% {
      transform: rotate(1turn);
    }
 `

export const LoaderComponent = styled.div`
  display: none;
  --d: 22px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  color: #c5e5ec;
  box-shadow: calc(1 * var(--d)) calc(0 * var(--d)) 0 0 #ebb92e,
    calc(0.707 * var(--d)) calc(0.707 * var(--d)) 0 1px #c5e5ec,
    calc(0 * var(--d)) calc(1 * var(--d)) 0 2px #f16d7a;
  animation: ${rotateAnimation} 1s infinite steps(8);

  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -2px;
  margin-left: -2px;

  ${({ isLoading }: { isLoading: boolean }) =>
    isLoading &&
    `
    display: block;
  `}
`
