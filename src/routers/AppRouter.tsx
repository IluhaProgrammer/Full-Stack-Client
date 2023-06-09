import React from 'react';
import {Route, Routes } from 'react-router-dom'
import {Paths} from './Paths'
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import Employee from '../pages/employees/Employee';
import { useAppSelector } from '../hooks/redux';
import AddEmploee from '../pages/add/AddEmploee';
import Status from '../pages/status/Status';
import EmployeeP from '../pages/employee/Employee';
import EditEmployee from '../pages/edit/EditEmployee';

const AppRouter = () => {

    const {user} = useAppSelector(state => state.auth)

    return (
        <Routes>
            {
                user
                    ? <> <Route path={Paths.home} element={<Employee/>} />
                      <Route path={Paths.employeeAdd} element={<AddEmploee/>} />  
                      <Route path={`${Paths.status}/:status`} element={<Status/>} />
                      <Route path='/employee/:id' element={<EmployeeP/>} />
                      <Route path='/employee/edit/:id' element={<EditEmployee/>} />
                      </>

                    : <>
                        <Route path={Paths.login} element={<Login/>} />
                        <Route path={Paths.registration} element={<Register/>} />
                        <Route path='*' element={<Login/>} />
                        <Route path='/' element={<Login/>} />
                      </>
            }
            
            
            
            
            
        </Routes>
    );
};

export default AppRouter;