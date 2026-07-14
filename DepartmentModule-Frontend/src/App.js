import React from 'react';
import DepartmentList from './components/DepartmentList';
import DashboardLayout from './components/DashboardLayout'; 

function App() {
  return (
    <DashboardLayout>
        <DepartmentList />
    </DashboardLayout>
  );
}

export default App;