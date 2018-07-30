import styled from 'styled-components';

export const DeadBox = styled.div`font-size: ${props => props.sw * 0.75 + 'px'};
  line-height: ${props => props.sw * 0.75 + 'px'};
  vertical-align: middle;
  display: table-cell;
  font-weight: 100;
  border: 1px solid whitesmoke;
  width: 100%;`;

export const DeadBoxContainer = styled.div`display: table; 
  text-align: center; 
  vertical-align: middle; 
  min-height: ${props => props.sw + 'px'}`

export const Header = styled.div`display: block;
  height: 20px; 
  text-align: center; 
  padding: 10px; 
  margin-bottom: 30px; 
  border-bottom: 2px solid #3ddad7`;

export const BoardContainer = styled.div`display: flex; justify-content: center`;

export const DeadBoxColumn = styled.div`display: flex; 
  flex-wrap: wrap; 
  flex-direction: column; 
  width: ${props => props.sw + 'px'}; 
  height: 100%`

export const DeadBoxColumnContainer = styled.div`display: inline-flex; 
  margin-right: 8px; 
  margin-left: 8px; 
  height: ${props => props.boardWidth + 'px'}; 
  border: 1px solid #3ddad7; 
  width: ${props => props.sw * 2 + 'px'};`

export const BoardPieceSquare = styled.div`width: ${props => props.boardWidth + 'px'};
  height: ${props => props.boardWidth + 'px'};
  display: inline-flex;
  margin: 0px;
  flex-wrap: wrap;
  border: 1px solid #3ddad7;`

export const OverlaySquare = styled.div`position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
  opacity: 0.5;
  background-color: ${props => props.color}`

export const StyledSquare = styled.div`background-color: ${props => props.fill};
  width: 100%;
  height: 100%;
  text-align: center;
  display: table;`