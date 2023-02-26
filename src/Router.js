import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Painel from './pages/Painel';
import Layout from './components/Layout';

const Router = () => <BrowserRouter>
    <Routes>
        <Route path='/' element={<Layout />}>
            <Route element={<Painel />} index />
        </Route>
    </Routes>
</BrowserRouter>

export default Router;