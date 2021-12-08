// import { useState } from 'react';
import './App.css';
// import { MethodSelection } from './functions_components/methodSelection';
// import { CarmenAndrade } from './functions_components/caMethod';
// import { Presentation } from './stateless_components/presentation';
// import { EHE08 } from './functions_components/ehe-08Method';
// import { MetodoCalculo, TipoCemento } from './solidConcreteLib';
import {Main} from './2.0/app_cmp';

function App() {
  // const [method, setMethod] = useState("");
  // const showMethod= () =>{
  //   if (method === MetodoCalculo[0].value) {
  //     return (<CarmenAndrade> </CarmenAndrade>);
  //   }
  //   else if (method === MetodoCalculo[1].value) {
  //     return (<EHE08></EHE08>)
  //   }
  //   else{
  //     return (<div> </div>)
  //   }
  // }
  //return (
  //   <div className="App">
  //     <Presentation />
  //     <MethodSelection onChangeMethod={(newMethod) => setMethod(newMethod)} method={method} />
  //     {showMethod()}

  //   </div>
  // );

  return(
    <Main>

    </Main>
    
  );
}
export default App;
