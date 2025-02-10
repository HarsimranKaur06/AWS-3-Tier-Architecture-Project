import styled from 'styled-components';

export const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #ffdead; /* Updated background color to #ffdead */
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
  height: 100vh;
  width: 200px; /* Width of the menu slider */
  text-align: center; /* Center text horizontally */
  padding: 1rem; /* Padding inside the menu */
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }

  ul {
    list-style: none; /* Remove default list item markers */
    padding: 0; /* Remove default padding */
    margin: 0; /* Remove default margin */
    display: flex;
    flex-direction: column; /* Stack items vertically */
    align-items: center; /* Center items horizontally */
  }

  li {
    margin: 0; /* Remove margin from list items */
  }

  a {
    font-size: 1.2rem; /* Adjusted font size */
    text-transform: uppercase;
    padding: 1rem 0; /* Padding for vertical alignment */
    font-weight: bold;
    letter-spacing: 0.3rem; /* Letter spacing */
    color: #000000; /* Change text color if needed */
    text-decoration: none;
    transition: color 0.3s linear;
    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 1rem; /* Smaller font size for mobile */
    }
    &:hover {
      color: ${({ theme }) => theme.primaryHover}; /* Change color on hover */
    }
  }
`;