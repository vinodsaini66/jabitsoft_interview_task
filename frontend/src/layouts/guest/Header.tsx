import { Layout, Button } from 'antd'
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function Header() {
    const location = useLocation();
    const {  logout } = useAuth(); 
    const token = localStorage.getItem('token') || '';
    const currentView: string = location.pathname === '/login' ? 'login' : "register";

    const handleLogout = () => {
        logout();
    }

    return (
        <Layout.Header className="bg-black border-b border-red-900/20 px-6 flex items-center justify-between">
            <div className="flex-1 flex justify-center gap-8 custom-btn-main w-full max-w-[32%] mx-auto">
                {
                    token ? 
                    (
                        <Button
                            type="text"
                            className={currentView === 'register' ? 'text-red-500' : 'text-white'}
                            onClick={handleLogout}
                        >
                          
                            Logout
                        </Button>
                    )
                    : (<>
                        <Link to="/login">
                            <Button
                                type="text"
                                className={currentView === 'login' ? 'text-red-500' : 'text-white'}
                            >
                                Login
                            </Button>
                        </Link>
                        <Link to="/register">
                            <Button
                                type="text"
                                className={currentView === 'register' ? 'text-red-500' : 'text-white'}
                            >
                               Register
                            </Button>
                        </Link>
                    </>)
                }
            </div>
           
        </Layout.Header>
    )
}

export default Header