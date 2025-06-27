import {Routes , Route, Navigate} from 'react-router-dom';
import {Login} from '../pages/Login';
import {Register} from '../pages/Register';
import {Home} from '../pages/Home';
import {PrivateRoute} from './PrivateRoute';
import ForgotPassword from '../pages/ForgotPassword';
//import { TreeSubjects } from '../pages/TreeSubjects';
import { Calendar } from '../pages/Calendar';
import { Profesores } from '../pages/Profesores';
import { Salas } from '../pages/Salas';
import { Asignaturas } from '../pages/Asignaturas';
import { CalendariosDashboard } from '../pages/CalendariosDashboard';
import CambiarPassword from '../pages/recuperar-contraseña';


export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Login" replace />} />
      <Route path = '/Login' element = {<Login/>}/>
      <Route path = '/Register' element = {<Register/>}/>
      <Route path = '/ForgotPassword' element={<ForgotPassword/>}/>
      <Route path = '/recuperar-contraseña' element={<CambiarPassword/>}/>

      <Route path='/Home'element={<PrivateRoute> <Home/> </PrivateRoute>}/>
      <Route path='/Calendar/:id'element={<PrivateRoute> <Calendar/> </PrivateRoute>}/>
      <Route path='/Calendar'element={<PrivateRoute> <Calendar/> </PrivateRoute>}/>
      <Route path='/Profesores'element={<PrivateRoute> <Profesores/> </PrivateRoute>}/>
      <Route path='/Salas'element={<PrivateRoute> <Salas/> </PrivateRoute>}/>
      <Route path='/Asignaturas'element={<PrivateRoute> <Asignaturas/> </PrivateRoute>}/>
      <Route path='/CalendariosDashboard'element={<PrivateRoute> <CalendariosDashboard/> </PrivateRoute>}/>
    </Routes>
  );
};