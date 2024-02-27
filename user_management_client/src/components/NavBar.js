// Import necessary dependencies
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Pane, Text, Heading, majorScale, Link as EvergreenLink, Button } from 'evergreen-ui';

// Functional component for the navigation bar
const NavBar = ({ onLogout }) => {
  // React Router navigate function
  const navigate = useNavigate();

  // Placeholder for authentication status (always true in this example)
  const isAuthenticated = true;

  // Function to handle user logout
  const logout = () => {
    // Navigate to the home page and call the provided onLogout function
    navigate('/');
    onLogout();
  };

  // JSX rendering of the navigation bar
  return (
    <Pane
      display="flex"
      paddingY={majorScale(2)}
      paddingX={majorScale(3)}
      background="tint2"
      elevation={1}
      justifyContent="space-between"
      alignItems="center"
    >
      {/* Link to the home page */}
      <Link to="/home" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
        <Heading size={600}>User Management App</Heading>
      </Link>
      {/* Pane for navigation links and logout button */}
      <Pane>
        {/* Custom NavLink components for each route */}
        <NavLink to="/home" label="Home" />
        <NavLink to="/add" label="Add User" />
        <NavLink to="/view" label="View User List" />
        {/* Logout button displayed only if authenticated */}
        {isAuthenticated && (
          <Button
            appearance="primary"
            intent="danger" 
            iconBefore="log-out" 
            marginRight={majorScale(2)}
            onClick={logout}
          >
            Logout
          </Button>
        )}
      </Pane>
    </Pane>
  );
};

// Custom NavLink component for consistent styling
const NavLink = ({ to, label }) => (
  <EvergreenLink
    is={Link}
    to={to}
    marginRight={majorScale(3)}
    textDecoration="none"
    color="neutral"
    hovercolor="blue"
  >
    <Text size={500}>{label}</Text>
  </EvergreenLink>
);

// Export the NavBar component for use in other parts of the application
export default NavBar;
