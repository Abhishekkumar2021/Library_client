import './App.css';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { User } from './contexts/User';
import  ThemeContext  from './contexts/Theme';
import  UserContext  from './contexts/User';
import{Routes, Route} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import mainApi from './API/Main'
import Register from './components/Register';


const StyledApp = styled.div`
  text-align: center;
`;


function App() {
  const [theme, setTheme] = useState<string>('light');
  const [user, setUser] = useState<User>(null);
  // useEffect(() => {
  //   mainApi.get('/api/auth/me')
  //   .then(res => console.log(res.data))
  //   .catch(err => console.log(err.response.data))
  // }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <UserContext.Provider value={{ user, setUser }}>
        <StyledApp>
          <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/login" element={<h1>Login</h1>} />
            <Route path="/register" element={<Register/>} />
            <Route  element={<PrivateRoute />}>
              <Route path="/dashboard" element={<h1>Dashboard</h1>} />
              <Route path="/profile" element={<h1>Profile</h1>} />
            </Route>
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </StyledApp>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );


  
  
}

export default App;
