import { useContext } from "react";
import ThemeContext from "../contexts/Theme";
import UserContext from "../contexts/User";


export default function Navbar() {
    const {theme, setTheme} = useContext(ThemeContext);
    const {user, setUser} = useContext(UserContext);
    return (
        <nav>
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Toggle Theme</button>
            <button onClick={() => setUser(user ? null : {name: 'John Doe',
            email: '',
            role: 'admin',
            id:'23'
        })}>{user ? 'Logout' : 'Login'}</button>
        </nav>
    );
}