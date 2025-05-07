import {Routes , Route} from 'react-router-dom';
import {Login} from '../pages/Login';
import {Register} from '../pages/Register';
import {Home} from '../pages/Home';
import {PrivateRoute} from './PrivateRoute';
import ForgotPassword from '../pages/ForgotPassword';
import { Calendar } from '../pages/Calendar';


export const AppRoutes = () => {
  return (
    <Routes>
      <Route path = '/Login' element = {<Login/>}/>
      <Route path = '/Register' element = {<Register/>}/>
      <Route path = '/ForgotPassword' element={<ForgotPassword/>}/>

      <Route path='/Home'element={<PrivateRoute> <Home/> </PrivateRoute>}/>
      <Route path='/Calendar'element={<PrivateRoute> <Calendar/> </PrivateRoute>}/>


    </Routes>
  );
};