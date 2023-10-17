import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import DynamicForm from './types/dynamic-form/DynamicForm';
import { otherForm, payrollEnquiryForm } from './types/mockData';
import { OpenApiForm } from './types/types';

function App() {
  const [forms, setForms] = useState<OpenApiForm[]>();

  useEffect(() => {
    // Just a stand in for fetching the forms from somewhere
    setForms([
      payrollEnquiryForm, otherForm
    ])
  }, [])

  return (
    <div className="App">

      {forms && forms?.map(form => <DynamicForm form={form} key={form.description} />)}

    </div>
  );
}

export default App;
