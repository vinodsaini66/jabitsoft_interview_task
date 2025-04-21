import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { Layout as BaseLoyout } from 'antd'

function Layout() {
    return (
        <BaseLoyout className="min-h-screen">
            <Header />
            <BaseLoyout.Content className="flex items-center justify-center p-8 bg-black">
                <Outlet />
            </BaseLoyout.Content>
            <Footer />
        </BaseLoyout>
    )
}

export default Layout