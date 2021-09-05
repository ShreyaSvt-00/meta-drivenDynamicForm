
import './App.css';
import { Component } from 'react';
import DynamicForm from './components/DynamicForm';



class App extends Component{
  

  
 onSubmit =(json) => {

  console.log(json);
  const a = document.createElement('a');
  const blob = new Blob([JSON.stringify(json)]);
  a.href = URL.createObjectURL(blob);
  a.download = 'formData';                     //filename to download
  a.click();


}


 


 
 



  render() {
    return (
      <div className="App">
        <DynamicForm
        className="form"
        formName="Accounts Head"
        formDesc="A short and precise Description"
        model={
          [
            {key:"AccountHeadName", fieldname: "AccountHeadName",fieldplaceholder:"Account Head Name",fieldlabel:"Account Head Name",fieldrules:{required : true },fieldtype:"text",options:[]},
            {key:"AccountType", fieldname: "AccountType",fieldplaceholder:"",fieldlabel:"Account Type",fieldrules:[],fieldtype:"select",options:["Assets","Liabilities"]}
          ]
        }
        onSubmit={(model) => {this.onSubmit(model)}}
        />

      </div>
    );
  }
}

export default App;
