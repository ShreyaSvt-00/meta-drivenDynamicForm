import React from 'react';
import "./DynamicForm.css";
import Multiselect from 'multiselect-react-dropdown';


export default class DynamicForm extends React.Component{
   
     
    constructor(props){
        super(props);


        

        this.state={
            formName:this.props.formName,
             formDesc:this.props.formDesc,
             data:[]
    
        }


        
    }
    

     data1=[];

    onSubmit =(e) => {
        e.preventDefault();
        this.state.data.push( this.data1[(this.data1.length-2)]);
        this.state.data.push( this.data1[(this.data1.length-1)]);
        this.data1=this.data1[(this.data1.length)-1,(this.data1.length)-2];
        if(this.props.onSubmit) this.props.onSubmit(this.state);
        this.setState({
            formName:'',
            formDesc:'',
            data:null
        })
       
    }

    onChangeInput=(e,key,fieldlabel,fieldplaceholder,fieldtype,fieldrules,options) => {

        
       
this.data1.push({
                 "fieldname":[key],
                "fieldplaceholder":fieldplaceholder,
                 "fieldlabel":fieldlabel,
                 "fieldtype":fieldtype,
                "fieldrules":fieldrules,
                 "options":options}
)
// console.log(">>>>>>>>>>>>>>>>>>>>>",this.data1);

    }

    onChangeSelect=(e,key,fieldlabel,fieldplaceholder,fieldtype,fieldrules,options) => {

        
       
this.data1.push({
                 "fieldname":[key],
                "fieldplaceholder":fieldplaceholder,
                 "fieldlabel":fieldlabel,
                 "fieldtype":fieldtype,
                "fieldrules":fieldrules,
                 "options":options}
)
// console.log(">>>>>>>>>>>>>>>>>>>>>",this.data1);

    }



    // onChange=(e,key,fieldplaceholder) => {
    //     console.log(" i  am fieldplaceholder",fieldplaceholder);
    //     // console.log(fieldlabel);
        
    //     this.setState( {
           
    //             [key]:this[key].value
            

             
    //     })
    // } 


    renderForm=()=> {
      let model=this.props.model;

      let formUI= model.map((m) => {
       let key=m.key;
       let fieldtype=m.fieldtype;
       let fieldrules=m.fieldrules ;
       let options=m.options ;
       let fieldplaceholder=m.fieldplaceholder;

       return (
           <div key={key} className="form-group">

             <label className="form-label"
             key={"l" + m.key}
              htmlFor={m.key}>
              {m.fieldlabel}
              </label>

               {/* for text datatype */}

             {
               
               fieldtype==="text" && 
               <input 
              {...fieldrules}
              
              className="form-input"
              ref={(key) => {this[m.key]=key}}
              type={fieldtype}
              placeholder={fieldplaceholder}
              key={ m.key}
              
              onChange={(e) => {this.onChangeInput(e,key,m.fieldlabel,m.fieldplaceholder,m.fieldtype,m.fieldrules,m.options)}}
               
              />  }

              {/* for textarea datatype */}

              {
                  fieldtype==="textarea" &&
                  <textarea className="form-input"
                  onChange={(e) => {this.onChange(e,key)}}
                   key={"t" + m.key}
                   ref={(key) => {this[m.key]=key}}
                   placeholder={fieldplaceholder}
                   />
              }

              {/* for checkbox datatype */}

              {
                  fieldtype==="checkbox " && 
                  <input 
                  onChange={(e) => {this.onChange(e,key)}}
                  type={fieldtype} 
                  key={"c" + m.key}
                  ref={(key) => {this[m.key]=key}}
                   >
                  Check Me 
                  </input>
              }

              
              {/* for select datatypes only */}
                 
                     {fieldtype==="select" &&
                     <select
                      onChange={(e) => {this.onChangeSelect(e,key,m.fieldlabel,m.fieldplaceholder,m.fieldtype,m.fieldrules,m.options)}}
                      className="form-input"
                      ref={(key) => {this[m.key]=key}}
                      key={"s" + m.key}
                      placeholder={(fieldplaceholder) => {this[fieldplaceholder]=fieldplaceholder}}>
               <option value={options[0]}>
                   {options[0]}
               </option>
               <option value={options[1]}>
                   {options[1]}
               </option>
              </select>}
              
              {/* for multiselect datatypes */}

              {
                  fieldtype ==="multiselect" && 
                  <Multiselect
                  onChange={(e) => {this.onChange(e,key)}}
                  className="form-input"
                  key={"m" + m.key}
                  ref={(key) => {this[m.key]=key}}
                  options={options}
                  displayValue="Choose all that apply"
                  />
              }
             
              
              


           </div>
       )




      });

      return formUI;
    }

    render(){
        let formName=this.props.formName;
        let formDesc=this.props.formDesc;
        
        return (
            <div className={this.props.className}>

           <h3>{formName}</h3>
          <h4>{formDesc}</h4>
           <form className="dynamic-form" onSubmit={(e) => {this.onSubmit(e)}}>
                {this.renderForm()}

               <div className="form-group">
                   <button type="submit" >

                    Submit
                   </button>
               </div>
           </form>
            </div>
        );
    }
}


